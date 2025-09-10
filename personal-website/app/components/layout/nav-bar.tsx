"use client";
import Link from "next/link";
import { useState } from "react";
import FootprintDecor from "../ui/footprint-decor";

export default function NavBar() {
  const [literatureOpen, setLiteratureOpen] = useState(false);
  return (
    <div className="flex flex-col w-full">
      {/* Logo Section */}
      <div className="w-full pl-10 pt-6 pb-4 flex">
        <Link href="/" className="flex items-center justify-center">
          <img src="/icons/a-floating-wood-log.svg" alt="Site logo" className="h-24 w-auto" />
          <span className="inline-block rotate-90 origin-center text-sm font-semibold leading-none whitespace-nowrap select-none text-muted-foreground -ml-[35px]">
            WANDERLOG
          </span>
        </Link>
      </div>
      
      {/* Navigation Section */}
      <div className="flex flex-row items-start w-full px-5 pt-2">
      {/* <div className="h-full flex items-stretch pr-4"> TODO: re-draw footprint decor
        <FootprintDecor className="h-full w-6 min-h-[240px]" />
      </div> */}
      <ul className="flex flex-col gap-3 text-[1.0rem] font-semibold items-start w-full">
        <li className="w-full">
          <Link className="hover:underline pl-2 flex items-center gap-2" href="/engineering">
            <img src="/icons/carbon-machine-learning-model.svg" alt="" aria-hidden="true" className="h-5 w-5" />
            <span>Engineering</span>
          </Link>
        </li>
        <li className="w-full">
          <button
            className="text-left w-full focus:outline-none hover:underline font-semibold pl-2 flex items-center gap-2"
            onClick={() => setLiteratureOpen((open) => !open)}
          >
            <img src="/icons/entrance-stairs.svg" alt="" aria-hidden="true" className="h-5 w-5" />
            <span>Liberal Arts</span>
            <svg 
              className={`h-3 w-3 transition-transform duration-200 ${literatureOpen ? 'rotate-90' : ''}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          {literatureOpen && (
            <ul className="pl-6 flex flex-col gap-2 text-sm font-medium items-start mt-1">
              <li className="w-full">
                <Link className="hover:underline pl-2 flex items-center gap-2" href="/literature/quotes">
                  <img src="/icons/icon-06.svg" alt="" aria-hidden="true" className="h-4 w-4" />
                  <span>Quotes</span>
                </Link>
              </li>
              <li className="w-full">
                <Link className="hover:underline pl-2 flex items-center gap-2" href="/literature/readings">
                  <img src="/icons/icon-07.svg" alt="" aria-hidden="true" className="h-4 w-4" />
                  <span>Readings</span>
                </Link>
              </li>
            </ul>
          )}
        </li>
        <li className="w-full">
          <Link className="hover:underline pl-2 flex items-center gap-2" href="/search">
            <img src="/icons/mdi--tag-search-outline.svg" alt="" aria-hidden="true" className="h-5 w-5" />
            <span>Search</span>
          </Link>
        </li>
        <li className="w-full">
          <Link className="hover:underline pl-2 flex items-center gap-2" href="/contact">
            <img src="/icons/gravity-ui--card-heart.svg" alt="" aria-hidden="true" className="h-5 w-5" />
            <span>Contact</span>
          </Link>
        </li>
      </ul>
      </div>
    </div>
  );
}
