import Image from "next/image";
import {
  FaDiscord,
  FaGithub,
  FaFacebookF,
  FaXTwitter,
} from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="relative w-full bg-linear-to-b lg:bg-linear-to-r from-primary-brand   px-2 overflow-hidden">
      <div className="2xl:max-w-7xl mx-auto">
        <span className="absolute top-0 left-1/2 -translate-x-1/2">
          <svg
            width="1260"
            height="457"
            viewBox="0 0 1260 457"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g filter="url(#blur)">
              <circle
                cx="630"
                cy="-173.299"
                r="360"
                fill="#3dccc7"
              />
            </g>
            <defs>
              <filter
                id="blur"
                x="0"
                y="-803.299"
                width="1260"
                height="1260"
                filterUnits="userSpaceOnUse"
              >
                <feGaussianBlur stdDeviation="200" />
              </filter>
            </defs>
          </svg>
        </span>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 lg:py-24">
          <div className="grid gap-y-12 gap-x-8 lg:grid-cols-12">
            {/* Brand */}
          <div className="lg:col-span-4 space-y-6">
              <div className="flex items-center gap-2">
                <img
                  src="/TechBinary.png"
                  width={128}
                  height={32}
                />
              </div>

              <p className="text-sm text-white max-w-md">
                A self-hosted AI starter kit built
                with Next.js, Tailwind CSS, and
                OpenAI integrations. Perfect for
                developers and startups to quickly
                build, deploy, and scale AI-powered
                SaaS products.
              </p>

              <div className="flex gap-4 text-white  text-lg">
                <a href="https://discord.com">
                  <FaDiscord className="hover:text-gray-600 transition" />
                </a>
                <a href="https://x.com">
                  <FaXTwitter className="hover:text-gray-600 transition" />
                </a>
                <a href="https://github.com">
                  <FaGithub className="hover:text-gray-600 transition" />
                </a>
                <a href="https://facebook.com">
                  <FaFacebookF className="hover:text-gray-600 transition" />
                </a>
              </div>
            </div>

            {/* Middle Links */}
            <div className="lg:col-span-5">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
                {/* Services */}
                <div>
                  <h3 className="mb-6 text-sm text-white font-bold">
                    Services
                  </h3>
                  <ul className="space-y-3 text-sm text-white ">
                    <li className="hover:text-white duration-200 cursor-pointer">
                      Status
                    </li>
                    <li className="hover:text-white duration-200 cursor-pointer">
                      Pricing
                    </li>
                    <li className="hover:text-white duration-200 cursor-pointer">
                      FAQ
                    </li>
                    <li className="hover:text-white duration-200 cursor-pointer">
                      Help Docs
                    </li>
                    <li className="hover:text-white duration-200 cursor-pointer">
                      Privacy Policy
                    </li>
                  </ul>
                </div>

                {/* Features */}
                <div>
                  <h3 className="mb-6 text-sm text-white font-bold">
                    Features
                  </h3>
                  <ul className="space-y-3 text-sm text-white ">
                    <li className="hover:text-white duration-200 cursor-pointer">
                      HTML File Upload
                    </li>
                    <li className="hover:text-white duration-200 cursor-pointer">
                      HTML Website Hosting
                    </li>
                    <li className="hover:text-white duration-200 cursor-pointer">
                      Free Image Hosting
                    </li>
                    <li className="hover:text-white duration-200 cursor-pointer">
                      Upload PDF Online
                    </li>
                    <li className="hover:text-white duration-200 cursor-pointer">
                      Free Zip File Hosting
                    </li>
                  </ul>
                </div>

                {/* Account */}
                <div>
                  <h3 className="mb-6 text-sm text-white font-bold">
                    Account
                  </h3>
                  <ul className="space-y-3 text-sm text-white">
                    <li className="hover:text-white duration-200 cursor-pointer">
                      Login
                    </li>
                    <li className="hover:text-white duration-200 cursor-pointer">
                      Sign Up
                    </li>
                    <li className="hover:text-white duration-200 cursor-pointer">
                      Reset Password
                    </li>
                    <li className="hover:text-white duration-200 cursor-pointer">
                      Support
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Subscribe */}
            <div className="lg:col-span-3 lg:pl-6">
              <h3 className="mb-6 text-sm text-white font-bold">
                Stay In Touch
              </h3>
              <p className="text-sm text-white  mb-5">
                Subscribe now for exclusive insights
                and offers!
              </p>

              <div className="flex flex-col gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="h-12 px-4 rounded-full bg-transparent border border-gray-700 text-sm text-slate-500 text-center focus:outline-none focus:border-purple-500"
                />
                <button className="h-12 cursor-pointer rounded-full bg-tertiary hover:bg-[#c0fdfb] hover:text-secondary text-white text-sm font-medium transition">
                  Subscribe Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-8 py-5 text-center text-sm text-gray-500">
            © 2026 AIStarterKit - All Rights
            Reserved.
          </div>
        </div>
      </div>

    </footer>
  );
}
