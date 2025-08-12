import React from "react";
import ProjectsCarousel from "./ProjectsCarousel";
import { useAppContext } from "../context/AppContext";
import translations from "../i18n";

const projects = [
  {
    id: 0,
    title: "Pong",
    image: "Pong.png",
    repo: "https://github.com/OutlawGhoul/Pong",
  },
  {
    id: 1,
    title: "Tic-Tac-Toe",
    image: "Tic-Tac-Toe.png",
    repo: "https://github.com/OutlawGhoul/TicTacToe",
  },
  {
    id: 2,
    title: "Wheater-App",
    image: "Wheater-App.png",
    repo: "https://github.com/OutlawGhoul/WeatherApp",
  },
  {
    id: 3,
    title: "Passwordgenerator",
    image: "Passwordgenerator.png",
    repo: "https://github.com/OutlawGhoul/PasswordGenerator",
  },
  // Coming soon
];

export default function WorkSection() {
  const { language } = useAppContext();
  const t = translations[language];
    return (
        <section className="work-section container" id="work">
            <h2>{t.projectsTitle}</h2>
            <ProjectsCarousel items={projects} />
        </section>
    );
}