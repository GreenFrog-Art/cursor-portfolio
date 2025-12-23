'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useArtworks } from '../hooks/useArtworks';

export default function WorkGallery() {
  const { artworks, isLoading } = useArtworks();
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  if (isLoading) {
    return (
      <section className="relative flex h-screen w-screen flex-shrink-0 items-center justify-center bg-gradient-to-b from-black via-gray-900 to-black">
        <div className="text-center text-white">
          <p className="font-sans text-lg">로딩 중...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative flex h-screen w-screen flex-shrink-0 items-center justify-center bg-gradient-to-b from-black via-gray-900 to-black px-8 py-20">
      <div className="container mx-auto">
        <motion.h2
          className="mb-16 font-serif text-5xl font-bold text-white md:text-6xl lg:text-7xl"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          WORK GALLERY
        </motion.h2>

        {/* 비정형 그리드 레이아웃 */}
        {artworks.length === 0 ? (
          <div className="py-20 text-center">
            <p className="font-sans text-xl text-gray-400">
              작품이 없습니다. 관리자 패널에서 작품을 추가해주세요.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {artworks.map((artwork, index) => (
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
                className="relative aspect-[3/4] w-full overflow-hidden bg-gray-800"
                whileHover={{ scale: 1.05, rotate: hoveredId === artwork.id ? 1 : 0 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              >
                <motion.div
                  animate={{
                    scale: hoveredId === artwork.id ? 1.15 : 1,
                    filter: hoveredId === artwork.id
                      ? 'brightness(1.2) saturate(1.3) contrast(1.1)'
                      : 'brightness(1) saturate(1) contrast(1)',
                  }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className="h-full w-full"
                  style={{
                    transform: hoveredId === artwork.id
                      ? 'perspective(1000px) rotateX(2deg) rotateY(-2deg)'
                      : 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
                  }}
                >
                  {/* 실제 이미지를 사용하려면 public 폴더에 이미지를 추가하고 경로를 수정하세요 */}
                  <div
                    className="h-full w-full bg-gradient-to-br from-purple-500/30 to-blue-500/30"
                    style={{
                      backgroundImage: `url(${artwork.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  >
                    {/* 실제 Next.js Image 컴포넌트를 사용하려면 아래 주석을 해제하세요 */}
                    {/* <Image
                      src={artwork.image}
                      alt={artwork.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    /> */}
                  </div>
                </motion.div>

                {/* 오버레이 정보 */}
                <motion.div
                  className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 opacity-0 transition-opacity group-hover:opacity-100"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                >
                  <h3 className="font-serif text-2xl font-bold text-white">
                    {artwork.title}
                  </h3>
                  <p className="mt-2 font-sans text-sm text-gray-300">
                    {artwork.category}
                  </p>
                </motion.div>
              </motion.div>
            </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

