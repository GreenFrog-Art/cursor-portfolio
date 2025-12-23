'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useArtworks, Artwork } from '../hooks/useArtworks';
import ArtworkForm from './ArtworkForm';

export default function AdminPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingArtwork, setEditingArtwork] = useState<Artwork | undefined>();
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
        className="fixed bottom-8 right-8 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-white text-black shadow-lg transition-all hover:scale-110"
        style={{ cursor: 'pointer' }}
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
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
              className="fixed inset-0 z-[90] bg-black/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* 패널 */}
            <motion.div
              className="fixed right-0 top-0 z-[91] h-full w-full max-w-md overflow-y-auto bg-gray-900 p-6 text-white shadow-2xl"
              style={{ cursor: 'auto' }}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            >
              <div className="mb-6 flex items-center justify-between">
                <h2 className="font-serif text-2xl font-bold">작품 관리</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded-md p-2 transition-colors hover:bg-gray-800"
                  aria-label="닫기"
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
                  className="flex-1 rounded-md bg-white px-4 py-2 font-sans text-sm font-medium text-black transition-colors hover:bg-gray-200"
                >
                  + 작품 추가
                </button>
                <button
                  onClick={handleReset}
                  className="rounded-md border border-gray-600 bg-transparent px-4 py-2 font-sans text-sm font-medium text-white transition-colors hover:bg-gray-800"
                >
                  초기화
                </button>
              </div>

              {/* 작품 목록 */}
              <div className="space-y-4">
                {artworks.length === 0 ? (
                  <p className="py-8 text-center font-sans text-gray-400">
                    작품이 없습니다. 작품을 추가해주세요.
                  </p>
                ) : (
                  artworks.map((artwork) => (
                    <motion.div
                      key={artwork.id}
                      className="group relative overflow-hidden rounded-lg bg-gray-800"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {/* 이미지 미리보기 */}
                      <div className="relative aspect-[3/4] w-full overflow-hidden bg-gray-700">
                        <img
                          src={artwork.image}
                          alt={artwork.title}
                          className="h-full w-full object-cover"
                        />
                      </div>

                      {/* 정보 */}
                      <div className="p-4">
                        <h3 className="mb-1 font-serif text-lg font-bold">
                          {artwork.title}
                        </h3>
                        <p className="mb-2 font-sans text-sm text-gray-400">
                          {artwork.category}
                        </p>
                        <p className="mb-3 font-sans text-xs text-gray-500">
                          {artwork.width} × {artwork.height}px
                        </p>

                        {/* 액션 버튼 */}
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(artwork)}
                            className="flex-1 rounded-md border border-gray-600 bg-transparent px-3 py-1.5 font-sans text-xs font-medium text-white transition-colors hover:bg-gray-700"
                          >
                            수정
                          </button>
                          <button
                            onClick={() => handleDelete(artwork.id)}
                            className="flex-1 rounded-md bg-red-600/20 px-3 py-1.5 font-sans text-xs font-medium text-red-400 transition-colors hover:bg-red-600/30"
                          >
                            삭제
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
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

