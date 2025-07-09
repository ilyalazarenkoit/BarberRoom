"use client";
import { motion } from "framer-motion";
import { MapPin, Phone, Clock, InstagramLogo, Copyright } from "phosphor-react";
import { useTranslation } from "react-i18next";
import Image from "next/image";

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
            className="space-y-6 md:flex md:flex-col"
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

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="w-full"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="relative w-full aspect-square rounded-lg overflow-hidden">
                <Image
                  src="/images/vhid.jpg"
                  alt="Barber Room entrance"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                  className="object-cover"
                  priority
                />
              </div>

              <div className="relative w-full aspect-square rounded-lg overflow-hidden">
                <div className="absolute top-2 right-2 z-10">
                  <a
                    href="https://maps.google.com/?q=Київ,вул.Будівельників,32/2"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white text-[#0B322F] px-2 py-1 text-xs md:text-sm font-medium rounded shadow hover:bg-opacity-90 transition-all duration-300 flex items-center"
                  >
                    {t("footer.openMap")}
                  </a>
                </div>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2541.8107943525417!2d30.630954376944872!3d50.43307787159063!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4c57dd83b9e93%3A0x9c2d8e8e9d018c9b!2z0LLRg9C70LjRhtGPINCR0YPQtNGW0LLQtdC70YzQvdC40LrRltCyLCAzMi8yLCDQmtC40ZfQsiwgMDIwOTU!5e0!3m2!1suk!2sua!4v1717427046161!5m2!1suk!2sua"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Google Maps - Barber Room location"
                  aria-label="Map showing Barber Room location"
                ></iframe>
              </div>
            </div>
          </motion.div>
        </div>

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
