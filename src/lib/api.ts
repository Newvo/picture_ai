import axios from 'axios';

// 定义图片生成选项接口
export interface GenerationOptions {
  model?: string;
  negative_prompt?: string;
  image_size?: string;
  batch_size?: number;
  seed?: number;
  num_inference_steps?: number;
  guidance_scale?: number;
  image?: string | null; // 用于图生图功能的base64图片
}

// 定义API响应接口
export interface GenerationResponse {
  id: string;
  images: string[]; // base64编码的图片
  model: string;
  parameters: {
    prompt: string;
    negative_prompt: string;
    image_size: string;
    batch_size: number;
    seed: number;
    num_inference_steps: number;
    guidance_scale: number;
  };
}

// 生成图片API调用
export async function generateImage(prompt: string, options?: GenerationOptions): Promise<GenerationResponse> {
  // 默认选项
  const defaultOptions: GenerationOptions = {
    model: "Kwai-Kolors/Kolors",
    negative_prompt: "",
    image_size: "1024x1024",
    batch_size: 1,
    seed: Math.floor(Math.random() * 4999999999),
    num_inference_steps: 20,
    guidance_scale: 7.5,
    image: null
  };

  try {
    // 合并默认选项和传入选项
    const mergedOptions = { ...defaultOptions, ...options };
    
    // 创建请求数据
    const requestData = {
      ...mergedOptions,
      prompt
    };

    // 创建请求头
    const headers = {
      'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SILICONFLOW_API_KEY}`,
      'Content-Type': 'application/json'
    };

    // 发送请求
    const response = await axios.post<GenerationResponse>(
      'https://api.siliconflow.cn/v1/images/generations',
      requestData,
      { headers }
    );

    return response.data;
  } catch (error) {
    console.error('Error generating image:', error);
    throw error;
  }
}

// 模拟API调用（开发阶段使用）
export async function mockGenerateImage(prompt: string, options?: GenerationOptions): Promise<GenerationResponse> {
  // 默认选项
  const defaultOptions: GenerationOptions = {
    model: "Kwai-Kolors/Kolors",
    negative_prompt: "",
    image_size: "1024x1024",
    batch_size: 1,
    seed: Math.floor(Math.random() * 4999999999),
    num_inference_steps: 20,
    guidance_scale: 7.5,
    image: null
  };

  // 合并默认选项和传入选项
  const mergedOptions = { ...defaultOptions, ...options };
  
  // 模拟延迟
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // 生成随机ID
  const id = Math.random().toString(36).substring(2, 15);
  
  // 返回模拟响应
  return {
    id,
    images: [
      // 占位图片URL，实际项目中会返回base64编码的图片
      "https://via.placeholder.com/1024x1024?text=Generated+Image"
    ],
    model: mergedOptions.model || defaultOptions.model,
    parameters: {
      prompt,
      negative_prompt: mergedOptions.negative_prompt || "",
      image_size: mergedOptions.image_size || "1024x1024",
      batch_size: mergedOptions.batch_size || 1,
      seed: mergedOptions.seed || Math.floor(Math.random() * 4999999999),
      num_inference_steps: mergedOptions.num_inference_steps || 20,
      guidance_scale: mergedOptions.guidance_scale || 7.5,
    }
  };
} 