'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useArtworks, Artwork } from '../hooks/useArtworks';
import ArtworkForm from './ArtworkForm';
import { normalizeImagePath, isUploadedImage } from '../utils/imageUtils';

export default function AdminPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingArtwork, setEditingArtwork] = useState<Artwork | undefined>();
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());
  const { artworks, addArtwork, updateArtwork, deleteArtwork, resetArtworks } =
    useArtworks();

  const handleAdd = () => {
    setEditingArtwork(undefined);
    setIsFormOpen(true);
  };

  const handleEdit = (artwork: Artwork) => {
    setEditingArtwork(artwork);
    setIsFormOpen(true);
  };

  const handleSave = (artworkData: Omit<Artwork, 'id' | 'createdAt'>) => {
    if (editingArtwork) {
      updateArtwork(editingArtwork.id, artworkData);
    } else {
      addArtwork(artworkData);
    }
    setIsFormOpen(false);
    setEditingArtwork(undefined);
  };

  const handleDelete = (id: string) => {
    if (confirm('정말 이 작품을 삭제하시겠습니까?')) {
      deleteArtwork(id);
    }
  };

  const handleReset = () => {
    if (
      confirm(
        '모든 작품이 기본 데이터로 초기화됩니다. 계속하시겠습니까?'
      )
    ) {
      resetArtworks();
    }
  };

  return (
    <>
      {/* 관리자 패널 토글 버튼 */}
      <motion.button
        className="fixed bottom-8 right-8 z-50 flex h-14 w-14 items-center justify-center rounded-md border border-[#8b7355]/50 bg-[#8b7355]/20 backdrop-blur-sm text-[#d4c5b9] shadow-[0_4px_20px_rgba(139,115,85,0.3)] transition-all"
        style={{ 
          cursor: 'pointer',
          filter: 'sepia(0.2)',
        }}
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ 
          scale: 1.1,
          backgroundColor: 'rgba(139, 115, 85, 0.35)',
          borderColor: 'rgba(139, 115, 85, 0.7)',
          boxShadow: '0 6px 30px rgba(139, 115, 85, 0.5)',
        }}
        whileTap={{ scale: 0.95 }}
        aria-label="관리자 패널"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="h-6 w-6"
          style={{
            filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.5))',
          }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12a.75.75 0 110-1.5.75.75 0 010 1.5zM12 17.25a.75.75 0 110-1.5.75.75 0 010 1.5zM18.75 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM18.75 12a.75.75 0 110-1.5.75.75 0 010 1.5zM18.75 17.25a.75.75 0 110-1.5.75.75 0 010 1.5zM5.25 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM5.25 12a.75.75 0 110-1.5.75.75 0 010 1.5zM5.25 17.25a.75.75 0 110-1.5.75.75 0 010 1.5z"
          />
        </svg>
      </motion.button>

      {/* 관리자 패널 */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* 배경 오버레이 */}
            <motion.div
              className="fixed inset-0 z-[90] bg-black/70 vintage-vignette"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            >
              {/* 빈티지 배경 그라데이션 */}
              <div className="absolute inset-0 h-full w-full bg-gradient-to-br from-amber-900/20 via-[#0a0a0a] via-rose-900/15 to-[#0a0a0a]" />
            </motion.div>

            {/* 패널 */}
            <motion.div
              className="fixed right-0 top-0 z-[91] h-full w-full max-w-md overflow-y-auto p-6 shadow-2xl"
              style={{ 
                cursor: 'auto',
                background: 'linear-gradient(135deg, rgba(26, 26, 26, 0.95) 0%, rgba(10, 10, 10, 0.98) 100%)',
                borderLeft: '1px solid rgba(139, 115, 85, 0.3)',
                filter: 'sepia(0.1)',
              }}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            >
              <div className="mb-6 flex items-center justify-between">
                <h2 
                  className="font-serif text-2xl font-black text-[#d4c5b9]"
                  style={{
                    textShadow: '2px 2px 8px rgba(0,0,0,0.8), 0 0 15px rgba(139,115,85,0.3)',
                    filter: 'sepia(0.15) saturate(1.1)',
                  }}
                >
                  작품 관리
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded-md p-2 text-[#d4c5b9] transition-all hover:bg-[#8b7355]/20 hover:scale-110"
                  aria-label="닫기"
                  style={{ filter: 'sepia(0.2)' }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* 액션 버튼 */}
              <div className="mb-6 flex gap-2">
                <button
                  onClick={handleAdd}
                  className="flex-1 rounded-md border border-[#8b7355]/50 bg-[#8b7355]/20 px-4 py-2 text-sm font-medium text-[#d4c5b9] transition-all hover:bg-[#8b7355]/35 hover:border-[#8b7355]/70 hover:scale-105"
                  style={{
                    filter: 'sepia(0.2)',
                    textShadow: '1px 1px 4px rgba(0,0,0,0.5)',
                    boxShadow: '0 2px 8px rgba(139,115,85,0.2)',
                  }}
                >
                  + 작품 추가
                </button>
                <button
                  onClick={handleReset}
                  className="rounded-md border border-[#8b7355]/40 bg-transparent px-4 py-2 text-sm font-medium text-[#d4c5b9] transition-all hover:bg-[#8b7355]/20 hover:border-[#8b7355]/60 hover:scale-105"
                  style={{
                    filter: 'sepia(0.2)',
                    textShadow: '1px 1px 4px rgba(0,0,0,0.5)',
                  }}
                >
                  초기화
                </button>
              </div>

              {/* 작품 목록 */}
              <div className="space-y-4">
                {(() => {
                  // 실제로 업로드된 이미지이고, 이미지 로드에 성공한 작품만 필터링
                  const filteredArtworks = artworks.filter(
                    (artwork) =>
                      isUploadedImage(artwork.image) && !imageErrors.has(artwork.id)
                  );
                  return filteredArtworks.length === 0 ? (
                    <p 
                      className="py-8 text-center text-[#d4c5b9]"
                      style={{ 
                        filter: 'sepia(0.2)',
                        textShadow: '1px 1px 4px rgba(0,0,0,0.5)',
                      }}
                    >
                      작품이 없습니다. 작품을 추가해주세요.
                    </p>
                  ) : (
                    filteredArtworks.map((artwork) => (
                    <motion.div
                      key={artwork.id}
                      className="group relative overflow-hidden rounded-lg"
                      style={{
                        background: 'linear-gradient(135deg, rgba(26, 26, 26, 0.8) 0%, rgba(10, 10, 10, 0.9) 100%)',
                        border: '1px solid rgba(139, 115, 85, 0.3)',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(139,115,85,0.1)',
                      }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {/* 이미지 미리보기 */}
                      <div
                        className="relative w-full overflow-hidden"
                        style={{
                          aspectRatio: `${artwork.width} / ${artwork.height}`,
                          background: 'rgba(139, 115, 85, 0.1)',
                        }}
                      >
                        {imageErrors.has(artwork.id) ? (
                          <div 
                            className="flex h-full w-full items-center justify-center"
                            style={{
                              background: 'linear-gradient(135deg, rgba(139,115,85,0.2) 0%, rgba(139,115,85,0.1) 100%)',
                            }}
                          >
                            <div className="text-center text-[#8b7355]">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="mx-auto h-8 w-8"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008H12.75V8.25Zm0 2.25h.008v.008H12.75v-.008Z"
                                />
                              </svg>
                              <p className="mt-1 text-xs">이미지 없음</p>
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
                      </div>

                      {/* 정보 */}
                      <div className="p-4">
                        <h3 
                          className="mb-1 font-serif text-lg font-bold text-[#d4c5b9]"
                          style={{
                            textShadow: '1px 1px 4px rgba(0,0,0,0.5)',
                            filter: 'sepia(0.15)',
                          }}
                        >
                          {artwork.title}
                        </h3>
                        <p 
                          className="mb-2 text-sm text-[#8b7355]"
                          style={{
                            filter: 'sepia(0.2)',
                            textShadow: '1px 1px 3px rgba(0,0,0,0.5)',
                          }}
                        >
                          {artwork.category}
                        </p>
                        <p 
                          className="mb-3 text-xs text-[#8b7355]/70"
                          style={{
                            filter: 'sepia(0.2)',
                          }}
                        >
                          {artwork.width} × {artwork.height}px
                        </p>

                        {/* 액션 버튼 */}
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(artwork)}
                            className="flex-1 rounded-md border border-[#8b7355]/40 bg-transparent px-3 py-1.5 text-xs font-medium text-[#d4c5b9] transition-all hover:bg-[#8b7355]/20 hover:border-[#8b7355]/60 hover:scale-105"
                            style={{
                              filter: 'sepia(0.2)',
                              textShadow: '1px 1px 3px rgba(0,0,0,0.5)',
                            }}
                          >
                            수정
                          </button>
                          <button
                            onClick={() => handleDelete(artwork.id)}
                            className="flex-1 rounded-md border border-red-600/40 bg-red-600/10 px-3 py-1.5 text-xs font-medium text-red-400 transition-all hover:bg-red-600/20 hover:border-red-600/60 hover:scale-105"
                            style={{
                              filter: 'sepia(0.2)',
                              textShadow: '1px 1px 3px rgba(0,0,0,0.5)',
                            }}
                          >
                            삭제
                          </button>
                        </div>
                      </div>
                    </motion.div>
                    ))
                  );
                })()}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 작품 추가/수정 폼 */}
      <ArtworkForm
        artwork={editingArtwork}
        onSave={handleSave}
        onCancel={() => {
          setIsFormOpen(false);
          setEditingArtwork(undefined);
        }}
        isOpen={isFormOpen}
      />
    </>
  );
}

