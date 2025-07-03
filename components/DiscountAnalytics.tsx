"use client";

import { useEffect } from "react";

interface DiscountAnalyticsProps {
  event: "view" | "spin" | "submit" | "success";
  discountValue?: number;
  additionalData?: Record<string, unknown>;
}

const DiscountAnalytics: React.FC<DiscountAnalyticsProps> = ({
  event,
  discountValue,
  additionalData,
}) => {
  useEffect(() => {
    const sendAnalytics = async () => {
      try {
        const userAgent = navigator.userAgent;
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        const language = navigator.language;
        const timestamp = new Date().toISOString();

        const referrer = document.referrer || "direct";

        const analyticsData = {
          event,
          timestamp,
          discountValue,
          userAgent,
          screenSize: {
            width: screenWidth,
            height: screenHeight,
          },
          language,
          referrer,
          path: window.location.pathname,
          ...additionalData,
        };

        if (process.env.NODE_ENV === "development") {
        } else {
          const blob = new Blob([JSON.stringify(analyticsData)], {
            type: "application/json",
          });
          navigator.sendBeacon("/api/analytics/discount", blob);
        }
      } catch (error) {
        console.error("Analytics error:", error);
      }
    };

    sendAnalytics();
  }, [event, discountValue, additionalData]);

  return null;
};

export default DiscountAnalytics;
