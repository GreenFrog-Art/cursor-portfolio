'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import CategoryGallery from './CategoryGallery';

export default function AboutSection() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  return (
    <section className="relative flex min-h-screen w-screen flex-shrink-0 items-center justify-center bg-[#0a0a0a] px-8 py-20">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="mb-12 font-serif text-5xl font-black text-gradient-vintage text-3d-strong md:text-6xl lg:text-7xl tracking-wider"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              filter: 'sepia(0.15) saturate(1.1)',
              transform: 'perspective(1000px) rotateX(2deg)',
              transformStyle: 'preserve-3d',
            }}
          >
            ABOUT
          </motion.h2>

          <motion.div
            className="space-y-8 font-sans text-lg leading-relaxed text-[#d4c5b9] md:text-xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{
              filter: 'sepia(0.2)',
            }}
          >
            <p>
              예술은 경계를 넘어서는 언어입니다.{' '}
              <motion.button
                onClick={() => setSelectedCategory('Graphic Design')}
                className="font-sans font-semibold text-[#e8e5e0] px-3 py-1 rounded-md border border-[#8b7355]/40 bg-[#8b7355]/10 backdrop-blur-sm transition-all [text-shadow:1px_1px_4px_rgba(0,0,0,0.5)] shadow-[0_2px_8px_rgba(139,115,85,0.2)]"
                style={{ cursor: 'pointer' }}
                whileHover={{ 
                  scale: 1.15,
                  color: '#d4c5b9',
                  backgroundColor: 'rgba(139, 115, 85, 0.25)',
                  borderColor: 'rgba(139, 115, 85, 0.6)',
                  textShadow: '2px 2px 8px rgba(139, 115, 85, 0.8), 0 0 15px rgba(212, 197, 180, 0.5)',
                  boxShadow: '0 4px 16px rgba(139, 115, 85, 0.4)',
                }}
                whileTap={{ scale: 0.9 }}
              >
                그래픽 디자인
              </motion.button>
              <span className="mx-2 text-[#8b7355]">,</span>
              <motion.button
                onClick={() => setSelectedCategory('Illustration')}
                className="font-sans font-semibold text-[#e8e5e0] px-3 py-1 rounded-md border border-[#8b7355]/40 bg-[#8b7355]/10 backdrop-blur-sm transition-all [text-shadow:1px_1px_4px_rgba(0,0,0,0.5)] shadow-[0_2px_8px_rgba(139,115,85,0.2)]"
                style={{ cursor: 'pointer' }}
                whileHover={{ 
                  scale: 1.15,
                  color: '#d4c5b9',
                  backgroundColor: 'rgba(139, 115, 85, 0.25)',
                  borderColor: 'rgba(139, 115, 85, 0.6)',
                  textShadow: '2px 2px 8px rgba(139, 115, 85, 0.8), 0 0 15px rgba(212, 197, 180, 0.5)',
                  boxShadow: '0 4px 16px rgba(139, 115, 85, 0.4)',
                }}
                whileTap={{ scale: 0.9 }}
              >
                일러스트레이션
              </motion.button>
              <span className="mx-2 text-[#8b7355]">,</span>
              <motion.button
                onClick={() => setSelectedCategory('Fine Art')}
                className="font-sans font-semibold text-[#e8e5e0] px-3 py-1 rounded-md border border-[#8b7355]/40 bg-[#8b7355]/10 backdrop-blur-sm transition-all [text-shadow:1px_1px_4px_rgba(0,0,0,0.5)] shadow-[0_2px_8px_rgba(139,115,85,0.2)]"
                style={{ cursor: 'pointer' }}
                whileHover={{ 
                  scale: 1.15,
                  color: '#d4c5b9',
                  backgroundColor: 'rgba(139, 115, 85, 0.25)',
                  borderColor: 'rgba(139, 115, 85, 0.6)',
                  textShadow: '2px 2px 8px rgba(139, 115, 85, 0.8), 0 0 15px rgba(212, 197, 180, 0.5)',
                  boxShadow: '0 4px 16px rgba(139, 115, 85, 0.4)',
                }}
                whileTap={{ scale: 0.9 }}
              >
                순수 미술
              </motion.button>
              의 경계를 자유롭게 넘나들며, 각 매체의 고유한 특성을 탐구하고
              융합합니다.
            </p>

            <p>
              디지털과 아날로그의 만남, 추상과 구상의 대화, 색채와 형태의
              조화를 통해 새로운 시각적 경험을 만들어냅니다. 작품 하나하나가
              이야기를 담고 있으며, 관람자와의 대화를 기다립니다.
            </p>

            <p>
              미래를 향한 창의적 실험과 과거로부터의 영감을 결합하여, 독특하고
              감동적인 작품 세계를 구축하고 있습니다.
            </p>
          </motion.div>

          <motion.div
            className="mt-16 flex flex-wrap gap-6 font-sans text-sm text-[#d4c5b9]"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div>
              <span className="font-semibold text-[#e8e5e0] [text-shadow:1px_1px_4px_rgba(0,0,0,0.5)]">Contact:</span>{' '}
              <a
                href="mailto:artist@example.com"
                className="hover:text-[#e8e5e0] transition-all hover:scale-105 underline decoration-[#8b7355] decoration-1 underline-offset-2 [text-shadow:1px_1px_4px_rgba(0,0,0,0.5)]"
              >
                artist@example.com
              </a>
            </div>
            <div>
              <span className="font-semibold text-[#e8e5e0] [text-shadow:1px_1px_4px_rgba(0,0,0,0.5)]">Location:</span> Seoul,
              Korea
            </div>
          </motion.div>
        </motion.div>
      </div>

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

