"use client";
import { motion } from "framer-motion";
import { CalendarBlank, Scissors } from "phosphor-react";
import { useTranslation } from "react-i18next";

// Анимация для появления элементов
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

// Анимация для контейнера с задержкой для дочерних элементов
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export const Pricing = () => {
  const { t } = useTranslation();

  return (
    <section id="pricing" className="py-8 md:py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
          className="text-center mb-12"
        >
          <motion.div className="relative inline-block">
            <motion.h2
              className="text-3xl md:text-5xl font-bold text-[#0B322F] flex items-center justify-center gap-6"
              variants={{
                hidden: { y: -20, opacity: 0 },
                visible: {
                  y: 0,
                  opacity: 1,
                  transition: { duration: 0.6, ease: "easeOut" },
                },
              }}
            >
              <span className="relative">
                {t("services.title")}
                <motion.span
                  className="absolute -bottom-3 left-0 w-full h-1 bg-[#0B322F]"
                  variants={{
                    hidden: { width: "0%" },
                    visible: {
                      width: "100%",
                      transition: {
                        delay: 0.3,
                        duration: 0.8,
                        ease: "easeOut",
                      },
                    },
                  }}
                ></motion.span>
              </span>
            </motion.h2>
          </motion.div>
          <div className="mt-12">
            <motion.h3
              variants={fadeInUp}
              className="text-md md:text-lg font-semibold text-gray-600 max-w-2xl mx-auto"
            >
              {t("services.subtitle")}
            </motion.h3>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Молодший барбер */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="bg-white p-6 rounded-lg shadow-md flex flex-col"
          >
            <div className="flex items-center mb-6">
              <h3 className="text-xl font-bold">
                {t("services.juniorBarber")}
              </h3>
              <span className="h-px bg-[#0B322F]/30 flex-grow ml-4"></span>
              <Scissors
                size={32}
                color="#0B322F"
                weight="bold"
                className="ml-2 flex-shrink-0"
              />
            </div>
            <ul className="space-y-3 mb-auto">
              <li className="flex justify-between items-center border-b pb-2">
                <span>{t("services.mensHaircut")}</span>
                <span className="font-bold">300 ₴</span>
              </li>
              <li className="flex justify-between items-center border-b pb-2">
                <span>{t("services.beardTrim")}</span>
                <span className="font-bold">200 ₴</span>
              </li>
              <li className="flex justify-between items-center border-b pb-2">
                <span>{t("services.combo")}</span>
                <span className="font-bold">450 ₴</span>
              </li>
              <li className="flex justify-between items-center">
                <span>{t("services.wax")}</span>
                <span className="font-bold">100 ₴</span>
              </li>
            </ul>
          </motion.div>

          {/* Барбер */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="bg-white p-6 rounded-lg shadow-md flex flex-col"
          >
            <div className="flex items-center mb-6">
              <h3 className="text-xl font-bold">{t("services.barber")}</h3>
              <span className="h-px bg-[#0B322F]/30 flex-grow ml-4"></span>
              <Scissors
                size={32}
                color="#0B322F"
                weight="bold"
                className="ml-2 flex-shrink-0"
              />
            </div>
            <ul className="space-y-3 mb-auto">
              <li className="flex justify-between items-center border-b pb-2">
                <span>{t("services.mensHaircut")}</span>
                <span className="font-bold">400/500 ₴</span>
              </li>
              <li className="flex justify-between items-center border-b pb-2">
                <span>{t("services.longHaircut")}</span>
                <span className="font-bold">500 ₴</span>
              </li>
              <li className="flex justify-between items-center border-b pb-2">
                <span>{t("services.beardTrim")}</span>
                <span className="font-bold">250 ₴</span>
              </li>
              <li className="flex justify-between items-center border-b pb-2">
                <span>{t("services.combo")}</span>
                <span className="font-bold">650/750 ₴</span>
              </li>
              <li className="flex justify-between items-center">
                <span>{t("services.wax")}</span>
                <span className="font-bold">100 ₴</span>
              </li>
            </ul>
          </motion.div>

          {/* Старший барбер */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="bg-white p-6 rounded-lg shadow-md flex flex-col"
          >
            <div className="flex items-center mb-6">
              <h3 className="text-xl font-bold">
                {t("services.seniorBarber")}
              </h3>
              <span className="h-px bg-[#0B322F]/30 flex-grow ml-4"></span>
              <Scissors
                size={32}
                color="#0B322F"
                weight="bold"
                className="ml-2 flex-shrink-0"
              />
            </div>
            <ul className="space-y-3 mb-auto">
              <li className="flex justify-between items-center border-b pb-2">
                <span>{t("services.mensHaircut")}</span>
                <span className="font-bold">600/650 ₴</span>
              </li>
              <li className="flex justify-between items-center border-b pb-2">
                <span>{t("services.beardTrim")}</span>
                <span className="font-bold">250/300 ₴</span>
              </li>
              <li className="flex justify-between items-center border-b pb-2">
                <span>{t("services.combo")}</span>
                <span className="font-bold">850/900 ₴</span>
              </li>
              <li className="flex justify-between items-center">
                <span>{t("services.wax")}</span>
                <span className="font-bold">100 ₴</span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Общая кнопка записи */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
          className="mt-10 flex justify-center"
        >
          <motion.a
            href="https://n408446.alteg.io"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center space-x-2 bg-white text-[#0B322F] hover:bg-gray-100 border border-[#0B322F] px-8 py-4 rounded-md font-medium text-lg w-full md:w-auto md:min-w-[250px]"
            whileHover={{
              scale: 1.02,
              boxShadow: "0 4px 6px -1px rgba(11, 50, 47, 0.2)",
            }}
            transition={{ duration: 0.4 }}
          >
            <CalendarBlank size={24} weight="bold" className="flex-shrink-0" />
            <span className="truncate">{t("header.book")}</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};
