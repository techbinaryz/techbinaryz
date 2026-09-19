"use client";
import { useState } from "react";
import { navData } from "@/data/Navigation.data";
import {
  usePathname,
  useRouter,
} from "next/navigation";

interface NavigationProps {
  vertical?: boolean;
  onNavigate?: () => void;
}

export default function Navigation({ vertical = false, onNavigate }: NavigationProps) {
  const [openMenu, setOpenMenu] = useState<
    string | null
  >(null);

  const router = useRouter();
  const pathName = usePathname();

  return (
    <nav className={`flex relative ${vertical ? "flex-col w-full gap-1" : "items-center"}`}>
      {navData.map((item, index) => (
        <div
          key={index}
          className="relative"
          onMouseEnter={() =>
            setOpenMenu(item.navOp)
          }
          onMouseLeave={() => setOpenMenu(null)}
        >
          {/* Main Options */}
          <button
            className={`flex items-center cursor-pointer rounded-full text-sm font-medium hover:text-[#725cff] 
                ${vertical ? "w-full px-4 py-3 justify-start gap-3" : "w-26 justify-center px-3.5"}
                ${pathName === item.link ? "bg-muted-sub my-0.5 py-2 text-muted-rev" : "text-slate-400"}`}
            onClick={() => {
              if (item.link) {
                router.push(item.link);
              }
              onNavigate?.();
            }}
          >
            {vertical && <item.icon size={18} />}
            {item.navOp}
            {/* {item.subOp && (
              <span className="ml-1 text-xm pb-2">
                ⌄
              </span>
            )} */}
          </button>

        </div>
      ))}
    </nav>
  );
}
