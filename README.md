# AI图片生成站

基于Next.js和AI技术构建的在线图片生成平台，支持根据文字描述(prompt)生成对应的图片。

## 功能需求

### 核心功能
- 文本到图片生成：用户输入文字描述(prompt)，系统生成对应图片
- 负面提示词(negative prompt)：支持用户输入不希望在图片中出现的元素
- 图片参数调整：支持调整图片大小、批量生成数量、随机种子等参数
- 图生图功能：支持上传基础图片，在此基础上进行修改生成
- 历史记录：使用本地存储(localStorage)保存用户之前生成的图片和对应的提示词
- 图片下载：支持下载生成的图片
- 收藏功能：允许用户在本地收藏喜欢的生成结果

### 用户体验
- 响应式设计：适配桌面和移动设备
- 实时预览：显示图片生成进度
- 提示词建议：智能推荐优质提示词
- 暗色/亮色模式切换
- 多语言支持

## 技术实现

### 前端技术栈
- **框架**：Next.js 14+，React 18+
- **语言**：TypeScript
- **样式**：Tailwind CSS
- **状态管理**：React Context API / Zustand
- **UI组件**：Shadcn UI
- **表单处理**：React Hook Form + Zod
- **HTTP请求**：Axios / SWR
- **本地存储**：localStorage / IndexedDB

### 后端技术
- **API路由**：Next.js API Routes
- **图片生成**：SiliconFlow API

### 部署
- **平台**：Vercel
- **CI/CD**：GitHub Actions

## 数据结构定义

### 生成记录(Generation)
```typescript
interface Generation {
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
```

### 提示词(Prompt)
```typescript
interface Prompt {
  id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  createdAt: string;
}
```

## 项目架构

```
picture_ai/
├── app/                    # Next.js App Router
│   ├── api/                # API路由
│   ├── explore/            # 探索页面
│   ├── generate/           # 图片生成页面
│   ├── history/            # 历史记录页面
│   ├── favorites/          # 收藏页面
│   └── settings/           # 设置页面
├── components/             # React组件
│   ├── ui/                 # 基础UI组件
│   ├── forms/              # 表单组件
│   ├── generate/           # 生成相关组件
│   ├── layout/             # 布局组件
│   └── shared/             # 共享组件
├── lib/                    # 工具函数库
│   ├── api.ts              # API调用
│   ├── storage.ts          # 本地存储逻辑
│   ├── utils.ts            # 通用工具
│   └── validations.ts      # 验证逻辑
├── hooks/                  # 自定义钩子
├── styles/                 # 全局样式
├── types/                  # TypeScript类型定义
├── public/                 # 静态资源
└── ...                     # 配置文件
```

## 开发步骤计划

### 第一阶段：项目搭建与基础功能（1-2周）
- [x] 初始化Next.js项目
- [x] 配置TypeScript
- [x] 集成Tailwind CSS和UI组件库
- [x] 设计基础页面布局
- [x] 实现图片生成API调用
- [x] 开发基础图片生成表单

### 第二阶段：用户体验优化（1-2周）
- [x] 实现响应式设计
- [x] 添加加载状态和错误处理
- [x] 开发图片预览和下载功能
- [x] 实现暗色/亮色模式切换
- [x] 优化表单交互体验

### 第三阶段：本地数据存储（1周）
- [x] 设计本地存储结构
- [x] 实现历史记录功能
- [x] 开发收藏功能
- [x] 添加设置页面

### 第四阶段：高级功能（1-2周）
- [ ] 实现图生图功能
- [ ] 添加提示词推荐系统
- [ ] 开发批量生成功能
- [ ] 实现参数调优界面
- [ ] 添加多语言支持

### 第五阶段：测试与部署（1周）
- [ ] 编写单元测试
- [ ] 进行集成测试
- [ ] 性能优化
- [ ] 部署到Vercel
- [ ] 监控与分析系统集成

## API示例

```javascript
const generateImage = async (prompt, options) => {
  const defaultOptions = {
    model: "Kwai-Kolors/Kolors",
    negative_prompt: "",
    image_size: "1024x1024",
    batch_size: 1,
    seed: Math.floor(Math.random() * 4999999999),
    num_inference_steps: 20,
    guidance_scale: 7.5,
    image: null // 用于图生图功能
  };

  const requestOptions = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.SILICONFLOW_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      ...defaultOptions,
      ...options,
      prompt
    })
  };

  try {
    const response = await fetch('https://api.siliconflow.cn/v1/images/generations', requestOptions);
    return await response.json();
  } catch (error) {
    console.error('Error generating image:', error);
    throw error;
  }
};
```

## 本地存储示例

```typescript
// lib/storage.ts
const STORAGE_KEYS = {
  GENERATIONS: 'picture_ai_generations',
  FAVORITES: 'picture_ai_favorites',
  SETTINGS: 'picture_ai_settings',
};

// 保存生成记录
export const saveGeneration = (generation: Generation): void => {
  try {
    const existingData = localStorage.getItem(STORAGE_KEYS.GENERATIONS);
    const generations = existingData ? JSON.parse(existingData) : [];
    generations.unshift(generation);
    localStorage.setItem(STORAGE_KEYS.GENERATIONS, JSON.stringify(generations));
  } catch (error) {
    console.error('Error saving generation to localStorage:', error);
  }
};

// 获取生成记录
export const getGenerations = (): Generation[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.GENERATIONS);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error getting generations from localStorage:', error);
    return [];
  }
};

// 切换收藏状态
export const toggleFavorite = (id: string): boolean => {
  try {
    const existingData = localStorage.getItem(STORAGE_KEYS.GENERATIONS);
    const generations = existingData ? JSON.parse(existingData) : [];
    
    const index = generations.findIndex((g: Generation) => g.id === id);
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
};
```

## 环境变量

```
NEXT_PUBLIC_APP_URL=http://localhost:3000
SILICONFLOW_API_KEY=your_api_key
```

## 开始使用

1. 克隆仓库
```bash
git clone https://github.com/yourusername/picture_ai.git
cd picture_ai
```

2. 安装依赖
```bash
npm install
```

3. 配置环境变量
```bash
cp .env.example .env.local
```
然后编辑 `.env.local` 文件，填入必要的环境变量。

4. 运行开发服务器
```bash
npm run dev
```

5. 打开浏览器访问 http://localhost:3000

## 贡献

欢迎提交PR和Issues！

## 许可证

MIT

