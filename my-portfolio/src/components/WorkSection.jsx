import React from "react";
import ProjectsCarousel from "./ProjectsCarousel";
import { useAppContext } from "../context/AppContext";
import translations from "../i18n";


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
    // Coming soon
  ];
  
    return (
        <section className="work-section container" id="work">
            <h2>{lang.projectsTitle}</h2>
            <ProjectsCarousel items={projects} />
        </section>
    );
}