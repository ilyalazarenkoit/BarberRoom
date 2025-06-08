"use client";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { X, Phone, InstagramLogo } from "phosphor-react";
import { useTranslation } from "../lib/i18n/client";
import { useEffect, useRef } from "react";

interface NavMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NavMenu = ({ isOpen, onClose }: NavMenuProps) => {
  const { t } = useTranslation();
  const menuRef = useRef<HTMLDivElement>(null);

  // Предотвращаем прокрутку при касании
  const preventScroll = (e: TouchEvent) => {
    e.preventDefault();
  };

  // Блокировка скролла при открытии меню
  useEffect(() => {
    // Сохраняем оригинальные стили
    const originalStyle = window.getComputedStyle(document.body);
    const originalOverflow = originalStyle.overflow;

    if (isOpen) {
      // Сохраняем текущую позицию скролла
      const scrollY = window.scrollY;

      // Блокируем скролл на body
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";

      // Добавляем обработчик для предотвращения прокрутки на мобильных устройствах
      document.addEventListener("touchmove", preventScroll, { passive: false });

      // Добавляем обработчик для предотвращения прокрутки колесиком мыши
      const handleWheel = (e: WheelEvent) => {
        if (!menuRef.current?.contains(e.target as Node)) {
          e.preventDefault();
        }
      };

      window.addEventListener("wheel", handleWheel, { passive: false });

      return () => {
        // Восстанавливаем оригинальные стили и позицию скролла
        document.body.style.overflow = originalOverflow;
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        window.scrollTo(0, scrollY);

        // Удаляем обработчики событий
        document.removeEventListener("touchmove", preventScroll);
        window.removeEventListener("wheel", handleWheel);
      };
    } else {
      // Если меню закрыто, восстанавливаем скролл
      if (document.body.style.top) {
        const scrollY = Math.abs(parseInt(document.body.style.top || "0"));
        document.body.style.overflow = originalOverflow;
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        window.scrollTo(0, scrollY);
      }

      // Удаляем обработчики событий
      document.removeEventListener("touchmove", preventScroll);
    }
  }, [isOpen]);

  // Animation variants
  const menuVariants = {
    hidden: {
      x: "100%",
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "tween",
        duration: 0.3,
      },
    },
    exit: {
      x: "100%",
      opacity: 0,
      transition: {
        type: "tween",
        duration: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
      },
    }),
  };

  const menuItems = [
    { name: t("header.gallery"), href: "#gallery" },
    { name: t("header.services"), href: "#pricing" },
    { name: t("header.barbers"), href: "#barbers" },
    { name: t("header.contacts"), href: "#contacts" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 z-50 md:hidden"
            onClick={onClose}
          />

          {/* Menu panel */}
          <motion.div
            ref={menuRef}
            className="fixed top-0 right-0 h-full w-4/5 max-w-xs bg-white z-50 shadow-xl flex flex-col md:hidden overflow-y-auto"
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()} // Предотвращаем всплытие события
          >
            {/* Header with close button */}
            <div className="flex justify-end items-center p-4 border-b border-gray-100">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-100"
                aria-label={t("navMenu.close")}
              >
                <X size={24} color="#0B322F" weight="bold" />
              </motion.button>
            </div>

            {/* Menu items */}
            <nav className="flex flex-col px-6 py-8">
              {menuItems.map((item, i) => (
                <motion.div
                  key={item.name}
                  custom={i}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="block py-4 text-xl font-medium text-[#0B322F] border-b border-gray-100 hover:text-opacity-80 transition-colors"
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}

              {/* Book button */}
              <motion.a
                href="https://n408446.alteg.io"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 flex items-center justify-center space-x-2 bg-white text-[#0B322F] hover:bg-gray-100 border border-[#0B322F] px-4 py-3 rounded-md font-medium w-full"
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 4px 6px -1px rgba(11, 50, 47, 0.2)",
                }}
                transition={{ duration: 0.4 }}
                variants={itemVariants}
                custom={menuItems.length}
                initial="hidden"
                animate="visible"
              >
                <span>{t("header.book")}</span>
              </motion.a>

              {/* Social icons */}
              <motion.div
                className="flex justify-center items-center space-x-6 mt-6"
                variants={itemVariants}
                custom={menuItems.length + 1}
                initial="hidden"
                animate="visible"
              >
                <motion.a
                  href="tel:+380123456789"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 rounded-full hover:bg-gray-100 border border-[#0B322F]"
                  aria-label={t("navMenu.call")}
                >
                  <Phone size={28} color="#0B322F" weight="bold" />
                </motion.a>
                <motion.a
                  href="https://instagram.com/barberroom.kyiv"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 rounded-full hover:bg-gray-100 border border-[#0B322F]"
                  aria-label={t("navMenu.instagram")}
                >
                  <InstagramLogo size={28} color="#0B322F" weight="bold" />
                </motion.a>
              </motion.div>
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
