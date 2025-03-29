"use client";

import { useState, useEffect } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { getSettings, saveSettings, AppSettings, DEFAULT_SETTINGS } from "@/lib/storage";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useTheme } from "next-themes";
import { toast } from "sonner";

export default function SettingsPage() {
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);
  const [isLoaded, setIsLoaded] = useState(false);
  const { setTheme } = useTheme();

  // 加载设置
  useEffect(() => {
    try {
      const savedSettings = getSettings();
      setSettings(savedSettings);
      setTheme(savedSettings.theme);
    } catch (error) {
      console.error("加载设置失败:", error);
    } finally {
      setIsLoaded(true);
    }
  }, [setTheme]);

  // 保存设置
  const handleSaveSettings = () => {
    try {
      saveSettings(settings);
      setTheme(settings.theme);
      toast.success("设置已保存");
    } catch (error) {
      console.error("保存设置失败:", error);
      toast.error("保存设置失败");
    }
  };

  // 更新设置值
  const updateSetting = <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  if (!isLoaded) {
    return (
      <MainLayout>
        <div className="container max-w-6xl mx-auto py-8 px-4 md:px-6">
          <h1 className="text-3xl font-bold mb-6">设置</h1>
          <div className="text-center py-12">
            <p className="text-muted-foreground">加载中...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container max-w-6xl mx-auto py-8 px-4 md:px-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">设置</h1>
          <Button onClick={handleSaveSettings}>保存设置</Button>
        </div>
        
        <div className="max-w-3xl mx-auto space-y-8">
          {/* 应用设置 */}
          <Card>
            <CardHeader>
              <CardTitle>应用设置</CardTitle>
              <CardDescription>自定义应用的外观和语言</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="theme">主题</Label>
                <Select 
                  value={settings.theme} 
                  onValueChange={(value) => updateSetting('theme', value as 'light' | 'dark' | 'system')}
                >
                  <SelectTrigger id="theme">
                    <SelectValue placeholder="选择主题" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">浅色</SelectItem>
                    <SelectItem value="dark">深色</SelectItem>
                    <SelectItem value="system">跟随系统</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="language">语言</Label>
                <Select 
                  value={settings.language} 
                  onValueChange={(value) => updateSetting('language', value as 'zh' | 'en')}
                >
                  <SelectTrigger id="language">
                    <SelectValue placeholder="选择语言" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="zh">中文</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
          
          {/* 生成参数默认值 */}
          <Card>
            <CardHeader>
              <CardTitle>生成参数默认值</CardTitle>
              <CardDescription>设置图片生成时的默认参数</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="defaultModel">默认模型</Label>
                <Select 
                  value={settings.defaultModel} 
                  onValueChange={(value) => updateSetting('defaultModel', value)}
                >
                  <SelectTrigger id="defaultModel">
                    <SelectValue placeholder="选择默认模型" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Kwai-Kolors/Kolors">Kwai-Kolors/Kolors</SelectItem>
                    <SelectItem value="Kwai-Kolors/ColorsV2">Kwai-Kolors/ColorsV2</SelectItem>
                    <SelectItem value="stability-ai/sd-xl">stability-ai/sd-xl</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="defaultSize">默认尺寸</Label>
                <Select 
                  value={settings.defaultSize} 
                  onValueChange={(value) => updateSetting('defaultSize', value)}
                >
                  <SelectTrigger id="defaultSize">
                    <SelectValue placeholder="选择默认尺寸" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="512x512">512x512</SelectItem>
                    <SelectItem value="768x768">768x768</SelectItem>
                    <SelectItem value="1024x1024">1024x1024</SelectItem>
                    <SelectItem value="1024x768">1024x768 (横向)</SelectItem>
                    <SelectItem value="768x1024">768x1024 (纵向)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="defaultSteps">默认推理步数 ({settings.defaultSteps})</Label>
                <Slider
                  id="defaultSteps"
                  min={10}
                  max={50}
                  step={1}
                  value={[settings.defaultSteps]}
                  onValueChange={(value) => updateSetting('defaultSteps', value[0])}
                  className="my-4"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>10</span>
                  <span>30</span>
                  <span>50</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="defaultGuidance">默认指导系数 ({settings.defaultGuidance})</Label>
                <Slider
                  id="defaultGuidance"
                  min={1}
                  max={15}
                  step={0.5}
                  value={[settings.defaultGuidance]}
                  onValueChange={(value) => updateSetting('defaultGuidance', value[0])}
                  className="my-4"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>1</span>
                  <span>7.5</span>
                  <span>15</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
} 