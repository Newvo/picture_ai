"use client";

import { MainLayout } from "@/components/layout/MainLayout";

export default function HistoryPage() {
  return (
    <MainLayout>
      <div className="container max-w-6xl mx-auto py-8 px-4 md:px-6">
        <h1 className="text-3xl font-bold mb-6">历史记录</h1>
        
        <div className="space-y-4">
          {/* 这里将显示历史记录，稍后实现 */}
          <div className="text-center py-12 border rounded-lg">
            <p className="text-muted-foreground">
              历史记录将显示在这里
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 