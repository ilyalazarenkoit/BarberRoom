"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { CalendarBlank } from "phosphor-react";
import { useTranslation } from "react-i18next";

// Данные о мастерах
const barbers = [
  {
    name: "Єгор",
    position: "Молодший барбер",
    bookingUrl: "https://n1347023.alteg.io",
    imageSrc: "/images/egor.JPEG",
    description:
      "Спеціаліст у класичних чоловічих стрижках. Стаж роботи 2 роки.",
  },
  {
    name: "Богдан",
    position: "Барбер",
    bookingUrl: "https://n1366470.alteg.io",
    imageSrc: "/images/bogdan.jpeg",
    description:
      "Експерт у сучасних трендах чоловічих стрижок. Стаж роботи 3 роки.",
  },
  {
    name: "Дима",
    position: "Барбер",
    bookingUrl: "https://n1366469.alteg.io",
    imageSrc: "/images/dima.JPEG",
    description:
      "Майстер стильних зачісок та догляду за бородою. Стаж роботи 4 роки.",
  },

  {
    name: "Ілля",
    position: "Старший барбер",
    bookingUrl: "https://n524499.alteg.io",
    imageSrc: "/images/ilya.JPEG",

    description:
      "Майстер вищого класу з великим досвідом. Стаж роботи 7 років.",
  },
];

// Анимация для появления элементов
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export const Barbers = () => {
  const { t } = useTranslation();

  return (
    <section id="barbers" className="py-16 md:py-24">
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
                {t("barbers.title")}
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
            <motion.div
              className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 flex items-center gap-2"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { delay: 0.6, duration: 0.6 },
                },
              }}
            ></motion.div>
          </motion.div>
          <div className="mt-12">
            <motion.h3
              variants={fadeInUp}
              className="text-md md:text-lg font-semibold text-gray-600 max-w-2xl mx-auto"
            >
              {t("barbers.subtitle")}
            </motion.h3>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {barbers.map((barber, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInUp}
              className="bg-white rounded-lg overflow-hidden shadow-md"
            >
              <div className="relative h-80">
                <Image
                  src={barber.imageSrc}
                  alt={t("barbers.barberAlt", { name: barber.name })}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold text-[#0B322F]">
                  {t(`barbers.team.${index}.name`, { name: barber.name })}
                </h3>
                <p className="text-gray-600 mb-2">
                  {t(`barbers.team.${index}.position`, {
                    position: barber.position,
                  })}
                </p>
                <p className="text-gray-700 mb-4">
                  {t(`barbers.team.${index}.description`, {
                    description: barber.description,
                  })}
                </p>
                <div className="flex w-full">
                  <motion.a
                    href={barber.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 bg-[#0B322F] text-white hover:bg-[#0f3d39] border border-[#0B322F] px-4 py-2 rounded-md font-medium"
                    whileHover={{
                      scale: 1.02,
                      boxShadow: "0 4px 6px -1px rgba(11, 50, 47, 0.2)",
                    }}
                    transition={{ duration: 0.4 }}
                  >
                    <CalendarBlank size={24} weight="bold" />
                    <span>{t("header.booking")}</span>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
