'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useArtworks } from '../hooks/useArtworks';
import { normalizeImagePath, isUploadedImage } from '../utils/imageUtils';
import CategoryGallery from './CategoryGallery';

export default function WorkGallery() {
  const { artworks, isLoading } = useArtworks();
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  if (isLoading) {
    return (
      <section className="relative flex h-screen w-screen flex-shrink-0 items-center justify-center bg-gradient-to-b from-[#0a0a0a] via-[#1a1a1a] to-[#0a0a0a]">
        <div className="text-center text-[#e8e5e0]">
          <p className="font-sans text-lg">로딩 중...</p>
        </div>
      </section>
    );
  }

  // 실제로 업로드된 이미지이고, 이미지 로드에 성공한 작품만 필터링
  const filteredArtworks = artworks.filter(
    (artwork) =>
      isUploadedImage(artwork.image) && !imageErrors.has(artwork.id)
  );

  return (
    <section className="relative flex h-screen w-screen flex-shrink-0 items-center justify-center bg-gradient-to-b from-[#0a0a0a] via-[#1a0f0a] to-[#0a0a0a] px-8 py-20">
      <div className="container mx-auto">
        <motion.h2
          className="mb-16 font-serif text-5xl font-black text-gradient-vintage text-3d-strong md:text-6xl lg:text-7xl tracking-wider"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{
            filter: 'sepia(0.15) saturate(1.1)',
            transform: 'perspective(1000px) rotateX(2deg)',
            transformStyle: 'preserve-3d',
          }}
        >
          WORK GALLERY
        </motion.h2>

        {/* 비정형 그리드 레이아웃 */}
        {filteredArtworks.length === 0 ? (
          <div className="py-20 text-center">
            <p className="font-sans text-xl text-[#d4c5b9]">
              작품이 없습니다. 관리자 패널에서 작품을 추가해주세요.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredArtworks.map((artwork, index) => (
            <motion.div
              key={artwork.id}
              className="group relative overflow-hidden"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredId(artwork.id)}
              onMouseLeave={() => setHoveredId(null)}
              data-hover
            >
              <motion.div
                className="relative w-full overflow-hidden bg-[#1a0f0a] shadow-[0_8px_30px_rgba(139,115,85,0.4),inset_0_0_0_1px_rgba(212,197,180,0.1)]"
                style={{
                  aspectRatio: `${artwork.width} / ${artwork.height}`,
                }}
                whileHover={{ scale: 1.02, rotate: hoveredId === artwork.id ? 0.5 : 0 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              >
                <motion.div
                  animate={{
                    scale: hoveredId === artwork.id ? 1.05 : 1,
                    filter: hoveredId === artwork.id
                      ? 'brightness(1.15) saturate(1.2) contrast(1.1) sepia(0.25) hue-rotate(-5deg)'
                      : 'brightness(0.95) saturate(0.9) contrast(1.05) sepia(0.2) hue-rotate(-8deg)',
                  }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className="h-full w-full"
                >
                  {/* 이미지 표시 */}
                  {imageErrors.has(artwork.id) ? (
                    // 이미지 로드 실패 시 fallback
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-purple-500/30 to-blue-500/30">
                      <div className="text-center text-white/50">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="mx-auto h-12 w-12"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008H12.75V8.25Zm0 2.25h.008v.008H12.75v-.008Z"
                          />
                        </svg>
                        <p className="mt-2 text-xs">이미지를 불러올 수 없습니다</p>
                      </div>
                    </div>
                  ) : (
                    <img
                      src={normalizeImagePath(artwork.image)}
                      alt={artwork.title}
                      className="h-full w-full object-cover"
                      onError={() => {
                        setImageErrors((prev) => new Set(prev).add(artwork.id));
                      }}
                      onLoad={() => {
                        setImageErrors((prev) => {
                          const newSet = new Set(prev);
                          newSet.delete(artwork.id);
                          return newSet;
                        });
                      }}
                    />
                  )}
                </motion.div>

                {/* 오버레이 정보 */}
                <motion.div
                  className="absolute inset-0 flex flex-col items-center justify-center bg-[#0a0a0a]/85 backdrop-blur-sm opacity-0 transition-opacity group-hover:opacity-100 border border-[#d4c5b9]/20"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                >
                  <h3 className="font-serif text-2xl font-bold text-[#e8e5e0] [text-shadow:2px_2px_8px_rgba(0,0,0,0.8)]">
                    {artwork.title}
                  </h3>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedCategory(artwork.category);
                    }}
                    className="mt-2 font-sans text-sm text-[#d4c5b9] transition-all hover:text-[#e8e5e0] hover:scale-105 underline decoration-[#8b7355] decoration-2 underline-offset-4 [text-shadow:1px_1px_4px_rgba(0,0,0,0.5)]"
                  >
                    {artwork.category}
                  </button>
                </motion.div>
              </motion.div>
            </motion.div>
            ))}
          </div>
        )}
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

