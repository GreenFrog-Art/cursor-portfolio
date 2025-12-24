'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useArtworks } from '../hooks/useArtworks';
import { normalizeImagePath, isUploadedImage } from '../utils/imageUtils';

interface CategoryGalleryProps {
  category: string;
  isOpen: boolean;
  onClose: () => void;
}

const categoryNames: Record<string, string> = {
  'Graphic Design': '그래픽 디자인',
  'Illustration': '일러스트레이션',
  'Fine Art': '순수 미술',
};

// 각 카테고리별 설명 문구
const categoryDescriptions: Record<string, string> = {
  'Graphic Design': '기능과 미학의 조화를 추구하는 시각 커뮤니케이션. 타이포그래피, 레이아웃, 색채를 통해 메시지를 전달하고 브랜드의 정체성을 표현합니다.',
  'Illustration': '상상력과 창의성을 시각화하는 예술적 표현. 다양한 스타일과 기법으로 이야기를 전달하고 감성을 시각적으로 구현합니다.',
  'Fine Art': '순수한 예술적 가치와 감성을 담은 작품. 개인의 내면 세계와 철학을 표현하며 관람자와의 깊은 소통을 추구합니다.',
};

// 각 카테고리별 테마 설정
const categoryThemes: Record<string, {
  bgGradient: string;
  textureGradient: string;
  accentColor: string;
  textGradient: string;
  pattern: string;
}> = {
  'Graphic Design': {
    bgGradient: 'from-cyan-900/20 via-[#0a0a0a] via-blue-900/15 to-[#0a0a0a]',
    textureGradient: 'radial-gradient(circle_at_20%_30%,rgba(59,130,246,0.1)_0%,transparent_50%),radial-gradient(circle_at_80%_70%,rgba(34,211,238,0.08)_0%,transparent_50%)',
    accentColor: '#3b82f6',
    textGradient: 'linear-gradient(135deg, #60a5fa 0%, #34d399 50%, #60a5fa 100%)',
    pattern: 'linear-gradient(45deg,transparent_30%,rgba(59,130,246,0.03)_50%,transparent_70%)',
  },
  'Illustration': {
    bgGradient: 'from-purple-900/25 via-[#0a0a0a] via-pink-900/20 to-[#0a0a0a]',
    textureGradient: 'radial-gradient(circle_at_40%_50%,rgba(168,85,247,0.12)_0%,transparent_50%),radial-gradient(circle_at_60%_50%,rgba(236,72,153,0.1)_0%,transparent_50%)',
    accentColor: '#a855f7',
    textGradient: 'linear-gradient(135deg, #c084fc 0%, #f472b6 50%, #c084fc 100%)',
    pattern: 'linear-gradient(135deg,transparent_30%,rgba(168,85,247,0.04)_50%,transparent_70%)',
  },
  'Fine Art': {
    bgGradient: 'from-amber-900/25 via-[#0a0a0a] via-rose-900/15 to-[#0a0a0a]',
    textureGradient: 'radial-gradient(circle_at_30%_40%,rgba(212,197,180,0.12)_0%,transparent_50%),radial-gradient(circle_at_70%_60%,rgba(139,115,85,0.08)_0%,transparent_50%)',
    accentColor: '#8b7355',
    textGradient: 'linear-gradient(135deg, #d4c5b9 0%, #e8e5e0 50%, #d4c5b9 100%)',
    pattern: 'linear-gradient(45deg,transparent_30%,rgba(139,115,85,0.03)_50%,transparent_70%)',
  },
};

export default function CategoryGallery({
  category,
  isOpen,
  onClose,
}: CategoryGalleryProps) {
  const { artworks, isLoading } = useArtworks();
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

  // 카테고리로 필터링하고, 실제 업로드된 이미지이며 이미지 로드에 성공한 작품만 표시
  const filteredArtworks = artworks.filter(
    (artwork) =>
      artwork.category === category &&
      isUploadedImage(artwork.image) &&
      !imageErrors.has(artwork.id)
  );

  // ESC 키로 닫기
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // 모달이 열릴 때 body 스크롤 방지
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (isLoading) {
    return null;
  }

  const theme = categoryThemes[category] || categoryThemes['Fine Art'];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 배경 오버레이 */}
          <motion.div
            className="fixed inset-0 z-[200] bg-black/90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          >
            {/* 카테고리별 배경 그라데이션 */}
            <div className={`absolute inset-0 h-full w-full bg-gradient-to-br ${theme.bgGradient}`} />
            {/* 카테고리별 텍스처 오버레이 */}
            <div 
              className="absolute inset-0"
              style={{
                background: theme.textureGradient,
              }}
            />
            {/* 카테고리별 패턴 효과 */}
            <div 
              className="absolute inset-0"
              style={{
                background: theme.pattern,
              }}
            />
          </motion.div>

          {/* 갤러리 모달 */}
          <motion.div
            className="fixed inset-0 z-[201] overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
          >
            <div className="container mx-auto px-4 py-8 md:px-8 md:py-12">
              {/* 헤더 */}
              <div className="mb-8 flex items-center justify-between">
                <motion.h2
                  className="text-4xl font-bold md:text-5xl lg:text-6xl text-white"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {categoryNames[category] || category}
                </motion.h2>
                <motion.button
                  onClick={onClose}
                  className="rounded-md p-2 text-white transition-all hover:bg-white/10 hover:scale-110"
                  aria-label="닫기"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="h-8 w-8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </motion.button>
              </div>

              {/* 카테고리 설명 */}
              <motion.div
                className="mb-8 max-w-3xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <p className="text-gray-300 text-lg md:text-xl leading-relaxed">
                  {categoryDescriptions[category] || categoryDescriptions['Fine Art']}
                </p>
              </motion.div>

              {/* 작품 개수 */}
              <motion.p
                className="mb-12 text-gray-400 text-lg md:text-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                총 {filteredArtworks.length}개의 작품
              </motion.p>

              {/* 작품 그리드 */}
              {filteredArtworks.length === 0 ? (
                <motion.div
                  className="py-20 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <p className="text-xl text-gray-400">
                    이 카테고리에 작품이 없습니다.
                  </p>
                </motion.div>
              ) : (
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {filteredArtworks.map((artwork, index) => (
                    <motion.div
                      key={artwork.id}
                      className="group relative overflow-hidden rounded-lg"
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      onMouseEnter={() => setHoveredId(artwork.id)}
                      onMouseLeave={() => setHoveredId(null)}
                      data-hover
                    >
                      <motion.div
                        className="relative w-full overflow-hidden rounded-lg bg-gray-800 shadow-[0_4px_20px_rgba(0,0,0,0.3)]"
                        style={{
                          aspectRatio: `${artwork.width} / ${artwork.height}`,
                          border: `1px solid ${theme.accentColor}20`,
                        }}
                        whileHover={{ 
                          scale: 1.03,
                          boxShadow: `0 8px 30px ${theme.accentColor}40`,
                        }}
                        transition={{ duration: 0.4, ease: 'easeOut' }}
                      >
                        <motion.div
                          animate={{
                            scale: hoveredId === artwork.id ? 1.05 : 1,
                            filter:
                              hoveredId === artwork.id
                                ? 'brightness(1.15) saturate(1.2)'
                                : 'brightness(1) saturate(1)',
                          }}
                          transition={{ duration: 0.4, ease: 'easeOut' }}
                          className="h-full w-full"
                        >
                          {/* 이미지 표시 */}
                          {imageErrors.has(artwork.id) ? (
                            <div 
                              className="flex h-full w-full items-center justify-center"
                              style={{
                                background: `linear-gradient(135deg, ${theme.accentColor}30, ${theme.accentColor}10)`,
                              }}
                            >
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
                              style={{ filter: 'sepia(0.1)' }}
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
                          className="absolute inset-0 flex flex-col items-center justify-center bg-black/75 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100"
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 1 }}
                          style={{
                            background: `linear-gradient(to bottom, transparent, ${theme.accentColor}20)`,
                          }}
                        >
                          <h3 className="text-2xl font-bold text-white">
                            {artwork.title}
                          </h3>
                          <p className="mt-2 text-sm text-gray-300">
                            {artwork.width} × {artwork.height}px
                          </p>
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

