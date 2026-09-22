import Link from "next/link";
import {
  FaDiscord,
  FaGithub,
  FaFacebookF,
  FaXTwitter,
  FaLinkedin,
} from "react-icons/fa6";
import { footerData } from "@/data/Content-Change/Home.data";

export default function AppFooter() {
  return (
    <footer className="relative w-full px-2 overflow-hidden bg-primary-brand">
      {/* Mobile glow */}
      <div
        className="absolute inset-0 md:hidden"
        style={{
          background:
            "radial-gradient(ellipse 80% 25% at 50% 50%, #006d77 0%, #0f172a 100%)",
        }}
      />
      {/* md+ glow */}
      <div
        className="absolute inset-0 hidden md:block"
        style={{
          background:
            "radial-gradient(ellipse 40% 30% at 50% 15%, #006d77 0%, #0f172a 100%)",
        }}
      />

      <div className="2xl:max-w-7xl mx-auto">
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 lg:py-24">
          <div className="grid gap-y-12 gap-x-8 lg:grid-cols-12">

            {/* Brand */}
            <div className="lg:col-span-4 space-y-6">
              <div className="flex items-center gap-2">
                <img src="/TechBinary.png" width={128} height={32} alt="TechBinaryz" />
              </div>

              <p className="text-sm text-white max-w-md">
                {footerData.description}
              </p>

              <div className="flex gap-4 text-white text-lg">
                <a href={footerData.socials.linkedin}>
                  <FaLinkedin className="hover:text-gray-400 transition" />
                </a>
                <a href={footerData.socials.twitter}>
                  <FaXTwitter className="hover:text-gray-400 transition" />
                </a>
                <a href={footerData.socials.github}>
                  <FaGithub className="hover:text-gray-400 transition" />
                </a>
                <a href={footerData.socials.facebook}>
                  <FaFacebookF className="hover:text-gray-400 transition" />
                </a>
              </div>
            </div>

            {/* Link Columns */}
            <div className="lg:col-span-5">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
                {footerData.columns.map((col) => (
                  <div key={col.heading}>
                    <h3 className="mb-6 text-sm text-white font-bold">
                      {col.heading}
                    </h3>
                    <ul className="space-y-3 text-sm text-white">
                      {col.links.map((link) => (
                        <li key={link.label}>
                          <Link
                            href={link.href}
                            className="hover:text-gray-300 duration-200"
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Subscribe */}
            <div className="lg:col-span-3 lg:pl-6">
              <h3 className="mb-6 text-sm text-white font-bold">
                Stay In Touch
              </h3>
              <p className="text-sm text-white mb-5">
                Subscribe for project updates, tech insights, and product news.
              </p>

              <div className="flex flex-col gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="h-12 px-4 rounded-full bg-transparent border border-gray-700 text-sm text-slate-500 text-center focus:outline-none focus:border-purple-500"
                />
                <button className="h-12 cursor-pointer rounded-full bg-tertiary hover:bg-[#c0fdfb] hover:text-primary-brand text-white text-sm font-medium transition">
                  Subscribe Now
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-8 py-5 text-center text-sm text-gray-500">
            {footerData.copyright}
          </div>
        </div>
      </div>
    </footer>
  );
}
