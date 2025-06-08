import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import type { SwiperRef } from "swiper/react";
import { Scissors } from "phosphor-react";
import { useTranslation } from "../lib/i18n/client";

// Импорт стилей Swiper
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Интерфейс для элементов галереи
interface GalleryItem {
  id: number;
  imageSrc: string;
}

// Данные для галереи стрижек
const haircuts: GalleryItem[] = [
  {
    id: 1,
    imageSrc: "/images/haircut1.jpg",
  },
  {
    id: 2,
    imageSrc: "/images/haircut2.jpg",
  },
  {
    id: 3,
    imageSrc: "/images/haircut3.jpg",
  },
  {
    id: 4,
    imageSrc: "/images/haircut4.jpg",
  },
  {
    id: 5,
    imageSrc: "/images/haircut5.jpg",
  },
];

// Данные для галереи бороды
const beards: GalleryItem[] = [
  {
    id: 1,
    imageSrc: "/images/beard1.jpg",
  },
  {
    id: 2,
    imageSrc: "/images/beard2.jpg",
  },
  {
    id: 3,
    imageSrc: "/images/beard3.jpg",
  },
  {
    id: 4,
    imageSrc: "/images/beard4.jpg",
  },
  {
    id: 5,
    imageSrc: "/images/beard5.jpg",
  },
];

// Анимации для появления элементов
const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const slideInLeft = {
  hidden: { x: -50, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const slideInRight = {
  hidden: { x: 50, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

// Компонент стандартного слайдера
const StandardSlider = ({
  items,
  direction,
}: {
  items: GalleryItem[];
  direction: "left" | "right";
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const swiperRef = useRef<SwiperRef>(null);
  const { t } = useTranslation();

  // Функция для переключения на выбранный слайд
  const handleSlideClick = (index: number) => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideTo(index);
    }
  };

  return (
    <motion.div
      ref={sectionRef}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            duration: 0.5,
          },
        },
      }}
      className="w-full"
    >
      <div className="relative">
        <Swiper
          ref={swiperRef}
          modules={[Navigation, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            320: {
              slidesPerView: 1,
            },
            480: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 4,
            },
          }}
          className="py-8"
        >
          {items.map((item, index) => (
            <SwiperSlide key={item.id} onClick={() => handleSlideClick(index)}>
              <div className="bg-gray-100 rounded-lg overflow-hidden transition-all duration-300 cursor-pointer h-full flex flex-col">
                <div className="relative h-64 w-full">
                  <Image
                    src={item.imageSrc}
                    alt={t(
                      `gallery.${
                        direction === "left" ? "haircuts" : "beards"
                      }.${item.id}.name`
                    )}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 768px) 100vw, 300px"
                  />
                </div>
                <div className="p-4 flex-grow flex flex-col min-h-[140px]">
                  <h3 className="font-bold text-[#0B322F] mb-2 text-center text-xl">
                    {t(
                      `gallery.${
                        direction === "left" ? "haircuts" : "beards"
                      }.${item.id}.name`
                    )}
                  </h3>
                  <div className="flex-grow flex items-center justify-center">
                    <p className="text-[#0B322F] text-center line-clamp-2 text-lg">
                      {t(
                        `gallery.${
                          direction === "left" ? "haircuts" : "beards"
                        }.${item.id}.description`
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
          <div className="swiper-button-prev !text-white !left-1"></div>
          <div className="swiper-button-next !text-white !right-1"></div>
        </Swiper>
      </div>
    </motion.div>
  );
};

export const Gallery = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const { t } = useTranslation();

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="py-8 md:py-16 overflow-x-hidden"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeIn}
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
                {t("gallery.title")}
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
        </motion.div>

        <div>
          {/* Галерея стрижек */}
          <div className="space-y-4 flex items-center flex-col">
            <motion.h3
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={slideInLeft}
              className="text-2xl font-semibold text-gray-600 mb-4 flex items-center gap-2 w-full max-w-md relative"
            >
              <span className="h-px bg-[#0B322F]/30 flex-grow"></span>
              <span className="flex items-center gap-2 px-4">
                {t("gallery.haircutsTitle")}{" "}
                <Scissors size={24} weight="fill" />
              </span>
              <span className="h-px bg-[#0B322F]/30 flex-grow"></span>
            </motion.h3>
            <StandardSlider items={haircuts} direction="left" />
          </div>

          {/* Галерея бороды */}
          <div className="space-y-4 mt-8 flex items-center flex-col">
            <motion.h3
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={slideInRight}
              className="text-2xl font-semibold text-gray-600 mb-4 flex items-center gap-2 w-full max-w-md relative"
            >
              <span className="h-px bg-[#0B322F]/30 flex-grow"></span>
              <span className="flex items-center gap-2 px-4">
                {t("gallery.beardsTitle")} <Scissors size={24} weight="fill" />
              </span>
              <span className="h-px bg-[#0B322F]/30 flex-grow"></span>
            </motion.h3>
            <StandardSlider items={beards} direction="right" />
          </div>
        </div>
      </div>
    </section>
  );
};
