export interface DiscountRequest {
  phoneNumber: string;
  userName: string;
  discountValue: number;
  lang?: string;
}

export interface DiscountResponse {
  success: boolean;
  message: string;
  maskedPhone?: string;
  discountValue?: number;
}

export interface LocalizedMessages {
  [key: string]: {
    ua: string;
    ru: string;
    en: string;
  };
}

export const discountMessages = {
  ua: {
    free: "Ви отримали безкоштовну стрижку на майбутній візит.\n*Для знижки покажіть смс барберу.",
    discount: `Ви отримали -{discount}% на майбутній візит.\n*Для знижки покажіть смс барберу.`,
    other: `Ви отримали -{discount}% на майбутній візит.\n*Для знижки покажіть смс барберу.`,
  },
  ru: {
    free: "Вы получили бесплатную стрижку на будущий визит.\n*Для скидки покажите смс барберу.",
    discount: `Вы получили -{discount}% на будущий визит.\n*Для скидки покажите смс барберу.`,
    other: `Вы получили -{discount}% на будущий визит.\n*Для скидки покажите смс барберу.`,
  },
  en: {
    free: "You received a free haircut for your next visit.\n*To get the discount, show this SMS to your barber.",
    discount: `You received -{discount}% off for your next visit.\n*To get the discount, show this SMS to your barber.`,
    other: `You received -{discount}% off for your next visit.\n*To get the discount, show this SMS to your barber.`,
  },
};

export const messages: LocalizedMessages = {
  tooManyRequests: {
    ua: "Занадто багато запитів. Будь ласка, спробуйте пізніше.",
    ru: "Слишком много запросов. Пожалуйста, попробуйте позже.",
    en: "Too many requests. Please try again later.",
  },
  requestLimitExceeded: {
    ua: "Перевищено ліміт запитів. Спробуйте пізніше.",
    ru: "Превышен лимит запросов. Попробуйте позже.",
    en: "Request limit exceeded. Please try again later.",
  },
  missingRequiredFields: {
    ua: "Відсутні обов'язкові поля",
    ru: "Отсутствуют обязательные поля",
    en: "Missing required fields",
  },
  invalidPhoneFormat: {
    ua: "Невірний формат номера телефону",
    ru: "Неверный формат номера телефона",
    en: "Invalid phone number format",
  },
  invalidDiscountValue: {
    ua: "Невірне значення знижки",
    ru: "Неверное значение скидки",
    en: "Invalid discount value",
  },
  discountSaved: {
    ua: "Знижку успішно збережено",
    ru: "Скидка успешно сохранена",
    en: "Discount successfully saved",
  },
  internalServerError: {
    ua: "Внутрішня помилка сервера",
    ru: "Внутренняя ошибка сервера",
    en: "Internal server error",
  },
  smsError: {
    ua: "Помилка при відправці SMS",
    ru: "Ошибка при отправке SMS",
    en: "Error sending SMS",
  },
  smsProcessingError: {
    ua: "Помилка при обробці відповіді відправки SMS",
    ru: "Ошибка при обработке ответа отправки SMS",
    en: "Error processing SMS response",
  },
  crmError: {
    ua: "Внутрішня помилка при роботі з CRM",
    ru: "Внутренняя ошибка при работе с CRM",
    en: "Internal error when working with CRM",
  },
  smsSentSuccess: {
    ua: "SMS з інформацією про знижку успішно відправлено",
    ru: "SMS с информацией о скидке успешно отправлено",
    en: "SMS with discount information successfully sent",
  },
  smsSentNewClient: {
    ua: "SMS з інформацією про знижку успішно відправлено новому клієнту",
    ru: "SMS с информацией о скидке успешно отправлено новому клиенту",
    en: "SMS with discount information successfully sent to new client",
  },
  smsSentExistingClient: {
    ua: "SMS з інформацією про знижку успішно відправлено існуючому клієнту",
    ru: "SMS с информацией о скидке успешно отправлено существующему клиенту",
    en: "SMS with discount information successfully sent to existing client",
  },
  clientCreationError: {
    ua: "Помилка при створенні клієнта",
    ru: "Ошибка при создании клиента",
    en: "Error creating client",
  },
  clientResponseError: {
    ua: "Помилка при обробці відповіді створення клієнта",
    ru: "Ошибка при обработке ответа создания клиента",
    en: "Error processing client creation response",
  },
};
