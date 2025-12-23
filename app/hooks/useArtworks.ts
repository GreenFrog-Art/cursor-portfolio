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
    image: '/api/placeholder/600/800',
    category: 'Graphic Design',
    width: 600,
    height: 800,
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Digital Illustration',
    image: '/api/placeholder/800/600',
    category: 'Illustration',
    width: 800,
    height: 600,
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Mixed Media',
    image: '/api/placeholder/700/900',
    category: 'Fine Art',
    width: 700,
    height: 900,
    createdAt: new Date().toISOString(),
  },
  {
    id: '4',
    title: 'Typography Study',
    image: '/api/placeholder/900/700',
    category: 'Graphic Design',
    width: 900,
    height: 700,
    createdAt: new Date().toISOString(),
  },
  {
    id: '5',
    title: 'Color Exploration',
    image: '/api/placeholder/600/600',
    category: 'Fine Art',
    width: 600,
    height: 600,
    createdAt: new Date().toISOString(),
  },
  {
    id: '6',
    title: 'Character Design',
    image: '/api/placeholder/800/800',
    category: 'Illustration',
    width: 800,
    height: 800,
    createdAt: new Date().toISOString(),
  },
];

export function useArtworks() {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 로컬 스토리지에서 작품 데이터 로드
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setArtworks(parsed);
      } else {
        // 기본 데이터 저장
        localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_ARTWORKS));
        setArtworks(DEFAULT_ARTWORKS);
      }
    } catch (error) {
      console.error('Failed to load artworks:', error);
      setArtworks(DEFAULT_ARTWORKS);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 작품 추가
  const addArtwork = (artwork: Omit<Artwork, 'id' | 'createdAt'>) => {
    const newArtwork: Artwork = {
      ...artwork,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    const updated = [...artworks, newArtwork];
    setArtworks(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return newArtwork;
  };

  // 작품 수정
  const updateArtwork = (id: string, updates: Partial<Artwork>) => {
    const updated = artworks.map((artwork) =>
      artwork.id === id ? { ...artwork, ...updates } : artwork
    );
    setArtworks(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  // 작품 삭제
  const deleteArtwork = (id: string) => {
    const updated = artworks.filter((artwork) => artwork.id !== id);
    setArtworks(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  // 모든 작품 삭제 (초기화)
  const resetArtworks = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_ARTWORKS));
    setArtworks(DEFAULT_ARTWORKS);
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

