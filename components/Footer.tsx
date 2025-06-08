"use client";
import { motion } from "framer-motion";
import { MapPin, Phone, Clock, InstagramLogo, Copyright } from "phosphor-react";
import { useTranslation } from "../lib/i18n/client";

// Анимация для появления элементов
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer
      id="contacts"
      className="bg-[#0B322F] text-white pt-8 md:pt-12 pb-4 md:pb-6"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Контактная информация */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.2,
                },
              },
            }}
            className="space-y-6 md:flex md:flex-col md:items-center md:justify-center"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-2xl md:text-3xl font-bold mb-6"
            >
              {t("header.contacts")}
            </motion.h2>

            <div className="grid grid-cols-1 gap-6 w-full">
              <motion.div variants={fadeInUp} className="flex items-start">
                <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center">
                  <MapPin size={24} weight="bold" />
                </div>
                <div className="ml-3">
                  <a
                    href="https://maps.google.com/?q=Київ,вул.Будівельників,32/2"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-80 transition-opacity duration-300"
                  >
                    <h3 className="font-semibold">{t("footer.address")}</h3>
                    <p className="text-sm md:text-base underline">
                      {t("header.address")}
                    </p>
                  </a>
                </div>
              </motion.div>

              <motion.div variants={fadeInUp} className="flex items-start">
                <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center">
                  <Phone size={24} weight="bold" />
                </div>
                <div className="ml-3">
                  <a
                    href="tel:+380123456789"
                    className="hover:opacity-80 transition-opacity duration-300"
                  >
                    <h3 className="font-semibold">{t("footer.phone")}</h3>
                    <p className="text-sm md:text-base underline">
                      {t("header.phone")}
                    </p>
                  </a>
                </div>
              </motion.div>

              <motion.div variants={fadeInUp} className="flex items-start">
                <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center">
                  <Clock size={24} weight="bold" />
                </div>
                <div className="ml-3">
                  <h3 className="font-semibold">{t("footer.workHours")}</h3>
                  <p className="text-sm md:text-base">
                    {t("header.workHours")}
                  </p>
                </div>
              </motion.div>

              <motion.div variants={fadeInUp} className="flex items-start">
                <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center">
                  <InstagramLogo size={24} weight="bold" />
                </div>
                <div className="ml-3">
                  <a
                    href="https://instagram.com/barberroom.kyiv"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-80 transition-opacity duration-300"
                  >
                    <h3 className="font-semibold">{t("footer.social")}</h3>
                    <p className="text-sm md:text-base">@barberroom.kyiv</p>
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Карта с кнопкой для перехода на Google Maps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full h-[250px] md:h-[400px] rounded-md overflow-hidden relative"
          >
            {/* Кнопка для перехода на Google Maps */}
            <a
              href="https://maps.google.com/?q=Будівельників+32/2,+Київ,+Україна"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute top-4 right-4 z-20 bg-white text-[#0B322F] px-4 py-2 rounded-md font-medium shadow-md hover:bg-gray-100 transition-all duration-300 flex items-center space-x-2"
            >
              <MapPin size={20} weight="bold" />
              <span>Відкрити на Google Maps</span>
            </a>

            {/* iframe с Google Maps */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2541.8107861917166!2d30.610931376944754!3d50.45499408555602!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4cf8b7e2e7c91%3A0x7c3b1f5a1e7d9d5b!2z0LLRg9C70LjRhtGPINCR0YPQtNGW0LLQtdC70YzQvdC40LrRltCyLCAzMi8yLCDQmtC40ZfQsiwgMDIwOTU!5e0!3m2!1suk!2sua!4v1654321234567!5m2!1suk!2sua"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Карта розташування барбершопу"
              className="rounded-md"
            ></iframe>
          </motion.div>
        </div>

        {/* Копирайт */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-8 md:mt-12 pt-6 border-t border-gray-700 flex items-center justify-center gap-2"
        >
          <p className="text-sm md:text-base">
            {new Date().getFullYear()} {t("footer.copyright")}
          </p>
          <Copyright size={16} />
        </motion.div>
      </div>
    </footer>
  );
};
