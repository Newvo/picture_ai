import { MainLayout } from "@/components/layout/MainLayout";

export default function ExplorePage() {
  return (
    <MainLayout>
      <div className="container max-w-6xl mx-auto py-8 px-4 md:px-6">
        <h1 className="text-3xl font-bold mb-6">探索</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 这里将显示探索内容，稍后实现 */}
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="border rounded-lg p-4 aspect-square flex items-center justify-center">
              <p className="text-muted-foreground text-center">
                探索内容样例 {i + 1}
              </p>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
} 