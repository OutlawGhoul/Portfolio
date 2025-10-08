import React from "react";
import Carousel from "./ProjectsCarousel";
import { useAppContext } from "../context/AppContext";
import translations from "../i18n";

const imageMap = import.meta.glob("/src/assets/images/*.{png,jpg,jpeg,webp,avif,svg}", {
  eager: true,
  as: "url",
});

function resolveImg(name) {
  if (!name) return name;
  if (name.startsWith("/") || name.startsWith("http")) return name;
  const entry = Object.entries(imageMap).find(([path]) => path.endsWith("/" + name));
  if (entry) return entry[1];
  console.warn("Image not found:", name);
  return name;
}

export default function WorkSection() {
  const { language } = useAppContext();
  const lang = translations[language];

  const projects = [
    {
      id: 0,
      title: "Pong",
      image: "Pong.png",
      repo: "https://github.com/OutlawGhoul/Pong",
      tech: ["react", "css"],
    },
    {
      id: 1,
      title: "Tic-Tac-Toe",
      image: "Tic-Tac-Toe.png",
      repo: "https://github.com/OutlawGhoul/TicTacToe",
      tech: ["html", "js", "css"],
    },
    {
      id: 2,
      title: "Wheater-App",
      image: "Wheater-App.png",
      repo: "https://github.com/OutlawGhoul/WeatherApp",
      tech: ["html", "js", "css"],
    },
    {
      id: 3,
      title: lang.passwordGen,
      image: "Passwordgenerator.png",
      repo: "https://github.com/OutlawGhoul/PasswordGenerator",
      tech: ["html", "js", "css"],
    },
    {
      id: 4,
      title: lang.passwordGen,
      image: "portfolio.png",
      repo: "https://github.com/OutlawGhoul/TicTacToe",
      tech: ["html", "js", "css"],
    },
    {
      id: 5,
      title: lang.passwordGen,
      image: "portfolio.png",
      repo: "https://github.com/OutlawGhoul/ultimate-tic-tac-toe",
      tech: ["html", "js", "css"],
    },
    {
      id: 6,
      title: lang.passwordGen,
      image: "portfolio.png",
      repo: "https://github.com/OutlawGhoul/Snake",
      tech: ["html", "js", "css"],
    },
  ];

  const projectsResolved = projects.map(p => ({ ...p, image: resolveImg(p.image) }));

  return (
    <section className="work-section container" id="work">
      <h2>{lang.projectsTitle}</h2>
      <Carousel items={projectsResolved} />
    </section>
  );
}
