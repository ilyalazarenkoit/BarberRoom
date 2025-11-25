"use client";

import React, { useState, useEffect } from "react";
import { Wheel } from "react-custom-roulette";
import { motion, AnimatePresence } from "framer-motion";
import DiscountAnalytics from "./DiscountAnalytics";
import DiscountTerms from "./DiscountTerms";
import { useTranslation } from "react-i18next";
import { ChatText } from "phosphor-react";
interface DiscountData {
  option: string;
  style: {
    backgroundColor: string;
    textColor: string;
  };
  value: number;
}

interface AnalyticsData {
  event: "view" | "spin" | "submit" | "success";
  discountValue?: number;
  additionalData?: {
    reset?: boolean;
    phoneNumberLength?: number;
  };
}

interface RouletteProps {
  className?: string;
}

const Roulette: React.FC<RouletteProps> = ({ className }) => {
  const { t, i18n } = useTranslation();

  const discountData: DiscountData[] = [
    {
      option: "100%",
      style: { backgroundColor: "#0B322F", textColor: "white" },
      value: 100,
    },
    {
      option: "50%",
      style: { backgroundColor: "#ffffff", textColor: "#0B322F" },
      value: 50,
    },
    {
      option: "30%",
      style: { backgroundColor: "#0B322F", textColor: "white" },
      value: 30,
    },
    {
      option: "30%",
      style: { backgroundColor: "#ffffff", textColor: "#0B322F" },
      value: 30,
    },
    {
      option: "20%",
      style: { backgroundColor: "#0B322F", textColor: "white" },
      value: 20,
    },
    {
      option: "20%",
      style: { backgroundColor: "#ffffff", textColor: "#0B322F" },
      value: 20,
    },
  ];

  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [hasSpun, setHasSpun] = useState(false);
  const [showPhoneForm, setShowPhoneForm] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userName, setUserName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [canSpin, setCanSpin] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    event: "view",
    discountValue: undefined,
    additionalData: undefined,
  });

  useEffect(() => {
    const hasUserSpun = localStorage.getItem("hasSpunRoulette");
    const hasSubmittedForm = localStorage.getItem("hasSubmittedRouletteForm");
    const savedToken = localStorage.getItem("rouletteToken");
    const savedUserName = localStorage.getItem("rouletteUserName");
    const savedPhoneNumber = localStorage.getItem("roulettePhoneNumber");

    if (hasUserSpun === "true") {
      setCanSpin(false);
      setHasSpun(true);

      // If there is a saved token, validate it on the server
      if (savedToken) {
        validateRouletteToken(savedToken);
      } else {
        // If there is no token but hasUserSpun flag is set, reset state
        handleReset();
      }

      if (hasSubmittedForm !== "true") {
        setShowPhoneForm(true);
      }
    }

    if (hasSubmittedForm === "true") {
      setShowPhoneForm(false);
      setSuccess(t("roulette.discountSuccess"));
    }

    if (savedUserName) {
      setUserName(savedUserName);
    }

    if (savedPhoneNumber) {
      setPhoneNumber(savedPhoneNumber);
    }

    setAnalyticsData({
      event: "view",
      discountValue: undefined,
      additionalData: { reset: true },
    });

    setIsMobile(window.innerWidth < 768);
    setIsLargeScreen(window.innerWidth >= 900);
  }, [t]);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsLargeScreen(window.innerWidth >= 900);
    };

    checkScreenSize();

    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  const validateRouletteToken = async (token: string) => {
    try {
      const response = await fetch("/api/roulette-token", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });

      const data = await response.json();

      if (data.success && data.valid) {
        setPrizeNumber(data.prizeNumber);
      } else {
        localStorage.removeItem("rouletteToken");
        console.warn("Roulette token is invalid or expired");
      }
    } catch (error) {
      console.error("Error validating roulette token:", error);
    }
  };

  const handleSpinClick = async () => {
    if (!canSpin) {
      setError(t("roulette.alreadyHasDiscount"));
      return;
    }

    try {
      setError(null);

      const response = await fetch("/api/spin");

      if (!response.ok) {
        throw new Error(t("roulette.spinFailed"));
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || t("roulette.resultError"));
      }

      const resultIndex = discountData.findIndex(
        (item) =>
          item.option === data.result.option && item.value === data.result.value
      );
      const prizeIndex =
        resultIndex >= 0
          ? resultIndex
          : discountData.findIndex((item) => item.value === data.result.value);
      const newPrizeNumber =
        prizeIndex >= 0
          ? prizeIndex
          : Math.floor(Math.random() * discountData.length);

      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
    } catch (error) {
      console.error("Error getting spin result:", error);

      const newPrizeNumber = Math.floor(Math.random() * discountData.length);
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
      setError(t("roulette.errorButContinue"));
    }
  };

  const handleStopSpinning = async () => {
    setMustSpin(false);
    setHasSpun(true);
    setShowPhoneForm(true);

    localStorage.setItem("hasSpunRoulette", "true");

    try {
      const response = await fetch("/api/roulette-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prizeNumber }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem("rouletteToken", data.token);
      } else {
        console.error("Failed to get roulette token");
      }
    } catch (error) {
      console.error("Error getting roulette token:", error);
    }

    window.dispatchEvent(new Event("localStorageChange"));

    setAnalyticsData({
      event: "spin",
      discountValue: discountData[prizeNumber].value,
    });
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    if (!value.startsWith("+380")) {
      value = "+380";
    } else if (value.length > 13) {
      value = value.slice(0, 13);
    }

    setPhoneNumber(value);
    localStorage.setItem("roulettePhoneNumber", value);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUserName(value);
    localStorage.setItem("rouletteUserName", value);
  };

  const handleReset = () => {
    localStorage.removeItem("hasSpunRoulette");
    localStorage.removeItem("hasSubmittedRouletteForm");

    localStorage.removeItem("rouletteToken");
    localStorage.removeItem("rouletteUserName");
    localStorage.removeItem("roulettePhoneNumber");

    setCanSpin(true);
    setHasSpun(false);
    setShowPhoneForm(false);
    setPhoneNumber("");
    setUserName("");
    setError(null);
    setSuccess(null);
    setAnalyticsData({
      event: "view",
      additionalData: { reset: true },
    });

    window.dispatchEvent(new Event("localStorageChange"));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!phoneNumber || phoneNumber.length < 13) {
      setError(t("roulette.enterValidPhone"));
      return;
    }

    if (!userName.trim()) {
      setError(t("roulette.enterName"));
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const savedToken = localStorage.getItem("rouletteToken");
      let actualPrizeNumber = prizeNumber;

      if (savedToken) {
        try {
          const response = await fetch("/api/roulette-token", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ token: savedToken }),
          });

          const data = await response.json();

          if (data.success && data.valid) {
            actualPrizeNumber = data.prizeNumber;
          }
        } catch (error) {
          console.error("Error validating roulette token:", error);
        }
      }

      const response = await fetch("/api/discount", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phoneNumber,
          userName,
          discountValue: discountData[actualPrizeNumber].value,
          lang: i18n.language,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || t("roulette.submitError"));
      }

      setSuccess(t("roulette.discountSuccess"));
      setShowPhoneForm(false);
      setAnalyticsData({
        event: "submit",
        discountValue: discountData[actualPrizeNumber].value,
        additionalData: { phoneNumberLength: phoneNumber.length },
      });

      setAnalyticsData({
        event: "success",
        discountValue: discountData[actualPrizeNumber].value,
      });

      localStorage.setItem("hasSubmittedRouletteForm", "true");

      localStorage.removeItem("rouletteToken");
      localStorage.removeItem("rouletteUserName");
      localStorage.removeItem("roulettePhoneNumber");

      window.dispatchEvent(new Event("localStorageChange"));
    } catch (err) {
      setError(err instanceof Error ? err.message : t("roulette.submitError"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={`flex flex-col items-center justify-center p-2 pb-4 pt-0 ${className}`}
    >
      <DiscountAnalytics
        event={analyticsData.event}
        discountValue={analyticsData.discountValue}
        additionalData={analyticsData.additionalData}
      />

      <div
        className={`w-full max-w-5xl mx-auto flex ${
          isLargeScreen ? "flex-row" : "flex-col"
        } items-center justify-center ${isLargeScreen ? "gap-4" : "gap-2"} ${
          mustSpin ? "overflow-hidden" : ""
        }`}
        style={{
          position: mustSpin ? "relative" : "static",
          height: mustSpin ? "100%" : "auto",
        }}
      >
        {!isLargeScreen && !showPhoneForm && !success && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-2 w-full"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-[#0B322F] mb-2">
              {t("roulette.title")}
            </h2>
          </motion.div>
        )}

        {!success && (
          <div
            className={`${
              isLargeScreen ? "w-1/2" : "w-full"
            } flex flex-col items-center`}
          >
            <div className="relative w-full max-w-md">
              <Wheel
                mustStartSpinning={mustSpin}
                prizeNumber={prizeNumber}
                data={discountData}
                onStopSpinning={handleStopSpinning}
                backgroundColors={discountData.map(
                  (item) => item.style.backgroundColor
                )}
                textColors={discountData.map((item) => item.style.textColor)}
                fontSize={isMobile ? 16 : 20}
                outerBorderColor="#0B322F"
                outerBorderWidth={3}
                innerBorderColor="#0B322F"
                innerBorderWidth={2}
                radiusLineColor="#0B322F"
                radiusLineWidth={2}
                perpendicularText
                textDistance={isMobile ? 50 : 60}
              />
            </div>

            {process.env.NODE_ENV === "development" && (
              <button
                onClick={handleReset}
                className="mt-2 text-xs text-gray-400 underline"
              >
                {t("roulette.resetButton")}
              </button>
            )}
          </div>
        )}

        {!success && (
          <div
            className={`${
              isLargeScreen ? "w-1/2" : "w-full"
            } flex flex-col items-center ${
              isLargeScreen ? "items-start" : "items-center"
            }`}
          >
            {!showPhoneForm ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className={`text-center ${
                  isLargeScreen ? "text-left" : "text-center"
                } mb-8 ${!isLargeScreen && "hidden"}`}
              >
                {isLargeScreen && (
                  <h2 className="text-2xl md:text-3xl font-bold text-[#0B322F] mb-16">
                    {t("roulette.title")}
                  </h2>
                )}

                {!hasSpun && (
                  <motion.button
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 10px 25px rgba(11, 50, 47, 0.3)",
                    }}
                    onClick={handleSpinClick}
                    disabled={mustSpin || !canSpin}
                    className={`relative px-6 py-3 bg-[#0B322F] text-white rounded-md font-medium shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                      isLargeScreen ? "text-lg" : "text-md self-center"
                    }`}
                    style={{
                      transform: isLargeScreen ? "scale(1.2)" : "scale(1)",
                      transformOrigin: isLargeScreen
                        ? "center center"
                        : "center center",
                      margin: isLargeScreen ? "0 auto" : "0",
                      display: "block",
                    }}
                  >
                    {mustSpin && (
                      <>
                        <motion.span
                          className="absolute w-2 h-2 bg-yellow-300 rounded-full"
                          style={{ top: "-10px", left: "20%" }}
                          animate={{
                            y: [0, -20, -30],
                            x: [0, 10, 15],
                            opacity: [1, 0.8, 0],
                            scale: [1, 1.2, 0.8],
                          }}
                          transition={{
                            duration: 0.8,
                            repeat: Infinity,
                            repeatType: "loop",
                            delay: 0.1,
                          }}
                        />
                        <motion.span
                          className="absolute w-3 h-3 bg-yellow-400 rounded-full"
                          style={{ top: "-5px", left: "40%" }}
                          animate={{
                            y: [0, -25, -40],
                            x: [0, -15, -20],
                            opacity: [1, 0.7, 0],
                            scale: [1, 1.5, 0.5],
                          }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            repeatType: "loop",
                            delay: 0.3,
                          }}
                        />
                        <motion.span
                          className="absolute w-2 h-2 bg-orange-400 rounded-full"
                          style={{ top: "-8px", right: "30%" }}
                          animate={{
                            y: [0, -30, -50],
                            x: [0, 5, 10],
                            opacity: [1, 0.9, 0],
                            scale: [1, 1.3, 0.7],
                          }}
                          transition={{
                            duration: 1.2,
                            repeat: Infinity,
                            repeatType: "loop",
                            delay: 0.5,
                          }}
                        />
                        <motion.span
                          className="absolute w-1 h-1 bg-yellow-200 rounded-full"
                          style={{ top: "-12px", right: "20%" }}
                          animate={{
                            y: [0, -15, -25],
                            x: [0, -8, -12],
                            opacity: [1, 0.8, 0],
                            scale: [1, 1.1, 0.9],
                          }}
                          transition={{
                            duration: 0.9,
                            repeat: Infinity,
                            repeatType: "loop",
                            delay: 0.2,
                          }}
                        />
                        <motion.span
                          className="absolute w-2 h-2 bg-yellow-300 rounded-full"
                          style={{ bottom: "-10px", left: "25%" }}
                          animate={{
                            y: [0, 20, 30],
                            x: [0, -10, -15],
                            opacity: [1, 0.7, 0],
                            scale: [1, 1.2, 0.8],
                          }}
                          transition={{
                            duration: 1.1,
                            repeat: Infinity,
                            repeatType: "loop",
                            delay: 0.4,
                          }}
                        />
                        <motion.span
                          className="absolute w-1 h-1 bg-orange-300 rounded-full"
                          style={{ bottom: "-8px", right: "35%" }}
                          animate={{
                            y: [0, 15, 25],
                            x: [0, 8, 12],
                            opacity: [1, 0.8, 0],
                            scale: [1, 1.3, 0.7],
                          }}
                          transition={{
                            duration: 0.7,
                            repeat: Infinity,
                            repeatType: "loop",
                            delay: 0.6,
                          }}
                        />
                      </>
                    )}
                    <motion.span
                      animate={{
                        rotate: mustSpin ? [0, 15, -15, 10, -10, 5, -5, 0] : 0,
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: mustSpin ? Infinity : 0,
                        repeatType: "loop",
                      }}
                      className="inline-block"
                    >
                      {canSpin
                        ? t("roulette.spinButton")
                        : t("roulette.alreadySpun")}
                    </motion.span>
                  </motion.button>
                )}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full max-w-md mx-auto p-6 bg-white rounded-lg"
              >
                <h3 className="text-xl font-bold text-[#0B322F] mb-2">
                  {t("roulette.congratulations")}{" "}
                  {discountData[prizeNumber].option}
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  {t("roulette.enterPhonePrompt")}
                </p>
                <form onSubmit={handleSubmit}>
                  <div className="mb-2">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      {t("roulette.nameLabel")}
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={userName}
                      onChange={handleNameChange}
                      placeholder={t("roulette.namePlaceholder")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0B322F] focus:border-transparent"
                      required
                    />
                  </div>
                  <div className="mb-2">
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      {t("roulette.phoneLabel")}
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={phoneNumber}
                      onChange={handlePhoneChange}
                      placeholder="+380XXXXXXXXX"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0B322F] focus:border-transparent"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-4 py-2 bg-[#0B322F] text-white rounded-md font-medium shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting
                      ? t("roulette.sending")
                      : t("roulette.getDiscount")}
                  </button>
                </form>
              </motion.div>
            )}

            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-2 p-3 bg-red-100 text-red-700 rounded-md w-full max-w-md mx-auto"
              >
                {error}
              </motion.div>
            )}
          </div>
        )}

        {!isLargeScreen && !showPhoneForm && !hasSpun && !success && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full flex justify-center mt-2 mb-2"
          >
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 25px rgba(11, 50, 47, 0.3)",
              }}
              onClick={handleSpinClick}
              disabled={mustSpin || !canSpin}
              className={`relative px-6 py-3 bg-[#0B322F] text-white rounded-md font-medium shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed text-md`}
            >
              {mustSpin && (
                <>
                  <motion.span
                    className="absolute w-2 h-2 bg-yellow-300 rounded-full"
                    style={{ top: "-10px", left: "20%" }}
                    animate={{
                      y: [0, -20, -30],
                      x: [0, 10, 15],
                      opacity: [1, 0.8, 0],
                      scale: [1, 1.2, 0.8],
                    }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      repeatType: "loop",
                      delay: 0.1,
                    }}
                  />
                  <motion.span
                    className="absolute w-3 h-3 bg-yellow-400 rounded-full"
                    style={{ top: "-5px", left: "40%" }}
                    animate={{
                      y: [0, -25, -40],
                      x: [0, -15, -20],
                      opacity: [1, 0.7, 0],
                      scale: [1, 1.5, 0.5],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      repeatType: "loop",
                      delay: 0.3,
                    }}
                  />
                  <motion.span
                    className="absolute w-2 h-2 bg-orange-400 rounded-full"
                    style={{ top: "-8px", right: "30%" }}
                    animate={{
                      y: [0, -30, -50],
                      x: [0, 5, 10],
                      opacity: [1, 0.9, 0],
                      scale: [1, 1.3, 0.7],
                    }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      repeatType: "loop",
                      delay: 0.5,
                    }}
                  />
                  <motion.span
                    className="absolute w-1 h-1 bg-yellow-200 rounded-full"
                    style={{ top: "-12px", right: "20%" }}
                    animate={{
                      y: [0, -15, -25],
                      x: [0, -8, -12],
                      opacity: [1, 0.8, 0],
                      scale: [1, 1.1, 0.9],
                    }}
                    transition={{
                      duration: 0.9,
                      repeat: Infinity,
                      repeatType: "loop",
                      delay: 0.2,
                    }}
                  />
                  <motion.span
                    className="absolute w-2 h-2 bg-yellow-300 rounded-full"
                    style={{ bottom: "-10px", left: "25%" }}
                    animate={{
                      y: [0, 20, 30],
                      x: [0, -10, -15],
                      opacity: [1, 0.7, 0],
                      scale: [1, 1.2, 0.8],
                    }}
                    transition={{
                      duration: 1.1,
                      repeat: Infinity,
                      repeatType: "loop",
                      delay: 0.4,
                    }}
                  />
                  <motion.span
                    className="absolute w-1 h-1 bg-orange-300 rounded-full"
                    style={{ bottom: "-8px", right: "35%" }}
                    animate={{
                      y: [0, 15, 25],
                      x: [0, 8, 12],
                      opacity: [1, 0.8, 0],
                      scale: [1, 1.3, 0.7],
                    }}
                    transition={{
                      duration: 0.7,
                      repeat: Infinity,
                      repeatType: "loop",
                      delay: 0.6,
                    }}
                  />
                </>
              )}
              <motion.span
                animate={{
                  rotate: mustSpin ? [0, 15, -15, 10, -10, 5, -5, 0] : 0,
                }}
                transition={{
                  duration: 1.5,
                  repeat: mustSpin ? Infinity : 0,
                  repeatType: "loop",
                }}
                className="inline-block"
              >
                {canSpin ? t("roulette.spinButton") : t("roulette.alreadySpun")}
              </motion.span>
            </motion.button>
          </motion.div>
        )}

        {success && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full max-w-xl mx-auto p-6 bg-white rounded-lg text-center"
          >
            <div className="flex flex-col items-center justify-center py-8">
              <ChatText size={80} className="text-green-600 mb-4" />
              <h3 className="text-xl font-bold text-[#0B322F] mb-4">
                {t("roulette.congratulations")}{" "}
                {discountData[prizeNumber].option}
              </h3>
              <p className="text-md text-gray-700 mb-4">
                {t("roulette.discountSmsSuccess")}
              </p>
            </div>
          </motion.div>
        )}
      </div>

      {!success && (
        <p className="mt-2 text-xs text-gray-500 text-center w-full max-w-md">
          <button
            onClick={() => setShowTerms(true)}
            className="text-xs text-gray-500 hover:text-gray-700 underline focus:outline-none"
          >
            {t("roulette.viewFullTerms")}
          </button>
        </p>
      )}

      {/* Modal window with discount terms */}
      <AnimatePresence>
        {showTerms && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowTerms(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-medium ">
                  {t("discountTerms.title")}
                </h3>
                <button
                  onClick={() => setShowTerms(false)}
                  className="text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  ✕
                </button>
              </div>
              <DiscountTerms />
              <div className="mt-2 flex justify-center">
                <button
                  onClick={() => setShowTerms(false)}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md transition-colors"
                >
                  {t("common.close")}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Roulette;
