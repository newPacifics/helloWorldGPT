"use client";
import Link from "next/link";
import { useState } from "react";

export default function NavBar() {
  const [literatureOpen, setLiteratureOpen] = useState(false);
  return (
    <ul className="flex flex-col gap-1">
      <li>
        <Link href="/">Sev'Log</Link>
      </li>
      <li>
        <Link href="/techie">Techie</Link>
      </li>
      <li>
        <button
          className="text-left w-full focus:outline-none"
          onClick={() => setLiteratureOpen((open) => !open)}
        >
          Literature
        </button>
        {literatureOpen && (
          <ul className="pl-4 flex flex-col gap-1">
            <li>
              <Link href="/literature/quotes">Quotes</Link>
            </li>
            <li>
              <Link href="/literature/readings">Readings</Link>
            </li>
          </ul>
        )}
      </li>
      <li>
        <Link href="/search">Search</Link>
      </li>
      <li>
        <Link href="/contact">Contact</Link>
      </li>
    </ul>
  );
}
