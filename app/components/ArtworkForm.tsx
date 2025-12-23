'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Artwork } from '../hooks/useArtworks';

interface ArtworkFormProps {
  artwork?: Artwork;
  onSave: (artwork: Omit<Artwork, 'id' | 'createdAt'>) => void;
  onCancel: () => void;
  isOpen: boolean;
}

export default function ArtworkForm({
  artwork,
  onSave,
  onCancel,
  isOpen,
}: ArtworkFormProps) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Graphic Design');
  const [image, setImage] = useState<string>('');
  const [preview, setPreview] = useState<string>('');
  const [width, setWidth] = useState(600);
  const [height, setHeight] = useState(800);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (artwork) {
      setTitle(artwork.title);
      setCategory(artwork.category);
      setImage(artwork.image);
      setPreview(artwork.image);
      setWidth(artwork.width);
      setHeight(artwork.height);
    } else {
      // 새 작품 추가 모드
      setTitle('');
      setCategory('Graphic Design');
      setImage('');
      setPreview('');
      setWidth(600);
      setHeight(800);
    }
  }, [artwork, isOpen]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 이미지 파일 검증
    if (!file.type.startsWith('image/')) {
      alert('이미지 파일만 업로드할 수 있습니다.');
      return;
    }

    // 파일 크기 제한 (10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert('이미지 크기는 10MB 이하여야 합니다.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setImage(base64String);
      setPreview(base64String);

      // 이미지 크기 자동 감지
      const img = new window.Image();
      img.onload = () => {
        setWidth(img.width);
        setHeight(img.height);
      };
      img.src = base64String;
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !image) {
      alert('제목과 이미지를 모두 입력해주세요.');
      return;
    }

    onSave({
      title: title.trim(),
      category,
      image,
      width,
      height,
    });
  };

  const categories = ['Graphic Design', 'Illustration', 'Fine Art'];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 배경 오버레이 */}
          <motion.div
            className="fixed inset-0 z-[100] bg-black/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCancel}
          />

          {/* 모달 */}
          <motion.div
            className="fixed left-1/2 top-1/2 z-[101] w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-lg bg-gray-900 p-8 text-white"
            style={{ cursor: 'auto' }}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="mb-6 font-serif text-3xl font-bold">
              {artwork ? '작품 수정' : '새 작품 추가'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* 제목 */}
              <div>
                <label className="mb-2 block font-sans text-sm font-medium">
                  제목 *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full rounded-md bg-gray-800 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                  required
                />
              </div>

              {/* 카테고리 */}
              <div>
                <label className="mb-2 block font-sans text-sm font-medium">
                  카테고리 *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-md bg-gray-800 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* 이미지 업로드 */}
              <div>
                <label className="mb-2 block font-sans text-sm font-medium">
                  이미지 *
                </label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="mb-4 w-full rounded-md border-2 border-dashed border-gray-600 bg-gray-800 px-4 py-8 text-center font-sans text-sm text-gray-400 transition-colors hover:border-gray-500 hover:text-gray-300"
                >
                  {preview ? '이미지 변경' : '이미지 선택 (최대 10MB)'}
                </button>

                {/* 이미지 미리보기 */}
                {preview && (
                  <div className="relative mb-4 aspect-[3/4] w-full overflow-hidden rounded-md bg-gray-800">
                    <img
                      src={preview}
                      alt="Preview"
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}

                {/* 이미지 URL 직접 입력 (선택사항) */}
                <div className="mt-4">
                  <label className="mb-2 block font-sans text-xs text-gray-400">
                    또는 이미지 URL 입력
                  </label>
                  <input
                    type="text"
                    value={image.startsWith('data:') ? '' : image}
                    onChange={(e) => {
                      setImage(e.target.value);
                      setPreview(e.target.value);
                    }}
                    placeholder="https://example.com/image.jpg"
                    className="w-full rounded-md bg-gray-800 px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                </div>
              </div>

              {/* 이미지 크기 (자동 감지되지만 수동 수정 가능) */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-2 block font-sans text-sm font-medium">
                    너비 (px)
                  </label>
                  <input
                    type="number"
                    value={width}
                    onChange={(e) => setWidth(Number(e.target.value))}
                    className="w-full rounded-md bg-gray-800 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                    min="1"
                  />
                </div>
                <div>
                  <label className="mb-2 block font-sans text-sm font-medium">
                    높이 (px)
                  </label>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(Number(e.target.value))}
                    className="w-full rounded-md bg-gray-800 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                    min="1"
                  />
                </div>
              </div>

              {/* 버튼 */}
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 rounded-md bg-white px-6 py-3 font-sans font-medium text-black transition-colors hover:bg-gray-200"
                >
                  {artwork ? '수정' : '추가'}
                </button>
                <button
                  type="button"
                  onClick={onCancel}
                  className="flex-1 rounded-md border border-gray-600 bg-transparent px-6 py-3 font-sans font-medium text-white transition-colors hover:bg-gray-800"
                >
                  취소
                </button>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

