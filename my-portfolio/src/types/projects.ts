import type { TechName } from "@/components/TechIcon";

export type ProjectItem = {
  id: number;
  title: string;
  image: string;
  repo: string;
  demo?: string;
  subdomain?: string;
  url?: string;
  tag?: string;
  tech: TechName[];
};