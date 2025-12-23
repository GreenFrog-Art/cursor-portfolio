'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import CategoryGallery from './CategoryGallery';

export default function IntroSection() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative flex h-screen w-screen flex-shrink-0 items-center justify-center overflow-hidden bg-black">
      {/* 배경 영상 또는 그라데이션 */}
      <div className="absolute inset-0 z-0">
        <div className="h-full w-full bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20" />
        {/* 실제 비디오를 사용하려면 아래 주석을 해제하고 비디오 파일을 추가하세요 */}
        {/* <video
          autoPlay
          loop
          muted
          className="h-full w-full object-cover opacity-30"
        >
          <source src="/background-video.mp4" type="video/mp4" />
        </video> */}
      </div>

      {/* 슬로건 텍스트 */}
      <motion.div
        className="relative z-10 text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={isLoaded ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      >
        <motion.h1
          className="font-serif text-7xl font-bold leading-tight text-white md:text-8xl lg:text-[10rem]"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.5, delay: 0.3 }}
        >
          ART
          <br />
          <span className="text-6xl md:text-7xl lg:text-9xl">BEYOND</span>
          <br />
          <span className="text-5xl md:text-6xl lg:text-8xl">BOUNDARIES</span>
        </motion.h1>
        
        <motion.p
          className="mt-8 font-sans text-xl text-gray-300 md:text-2xl"
          initial={{ opacity: 0 }}
          animate={isLoaded ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <button
            onClick={() => setSelectedCategory('Graphic Design')}
            className="transition-colors hover:text-white underline decoration-2 underline-offset-4"
          >
            그래픽 디자인
          </button>
          {' · '}
          <button
            onClick={() => setSelectedCategory('Illustration')}
            className="transition-colors hover:text-white underline decoration-2 underline-offset-4"
          >
            일러스트레이션
          </button>
          {' · '}
          <button
            onClick={() => setSelectedCategory('Fine Art')}
            className="transition-colors hover:text-white underline decoration-2 underline-offset-4"
          >
            순수 미술
          </button>
        </motion.p>
      </motion.div>

      {/* 스크롤 인디케이터 */}
      <motion.div
        className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={isLoaded ? { opacity: 1 } : {}}
        transition={{ delay: 1.2 }}
      >
        <motion.div
          className="h-12 w-0.5 bg-white"
          animate={{ height: [24, 40, 24] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </motion.div>

      {/* 카테고리 갤러리 */}
      {selectedCategory && (
        <CategoryGallery
          category={selectedCategory}
          isOpen={!!selectedCategory}
          onClose={() => setSelectedCategory(null)}
        />
      )}
    </section>
  );
}

