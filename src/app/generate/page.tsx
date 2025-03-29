"use client";

import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { TextToImageForm } from "@/components/forms/TextToImageForm";
import { ImagePreview } from "@/components/generate/ImagePreview";
import { toggleFavorite } from "@/lib/storage";

export default function GeneratePage() {
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentImageId, setCurrentImageId] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);

  // 处理生成开始
  const handleGenerationStart = () => {
    setIsGenerating(true);
  };

  // 处理生成完成
  const handleGenerationComplete = (imageUrl: string, imageId?: string) => {
    setGeneratedImageUrl(imageUrl);
    setIsGenerating(false);
    
    if (imageId) {
      setCurrentImageId(imageId);
      setIsFavorite(false); // 重置收藏状态
    }
  };

  // 处理生成错误
  const handleGenerationError = (error: Error) => {
    console.error("生成图片错误", error);
    setIsGenerating(false);
    // 可以在此添加错误提示
  };
  
  // 处理收藏
  const handleFavorite = () => {
    if (currentImageId) {
      const newFavoriteStatus = toggleFavorite(currentImageId);
      setIsFavorite(newFavoriteStatus);
    }
  };

  return (
    <MainLayout>
      <div className="container max-w-6xl mx-auto py-8 px-4 md:px-6">
        <h1 className="text-3xl font-bold mb-6">生成图片</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="p-6 border rounded-lg">
              <TextToImageForm
                onGenerationStart={handleGenerationStart}
                onGenerationComplete={handleGenerationComplete}
                onGenerationError={handleGenerationError}
              />
            </div>
          </div>
          <div>
            <div className="h-[500px]">
              <ImagePreview
                imageUrl={generatedImageUrl}
                isLoading={isGenerating}
                onFavorite={currentImageId ? handleFavorite : undefined}
                isFavorite={isFavorite}
              />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 