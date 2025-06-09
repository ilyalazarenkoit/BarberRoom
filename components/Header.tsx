"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  List,
  InstagramLogo,
  MapPin,
  Clock,
  Phone,
  CalendarBlank,
} from "phosphor-react";
import { motion } from "framer-motion";
import { NavMenu } from "./NavMenu";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useTranslation } from "react-i18next";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useTranslation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full bg-gray-100 h-16 md:h-24 flex items-center justify-between px-4 md:px-8 z-50 shadow-md">
        <div className="flex items-center h-full">
          <Link href="/">
            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src="/images/logo.svg"
                alt="Barbershop Logo"
                width={140}
                height={50}
                className="h-10 w-auto md:h-16 fill-[#0B322F]"
                priority
              />
            </motion.div>
          </Link>
        </div>

        {/* Info only for tablet and desktop */}
        <div className="hidden lg:flex flex-col items-start absolute left-[25%] transform -translate-x-1/2">
          <motion.a
            href="https://g.co/kgs/uRmu1uH"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-[#0B322F] text-base font-medium"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              <MapPin
                size={22}
                color="#0B322F"
                weight="bold"
                className="mr-1"
              />
            </motion.div>
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
              {t("header.address")}
            </motion.span>
          </motion.a>
          <div className="flex items-center text-[#0B322F] text-base font-medium mt-1">
            <Clock size={22} color="#0B322F" weight="bold" className="mr-1" />
            <span>{t("header.workHours")}</span>
          </div>
        </div>

        {/* Tablet and desktop */}
        <div className="hidden md:flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <motion.a
              href="tel:+380123456789"
              className="flex items-center space-x-2 text-[#0B322F] font-medium"
              aria-label="Call us"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                <Phone size={32} color="#0B322F" weight="bold" />
              </motion.div>
              <motion.p
                className="hidden xl:inline font-bold"
                initial={{ backgroundSize: "0% 2px" }}
                whileHover={{ backgroundSize: "100% 2px" }}
                transition={{ duration: 0.3 }}
                style={{
                  backgroundImage: "linear-gradient(#0B322F, #0B322F)",
                  backgroundPosition: "0 100%",
                  backgroundRepeat: "no-repeat",
                }}
              >
                {t("header.phone")}
              </motion.p>
            </motion.a>
          </div>
          <motion.a
            href="https://n408446.alteg.io"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 bg-white text-[#0B322F] hover:bg-gray-100 border border-[#0B322F] px-4 py-2 rounded-md font-medium"
            whileHover={{
              scale: 1.02,
              boxShadow: "0 4px 6px -1px rgba(11, 50, 47, 0.2)",
            }}
            transition={{ duration: 0.4 }}
          >
            <CalendarBlank size={24} weight="bold" />
            <span>{t("header.book")}</span>
          </motion.a>
          <motion.a
            href="https://g.co/kgs/uRmu1uH"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center h-12 w-12 rounded-full bg-transparent"
            whileHover={{
              backgroundColor: "rgba(11, 50, 47, 0.1)",
              boxShadow: "0 2px 4px -1px rgba(11, 50, 47, 0.1)",
            }}
            transition={{ duration: 0.3 }}
            aria-label="We on the map"
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              <MapPin size={32} color="#0B322F" weight="bold" />
            </motion.div>
          </motion.a>
          <motion.a
            href="https://www.instagram.com/barberroom.kyiv/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center h-12 w-12 rounded-full bg-transparent"
            whileHover={{
              backgroundColor: "rgba(11, 50, 47, 0.1)",
              boxShadow: "0 2px 4px -1px rgba(11, 50, 47, 0.1)",
            }}
            transition={{ duration: 0.3 }}
            aria-label="Our Instagram"
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              <InstagramLogo size={32} color="#0B322F" weight="bold" />
            </motion.div>
          </motion.a>

          {/* Language Switcher */}
          <LanguageSwitcher />
        </div>

        {/* Mobile menu button and language switcher */}
        <div className="md:hidden flex items-center space-x-3">
          <LanguageSwitcher />
          <motion.button
            className="flex items-center justify-center h-10 w-10 rounded-full"
            whileHover={{ backgroundColor: "rgba(11, 50, 47, 0.1)" }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
            onClick={toggleMenu}
            aria-label={isMenuOpen ? t("navMenu.close") : "Open menu"}
          >
            <List size={28} color="#0B322F" weight="bold" />
          </motion.button>
        </div>
      </header>

      {/* Mobile Navigation Menu */}
      <NavMenu isOpen={isMenuOpen} onClose={closeMenu} />
    </>
  );
};
