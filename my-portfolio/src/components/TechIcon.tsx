import React from "react";
import type { IconType } from "react-icons";
import {
  SiReact,
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiNodedotjs,
  SiVite,
  SiGithub,
  SiGit,
  SiPhp,
  SiLaravel,
  SiLinkedin,
} from "react-icons/si";

export type TechName =
  | "react"
  | "javascript"
  | "js"
  | "html"
  | "html5"
  | "css"
  | "css3"
  | "node"
  | "nodejs"
  | "node.js"
  | "vite"
  | "git"
  | "gh"
  | "github"
  | "php"
  | "laravel"
  | "linkedin";

type TechIconProps = {
  name?: string;
  label?: string;
  size?: number;
};

const MAP: Record<TechName, IconType> = {
  react: SiReact,

  javascript: SiJavascript,
  js: SiJavascript,

  html5: SiHtml5,
  html: SiHtml5,

  css3: SiCss3,
  css: SiCss3,

  nodejs: SiNodedotjs,
  "node.js": SiNodedotjs,
  node: SiNodedotjs,

  vite: SiVite,

  github: SiGithub,
  gh: SiGithub,
  git: SiGit,

  php: SiPhp,
  laravel: SiLaravel,

  linkedin: SiLinkedin,
};

const CANON: Record<TechName, string> = {
  react: "react",
  javascript: "js",
  js: "js",
  html5: "html",
  html: "html",
  css3: "css",
  css: "css",
  nodejs: "node",
  node: "node",
  "node.js": "node",
  vite: "vite",
  github: "git",
  gh: "git",
  git: "git",
  php: "php",
  laravel: "laravel",
  linkedin: "linkedin",
};

const norm = (name?: string): string =>
  String(name ?? "")
    .trim()
    .toLowerCase();

const TechIcon: React.FC<TechIconProps> = ({ name, label, size = 18 }) => {
  const key = norm(name) as TechName;
  const Icon = MAP[key];
  const canon = CANON[key] ?? key;

  if (!Icon)
    return (
      <span
        className="tech-icon"
        title={label || name}
        aria-label={label || name}
      >
        🧩
      </span>
    );

  return (
    <Icon
      title={label || key}
      aria-label={label || key}
      size={size}
      className="tech-icon"
      data-name={canon}
    />
  );
};

export default TechIcon;
