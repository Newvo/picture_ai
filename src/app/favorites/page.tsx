"use client";

import { useState, useEffect } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { getFavorites, Generation } from "@/lib/storage";
import { GenerationCard } from "@/components/generate/GenerationCard";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Generation[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // 加载收藏记录
  useEffect(() => {
    try {
      const data = getFavorites();
      setFavorites(data);
    } catch (error) {
      console.error("加载收藏记录失败:", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // 处理删除
  const handleDelete = (id: string) => {
    setFavorites(prev => prev.filter(fav => fav.id !== id));
  };

  // 处理取消收藏
  const handleToggleFavorite = (id: string, isFavorite: boolean) => {
    if (!isFavorite) {
      setFavorites(prev => prev.filter(fav => fav.id !== id));
    }
  };

  return (
    <MainLayout>
      <div className="container max-w-6xl mx-auto py-8 px-4 md:px-6">
        <h1 className="text-3xl font-bold mb-6">收藏</h1>
        
        {!isLoaded ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">加载中...</p>
          </div>
        ) : favorites.length === 0 ? (
          <div className="text-center py-12 border rounded-lg">
            <p className="text-muted-foreground">
              暂无收藏记录，收藏一些你喜欢的图片吧！
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map(favorite => (
              <GenerationCard 
                key={favorite.id}
                generation={favorite}
                onDelete={handleDelete}
                onToggleFavorite={handleToggleFavorite}
                variant="compact"
              />
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
} 