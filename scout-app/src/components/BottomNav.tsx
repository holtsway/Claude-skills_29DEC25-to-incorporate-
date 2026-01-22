"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
}

const SearchIcon = ({ active }: { active: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={active ? 2.5 : 1.5}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
    />
  </svg>
);

const LockerIcon = ({ active }: { active: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill={active ? "currentColor" : "none"}
    viewBox="0 0 24 24"
    strokeWidth={active ? 2 : 1.5}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
    />
  </svg>
);

const MapIcon = ({ active }: { active: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill={active ? "currentColor" : "none"}
    viewBox="0 0 24 24"
    strokeWidth={active ? 2 : 1.5}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z"
    />
  </svg>
);

export default function BottomNav() {
  const pathname = usePathname();

  const navItems: NavItem[] = [
    {
      href: "/",
      label: "Scout",
      icon: <SearchIcon active={pathname === "/"} />,
    },
    {
      href: "/locker",
      label: "Locker",
      icon: <LockerIcon active={pathname === "/locker"} />,
    },
    {
      href: "/map",
      label: "Map",
      icon: <MapIcon active={pathname === "/map"} />,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-nav-bg border-t border-navy-700 nav-safe-area z-50">
      <div className="flex justify-around items-center h-16 max-w-lg mx-auto px-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center py-2 px-4 rounded-lg transition-all duration-200 min-w-[72px] ${
                isActive
                  ? "text-nav-active"
                  : "text-nav-inactive hover:text-slate-300"
              }`}
            >
              {item.icon}
              <span
                className={`text-xs mt-1 font-medium tracking-wide uppercase ${
                  isActive ? "opacity-100" : "opacity-70"
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
