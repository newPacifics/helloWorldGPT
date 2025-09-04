"use client";
import Link from "next/link";
import { useState } from "react";
import FootprintDecor from "../ui/footprint-decor";

export default function NavBar() {
  const [literatureOpen, setLiteratureOpen] = useState(false);
  return (
    <div className="flex flex-row items-start w-full" style={{ marginTop: '38.2%' }}>
      <div className="h-full flex items-stretch pr-4">
        <FootprintDecor className="h-full w-6 min-h-[240px]" />
      </div>
      <ul className="flex flex-col gap-3 text-[1.5rem] font-semibold items-start w-full">
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
