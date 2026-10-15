/**
 * Navigation configuration — Centralized navigation structure
 * Defines main navigation links and footer sections
 * Used by Header and Footer components for consistent navigation
 */

export interface NavItem {
  /** Navigation link URL */
  href: string;
  /** Translation key for localized label */
  labelKey: string;
  /** Optional icon name for icon-only navigation items */
  icon?: string;
  /** Whether this is an external link (opens in new tab) */
  external?: boolean;
  /** Sub-navigation items for dropdown menus */
  children?: NavItem[];
}

/** Main navigation items for header */
export const mainNav: NavItem[] = [
  { href: "/", labelKey: "nav.home", icon: "lucide:house" },
  { href: "/posts", labelKey: "nav.posts", icon: "lucide:pen-tool" },
  { href: "/daily", labelKey: "nav.daily", icon: "lucide:coffee" },
  { href: "/timeline", labelKey: "nav.timeline", icon: "lucide:clock" },
  {
    href: "#",
    labelKey: "nav.more",
    icon: "lucide:more-horizontal",
    children: [
      { href: "/about", labelKey: "nav.about", icon: "lucide:user-round" },
      { href: "/lab", labelKey: "nav.lab", icon: "lucide:flask-conical" },
      { href: "/uses", labelKey: "nav.uses", icon: "lucide:laptop" },
    ],
  },
] as const;
