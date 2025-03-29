import { useState, useEffect } from 'react';

// 本地存储钩子，用于在组件中使用本地存储数据
export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void] {
  // 获取数据的函数
  const readValue = (): T => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  };

  // 存储状态值
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  // 初始化时读取本地存储
  useEffect(() => {
    setStoredValue(readValue());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 返回包装过的版本，将新值同步到localStorage
  const setValue = (value: T | ((val: T) => T)) => {
    if (typeof window === 'undefined') {
      console.warn(`Cannot set localStorage key "${key}" when not in browser`);
      return;
    }

    try {
      // 允许值是函数，类似于useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // 保存到state
      setStoredValue(valueToStore);
      
      // 保存到localStorage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
      
      // 触发事件通知其他标签页
      window.dispatchEvent(new Event('local-storage'));
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  };

  // 监听其他标签页的变化
  useEffect(() => {
    const handleStorageChange = () => {
      setStoredValue(readValue());
    };
    
    // 当前标签页的变化
    window.addEventListener('local-storage', handleStorageChange);
    // 其他标签页的变化
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('local-storage', handleStorageChange);
      window.removeEventListener('storage', handleStorageChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [storedValue, setValue];
} 