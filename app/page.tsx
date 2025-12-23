'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import CustomCursor from './components/CustomCursor';
import IntroSection from './components/IntroSection';
import WorkGallery from './components/WorkGallery';
import AboutSection from './components/AboutSection';
import AdminPanel from './components/AdminPanel';

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoaded && (
        <motion.div
          key="main-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          <CustomCursor />
          <AdminPanel />
          <div className="flex h-screen w-full overflow-x-auto overflow-y-hidden bg-black scrollbar-hide">
            <motion.div
              className="flex h-full"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
            >
              <IntroSection />
              <WorkGallery />
              <AboutSection />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
