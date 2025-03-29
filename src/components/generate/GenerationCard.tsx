import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Heart, Trash2, Download, MoreHorizontal } from "lucide-react";
import { Generation, toggleFavorite, deleteGeneration } from "@/lib/storage";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

interface GenerationCardProps {
  generation: Generation;
  onDelete?: (id: string) => void;
  onToggleFavorite?: (id: string, isFavorite: boolean) => void;
  variant?: "default" | "compact";
}

export function GenerationCard({ 
  generation, 
  onDelete, 
  onToggleFavorite, 
  variant = "default" 
}: GenerationCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  // 处理收藏/取消收藏
  const handleToggleFavorite = () => {
    const isFavorite = toggleFavorite(generation.id);
    if (onToggleFavorite) {
      onToggleFavorite(generation.id, isFavorite);
    }
  };

  // 处理删除
  const handleDelete = () => {
    if (window.confirm("确定要删除这条记录吗？")) {
      setIsDeleting(true);
      const success = deleteGeneration(generation.id);
      if (success && onDelete) {
        onDelete(generation.id);
      }
      setIsDeleting(false);
    }
  };

  // 下载图片
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = generation.imageUrl;
    // 使用提示词前几个字作为文件名
    const fileName = generation.prompt.slice(0, 20).replace(/\s+/g, "_") + ".png";
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // 紧凑模式 (用于收藏页面)
  if (variant === "compact") {
    return (
      <Card className="overflow-hidden">
        <div className="relative aspect-square">
          <Image 
            src={generation.imageUrl} 
            alt={generation.prompt}
            className="object-cover"
            fill
          />
        </div>
        
        <CardContent className="p-3">
          <h3 className="text-sm font-medium line-clamp-1 mb-1">{generation.prompt}</h3>
          <p className="text-xs text-muted-foreground">
            {new Date(generation.createdAt).toLocaleDateString()}
          </p>
        </CardContent>
        
        <CardFooter className="p-2 flex justify-between items-center">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={handleToggleFavorite}
            className={generation.isFavorite ? "text-red-500" : ""}
          >
            <Heart className={generation.isFavorite ? "fill-red-500" : ""} size={16} />
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleDownload}>下载</DropdownMenuItem>
              <DropdownMenuItem onClick={handleDelete} disabled={isDeleting}>删除</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardFooter>
      </Card>
    );
  }

  // 默认模式 (用于历史记录页面)
  return (
    <Card className="overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* 图片部分 */}
        <div className="relative h-[300px] md:h-auto">
          <Image 
            src={generation.imageUrl} 
            alt={generation.prompt}
            className="object-cover"
            fill
          />
        </div>
        
        {/* 信息部分 */}
        <div className="p-4 md:col-span-2">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-medium line-clamp-2">
              {generation.prompt}
            </h3>
            <div className="flex space-x-2">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={handleToggleFavorite}
                className={generation.isFavorite ? "text-red-500" : ""}
              >
                <Heart className={generation.isFavorite ? "fill-red-500" : ""} size={18} />
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={handleDelete}
                disabled={isDeleting}
              >
                <Trash2 size={18} />
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={handleDownload}
              >
                <Download size={18} />
              </Button>
            </div>
          </div>
          
          {generation.negativePrompt && (
            <p className="text-muted-foreground text-sm mb-3">
              <span className="font-medium">负面提示词: </span>
              {generation.negativePrompt}
            </p>
          )}
          
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm mt-4">
            <div>
              <span className="font-medium">模型: </span>
              {generation.model}
            </div>
            <div>
              <span className="font-medium">尺寸: </span>
              {generation.imageSize}
            </div>
            <div>
              <span className="font-medium">种子: </span>
              {generation.seed}
            </div>
            <div>
              <span className="font-medium">步数: </span>
              {generation.inferenceSteps}
            </div>
            <div>
              <span className="font-medium">指导系数: </span>
              {generation.guidanceScale}
            </div>
            <div>
              <span className="font-medium">创建时间: </span>
              {new Date(generation.createdAt).toLocaleString()}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
} 