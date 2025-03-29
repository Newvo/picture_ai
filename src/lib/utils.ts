import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * 合并多个类名并解决可能的冲突
 * 使用clsx处理条件类名，使用twMerge合并Tailwind类
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * 通用工具函数
 */

/**
 * 将文件转换为Base64字符串
 * @param file 要转换的文件
 * @returns Promise包含base64字符串
 */
export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('转换文件到Base64失败'));
      }
    };
    reader.onerror = error => reject(error);
  });
}

/**
 * 检查文件是否为图片
 * @param file 要检查的文件
 * @returns 是否为图片文件
 */
export function isImageFile(file: File): boolean {
  return file.type.startsWith('image/');
}

/**
 * 格式化文件大小
 * @param bytes 文件大小（字节）
 * @returns 格式化后的文件大小字符串
 */
export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
  if (bytes < 1024 * 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  return (bytes / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
} 