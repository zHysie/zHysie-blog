import type { APIRoute } from "astro";
import { siteConfig } from "../config/site.config";

export const prerender = true;

interface LlmLink {
  label: string;
  path: string;
  description: string;
}

const corePages: LlmLink[] = [
  { label: "首页", path: "/", description: "个人博客首页。" },
  {
    label: "关于我",
    path: "/about",
    description: "zHysie 的关注方向与联系方式。",
  },
  {
    label: "实验室",
    path: "/lab",
    description: "已经上线和持续迭代的站内实验。",
  },
  {
    label: "装备",
    path: "/uses",
    description: "工作空间、开发工具与站点技术栈。",
  },
  { label: "文章", path: "/posts", description: "文章归档、分类与标签。" },
  { label: "日常", path: "/daily", description: "短篇日常记录。" },
  { label: "时光", path: "/timeline", description: "文章与日常的时间轴。" },
  { label: "开发文档", path: "/docs", description: "英文开发与维护文档。" },
];

const stack: LlmLink[] = [
  {
    label: "Astro",
    path: "https://astro.build",
    description: "静态站点与内容框架。",
  },
  {
    label: "Starlight",
    path: "https://starlight.astro.build",
    description: "Astro 文档框架。",
  },
  {
    label: "Cloudflare Pages",
    path: "https://pages.cloudflare.com",
    description: "静态站点托管与边缘分发。",
  },
];

export const GET: APIRoute = () => {
  const base = siteConfig.url.replace(/\/$/, "");
  const toUrl = (path: string) =>
    path.startsWith("http") ? path : `${base}${path}`;
  const section = (links: LlmLink[]) =>
    links
      .map(
        (link) => `- [${link.label}](${toUrl(link.path)}): ${link.description}`,
      )
      .join("\n");

  const body = `# ${siteConfig.name}

> ${siteConfig.description}。公开站点为中文，并提供浅色与深色主题、博客、站内搜索、RSS、站点地图和英文开发文档。

## 主要页面

${section(corePages)}

## 技术栈

${section(stack)}
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
