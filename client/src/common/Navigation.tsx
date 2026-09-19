"use client";
import { useState } from "react";
import { navData } from "@/data/Navigation.data";
import {
  usePathname,
  useRouter,
} from "next/navigation";

export default function Navigation() {
  const [openMenu, setOpenMenu] = useState<
    string | null
  >(null);

  const router = useRouter();
  const pathName = usePathname();

  return (
    <nav className="flex items-center relative">
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
            className={`flex items-center w-26 justify-center px-3.5 cursor-pointer rounded-full text-sm font-medium hover:text-[#725cff] 
                ${pathName === item.link ? "bg-muted-sub my-0.5 py-2 text-muted-rev" : "text-slate-400"}`}
            onClick={() => {
              if (item.link) {
                router.push(item.link);
              }
            }}
          >
            {item.navOp}
            {/* {item.subOp && (
              <span className="ml-1 text-xm pb-2">
                ⌄
              </span>
            )} */}
          </button>

          {/* Dropdown */}
          {/* {item.subOp &&
            openMenu === item.navOp && (
              <div className="absolute top-8 w-64 bg-[#1a2231] border border-white/10 rounded-2xl p-3 space-y-2">
                {item.subOp.map(
                  (sub, subIndex) => (
                    <div
                      key={subIndex}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#1f2937] transition cursor-pointer"
                    >
                      {sub.subImgUrl && (
                        <Image
                          src={sub.subImgUrl}
                          alt={sub.subText}
                          width={36}
                          height={36}
                        />
                      )}
                      <span className="text-gray-400 text-sm">
                        {sub.subText}
                      </span>
                    </div>
                  ),
                )}
              </div>
            )} */}
        </div>
      ))}
    </nav>
  );
}
