"use client";

import { MainLayout } from "@/components/layout/MainLayout";

export default function FavoritesPage() {
  return (
    <MainLayout>
      <div className="container max-w-6xl mx-auto py-8 px-4 md:px-6">
        <h1 className="text-3xl font-bold mb-6">收藏</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 这里将显示收藏内容，稍后实现 */}
          <div className="text-center py-12 border rounded-lg col-span-full">
            <p className="text-muted-foreground">
              收藏内容将显示在这里
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 