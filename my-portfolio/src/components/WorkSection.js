import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Carousel from "./ProjectsCarousel";
import { useAppContext } from "../context/AppContext";
import translations from "../i18n";
const imageMap = import.meta.glob("/src/assets/images/*.{png,jpg,jpeg,webp,avif,svg}", {
    eager: true,
    as: "?url",
    import: "default",
});
function resolveImg(name) {
    if (!name)
        return name;
    if (name.startsWith("/") || name.startsWith("http"))
        return name;
    const entry = Object.entries(imageMap).find(([path]) => path.endsWith("/" + name));
    if (entry)
        return entry[1];
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
            demo: "https://pong.sschwarz.ch",
            tech: ["react", "css"],
        },
        {
            id: 1,
            title: "Tic-Tac-Toe",
            image: "Tic-Tac-Toe.png",
            repo: "https://github.com/OutlawGhoul/TicTacToe",
            demo: "https://tictactoe.sschwarz.ch",
            tech: ["html", "js", "css"],
        },
        {
            id: 2,
            title: lang.weatherApp,
            image: "Wheater-App.png",
            repo: "https://github.com/OutlawGhoul/WeatherApp",
            demo: "https://weatherapp.sschwarz.ch",
            tech: ["html", "js", "css"],
        },
        {
            id: 3,
            title: lang.passwordGen,
            image: "Passwordgenerator.png",
            repo: "https://github.com/OutlawGhoul/PasswordGenerator",
            demo: "https://passwordgenerator.sschwarz.ch",
            tech: ["html", "js", "css"],
        },
        {
            id: 4,
            title: "Beautiful-Math",
            image: "BeautifulMath.png",
            repo: "https://github.com/OutlawGhoul/Mandelbrot",
            demo: "https://beautifulmath.sschwarz.ch",
            tech: ["react", "css"],
        },
        {
            id: 5,
            title: "Ultimate-Tic-Tac-Toe",
            image: "Ult-Tic-Tac-Toe.png",
            repo: "https://github.com/OutlawGhoul/ultimate-tic-tac-toe",
            demo: "https://ultimatetictactoe.sschwarz.ch",
            tech: ["react", "css"],
        },
        {
            id: 6,
            title: "Snake",
            image: "Snake.png",
            repo: "https://github.com/OutlawGhoul/Snake",
            demo: "https://snake.sschwarz.ch",
            tech: ["react", "css"],
        },
        {
            id: 7,
            title: lang.chess,
            image: "Chess.png",
            repo: "https://github.com/OutlawGhoul/Chess",
            demo: "https://chess.sschwarz.ch",
            tech: ["react", "css"],
        },
        {
            id: 8,
            title: lang.numbersys,
            image: "NumberSys.png",
            repo: "https://github.com/OutlawGhoul/NumberSystem",
            demo: "https://numbersystems.sschwarz.ch",
            tech: ["react", "css"],
        },
    ];
    const projectsResolved = projects.map((p) => ({
        ...p,
        image: resolveImg(p.image),
    }));
    return (_jsxs("section", { className: "container work-section", id: "work", children: [_jsx("h2", { children: lang.projectsTitle }), _jsx(Carousel, { items: projectsResolved })] }));
}
