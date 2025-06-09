"use client";

import { Header } from "@/components/Header";
import dynamic from "next/dynamic";

// Динамический импорт тяжелых компонентов с оптимизацией для Vercel
const Main = dynamic(
  () => import("@/components/Main").then((mod) => ({ default: mod.Main })),
  {
    ssr: false, // Отключаем SSR для тяжелых компонентов
    loading: () => <div className="min-h-screen bg-gray-100"></div>,
  }
);

const Footer = dynamic(
  () => import("@/components/Footer").then((mod) => ({ default: mod.Footer })),
  {
    ssr: false, // Отключаем SSR для тяжелых компонентов
    loading: () => <div className="min-h-[300px] bg-[#0B322F]"></div>,
  }
);

export default function Home() {
  return (
    <>
      <Header />
      <Main />
      <Footer />
    </>
  );
}
