type subOpTypes = {
  subImgUrl?: string;
  subText: string;
  link?: string;
};

type navDataTypes = {
  navOp: string;
  subOp?: subOpTypes[];
  link?: string;
};

export const navData: navDataTypes[] = [
  {
    navOp: "Home",
    link: "/",
  },
  {
    navOp: "Products",
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
    link: "/about-us",
  },
  {
    navOp: "Contact Us",
    link: "/contact-us",
  },
];
