/**
 * Site configuration — Centralized site settings following Astro Rocket reference
 * This is the source of truth for all site-wide configuration
 * It mirrors current SITE_CONFIG but with additional fields for future enhancements
 */

/** Site configuration interface */
export interface SiteConfig {
  /* Core site metadata */
  url: string;
  name: string;
  description: string;
  author: string;
  email: string;
  authorImage?: string;

  /* Social media and contact links */
  socialLinks: Array<{
    platform: string;
    url: string;
    icon?: string;
    label?: string;
  }>;

  /* Header configuration */
  header: {
    showSocialLinks: boolean;
    twitter?: string;
  };

  /* Search engine verification */
  verification: {
    google: string;
    bing: string;
  };

  /* Open Graph and social image */
  ogImage: string;

  /* Blog configuration */
  blog: {
    postsPerPage: number;
    tagCloudLimit: number;
  };

  /* Article features */
  articleFeatures: {
    toc: {
      enabled: boolean;
      layout: "sidebar" | "inline" | "none";
      sidebarPosition: "left" | "right";
      minHeadings: number;
      maxDepth: number;
    };
    comments: { enabled: boolean };
  };

  /* Blog image overlay */
  blogImageOverlay: boolean;

  /* Branding configuration */
  branding: {
    colors: {
      primary: string;
      secondary: string;
      accent: string;
      background: string;
      foreground: string;
      border: string;
      ring: string;
    };
    logo: { light: string; dark: string };
    favicon: string;
  };

  /* i18n configuration */
  i18n: {
    enabled: boolean;
    locales: string[];
    defaultLocale: string;
    routing: { prefixDefaultLocale: boolean };
  };
}

export const siteConfig: SiteConfig = {
  /* Core configuration — single source of truth for canonical/OG/sitemap/llms.txt.
   * Replace with your production domain when forking this template. */
  url: "https://zhysie.com",
  name: "zHysie",
  description: "zHysie 的个人网站：记录学习、开发、写作与日常。",
  author: "zHysie",
  email: "milzamsz@gmail.com",

  /* Social links */
  socialLinks: [
    {
      platform: "github",
      url: "https://github.com/zHysie",
      label: "GitHub",
    },
    { platform: "email", url: "mailto:milzamsz@gmail.com", label: "Email" },
  ],

  /* Header settings */
  header: {
    showSocialLinks: true,
  },

  /* Search engine verification */
  verification: {
    google: "",
    bing: "",
  },

  /* Social image */
  ogImage: "/images/og-default.jpg",

  /* Blog configuration */
  blog: {
    postsPerPage: 10,
    tagCloudLimit: 20,
  },

  /* Article features */
  articleFeatures: {
    toc: {
      enabled: true,
      layout: "sidebar",
      sidebarPosition: "right",
      minHeadings: 2,
      maxDepth: 3,
    },
    comments: { enabled: false },
  },

  /* Blog image overlay */
  blogImageOverlay: true,

  /* Branding */
  branding: {
    colors: {
      primary: "#141413",
      secondary: "#737373",
      accent: "#404040",
      background: "#f7f6f2",
      foreground: "#141413",
      border: "#e5e5e5",
      ring: "#141413",
    },
    logo: {
      light: "/logos/zHysie_logo.svg",
      dark: "/logos/zHysie_logo-dark.svg",
    },
    favicon: "/favicon.svg",
  },

  /* i18n configuration (matches i18n.config.ts) */
  i18n: {
    enabled: true,
    locales: ["zh-CN"],
    defaultLocale: "zh-CN",
    routing: { prefixDefaultLocale: false },
  },
} as const;

export default siteConfig;
