"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  CalendarBlank,
  Scissors,
  Clock,
  CurrencyCircleDollar,
} from "phosphor-react";
import { useTranslation } from "react-i18next";
import { useParams } from "next/navigation";
import { Header } from "@/components/Header";
import dynamic from "next/dynamic";

const Footer = dynamic(
  () => import("@/components/Footer").then((mod) => ({ default: mod.Footer })),
  {
    ssr: false,
    loading: () => <div className="min-h-[300px] bg-[#0B322F]"></div>,
  }
);

const barbers = [
  {
    slug: "ilya",
    position: "seniorBarber",
    bookingUrl: "https://n524499.alteg.io",
    imageSrc: "/images/ilya.JPEG",
    prices: [
      { service: "mensHaircut", price: 650 },
      { service: "beardTrim", price: 300 },
      { service: "combo", price: 900 },
    ],
  },
  {
    slug: "slava",
    position: "seniorBarber",
    bookingUrl: "https://n1374585.alteg.io",
    imageSrc: "/images/slava.JPG",
    prices: [
      { service: "mensHaircut", price: 600 },
      { service: "beardTrim", price: 300 },
      { service: "combo", price: 850 },
      { service: "wax", price: 100 },
    ],
  },
  {
    slug: "bogdan",
    position: "barber",
    bookingUrl: "https://n1366470.alteg.io",
    imageSrc: "/images/bogdan.jpeg",
    prices: [
      { service: "mensHaircut", price: 500 },
      { service: "beardTrim", price: 250 },
      { service: "combo", price: 750 },
    ],
  },
  {
    slug: "liliya",
    position: "ladyBarber",
    bookingUrl: "https://n1374583.alteg.io",
    imageSrc: "/images/liliya.jpeg",
    prices: [
      { service: "mensHaircut", price: 400 },
      { service: "longHaircut", price: 500 },
      { service: "beardTrim", price: 200 },
      { service: "combo", price: 600 },
    ],
  },
  {
    slug: "egor",
    position: "barber",
    bookingUrl: "https://n1347023.alteg.io",
    imageSrc: "/images/egor.JPEG",
    prices: [
      { service: "mensHaircut", price: 400 },
      { service: "beardTrim", price: 250 },
      { service: "combo", price: 650 },
      { service: "wax", price: 100 },
    ],
  },
];

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

export default function BarberDetails() {
  const { t } = useTranslation();
  const params = useParams();
  const slug = params.slug as string;

  const barber = barbers.find((b) => b.slug === slug);

  if (!barber) {
    return (
      <>
        <Header />
        <div className="container mx-auto px-4 py-6 text-center mt-16 md:mt-24">
          <h1 className="text-2xl font-bold text-[#0B322F]">
            {t("barbers.barberNotFound")}
          </h1>
          <Link
            href="/#barbers"
            className="mt-4 inline-block text-[#0B322F] hover:underline"
          >
            {t("barbers.backToBarbers")}
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <section className="py-6 md:py-12 mt-16 md:mt-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Link
              href="/#barbers"
              className="inline-flex items-center text-[#0B322F] font-medium"
            >
              <ArrowLeft size={20} weight="bold" className="mr-2" />
              <motion.span
                initial={{ backgroundSize: "0% 2px" }}
                whileHover={{ backgroundSize: "100% 2px" }}
                transition={{ duration: 0.3 }}
                style={{
                  backgroundImage: "linear-gradient(#0B322F, #0B322F)",
                  backgroundPosition: "0 100%",
                  backgroundRepeat: "no-repeat",
                }}
              >
                {t("barbers.backToBarbers")}
              </motion.span>
            </Link>
          </motion.div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="flex flex-col">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                className="relative w-full h-[400px] md:h-[500px] lg:h-[500px] rounded-lg lg:rounded-b-none overflow-hidden shadow-lg"
              >
                <Image
                  src={barber.imageSrc}
                  alt={t("barbers.barberAlt", {
                    name: t(`barbers.names.${barber.slug}`),
                  })}
                  fill
                  style={{ objectFit: "cover", objectPosition: "center 15%" }}
                  className="transition-transform duration-700 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                  priority
                />
              </motion.div>
              <div className="flex flex-col mb-6 mt-3 lg:hidden text-center">
                <motion.h2
                  variants={fadeInUp}
                  className="text-3xl md:text-4xl font-bold text-[#0B322F]"
                  initial="hidden"
                  animate="visible"
                >
                  {t(`barbers.names.${barber.slug}`)}
                </motion.h2>
                <motion.p
                  variants={fadeInUp}
                  className="text-xl text-gray-600 mt-2"
                  initial="hidden"
                  animate="visible"
                >
                  {t(`barbers.positions.${barber.position}`)}
                </motion.p>
              </div>

              <motion.div
                variants={fadeInUp}
                className="bg-white rounded-lg lg:rounded-t-none p-6 shadow-md"
                initial="hidden"
                animate="visible"
              >
                <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                  {t(`barbers.details.${barber.slug}.description`)}
                </p>

                <div className="mb-6 lg:hidden">
                  <h3 className="text-xl font-semibold text-[#0B322F] mb-2 flex items-center">
                    <Clock
                      size={24}
                      weight="fill"
                      className="mr-2 text-[#0B322F]"
                    />
                    {t("barbers.experience")}
                  </h3>
                  <p className="text-gray-700 pl-8">
                    {t(`barbers.details.${barber.slug}.experience`)}
                  </p>
                </div>

                <div className="lg:hidden">
                  <h3 className="text-xl font-semibold text-[#0B322F] mb-2 flex items-center">
                    <Scissors
                      size={24}
                      weight="fill"
                      className="mr-2 text-[#0B322F]"
                    />
                    {t("barbers.mainServices")}
                  </h3>
                  <p className="text-gray-700 pl-8">
                    {t(`barbers.details.${barber.slug}.services`)}
                  </p>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="flex flex-col lg:sticky lg:top-24 lg:self-start"
            >
              <div className="hidden lg:flex lg:flex-col mb-6">
                <motion.h2
                  variants={fadeInUp}
                  className="text-5xl font-bold text-[#0B322F]"
                >
                  {t(`barbers.names.${barber.slug}`)}
                </motion.h2>
                <motion.p
                  variants={fadeInUp}
                  className="text-xl text-gray-600 mt-2"
                >
                  {t(`barbers.positions.${barber.position}`)}
                </motion.p>
              </div>

              <motion.div variants={fadeInUp} className="hidden lg:block mb-8">
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-[#0B322F] mb-2 flex items-center">
                    <Clock
                      size={24}
                      weight="fill"
                      className="mr-2 text-[#0B322F]"
                    />
                    {t("barbers.experience")}
                  </h3>
                  <p className="text-gray-700 pl-8">
                    {t(`barbers.details.${barber.slug}.experience`)}
                  </p>
                </div>

                {/* Services */}
                <div>
                  <h3 className="text-xl font-semibold text-[#0B322F] mb-2 flex items-center">
                    <Scissors
                      size={24}
                      weight="fill"
                      className="mr-2 text-[#0B322F]"
                    />
                    {t("barbers.mainServices")}
                  </h3>
                  <p className="text-gray-700 pl-8">
                    {t(`barbers.details.${barber.slug}.services`)}
                  </p>
                </div>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="mb-8 bg-[#f8f8f8] rounded-lg p-6 shadow-md border-l-4 border-[#0B322F]"
              >
                <h3 className="text-xl font-semibold text-[#0B322F] mb-4 flex items-center">
                  <CurrencyCircleDollar
                    size={24}
                    weight="fill"
                    className="mr-2 text-[#0B322F]"
                  />
                  {t("barbers.priceList")}
                </h3>
                <div className="space-y-3">
                  {barber.prices.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center py-2 border-b border-dashed border-gray-300 last:border-b-0"
                    >
                      <span className="text-gray-700">
                        {t(`services.${item.service}`)}
                      </span>
                      <span className="font-semibold text-[#0B322F]">
                        {item.price} ₴
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <motion.a
                  href={barber.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 bg-[#0B322F] text-white hover:bg-[#0f3d39] border border-[#0B322F] px-6 py-3 rounded-md font-medium w-full justify-center"
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 4px 6px -1px rgba(11, 50, 47, 0.2)",
                  }}
                  transition={{ duration: 0.4 }}
                >
                  <CalendarBlank size={24} weight="bold" />
                  <span>{t("header.booking")}</span>
                </motion.a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
