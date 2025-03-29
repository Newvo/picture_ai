import { MainLayout } from "@/components/layout/MainLayout";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <MainLayout>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                AI图片生成站
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                使用最先进的AI技术，将你的文字描述转化为精美图片
              </p>
            </div>
            <div className="space-x-4">
              <Link href="/generate">
                <Button>开始创作</Button>
              </Link>
              <Link href="/explore">
                <Button variant="outline">探索作品</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-3 items-start">
            <div className="space-y-2">
              <h3 className="text-xl font-bold">文字生成图片</h3>
              <p className="text-gray-500">
                输入文字描述，即可生成对应的高质量图片
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold">图生图功能</h3>
              <p className="text-gray-500">
                上传基础图片，调整参数生成新的变体
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold">本地存储</h3>
              <p className="text-gray-500">
                自动保存历史记录和收藏，随时查看和下载
              </p>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
