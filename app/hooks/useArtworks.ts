'use client';

import { useState, useEffect } from 'react';

export interface Artwork {
  id: string;
  title: string;
  image: string; // base64 또는 URL
  category: string;
  width: number;
  height: number;
  createdAt: string;
}

const STORAGE_KEY = 'portfolio-artworks';
const DEFAULT_ARTWORKS: Artwork[] = [
  {
    id: '1',
    title: 'Abstract Composition',
    image: 'https://via.placeholder.com/600x800/1a1a1a/ffffff?text=Abstract+Composition',
    category: 'Graphic Design',
    width: 600,
    height: 800,
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Digital Illustration',
    image: 'https://via.placeholder.com/800x600/1a1a1a/ffffff?text=Digital+Illustration',
    category: 'Illustration',
    width: 800,
    height: 600,
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Mixed Media',
    image: 'https://via.placeholder.com/700x900/1a1a1a/ffffff?text=Mixed+Media',
    category: 'Fine Art',
    width: 700,
    height: 900,
    createdAt: new Date().toISOString(),
  },
  {
    id: '4',
    title: 'Typography Study',
    image: 'https://via.placeholder.com/900x700/1a1a1a/ffffff?text=Typography+Study',
    category: 'Graphic Design',
    width: 900,
    height: 700,
    createdAt: new Date().toISOString(),
  },
  {
    id: '5',
    title: 'Color Exploration',
    image: 'https://via.placeholder.com/600x600/1a1a1a/ffffff?text=Color+Exploration',
    category: 'Fine Art',
    width: 600,
    height: 600,
    createdAt: new Date().toISOString(),
  },
  {
    id: '6',
    title: 'Character Design',
    image: 'https://via.placeholder.com/800x800/1a1a1a/ffffff?text=Character+Design',
    category: 'Illustration',
    width: 800,
    height: 800,
    createdAt: new Date().toISOString(),
  },
];

export function useArtworks() {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 작품 목록을 최신순으로 정렬
  const sortArtworksByDate = (artworksList: Artwork[]): Artwork[] => {
    return [...artworksList].sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return dateB - dateA; // 최신순 (내림차순)
    });
  };

  // 로컬 스토리지에서 작품 데이터 로드
  const loadArtworks = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        const sorted = sortArtworksByDate(parsed);
        setArtworks(sorted);
      } else {
        // 기본 데이터 저장
        localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_ARTWORKS));
        const sorted = sortArtworksByDate(DEFAULT_ARTWORKS);
        setArtworks(sorted);
      }
    } catch (error) {
      console.error('Failed to load artworks:', error);
      const sorted = sortArtworksByDate(DEFAULT_ARTWORKS);
      setArtworks(sorted);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadArtworks();

    // localStorage 변경 감지 (다른 탭/창에서의 변경)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        loadArtworks();
      }
    };

    // 커스텀 이벤트로 같은 탭 내 변경 감지
    const handleCustomStorageChange = () => {
      loadArtworks();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('artworks-changed', handleCustomStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('artworks-changed', handleCustomStorageChange);
    };
  }, []);

  // localStorage 업데이트 및 이벤트 발생
  const updateStorageAndNotify = (updated: Artwork[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    // 같은 탭 내 다른 컴포넌트에 알리기 위한 커스텀 이벤트
    window.dispatchEvent(new Event('artworks-changed'));
  };

  // 작품 추가
  const addArtwork = (artwork: Omit<Artwork, 'id' | 'createdAt'>) => {
    const newArtwork: Artwork = {
      ...artwork,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    const updated = [newArtwork, ...artworks]; // 최신 작품을 맨 앞에 추가
    const sorted = sortArtworksByDate(updated);
    setArtworks(sorted);
    updateStorageAndNotify(sorted);
    return newArtwork;
  };

  // 작품 수정
  const updateArtwork = (id: string, updates: Partial<Artwork>) => {
    const updated = artworks.map((artwork) =>
      artwork.id === id ? { ...artwork, ...updates } : artwork
    );
    const sorted = sortArtworksByDate(updated);
    setArtworks(sorted);
    updateStorageAndNotify(sorted);
  };

  // 작품 삭제
  const deleteArtwork = (id: string) => {
    const updated = artworks.filter((artwork) => artwork.id !== id);
    setArtworks(updated);
    updateStorageAndNotify(updated);
  };

  // 모든 작품 삭제 (초기화)
  const resetArtworks = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_ARTWORKS));
    const sorted = sortArtworksByDate(DEFAULT_ARTWORKS);
    setArtworks(sorted);
    window.dispatchEvent(new Event('artworks-changed'));
  };

  return {
    artworks,
    isLoading,
    addArtwork,
    updateArtwork,
    deleteArtwork,
    resetArtworks,
  };
}

