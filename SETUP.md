# 本地开发与发布

## 环境

- Node.js 24
- pnpm 8.15
- 发布时需要 Cloudflare 账户

## 本地开发

```bash
pnpm install
pnpm dev
```

访问 `http://localhost:4321`。公开站点默认语言为 `zh-CN`，英文仅保留在 `/docs`。

## 构建与预览

```bash
pnpm build
pnpm preview
```

## Cloudflare Pages

连接 `zHysie/zHysie-blog` 后使用以下设置：

- 生产分支：`master`
- 构建命令：`pnpm build`
- 输出目录：`dist`
- 生产域名：`https://zhysie.com`

如需从命令行发布：

```bash
pnpm build
npx wrangler pages deploy dist --project-name=zhysie-blog --branch=master
```

发布前应通过仓库定义的全部测试、样式、类型、国际化、秘密扫描和生产构建检查。
