import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

const SECRET_KEY = process.env.ALTEGIO_API_KEY;

const TOKEN_LIFETIME = 24 * 60 * 60 * 1000;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { prizeNumber } = body;

    if (prizeNumber === undefined) {
      return NextResponse.json(
        { error: "Prize number is required" },
        { status: 400 }
      );
    }

    const timestamp = Date.now();
    const payload = {
      prizeNumber,
      timestamp,
      expiresAt: timestamp + TOKEN_LIFETIME,
    };

    const token = encryptData(JSON.stringify(payload));

    return NextResponse.json({ success: true, token });
  } catch (error) {
    console.error("Error creating roulette token:", error);
    return NextResponse.json(
      { error: "Failed to create token" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { token } = body;

    if (!token) {
      return NextResponse.json({ error: "Token is required" }, { status: 400 });
    }

    try {
      const decryptedData = decryptData(token);
      const payload = JSON.parse(decryptedData);

      if (Date.now() > payload.expiresAt) {
        return NextResponse.json(
          { error: "Token expired", valid: false },
          { status: 400 }
        );
      }

      return NextResponse.json({
        success: true,
        valid: true,
        prizeNumber: payload.prizeNumber,
        timestamp: payload.timestamp,
      });
    } catch (decryptError) {
      console.error("Error decrypting token:", decryptError);
      return NextResponse.json(
        { error: "Invalid token", valid: false },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error validating roulette token:", error);
    return NextResponse.json(
      { error: "Failed to validate token", valid: false },
      { status: 500 }
    );
  }
}

function encryptData(text: string): string {
  const iv = crypto.randomBytes(16);
  const key = crypto
    .createHash("sha256")
    .update(String(SECRET_KEY))
    .digest("base64")
    .substring(0, 32);
  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);

  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");

  return iv.toString("hex") + ":" + encrypted;
}

function decryptData(text: string): string {
  const [ivHex, encryptedHex] = text.split(":");
  const iv = Buffer.from(ivHex, "hex");
  const key = crypto
    .createHash("sha256")
    .update(String(SECRET_KEY))
    .digest("base64")
    .substring(0, 32);
  const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);

  let decrypted = decipher.update(encryptedHex, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
}
