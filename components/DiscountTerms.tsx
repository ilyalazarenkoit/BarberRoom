"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CaretDown, Info, CheckCircle } from "phosphor-react";
import { useTranslation } from "react-i18next";

interface DiscountTermsProps {
  className?: string;
}

const DiscountTerms: React.FC<DiscountTermsProps> = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`w-full max-w-md mx-auto ${className}`}>
      <motion.button
        onClick={toggleOpen}
        className="w-full flex items-center justify-between px-4 py-3 bg-white rounded-lg shadow-sm border border-gray-200 text-[#0B322F] hover:bg-gray-50 transition-colors"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <div className="flex items-center">
          <Info size={18} weight="fill" className="text-[#0B322F] mr-2" />
          <span className="font-medium">
            {t("discountTerms.title", "Discount Terms & Conditions")}
          </span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <CaretDown size={20} weight="bold" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-5 mt-2 bg-white rounded-lg shadow-md border border-gray-200">
              <div className="mb-5">
                <h4 className="font-semibold text-[#0B322F] mb-3 flex items-center">
                  <span className="w-1 h-5 bg-[#0B322F] rounded mr-2"></span>
                  {t("discountTerms.rulesTitle", "Discount Rules")}
                </h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  {[
                    t(
                      "discountTerms.rules.firstHaircut",
                      "Discount applies only to your first haircut at our barbershop"
                    ),
                    t(
                      "discountTerms.rules.onePerPhone",
                      "One discount per phone number"
                    ),
                    t(
                      "discountTerms.rules.validity",
                      "Discount is valid for 30 days from receipt"
                    ),
                    t(
                      "discountTerms.rules.showSms",
                      "To use the discount, show the SMS message with the discount code"
                    ),
                    t(
                      "discountTerms.rules.notCombined",
                      "Discount cannot be combined with other promotions"
                    ),
                    t(
                      "discountTerms.rules.notForProducts",
                      "Discount does not apply to hair and beard care products"
                    ),
                    t(
                      "discountTerms.rules.rightToChange",
                      "Barbershop administration reserves the right to change promotion terms"
                    ),
                  ].map((rule, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle
                        size={16}
                        weight="fill"
                        className="text-[#0B322F] mt-0.5 mr-2 flex-shrink-0"
                      />
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-4">
                <h4 className="font-semibold text-[#0B322F] mb-3 flex items-center">
                  <span className="w-1 h-5 bg-[#0B322F] rounded mr-2"></span>
                  {t("discountTerms.howToUseTitle", "How to Use Your Discount")}
                </h4>
                <ol className="space-y-2 text-sm text-gray-700">
                  {[
                    t(
                      "discountTerms.howToUse.spinWheel",
                      "Spin the wheel and get your discount"
                    ),
                    t(
                      "discountTerms.howToUse.enterPhone",
                      "Enter your phone number in the form"
                    ),
                    t(
                      "discountTerms.howToUse.getSms",
                      "Receive an SMS with the discount code"
                    ),
                    t(
                      "discountTerms.howToUse.mentionDiscount",
                      "Mention your discount when booking an appointment"
                    ),
                    t(
                      "discountTerms.howToUse.showCode",
                      "Show the SMS with the discount code to the administrator before payment"
                    ),
                  ].map((step, index) => (
                    <li key={index} className="flex items-start">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#0B322F] text-white flex items-center justify-center mr-2 mt-0.5 text-xs font-medium">
                        {index + 1}
                      </div>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="mt-5 pt-4 border-t border-gray-100">
                <p className="text-xs text-gray-500 flex items-start">
                  <Info size={14} className="mr-1 mt-0.5 flex-shrink-0" />
                  <span>
                    {t(
                      "discountTerms.questions",
                      "* For any questions about the promotion, please contact the phone number listed on the website."
                    )}
                  </span>
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DiscountTerms;
