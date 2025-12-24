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
    <section className="relative flex h-screen w-screen flex-shrink-0 items-center justify-center overflow-hidden bg-[#0a0a0a] vintage-vignette">
      {/* 배경 영상 또는 그라데이션 - 강한 빈티지 톤 */}
      <div className="absolute inset-0 z-0">
        <div className="h-full w-full bg-gradient-to-br from-amber-900/25 via-[#0a0a0a] via-rose-900/15 to-[#0a0a0a]" />
        {/* 강한 빈티지 텍스처 오버레이 */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(212,197,180,0.12)_0%,transparent_50%),radial-gradient(circle_at_70%_60%,rgba(139,115,85,0.08)_0%,transparent_50%)]" />
        {/* 빈티지 빈팅 효과 */}
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_30%,rgba(139,115,85,0.03)_50%,transparent_70%)]" />
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
          className="font-serif text-7xl font-black leading-tight md:text-8xl lg:text-[10rem] text-gradient-vintage text-3d-strong"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.5, delay: 0.3 }}
          style={{
            filter: 'sepia(0.15) saturate(1.1)',
            transform: 'perspective(1000px) rotateX(3deg)',
            transformStyle: 'preserve-3d',
          }}
        >
          <motion.span 
            className="block text-7xl md:text-8xl lg:text-[10rem] cursor-pointer transition-all duration-300 ease-out hover:brightness-110 hover:drop-shadow-[0_0_20px_rgba(212,197,180,0.5)]"
            whileHover={{
              scale: 1.02,
            }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            ART:
          </motion.span>
          <motion.span 
            className="block text-6xl md:text-7xl lg:text-9xl text-3d-strong cursor-pointer transition-all duration-300 ease-out hover:brightness-110 hover:drop-shadow-[0_0_25px_rgba(212,197,180,0.6)]"
            style={{
              background: 'linear-gradient(135deg, #d4c5b9 0%, #e8e5e0 50%, #d4c5b9 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
            whileHover={{
              scale: 1.02,
            }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            The Universal Language
          </motion.span>
        </motion.h1>
        
        <motion.div
          className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-sans text-xl text-[#d4c5b9] md:text-2xl font-medium tracking-wide"
          initial={{ opacity: 0 }}
          animate={isLoaded ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.8 }}
          style={{
            filter: 'sepia(0.2)',
          }}
        >
          <motion.button
            onClick={() => setSelectedCategory('Graphic Design')}
            className="font-sans text-xl md:text-2xl text-[#d4c5b9] px-4 py-2 rounded-md border border-[#8b7355]/40 bg-[#8b7355]/10 backdrop-blur-sm transition-all [text-shadow:1px_1px_4px_rgba(0,0,0,0.5)] shadow-[0_2px_8px_rgba(139,115,85,0.2)]"
            style={{ cursor: 'pointer' }}
            whileHover={{ 
              scale: 1.1,
              color: '#e8e5e0',
              backgroundColor: 'rgba(139, 115, 85, 0.25)',
              borderColor: 'rgba(139, 115, 85, 0.6)',
              textShadow: '2px 2px 8px rgba(139, 115, 85, 0.8), 0 0 15px rgba(212, 197, 180, 0.5)',
              boxShadow: '0 4px 16px rgba(139, 115, 85, 0.4)',
            }}
            whileTap={{ scale: 0.95 }}
          >
            그래픽 디자인
          </motion.button>
          <span className="text-[#8b7355]">·</span>
          <motion.button
            onClick={() => setSelectedCategory('Illustration')}
            className="font-sans text-xl md:text-2xl text-[#d4c5b9] px-4 py-2 rounded-md border border-[#8b7355]/40 bg-[#8b7355]/10 backdrop-blur-sm transition-all [text-shadow:1px_1px_4px_rgba(0,0,0,0.5)] shadow-[0_2px_8px_rgba(139,115,85,0.2)]"
            style={{ cursor: 'pointer' }}
            whileHover={{ 
              scale: 1.1,
              color: '#e8e5e0',
              backgroundColor: 'rgba(139, 115, 85, 0.25)',
              borderColor: 'rgba(139, 115, 85, 0.6)',
              textShadow: '2px 2px 8px rgba(139, 115, 85, 0.8), 0 0 15px rgba(212, 197, 180, 0.5)',
              boxShadow: '0 4px 16px rgba(139, 115, 85, 0.4)',
            }}
            whileTap={{ scale: 0.95 }}
          >
            일러스트레이션
          </motion.button>
          <span className="text-[#8b7355]">·</span>
          <motion.button
            onClick={() => setSelectedCategory('Fine Art')}
            className="font-sans text-xl md:text-2xl text-[#d4c5b9] px-4 py-2 rounded-md border border-[#8b7355]/40 bg-[#8b7355]/10 backdrop-blur-sm transition-all [text-shadow:1px_1px_4px_rgba(0,0,0,0.5)] shadow-[0_2px_8px_rgba(139,115,85,0.2)]"
            style={{ cursor: 'pointer' }}
            whileHover={{ 
              scale: 1.1,
              color: '#e8e5e0',
              backgroundColor: 'rgba(139, 115, 85, 0.25)',
              borderColor: 'rgba(139, 115, 85, 0.6)',
              textShadow: '2px 2px 8px rgba(139, 115, 85, 0.8), 0 0 15px rgba(212, 197, 180, 0.5)',
              boxShadow: '0 4px 16px rgba(139, 115, 85, 0.4)',
            }}
            whileTap={{ scale: 0.95 }}
          >
            순수 미술
          </motion.button>
        </motion.div>
      </motion.div>

      {/* 스크롤 인디케이터 */}
      <motion.div
        className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={isLoaded ? { opacity: 1 } : {}}
        transition={{ delay: 1.2 }}
      >
        <motion.div
          className="h-12 w-0.5 bg-[#8b7355] shadow-[0_0_10px_rgba(139,115,85,0.5)]"
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

