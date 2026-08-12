export interface PersonalPageEntry {
  title: string;
  description: string;
  meta?: string;
  tags?: string[];
  href?: string;
  external?: boolean;
}

export interface PersonalPageGroup {
  title: string;
  description?: string;
  entries: PersonalPageEntry[];
}

export interface PersonalPageData {
  variant: "about" | "lab" | "uses";
  eyebrow: string;
  title: string;
  lead: string;
  note: string;
  groups: PersonalPageGroup[];
}

export const aboutPage: PersonalPageData = {
  variant: "about",
  eyebrow: "ABOUT / 关于我",
  title: "在学习、开发与写作之间，留下可以再次抵达的坐标。",
  lead: "我是 zHysie。这里记录我如何理解技术、整理知识，也记录那些尚未形成答案的日常观察。比起展示一个完成的人，我更愿意保留过程。",
  note: "这份介绍会跟随正在进行的学习和项目持续更新。",
  groups: [
    {
      title: "此刻关注",
      description: "正在反复实践，并愿意长期写下去的方向。",
      entries: [
        {
          title: "把知识整理成回得去的路",
          description:
            "不把笔记当作收藏夹，而是保留问题、判断与下一步，让未来的自己能够重新进入当时的语境。",
          href: "/posts/knowledge-system-way-home",
          meta: "知识管理",
        },
        {
          title: "让工具安静地替人工作",
          description:
            "减少重复切换与无意义配置，把注意力留给真正需要判断的部分。",
          href: "/posts/quiet-development-tools",
          meta: "开发实践",
        },
        {
          title: "持续写作，而不是维持高产",
          description: "写作是给经验建立坐标；频率可以变化，但判断需要被留下。",
          href: "/posts/why-keep-writing",
          meta: "写作思考",
        },
      ],
    },
    {
      title: "我相信",
      entries: [
        {
          title: "先理解目的，再选择工具",
          description:
            "技术栈不是身份。能解释数据如何流动，比记住更多接口重要。",
        },
        {
          title: "小步完成，也要能够验证",
          description:
            "把复杂目标拆成可检查的结果，让每一步都能独立说明为什么成立。",
        },
        {
          title: "网站应该像本人，而不是模板",
          description:
            "视觉、文字与交互都服务于同一种气质：克制、清楚、保留好奇。",
        },
      ],
    },
    {
      title: "找到我",
      entries: [
        {
          title: "GitHub",
          description: "查看公开项目、代码与持续发生的改动。",
          href: "https://github.com/zHysie",
          external: true,
          meta: "github.com/zHysie",
        },
        {
          title: "电子邮件",
          description: "适合认真讨论一个问题、项目或合作想法。",
          href: "mailto:milzamsz@gmail.com",
          meta: "milzamsz@gmail.com",
        },
      ],
    },
  ],
};

export const labPage: PersonalPageData = {
  variant: "lab",
  eyebrow: "LAB / 实验室",
  title: "把还没有答案的想法，做成可以亲手触碰的实验。",
  lead: "这里不是作品陈列柜，而是一张持续变化的试验桌。每个项目都从一个具体问题开始，在代码、文字和视觉之间寻找更合适的表达。",
  note: "实验会继续迭代；状态表示当前完成度，而不是永久结论。",
  groups: [
    {
      title: "当前主实验",
      description: "以这座博客为容器，测试内容、时间和交互如何彼此连接。",
      entries: [
        {
          title: "zHysie 个人博客",
          description:
            "一座静态生成的个人知识空间：文章、日常与时间线共享同一套内容来源，同时保持快速、可访问和可长期维护。",
          href: "/",
          meta: "进行中 · 2026",
          tags: ["Astro", "TypeScript", "Cloudflare", "设计系统"],
        },
      ],
    },
    {
      title: "交互实验",
      entries: [
        {
          title: "ASCII 水墨入场",
          description:
            "把水墨风景采样成字符，在一次性的同心涟漪之后重组为完整画面，并为深浅主题和减少动态效果提供降级。",
          href: "/",
          meta: "已上线 · Canvas",
          tags: ["ASCII", "Canvas", "主题响应"],
        },
        {
          title: "横向年度时光轴",
          description:
            "把文章和日常投射到同一年度坐标中，桌面端沿横轴探索，移动端回到更自然的纵向阅读。",
          href: "/timeline",
          meta: "已上线 · 2026",
          tags: ["时间可视化", "响应式", "渐进增强"],
        },
        {
          title: "文章归档与标签纹理",
          description:
            "用轻量筛选和纸张般的交互反馈，让不断增长的内容仍然容易浏览，而不是堆成一面卡片墙。",
          href: "/posts",
          meta: "已上线 · 内容导航",
          tags: ["归档", "筛选", "微交互"],
        },
        {
          title: "点阵字标与 404 字符场",
          description:
            "用原生 Canvas 生成会响应指针的品牌字标，以及能够静态降级的字符化错误页面。",
          href: "/404",
          meta: "已上线 · 视觉组件",
          tags: ["点阵", "无障碍", "性能"],
        },
      ],
    },
  ],
};

export const usesPage: PersonalPageData = {
  variant: "uses",
  eyebrow: "USES / 装备",
  title: "我每天使用的设备、软件，以及让它们保持安静的方法。",
  lead: "这不是购买建议，而是一份工作环境记录。只写已经进入日常流程的工具；尚未确认的硬件型号不会被编造，之后会随实际使用补齐。",
  note: "最后更新于 2026 年 8 月；具体硬件型号仍在整理。",
  groups: [
    {
      title: "工作空间",
      description: "先记录作用，再补充型号；工具应该帮助身体和注意力保持稳定。",
      entries: [
        {
          title: "Windows 工作站",
          description:
            "主要开发环境，用于本地编程、浏览器验证、图像处理与 Git 工作流。",
          meta: "型号待更新",
        },
        {
          title: "显示与输入设备",
          description:
            "围绕长时间阅读、写作和键盘操作布置；具体显示器、键盘与指针设备后续补充。",
          meta: "清单整理中",
        },
      ],
    },
    {
      title: "开发工具",
      entries: [
        {
          title: "Codex",
          description:
            "用于代码审阅、实现、验证和跨文件任务协作；重要判断仍由可重复的检查结果确认。",
          meta: "AI 编程协作",
        },
        {
          title: "Git 与 GitHub",
          description:
            "版本记录和公开发布的主干；每次发布都核对本地提交与远端分支是否一致。",
          href: "https://github.com/zHysie",
          external: true,
          meta: "版本控制",
        },
        {
          title: "Playwright",
          description:
            "在真实浏览器里检查响应式布局、主题、键盘焦点和关键交互。",
          meta: "浏览器自动化",
        },
        {
          title: "pnpm",
          description:
            "管理 Node.js 依赖与脚本，锁定版本以保持本地和 CI 构建一致。",
          meta: "包管理",
        },
      ],
    },
    {
      title: "写作方法",
      entries: [
        {
          title: "Markdown / MDX",
          description: "让正文保持可读、可迁移，并和代码一起进入版本历史。",
          meta: "内容源格式",
        },
        {
          title: "日常记录与文章归档",
          description:
            "短记录保存现场，长文章整理判断；两者最后在时光轴中重新相遇。",
          href: "/daily",
          meta: "本站工作流",
        },
      ],
    },
    {
      title: "本站技术栈",
      entries: [
        {
          title: "Astro 7",
          description:
            "以静态 HTML 为默认结果，只在确实需要交互的区域加载客户端代码。",
          href: "https://astro.build",
          external: true,
          meta: "静态站点生成",
        },
        {
          title: "TypeScript + React",
          description:
            "TypeScript 约束数据和组件边界，React 仅用于少量需要状态的交互岛。",
          meta: "类型与交互",
        },
        {
          title: "Tailwind CSS 4 + 语义变量",
          description:
            "所有颜色、排版和间距通过设计变量进入组件，同时维持浅色与深色模式。",
          meta: "样式系统",
        },
        {
          title: "Cloudflare Pages",
          description:
            "承载静态构建与边缘分发，发布结果由 GitHub 中的源码和锁文件复现。",
          href: "https://pages.cloudflare.com",
          external: true,
          meta: "托管与分发",
        },
      ],
    },
  ],
};
