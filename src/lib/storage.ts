import { v4 as uuidv4 } from 'uuid';

// 存储键
export const STORAGE_KEYS = {
  GENERATIONS: 'picture_ai_generations',
  FAVORITES: 'picture_ai_favorites',
  SETTINGS: 'picture_ai_settings',
};

// 生成记录类型
export interface Generation {
  id: string;
  prompt: string;
  negativePrompt: string | null;
  imageUrl: string;
  imageSize: string;
  model: string;
  seed: number;
  inferenceSteps: number;
  guidanceScale: number;
  batchSize: number;
  sourceImageUrl: string | null;
  isFavorite: boolean;
  createdAt: string;
}

// 应用设置类型
export interface AppSettings {
  theme: 'light' | 'dark' | 'system';
  language: 'zh' | 'en';
  defaultModel: string;
  defaultSize: string;
  defaultSteps: number;
  defaultGuidance: number;
}

// 默认设置
export const DEFAULT_SETTINGS: AppSettings = {
  theme: 'system',
  language: 'zh',
  defaultModel: 'Kwai-Kolors/Kolors',
  defaultSize: '1024x1024',
  defaultSteps: 20,
  defaultGuidance: 7.5,
};

// 保存生成记录
export function saveGeneration(generation: Omit<Generation, 'id' | 'createdAt' | 'isFavorite'>): Generation {
  try {
    const existingData = localStorage.getItem(STORAGE_KEYS.GENERATIONS);
    const generations: Generation[] = existingData ? JSON.parse(existingData) : [];
    
    // 创建带有ID和时间戳的完整记录
    const newGeneration: Generation = {
      ...generation,
      id: uuidv4(),
      isFavorite: false,
      createdAt: new Date().toISOString(),
    };
    
    // 将新记录添加到列表开头
    generations.unshift(newGeneration);
    
    // 保存到localStorage
    localStorage.setItem(STORAGE_KEYS.GENERATIONS, JSON.stringify(generations));
    
    return newGeneration;
  } catch (error) {
    console.error('Error saving generation to localStorage:', error);
    throw error;
  }
}

// 获取生成记录
export function getGenerations(): Generation[] {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.GENERATIONS);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error getting generations from localStorage:', error);
    return [];
  }
}

// 获取收藏记录
export function getFavorites(): Generation[] {
  try {
    const generations = getGenerations();
    return generations.filter(g => g.isFavorite);
  } catch (error) {
    console.error('Error getting favorites from localStorage:', error);
    return [];
  }
}

// 切换收藏状态
export function toggleFavorite(id: string): boolean {
  try {
    const existingData = localStorage.getItem(STORAGE_KEYS.GENERATIONS);
    const generations: Generation[] = existingData ? JSON.parse(existingData) : [];
    
    const index = generations.findIndex(g => g.id === id);
    if (index !== -1) {
      generations[index].isFavorite = !generations[index].isFavorite;
      localStorage.setItem(STORAGE_KEYS.GENERATIONS, JSON.stringify(generations));
      return generations[index].isFavorite;
    }
    return false;
  } catch (error) {
    console.error('Error toggling favorite in localStorage:', error);
    return false;
  }
}

// 获取应用设置
export function getSettings(): AppSettings {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    return data ? { ...DEFAULT_SETTINGS, ...JSON.parse(data) } : DEFAULT_SETTINGS;
  } catch (error) {
    console.error('Error getting settings from localStorage:', error);
    return DEFAULT_SETTINGS;
  }
}

// 保存应用设置
export function saveSettings(settings: Partial<AppSettings>): AppSettings {
  try {
    const currentSettings = getSettings();
    const newSettings = { ...currentSettings, ...settings };
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(newSettings));
    return newSettings;
  } catch (error) {
    console.error('Error saving settings to localStorage:', error);
    throw error;
  }
}

// 删除生成记录
export function deleteGeneration(id: string): boolean {
  try {
    const existingData = localStorage.getItem(STORAGE_KEYS.GENERATIONS);
    const generations: Generation[] = existingData ? JSON.parse(existingData) : [];
    
    const filteredGenerations = generations.filter(g => g.id !== id);
    
    if (filteredGenerations.length !== generations.length) {
      localStorage.setItem(STORAGE_KEYS.GENERATIONS, JSON.stringify(filteredGenerations));
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error deleting generation from localStorage:', error);
    return false;
  }
} 