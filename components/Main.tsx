"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { CalendarBlank } from "phosphor-react";
import { Barbers } from "./Barbers";
import { Gallery } from "./Gallery";
import { Pricing } from "./Pricing";
import { useTranslation } from "react-i18next";

// Animation for element appearance
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

// Animation for containers
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export const Main = () => {
  const { t } = useTranslation();

  return (
    <main className="pt-16 md:pt-24">
      {/* Section 1: Barbershop interior */}
      <section className="relative h-[80vh] md:h-[100vh] flex items-start md:items-center pt-[20vh] md:pt-0 ">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/interior.jpg"
            alt={t("main.interiorAlt")}
            fill
            style={{ objectFit: "cover", objectPosition: "center" }}
            priority
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className="container mx-auto px-4 z-10 relative">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-2xl mx-auto md:mx-0 lg:pl-8"
          >
            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 text-center md:text-left"
            >
              {t("main.title")}
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-xl text-gray-100 mb-6 text-center md:text-left"
            >
              {t("main.subtitle")}
            </motion.p>
            <motion.div
              variants={fadeInUp}
              className="flex justify-center md:justify-start w-full mt-8"
            >
              <motion.a
                href="https://n408446.alteg.io"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-3 bg-white text-[#0B322F] hover:bg-gray-100 border-2 border-[#0B322F] px-6 py-3 md:px-8 md:py-4 rounded-md font-bold text-xl md:text-2xl shadow-md"
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 8px 15px -3px rgba(11, 50, 47, 0.3)",
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.3 }}
              >
                <CalendarBlank
                  size={32}
                  weight="bold"
                  className="w-7 h-7 md:w-9 md:h-9"
                />
                <span>{t("header.booking")}</span>
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Section 1: Gallery */}

      <Gallery />

      {/* Section 2: Pricing */}
      <Pricing />

      {/* Section 3: Barbers */}

      <Barbers />
    </main>
  );
};
