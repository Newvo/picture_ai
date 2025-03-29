import axios from 'axios';
import { Generation } from './storage';

/**
 * 图片生成选项接口
 */
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

/**
 * 图片生成响应接口
 */
export interface GenerationResponse {
  images: Array<{
    url: string; // 生成的图片URL，有效期为1小时
  }>;
  timings: {
    inference: number;
  };
  seed: number;
}

/**
 * 获取API基础URL
 */
const getApiUrl = () => {
  const baseUrl = process.env.NEXT_PUBLIC_SILICONFLOW_API_URL || 'https://api.siliconflow.cn/v1';
  return baseUrl;
};

/**
 * 生成图片API调用
 * @param prompt 提示词
 * @param options 生成选项
 * @returns 生成结果
 */
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
      `${getApiUrl()}/images/generations`,
      requestData,
      { headers }
    );

    return response.data;
  } catch (error) {
    console.error('Error generating image:', error);
    throw error;
  }
}

/**
 * 模拟API调用（开发阶段使用）
 */
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
  
  // 返回模拟响应
  return {
    images: Array(mergedOptions.batch_size || 1).fill(0).map(() => ({
      url: "https://via.placeholder.com/1024x1024?text=Generated+Image"
    })),
    timings: {
      inference: 3.5
    },
    seed: mergedOptions.seed || Math.floor(Math.random() * 4999999999)
  };
}

/**
 * 将API响应转换为存储格式
 * @param response API响应
 * @param prompt 提示词
 * @param options 生成选项
 * @returns 转换后的生成记录数组
 */
export function convertResponseToGenerations(
  response: GenerationResponse, 
  prompt: string, 
  options: GenerationOptions
): Omit<Generation, 'id' | 'createdAt' | 'isFavorite'>[] {
  return response.images.map(image => ({
    prompt,
    negativePrompt: options.negative_prompt || null,
    imageUrl: image.url,
    imageSize: options.image_size || '1024x1024',
    model: options.model || 'Kwai-Kolors/Kolors',
    seed: response.seed,
    inferenceSteps: options.num_inference_steps || 20,
    guidanceScale: options.guidance_scale || 7.5,
    batchSize: options.batch_size || 1,
    sourceImageUrl: options.image || null,
  }));
}

/**
 * 验证API配置是否正确
 * @returns 配置状态对象
 */
export function validateApiConfig() {
  const apiKey = process.env.NEXT_PUBLIC_SILICONFLOW_API_KEY;
  const apiUrl = getApiUrl();
  
  return {
    hasApiKey: !!apiKey && apiKey !== 'your_api_key_here',
    apiUrl,
    isConfigured: !!apiKey && apiKey !== 'your_api_key_here'
  };
} 