"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Header } from "@/components/Header";
import { Main } from "@/components/Main";

const RouletteModal = dynamic(() => import("@/components/RouletteModal"), {
  ssr: false,
  loading: () => null,
});
const Footer = dynamic(
  () => import("@/components/Footer").then((mod) => ({ default: mod.Footer })),
  {
    ssr: false,
    loading: () => <div className="min-h-[300px] bg-[#0B322F]"></div>,
  }
);
const DiscountButton = dynamic(() => import("@/components/DiscountButton"), {
  ssr: false,
  loading: () => null,
});

export default function Home() {
  const [showRouletteModal, setShowRouletteModal] = useState(false);
  const [showDiscountButton, setShowDiscountButton] = useState(false);

  const checkDiscountButtonState = () => {
    const hasSpunRoulette = localStorage.getItem("hasSpunRoulette");
    const hasSubmittedForm = localStorage.getItem("hasSubmittedRouletteForm");
    const wasModalClosed = localStorage.getItem("modalWasClosed");
    if (
      (hasSpunRoulette === "true" && hasSubmittedForm !== "true") ||
      (wasModalClosed === "true" && hasSubmittedForm !== "true")
    ) {
      setShowDiscountButton(true);
    } else {
      setShowDiscountButton(false);
    }
  };

  useEffect(() => {
    const hasSpunRoulette = localStorage.getItem("hasSpunRoulette");
    const wasModalClosed = localStorage.getItem("modalWasClosed");

    if (!hasSpunRoulette && wasModalClosed !== "true") {
      const timer = setTimeout(() => {
        setShowRouletteModal(true);
      }, 1500);

      return () => clearTimeout(timer);
    }

    checkDiscountButtonState();

    const handleCustomStorageChange = () => {
      checkDiscountButtonState();
    };

    window.addEventListener("localStorageChange", handleCustomStorageChange);

    window.addEventListener("storage", handleCustomStorageChange);

    return () => {
      window.removeEventListener(
        "localStorageChange",
        handleCustomStorageChange
      );
      window.removeEventListener("storage", handleCustomStorageChange);
    };
  }, []);

  const closeRouletteModal = () => {
    setShowRouletteModal(false);

    localStorage.setItem("modalWasClosed", "true");

    window.dispatchEvent(new Event("localStorageChange"));

    setTimeout(() => {
      checkDiscountButtonState();
    }, 100);
  };

  const openRouletteModal = () => {
    setShowRouletteModal(true);
  };

  return (
    <>
      <Header />
      <Main />
      <Footer />
      <RouletteModal isOpen={showRouletteModal} onClose={closeRouletteModal} />
      {showDiscountButton && <DiscountButton onClick={openRouletteModal} />}
    </>
  );
}
