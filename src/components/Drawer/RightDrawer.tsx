"use client";

import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

interface Props {
  children: React.ReactNode;
  show: boolean;
  zIndex?: number;
  closeFn: () => void;
}

const DRAWER_WIDTH = 500;

export default function Drawer({ children, show, zIndex, closeFn }: Props) {
  const [isVisible, setIsVisible] = useState(show);

  useEffect(() => {
    if (show) {
      setIsVisible(true);
    }
  }, [show]);

  const handleAnimationComplete = () => {
    if (!show) {
      setIsVisible(false);
    }
  };

  if (!zIndex) {
    zIndex = 9999;
  }

  return (
    <>
      {isVisible && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: show ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeFn}
            className="bg-black/70 fixed top-0 left-0 right-0 bottom-0 z-[999]"
          ></motion.div>
          <motion.div
            initial={{ right: -DRAWER_WIDTH }}
            animate={{ right: show ? 0 : -DRAWER_WIDTH }}
            transition={{ duration: 0.3 }}
            style={{ zIndex, width: DRAWER_WIDTH }}
            className="fixed min-h-screen top-0 bg-white shadow-lg max-w-screen"
            onAnimationComplete={handleAnimationComplete}
          >
            <div className="p-4">{children}</div>
          </motion.div>
        </>
      )}
    </>
  );
}
