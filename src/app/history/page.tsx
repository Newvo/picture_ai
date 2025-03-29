"use client";

import { useState, useEffect } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { getGenerations, Generation } from "@/lib/storage";
import { GenerationCard } from "@/components/generate/GenerationCard";

export default function HistoryPage() {
  const [generations, setGenerations] = useState<Generation[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // 加载历史记录
  useEffect(() => {
    try {
      const data = getGenerations();
      setGenerations(data);
    } catch (error) {
      console.error("加载历史记录失败:", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // 处理删除
  const handleDelete = (id: string) => {
    setGenerations(prev => prev.filter(gen => gen.id !== id));
  };

  // 处理收藏状态变更
  const handleToggleFavorite = (id: string, isFavorite: boolean) => {
    setGenerations(prev => 
      prev.map(gen => 
        gen.id === id ? { ...gen, isFavorite } : gen
      )
    );
  };

  return (
    <MainLayout>
      <div className="container max-w-6xl mx-auto py-8 px-4 md:px-6">
        <h1 className="text-3xl font-bold mb-6">历史记录</h1>
        
        <div className="space-y-8">
          {!isLoaded ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">加载中...</p>
            </div>
          ) : generations.length === 0 ? (
            <div className="text-center py-12 border rounded-lg">
              <p className="text-muted-foreground">
                暂无历史记录，去生成一些有趣的图片吧！
              </p>
            </div>
          ) : (
            generations.map(generation => (
              <GenerationCard 
                key={generation.id}
                generation={generation}
                onDelete={handleDelete}
                onToggleFavorite={handleToggleFavorite}
              />
            ))
          )}
        </div>
      </div>
    </MainLayout>
  );
} 