import { NextRequest, NextResponse } from "next/server";
import {
  discountMessages,
  messages,
  DiscountResponse,
  DiscountRequest,
} from "@/constants/constants";

function getLocalizedMessage(
  key: string,
  lang: string = "ua",
  params?: Record<string, string | number>
): string {
  const supportedLangs = ["ua", "ru", "en", "de", "fr"];
  const defaultLang = "en";

  const language = supportedLangs.includes(lang) ? lang : defaultLang;

  let message =
    messages[key]?.[language as keyof (typeof messages)[string]] || key;

  if (params) {
    Object.entries(params).forEach(([paramKey, paramValue]) => {
      message = message.replace(`{${paramKey}}`, String(paramValue));
    });
  }

  return message;
}

const ipRequestsMap = new Map<string, { count: number; lastRequest: number }>();

const MAX_REQUESTS_PER_WINDOW = 5;
const TIME_WINDOW_MS = 60 * 60 * 1000;
const MIN_REQUEST_INTERVAL_MS = 10 * 1000;

function maskPhoneNumber(phone: string): string {
  const digitsOnly = phone.replace(/\D/g, "");
  if (digitsOnly.length <= 6) {
    return digitsOnly.substring(0, 2) + "*".repeat(digitsOnly.length - 2);
  }

  return (
    digitsOnly.substring(0, 3) +
    "*".repeat(digitsOnly.length - 5) +
    digitsOnly.slice(-2)
  );
}

function isValidPhoneNumber(phone: string): boolean {
  const digitsOnly = phone.replace(/\D/g, "");
  return digitsOnly.length >= 10 && digitsOnly.length <= 15;
}

function isValidDiscountValue(value: number): boolean {
  return !isNaN(value) && value >= 5 && value <= 100;
}

function formatPhoneForAltegio(phone: string): string {
  const digitsOnly = phone.replace(/\D/g, "");

  if (digitsOnly.startsWith("49")) {
    return `+${digitsOnly}`;
  } else if (digitsOnly.startsWith("0")) {
    return `+49${digitsOnly}`;
  } else {
    return `+49${digitsOnly}`;
  }
}

function getDiscountMessage(
  discountValue: number,
  lang: string = "ua"
): string {
  type SupportedLanguage = keyof typeof discountMessages;
  const supportedLangs: SupportedLanguage[] = ["ua", "ru", "en", "de", "fr"];
  const defaultLang: SupportedLanguage = "en";
  const language: SupportedLanguage = supportedLangs.includes(
    lang as SupportedLanguage
  )
    ? (lang as SupportedLanguage)
    : defaultLang;

  let messageTemplate = "";

  if (discountValue === 100) {
    messageTemplate = discountMessages[language].free;
  } else if ([50, 30, 20].includes(discountValue)) {
    messageTemplate = discountMessages[language].discount;
  } else {
    messageTemplate = discountMessages[language].other;
  }

  return messageTemplate.replace("{discount}", String(discountValue));
}

async function getAltegioUserToken(): Promise<string | null> {
  try {
    const partnerToken = process.env.ALTEGIO_API_KEY;
    const email = process.env.ALTEGIO_USER_EMAIL;
    const password = process.env.ALTEGIO_USER_PASSWORD;
    console.log(email, password, partnerToken);
    if (!partnerToken || !email || !password) {
      console.error("Missing Altegio authentication credentials");
      return null;
    }

    const authUrl = "https://api.alteg.io/api/v1/auth";
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/vnd.api.v2+json",
      Authorization: `Bearer ${partnerToken}`,
    };

    const authBody = {
      login: email,
      password: password,
    };

    console.log("Authenticating with Altegio...");
    const authResponse = await fetch(authUrl, {
      method: "POST",
      headers,
      body: JSON.stringify(authBody),
    });

    const authResponseText = await authResponse.text();

    if (!authResponse.ok) {
      console.error("Altegio authentication error:", authResponseText);
      return null;
    }

    try {
      const authData = JSON.parse(authResponseText);
      console.log(authData);
      if (authData && authData.data && authData.data.user_token) {
        console.log("Successfully authenticated with Altegio");
        return authData.data.user_token;
      } else {
        console.error("Missing user_token in authentication response");
        return null;
      }
    } catch (error) {
      console.error("Error parsing authentication response:", error);
      return null;
    }
  } catch (error) {
    console.error("Error authenticating with Altegio:", error);
    return null;
  }
}

async function sendToCRM(
  phoneNumber: string,
  userName: string,
  discountValue: number,
  lang: string = "ua"
): Promise<{ success: boolean; message: string }> {
  try {
    const formattedPhone = formatPhoneForAltegio(phoneNumber);
    console.log(
      `Sending request to CRM: ${formattedPhone}, discount ${discountValue}%`
    );

    const userToken = await getAltegioUserToken();
    const partnerToken = process.env.ALTEGIO_API_KEY;
    const companyId = process.env.COMPANY_ID;

    if (!partnerToken || !userToken || !companyId) {
      return {
        success: false,
        message: getLocalizedMessage("crmError", lang),
      };
    }

    const headers = {
      "Content-Type": "application/json",
      Accept: "application/vnd.api.v2+json",
      Authorization: `Bearer ${partnerToken}, User ${userToken}`,
    };

    let clientId: number | null = null;
    const isNewClient = true;

    const createClientUrl = `https://api.alteg.io/api/v1/clients/${companyId}`;
    const createClientBody = {
      name: userName,
      phone: formattedPhone,
      comment: `Отримав знижку ${discountValue}%`,
      categories: ["9316795"],
      sms_check: 1,
    };

    const createResponse = await fetch(createClientUrl, {
      method: "POST",
      headers,
      body: JSON.stringify(createClientBody),
    });

    const createResponseText = await createResponse.text();

    if (!createResponse.ok) {
      console.error("Error creating client:", createResponseText);
      try {
        const errorData = JSON.parse(createResponseText);

        if (
          createResponse.status === 422 ||
          (errorData.error &&
            errorData.error.toLowerCase().includes("already exists"))
        ) {
          return {
            success: false,
            message: getLocalizedMessage("clientCreationError", lang),
          };
        }

        return {
          success: false,
          message:
            errorData.meta?.message ||
            errorData.error?.message ||
            getLocalizedMessage("clientResponseError", lang),
        };
      } catch (error) {
        console.error("Error creating client:", error);
        return {
          success: false,
          message: getLocalizedMessage("clientResponseError", lang),
        };
      }
    }

    try {
      const createData = JSON.parse(createResponseText);
      clientId = createData?.data?.id;
      console.log(`New client created, ID: ${clientId}`);
    } catch (error) {
      console.error("Error parsing client creation response:", error);
      return {
        success: false,
        message: getLocalizedMessage("clientResponseError", lang),
      };
    }

    const message = getDiscountMessage(discountValue, lang);

    const smsUrl = `https://api.alteg.io/api/v1/sms/clients/by_id/${companyId}`;

    const smsHeaders = {
      "Content-Type": "application/json",
      Accept: "application/vnd.api.v2+json",
      Authorization: `Bearer ${partnerToken}, User ${userToken}`,
    };

    const smsBody = {
      client_ids: [clientId],
      text: message,
    };

    const smsResponse = await fetch(smsUrl, {
      method: "POST",
      headers: smsHeaders,
      body: JSON.stringify(smsBody),
    });

    const smsResponseText = await smsResponse.text();

    if (!smsResponse.ok) {
      console.error("Error sending SMS:", smsResponseText);
      try {
        const errorData = JSON.parse(smsResponseText);
        return {
          success: false,
          message: `${getLocalizedMessage("smsError", lang)}: ${
            errorData.error || getLocalizedMessage("internalServerError", lang)
          }`,
        };
      } catch (error) {
        console.error("Error sending SMS:", error);
        return {
          success: false,
          message: getLocalizedMessage("smsError", lang),
        };
      }
    }

    try {
      const smsData = JSON.parse(smsResponseText);
      console.log("SMS sending result:", JSON.stringify(smsData));

      if (smsData && !smsData.success) {
        return {
          success: false,
          message: `${getLocalizedMessage("smsError", lang)}: ${
            smsData.error || getLocalizedMessage("internalServerError", lang)
          }`,
        };
      }

      return {
        success: true,
        message: isNewClient
          ? getLocalizedMessage("smsSentNewClient", lang)
          : getLocalizedMessage("smsSentExistingClient", lang),
      };
    } catch (error) {
      console.error("Error parsing SMS response:", error);
      return {
        success: false,
        message: getLocalizedMessage("smsProcessingError", lang),
      };
    }
  } catch (error) {
    console.error("Error in sendToCRM:", error);
    return {
      success: false,
      message: getLocalizedMessage("crmError", lang),
    };
  }
}

function getClientIp(req: NextRequest): string {
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }

  const realIp = req.headers.get("x-real-ip");
  if (realIp) {
    return realIp;
  }

  return "unknown-ip";
}

function checkIpLimits(ip: string): { allowed: boolean; reason?: string } {
  const now = Date.now();
  const ipData = ipRequestsMap.get(ip);

  if (!ipData) {
    ipRequestsMap.set(ip, { count: 1, lastRequest: now });
    return { allowed: true };
  }
  if (now - ipData.lastRequest < MIN_REQUEST_INTERVAL_MS) {
    return {
      allowed: false,
      reason: "tooManyRequests",
    };
  }

  if (now - ipData.lastRequest > TIME_WINDOW_MS) {
    ipRequestsMap.set(ip, { count: 1, lastRequest: now });
    return { allowed: true };
  }
  if (ipData.count >= MAX_REQUESTS_PER_WINDOW) {
    return {
      allowed: false,
      reason: "requestLimitExceeded",
    };
  }

  ipRequestsMap.set(ip, {
    count: ipData.count + 1,
    lastRequest: now,
  });

  return { allowed: true };
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const clientIp = getClientIp(req);
    const data: DiscountRequest = await req.json();
    const { phoneNumber, userName, discountValue, lang = "ua" } = data;

    const ipCheck = checkIpLimits(clientIp);
    if (!ipCheck.allowed) {
      return NextResponse.json(
        {
          success: false,
          message: getLocalizedMessage(
            ipCheck.reason || "tooManyRequests",
            lang
          ),
        },
        { status: 429 }
      );
    }

    if (!phoneNumber || !userName || discountValue === undefined) {
      return NextResponse.json(
        {
          success: false,
          message: getLocalizedMessage("missingRequiredFields", lang),
        },
        { status: 400 }
      );
    }

    if (!isValidPhoneNumber(phoneNumber)) {
      return NextResponse.json(
        {
          success: false,
          message: getLocalizedMessage("invalidPhoneFormat", lang),
        },
        { status: 400 }
      );
    }

    if (!isValidDiscountValue(discountValue)) {
      return NextResponse.json(
        {
          success: false,
          message: getLocalizedMessage("invalidDiscountValue", lang),
        },
        { status: 400 }
      );
    }

    const maskedPhone = maskPhoneNumber(phoneNumber);

    const crmResult = await sendToCRM(
      phoneNumber,
      userName,
      discountValue,
      lang
    );

    if (!crmResult.success) {
      return NextResponse.json(
        { success: false, message: crmResult.message },
        { status: 400 }
      );
    }

    const response: DiscountResponse = {
      success: true,
      message: crmResult.message || getLocalizedMessage("discountSaved", lang),
      maskedPhone,
      discountValue,
    };

    console.log("API Response:", JSON.stringify(response, null, 2));

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Error processing discount request:", error);
    // Try to get language from request if possible
    let lang = "ua";
    try {
      const data = await req.json();
      lang = data.lang || "ua";
    } catch {
      // If unable to get language from request, use Ukrainian as default
    }

    return NextResponse.json(
      {
        success: false,
        message: getLocalizedMessage("internalServerError", lang),
      },
      { status: 500 }
    );
  }
}
