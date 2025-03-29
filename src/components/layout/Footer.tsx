export function Footer() {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          © {new Date().getFullYear()} AI图片生成站. 保留所有权利。
        </p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <a href="#" className="hover:text-foreground">
            隐私政策
          </a>
          <a href="#" className="hover:text-foreground">
            使用条款
          </a>
          <a href="#" className="hover:text-foreground">
            联系我们
          </a>
        </div>
      </div>
    </footer>
  );
} 