"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { generateImage, convertResponseToGenerations } from "@/lib/api";
import { saveGeneration } from "@/lib/storage";

interface TextToImageFormProps {
  onGenerationStart?: () => void;
  onGenerationComplete?: (imageUrl: string, imageId?: string) => void;
  onGenerationError?: (error: Error) => void;
  onBatchComplete?: (imageIds: string[]) => void;
}

export function TextToImageForm({
  onGenerationStart,
  onGenerationComplete,
  onGenerationError,
  onBatchComplete,
}: TextToImageFormProps) {
  // 表单状态
  const [prompt, setPrompt] = useState("");
  const [negativePrompt, setNegativePrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  
  // 图片参数
  const [imageSize, setImageSize] = useState("1024x1024");
  const [seed, setSeed] = useState(Math.floor(Math.random() * 4999999999));
  const [steps, setSteps] = useState(20);
  const [guidance, setGuidance] = useState(7.5);
  const [batchSize, setBatchSize] = useState(1);
  
  // 处理表单提交
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!prompt.trim()) {
      alert("请输入提示词");
      return;
    }
    
    setIsGenerating(true);
    onGenerationStart?.();
    
    try {
      // 准备API参数
      const options = {
        negative_prompt: negativePrompt,
        image_size: imageSize,
        seed,
        num_inference_steps: steps,
        guidance_scale: guidance,
        batch_size: batchSize
      };
      
      // 调用生成API
      const response = await generateImage(prompt, options);
      
      if (response.images.length === 0) {
        throw new Error("图片生成失败：API没有返回图片");
      }
      
      // 转换API响应为存储格式
      const generationsData = convertResponseToGenerations(response, prompt, options);
      
      // 保存所有生成的图片
      const savedGenerations = generationsData.map(data => saveGeneration(data));
      
      // 如果是批量生成，则通知父组件所有生成的ID
      if (batchSize > 1 && onBatchComplete) {
        onBatchComplete(savedGenerations.map(gen => gen.id));
      } 
      // 否则只通知第一张图片
      else if (onGenerationComplete) {
        onGenerationComplete(savedGenerations[0].imageUrl, savedGenerations[0].id);
      }
      
      // 重置随机种子
      setSeed(Math.floor(Math.random() * 4999999999));
    } catch (error) {
      console.error("生成图片失败:", error);
      onGenerationError?.(error as Error);
    } finally {
      setIsGenerating(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* 提示词输入 */}
      <div className="space-y-2">
        <label htmlFor="prompt" className="block text-sm font-medium">
          提示词
        </label>
        <textarea
          id="prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="w-full min-h-[100px] p-2 border rounded-md"
          placeholder="输入详细的图片描述，例如：一只可爱的小猫咪，躺在窗台上晒太阳，高清摄影风格"
          disabled={isGenerating}
        />
      </div>
      
      {/* 负面提示词输入 */}
      <div className="space-y-2">
        <label htmlFor="negativePrompt" className="block text-sm font-medium">
          负面提示词（可选）
        </label>
        <textarea
          id="negativePrompt"
          value={negativePrompt}
          onChange={(e) => setNegativePrompt(e.target.value)}
          className="w-full min-h-[60px] p-2 border rounded-md"
          placeholder="指定不希望在图片中出现的元素，例如：模糊，低质量，变形"
          disabled={isGenerating}
        />
      </div>
      
      {/* 图片参数设置 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* 图片尺寸 */}
        <div className="space-y-2">
          <label htmlFor="imageSize" className="block text-sm font-medium">
            图片尺寸
          </label>
          <select
            id="imageSize"
            value={imageSize}
            onChange={(e) => setImageSize(e.target.value)}
            className="w-full p-2 border rounded-md"
            disabled={isGenerating}
          >
            <option value="512x512">512 x 512</option>
            <option value="768x768">768 x 768</option>
            <option value="1024x1024">1024 x 1024</option>
            <option value="960x1280">960 x 1280 (竖版)</option>
            <option value="768x1024">768 x 1024 (竖版)</option>
            <option value="720x1440">720 x 1440 (竖版)</option>
            <option value="720x1280">720 x 1280 (竖版)</option>
          </select>
        </div>
        
        {/* 随机种子 */}
        <div className="space-y-2">
          <label htmlFor="seed" className="block text-sm font-medium">
            随机种子
          </label>
          <input
            type="number"
            id="seed"
            value={seed}
            onChange={(e) => setSeed(Number(e.target.value))}
            className="w-full p-2 border rounded-md"
            min={0}
            max={9999999999}
            disabled={isGenerating}
          />
        </div>
        
        {/* 推理步数 */}
        <div className="space-y-2">
          <label htmlFor="steps" className="block text-sm font-medium">
            推理步数 ({steps})
          </label>
          <input
            type="range"
            id="steps"
            value={steps}
            onChange={(e) => setSteps(Number(e.target.value))}
            className="w-full"
            min={1}
            max={100}
            step={1}
            disabled={isGenerating}
          />
        </div>
        
        {/* 引导系数 */}
        <div className="space-y-2">
          <label htmlFor="guidance" className="block text-sm font-medium">
            引导系数 ({guidance})
          </label>
          <input
            type="range"
            id="guidance"
            value={guidance}
            onChange={(e) => setGuidance(Number(e.target.value))}
            className="w-full"
            min={0}
            max={20}
            step={0.1}
            disabled={isGenerating}
          />
        </div>
        
        {/* 批量生成数量 */}
        <div className="space-y-2">
          <label htmlFor="batchSize" className="block text-sm font-medium">
            批量生成数量 ({batchSize})
          </label>
          <input
            type="range"
            id="batchSize"
            value={batchSize}
            onChange={(e) => setBatchSize(Number(e.target.value))}
            className="w-full"
            min={1}
            max={4}
            step={1}
            disabled={isGenerating}
          />
        </div>
      </div>
      
      {/* 提交按钮 */}
      <Button
        type="submit"
        className="w-full"
        disabled={isGenerating || !prompt.trim()}
      >
        {isGenerating ? "生成中..." : `生成${batchSize > 1 ? batchSize + '张' : ''}图片`}
      </Button>
    </form>
  );
} 