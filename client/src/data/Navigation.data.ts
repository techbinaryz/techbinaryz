import { Home, LayoutGrid, Users, Mail, type LucideIcon } from "lucide-react";

type subOpTypes = {
  subImgUrl?: string;
  subText: string;
  link?: string;
};

type navDataTypes = {
  navOp: string;
  icon: LucideIcon;
  subOp?: subOpTypes[];
  link?: string;
};

export const navData: navDataTypes[] = [
  {
    navOp: "Home",
    icon: Home,
    link: "/",
  },
  {
    navOp: "Products",
    icon: LayoutGrid,
    link: "/products",
    subOp: [
      {
        subImgUrl: "/HomeImg/text.svg",
        subText: "Text Generator",
      },
      {
        subImgUrl: "/HomeImg/image.svg",
        subText: "Image Generator",
      },
      {
        subImgUrl: "/HomeImg/code.svg",
        subText: "Code Generator",
      },
      {
        subImgUrl: "/HomeImg/video.svg",
        subText: "Video Generator",
      },
      {
        subImgUrl: "/HomeImg/email.svg",
        subText: "Email Generator",
      },
    ],
  },
  {
    navOp: "About Us",
    icon: Users,
    link: "/about-us",
  },
  {
    navOp: "Contact Us",
    icon: Mail,
    link: "/contact-us",
  },
];
