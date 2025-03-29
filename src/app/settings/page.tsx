"use client";

import { MainLayout } from "@/components/layout/MainLayout";

export default function SettingsPage() {
  return (
    <MainLayout>
      <div className="container max-w-6xl mx-auto py-8 px-4 md:px-6">
        <h1 className="text-3xl font-bold mb-6">设置</h1>
        
        <div className="max-w-2xl mx-auto">
          <div className="space-y-6">
            {/* 这里将显示设置选项，稍后实现 */}
            <div className="p-6 border rounded-lg">
              <h2 className="text-xl font-semibold mb-4">应用设置</h2>
              <p className="text-muted-foreground text-center py-4">
                设置选项将显示在这里
              </p>
            </div>
            
            <div className="p-6 border rounded-lg">
              <h2 className="text-xl font-semibold mb-4">生成参数默认值</h2>
              <p className="text-muted-foreground text-center py-4">
                生成参数默认值设置将显示在这里
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 