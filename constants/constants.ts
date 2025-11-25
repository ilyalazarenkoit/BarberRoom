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
    de: string;
    fr: string;
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
  de: {
    free: "Sie haben einen kostenlosen Haarschnitt für Ihren nächsten Besuch erhalten.\n*Um den Rabatt zu erhalten, zeigen Sie diese SMS Ihrem Friseur.",
    discount: `Sie haben -{discount}% Rabatt für Ihren nächsten Besuch erhalten.\n*Um den Rabatt zu erhalten, zeigen Sie diese SMS Ihrem Friseur.`,
    other: `Sie haben -{discount}% Rabatt für Ihren nächsten Besuch erhalten.\n*Um den Rabatt zu erhalten, zeigen Sie diese SMS Ihrem Friseur.`,
  },
  fr: {
    free: "Vous avez reçu une coupe de cheveux gratuite pour votre prochaine visite.\n*Pour obtenir la réduction, montrez ce SMS à votre barbier.",
    discount: `Vous avez reçu -{discount}% de réduction pour votre prochaine visite.\n*Pour obtenir la réduction, montrez ce SMS à votre barbier.`,
    other: `Vous avez reçu -{discount}% de réduction pour votre prochaine visite.\n*Pour obtenir la réduction, montrez ce SMS à votre barbier.`,
  },
};

export const messages: LocalizedMessages = {
  tooManyRequests: {
    ua: "Занадто багато запитів. Будь ласка, спробуйте пізніше.",
    ru: "Слишком много запросов. Пожалуйста, попробуйте позже.",
    en: "Too many requests. Please try again later.",
    de: "Zu viele Anfragen. Bitte versuchen Sie es später erneut.",
    fr: "Trop de demandes. Veuillez réessayer plus tard.",
  },
  requestLimitExceeded: {
    ua: "Перевищено ліміт запитів. Спробуйте пізніше.",
    ru: "Превышен лимит запросов. Попробуйте позже.",
    en: "Request limit exceeded. Please try again later.",
    de: "Anfragelimit überschritten. Bitte versuchen Sie es später erneut.",
    fr: "Limite de demandes dépassée. Veuillez réessayer plus tard.",
  },
  missingRequiredFields: {
    ua: "Відсутні обов'язкові поля",
    ru: "Отсутствуют обязательные поля",
    en: "Missing required fields",
    de: "Erforderliche Felder fehlen",
    fr: "Champs obligatoires manquants",
  },
  invalidPhoneFormat: {
    ua: "Невірний формат номера телефону",
    ru: "Неверный формат номера телефона",
    en: "Invalid phone number format",
    de: "Ungültiges Telefonnummernformat",
    fr: "Format de numéro de téléphone invalide",
  },
  invalidDiscountValue: {
    ua: "Невірне значення знижки",
    ru: "Неверное значение скидки",
    en: "Invalid discount value",
    de: "Ungültiger Rabattwert",
    fr: "Valeur de réduction invalide",
  },
  discountSaved: {
    ua: "Знижку успішно збережено",
    ru: "Скидка успешно сохранена",
    en: "Discount successfully saved",
    de: "Rabatt erfolgreich gespeichert",
    fr: "Réduction enregistrée avec succès",
  },
  internalServerError: {
    ua: "Внутрішня помилка сервера",
    ru: "Внутренняя ошибка сервера",
    en: "Internal server error",
    de: "Interner Serverfehler",
    fr: "Erreur interne du serveur",
  },
  smsError: {
    ua: "Помилка при відправці SMS",
    ru: "Ошибка при отправке SMS",
    en: "Error sending SMS",
    de: "Fehler beim Senden der SMS",
    fr: "Erreur lors de l'envoi du SMS",
  },
  smsProcessingError: {
    ua: "Помилка при обробці відповіді відправки SMS",
    ru: "Ошибка при обработке ответа отправки SMS",
    en: "Error processing SMS response",
    de: "Fehler bei der Verarbeitung der SMS-Antwort",
    fr: "Erreur lors du traitement de la réponse SMS",
  },
  crmError: {
    ua: "Внутрішня помилка при роботі з CRM",
    ru: "Внутренняя ошибка при работе с CRM",
    en: "Internal error when working with CRM",
    de: "Interner Fehler bei der Arbeit mit CRM",
    fr: "Erreur interne lors du travail avec le CRM",
  },
  smsSentSuccess: {
    ua: "SMS з інформацією про знижку успішно відправлено",
    ru: "SMS с информацией о скидке успешно отправлено",
    en: "SMS with discount information successfully sent",
    de: "SMS mit Rabattinformationen erfolgreich gesendet",
    fr: "SMS avec informations de réduction envoyé avec succès",
  },
  smsSentNewClient: {
    ua: "SMS з інформацією про знижку успішно відправлено новому клієнту",
    ru: "SMS с информацией о скидке успешно отправлено новому клиенту",
    en: "SMS with discount information successfully sent to new client",
    de: "SMS mit Rabattinformationen erfolgreich an neuen Kunden gesendet",
    fr: "SMS avec informations de réduction envoyé avec succès au nouveau client",
  },
  smsSentExistingClient: {
    ua: "SMS з інформацією про знижку успішно відправлено існуючому клієнту",
    ru: "SMS с информацией о скидке успешно отправлено существующему клиенту",
    en: "SMS with discount information successfully sent to existing client",
    de: "SMS mit Rabattinformationen erfolgreich an bestehenden Kunden gesendet",
    fr: "SMS avec informations de réduction envoyé avec succès au client existant",
  },
  clientCreationError: {
    ua: "Помилка при створенні клієнта",
    ru: "Ошибка при создании клиента",
    en: "Error creating client",
    de: "Fehler beim Erstellen des Kunden",
    fr: "Erreur lors de la création du client",
  },
  clientResponseError: {
    ua: "Помилка при обробці відповіді створення клієнта",
    ru: "Ошибка при обработке ответа создания клиента",
    en: "Error processing client creation response",
    de: "Fehler bei der Verarbeitung der Antwort zur Kundenerstellung",
    fr: "Erreur lors du traitement de la réponse de création du client",
  },
};
