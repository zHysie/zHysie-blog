# zHysie Blog

zHysie 的个人博客与实验网站，使用 **Astro 7**、Markdown 和 Cloudflare Pages 构建。公开站点以中文呈现，`/docs` 保留英文开发文档。

## 站点内容

- 文章、日常与时光轴共享类型化内容集合
- 关于我、实验室与装备页使用同一套编辑式个人页面系统
- 浅色与深色主题、键盘焦点和减少动态效果支持
- Pagefind 搜索、RSS、站点地图、Open Graph 与结构化数据
- 静态输出与 Cloudflare Pages 发布链路

## 本地运行

```bash
git clone https://github.com/zHysie/zHysie-blog.git
cd zHysie-blog
pnpm install
pnpm dev
```

默认开发地址为 `http://localhost:4321`。

## 常用检查

```bash
pnpm test
pnpm lint
pnpm build
pnpm test:e2e
```

设计知识位于 `system/globals/`，站点品牌配置位于 `src/config/site.config.ts`，组件和页面目录位于 `src/registry.json`。

## 发布

生产分支为 `master`。构建命令为 `pnpm build`，输出目录为 `dist`。更完整的本地和 Cloudflare Pages 配置见 [SETUP.md](SETUP.md)。

## 许可证

[MIT](LICENSE)
