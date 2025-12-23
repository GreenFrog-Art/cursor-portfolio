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
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string>('');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);

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
    setError('');
    setIsUploading(false);
    setUploadProgress(0);
  }, [artwork, isOpen]);

  // 이미지 파일 처리 (미리보기 및 크기 감지)
  const processImageFile = (file: File) => {
    // 파일 검증
    if (!file.type.startsWith('image/')) {
      setError('이미지 파일만 업로드할 수 있습니다.');
      return false;
    }

    // 파일 크기 제한 (10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError('이미지 크기는 10MB 이하여야 합니다.');
      return false;
    }

    // 미리보기 생성
    const reader = new FileReader();
    reader.onloadend = () => {
      const previewUrl = reader.result as string;
      setPreview(previewUrl);

      // 이미지 크기 자동 감지
      const img = new window.Image();
      img.onload = () => {
        setWidth(img.width);
        setHeight(img.height);
      };
      img.onerror = () => {
        setError('이미지를 로드할 수 없습니다.');
      };
      img.src = previewUrl;
    };
    reader.onerror = () => {
      setError('파일을 읽을 수 없습니다.');
    };
    reader.readAsDataURL(file);

    return true;
  };

  // 파일 업로드 (서버로 전송)
  const uploadFile = async (file: File) => {
    setIsUploading(true);
    setUploadProgress(0);
    setError('');

    try {
      const formData = new FormData();
      formData.append('file', file);

      // 업로드 진행 시뮬레이션 (실제로는 fetch API가 진행률을 제공하지 않음)
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 100);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      clearInterval(progressInterval);
      setUploadProgress(100);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || '업로드에 실패했습니다.');
      }

      const data = await response.json();
      setImage(data.url);
      setPreview(data.url);
      setError('');
      return data.url;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : '업로드 중 오류가 발생했습니다.';
      setError(errorMessage);
      throw err;
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  // 파일 선택 핸들러
  const handleFileSelect = async (file: File) => {
    setError('');
    if (!processImageFile(file)) {
      return;
    }

    // 파일 업로드
    try {
      await uploadFile(file);
    } catch (err) {
      // 에러는 이미 uploadFile에서 처리됨
      console.error('Upload error:', err);
    }
  };

  // 파일 입력 변경 핸들러
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    handleFileSelect(file);
  };

  // 드래그 앤 드롭 핸들러
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  // URL 입력 핸들러
  const handleUrlChange = (url: string) => {
    setImage(url);
    setPreview(url);
    setError('');

    // URL에서 이미지 크기 감지
    const img = new window.Image();
    img.onload = () => {
      setWidth(img.width);
      setHeight(img.height);
    };
    img.onerror = () => {
      setError('이미지 URL을 로드할 수 없습니다.');
    };
    img.src = url;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !image) {
      setError('제목과 이미지를 모두 입력해주세요.');
      return;
    }

    if (isUploading) {
      setError('업로드가 진행 중입니다. 잠시만 기다려주세요.');
      return;
    }

    setError('');
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
            className="fixed left-1/2 top-1/2 z-[101] flex h-[90vh] max-h-[90vh] w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 flex-col rounded-lg bg-gray-900 text-white"
            style={{ cursor: 'auto' }}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex-shrink-0 p-8 pb-4">
              <h2 className="font-serif text-3xl font-bold">
                {artwork ? '작품 수정' : '새 작품 추가'}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-1 flex-col overflow-hidden">
              <div className="flex-1 space-y-6 overflow-y-auto px-8 pb-4">
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
                  disabled={isUploading}
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
                  disabled={isUploading}
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

                {/* 드래그 앤 드롭 영역 */}
                <div
                  ref={dropZoneRef}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`relative mb-4 rounded-md border-2 border-dashed transition-colors ${
                    isDragging
                      ? 'border-white bg-gray-800'
                      : 'border-gray-600 bg-gray-800/50'
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    disabled={isUploading}
                  />

                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                    className="w-full px-4 py-8 text-center font-sans text-sm text-gray-400 transition-colors hover:text-gray-300 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isUploading ? (
                      <div className="space-y-2">
                        <div className="text-white">업로드 중...</div>
                        <div className="mx-auto h-2 w-48 overflow-hidden rounded-full bg-gray-700">
                          <motion.div
                            className="h-full bg-white"
                            initial={{ width: 0 }}
                            animate={{ width: `${uploadProgress}%` }}
                            transition={{ duration: 0.3 }}
                          />
                        </div>
                        <div className="text-xs">{uploadProgress}%</div>
                      </div>
                    ) : preview ? (
                      '이미지 변경'
                    ) : (
                      <div>
                        <div className="mb-2">이미지 선택 또는 드래그 앤 드롭</div>
                        <div className="text-xs">최대 10MB (JPG, PNG, GIF, WebP)</div>
                      </div>
                    )}
                  </button>
                </div>

                {/* 에러 메시지 */}
                {error && (
                  <motion.div
                    className="mb-4 rounded-md bg-red-500/20 border border-red-500/50 px-4 py-2 text-sm text-red-400"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {error}
                  </motion.div>
                )}

                {/* 이미지 미리보기 */}
                {preview && !isUploading && (
                  <motion.div
                    className="relative mb-4 aspect-[3/4] w-full overflow-hidden rounded-md bg-gray-800"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <img
                      src={preview}
                      alt="Preview"
                      className="h-full w-full object-cover"
                    />
                    {image.startsWith('/uploads/') && (
                      <div className="absolute bottom-0 left-0 right-0 bg-black/60 px-2 py-1 text-xs text-white">
                        ✓ 서버에 업로드됨
                      </div>
                    )}
                  </motion.div>
                )}

                {/* 이미지 URL 직접 입력 (선택사항) */}
                <div className="mt-4">
                  <label className="mb-2 block font-sans text-xs text-gray-400">
                    또는 이미지 URL 입력
                  </label>
                  <input
                    type="text"
                    value={image.startsWith('data:') || image.startsWith('/uploads/') ? '' : image}
                    onChange={(e) => handleUrlChange(e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    className="w-full rounded-md bg-gray-800 px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                    disabled={isUploading}
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
                    disabled={isUploading}
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
                    disabled={isUploading}
                  />
                </div>
              </div>
              </div>

              {/* 버튼 - 항상 하단에 고정 */}
              <div className="flex-shrink-0 border-t border-gray-700 bg-gray-900 p-8 pt-4">
                <div className="flex gap-4">
                  <button
                    type="submit"
                    disabled={isUploading}
                    className="flex-1 rounded-md bg-white px-6 py-3 font-sans font-medium text-black transition-colors hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isUploading ? '업로드 중...' : artwork ? '수정' : '추가'}
                  </button>
                  <button
                    type="button"
                    onClick={onCancel}
                    disabled={isUploading}
                    className="flex-1 rounded-md border border-gray-600 bg-transparent px-6 py-3 font-sans font-medium text-white transition-colors hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    취소
                  </button>
                </div>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
