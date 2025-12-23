'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useArtworks } from '../hooks/useArtworks';
import { normalizeImagePath } from '../utils/imageUtils';

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

export default function CategoryGallery({
  category,
  isOpen,
  onClose,
}: CategoryGalleryProps) {
  const { artworks, isLoading } = useArtworks();
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

  const filteredArtworks = artworks.filter(
    (artwork) => artwork.category === category
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
          />

          {/* 갤러리 모달 */}
          <motion.div
            className="fixed inset-0 z-[201] overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="container mx-auto px-4 py-8 md:px-8 md:py-12">
              {/* 헤더 */}
              <div className="mb-8 flex items-center justify-between">
                <motion.h2
                  className="font-serif text-4xl font-bold text-white md:text-5xl lg:text-6xl"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {categoryNames[category] || category}
                </motion.h2>
                <button
                  onClick={onClose}
                  className="rounded-md p-2 text-white transition-colors hover:bg-white/10"
                  aria-label="닫기"
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
                </button>
              </div>

              {/* 작품 개수 */}
              <motion.p
                className="mb-12 font-sans text-gray-400"
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
                  <p className="font-sans text-xl text-gray-400">
                    이 카테고리에 작품이 없습니다.
                  </p>
                </motion.div>
              ) : (
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {filteredArtworks.map((artwork, index) => (
                    <motion.div
                      key={artwork.id}
                      className="group relative overflow-hidden"
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      onMouseEnter={() => setHoveredId(artwork.id)}
                      onMouseLeave={() => setHoveredId(null)}
                      data-hover
                    >
                      <motion.div
                        className="relative w-full overflow-hidden bg-gray-800"
                        style={{
                          aspectRatio: `${artwork.width} / ${artwork.height}`,
                        }}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.4, ease: 'easeOut' }}
                      >
                        <motion.div
                          animate={{
                            scale: hoveredId === artwork.id ? 1.1 : 1,
                            filter:
                              hoveredId === artwork.id
                                ? 'brightness(1.2) saturate(1.3)'
                                : 'brightness(1) saturate(1)',
                          }}
                          transition={{ duration: 0.4, ease: 'easeOut' }}
                          className="h-full w-full"
                        >
                          {/* 이미지 표시 */}
                          {imageErrors.has(artwork.id) ? (
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
                          className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 opacity-0 transition-opacity group-hover:opacity-100"
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 1 }}
                        >
                          <h3 className="font-serif text-2xl font-bold text-white">
                            {artwork.title}
                          </h3>
                          <p className="mt-2 font-sans text-sm text-gray-300">
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

