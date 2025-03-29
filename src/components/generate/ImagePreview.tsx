"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface ImagePreviewProps {
  imageUrl: string | null;
  isLoading?: boolean;
  onDownload?: () => void;
  onFavorite?: () => void;
  isFavorite?: boolean;
}

export function ImagePreview({
  imageUrl,
  isLoading = false,
  onDownload,
  onFavorite,
  isFavorite = false,
}: ImagePreviewProps) {
  // 下载图片
  const handleDownload = () => {
    if (!imageUrl) return;
    
    // 调用父组件的下载处理器
    if (onDownload) {
      onDownload();
      return;
    }
    
    // 如果没有提供下载处理器，使用默认行为
    const a = document.createElement("a");
    a.href = imageUrl;
    a.download = `ai-generated-image-${Date.now()}.jpg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
  
  return (
    <div className="flex flex-col h-full">
      <div className="relative flex-1 border rounded-lg overflow-hidden">
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
            <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
          </div>
        ) : imageUrl ? (
          <div className="relative h-full">
            <img
              src={imageUrl}
              alt="生成的图片"
              className="w-full h-full object-contain"
            />
          </div>
        ) : (
          <div className="flex items-center justify-center h-full bg-gray-50">
            <p className="text-muted-foreground">等待生成</p>
          </div>
        )}
      </div>
      
      {imageUrl && (
        <div className="flex mt-4 gap-2">
          <Button
            onClick={handleDownload}
            className="flex-1"
            variant="outline"
          >
            下载图片
          </Button>
          {onFavorite && (
            <Button
              onClick={onFavorite}
              variant="outline"
              className={isFavorite ? "bg-yellow-50" : ""}
            >
              {isFavorite ? "已收藏" : "收藏"}
            </Button>
          )}
        </div>
      )}
    </div>
  );
} 