"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import FootprintDecor from "../ui/footprint-decor";

export default function NavBar() {
  const [literatureOpen, setLiteratureOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem("theme");
    if (stored === "dark" || stored === "light") {
      setTheme(stored);
      document.documentElement.classList.toggle("dark", stored === "dark");
    } else {
      const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
      const initial = prefersDark ? "dark" : "light";
      setTheme(initial);
      document.documentElement.classList.toggle("dark", initial === "dark");
    }
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("theme", next);
      document.documentElement.classList.toggle("dark", next === "dark");
    }
  };
  return (
    <div className="flex flex-row items-start w-full" style={{ marginTop: '38.2%' }}>
      <div className="h-full flex items-stretch pr-4">
        <FootprintDecor className="h-full w-6 min-h-[240px]" />
      </div>
      <ul className="flex flex-col gap-3 text-[1.5rem] font-semibold items-start w-full">
        <li className="w-full">
          <button
            onClick={toggleTheme}
            className="inline-flex items-center gap-2 rounded px-3 py-1.5 text-sm border border-border bg-card text-cardForeground hover:bg-muted"
            aria-label="Toggle theme"
            title="Toggle theme"
          >
            {theme === "dark" ? "Light mode" : "Dark mode"}
          </button>
        </li>
        <li className="w-full">
          <Link className="hover:underline block pl-2" href="/">Sev'Log</Link>
        </li>
        <li className="w-full">
          <Link className="hover:underline block pl-2" href="/techie">Techie</Link>
        </li>
        <li className="w-full">
          <button
            className="text-left w-full focus:outline-none hover:underline font-semibold pl-2"
            onClick={() => setLiteratureOpen((open) => !open)}
          >
            Literature
          </button>
          {literatureOpen && (
            <ul className="pl-6 flex flex-col gap-2 text-[1.1rem] font-medium items-start mt-1">
              <li className="w-full">
                <Link className="hover:underline block pl-2" href="/literature/quotes">Quotes</Link>
              </li>
              <li className="w-full">
                <Link className="hover:underline block pl-2" href="/literature/readings">Readings</Link>
              </li>
            </ul>
          )}
        </li>
        <li className="w-full">
          <Link className="hover:underline block pl-2" href="/search">Search</Link>
        </li>
        <li className="w-full">
          <Link className="hover:underline block pl-2" href="/contact">Contact</Link>
        </li>
      </ul>
    </div>
  );
}
