import { creatorData } from "@/data/Content-Change/About-Us.data";
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@/components/ui/avatar";

export default function Creator() {
  return (
    <section className="relative w-full bg-primary-foreground py-28 px-6">
      <div className="2xl:max-w-7xl mx-auto text-center">
        <h2 className="text-[44px] font-bold leading-tight text-base-brand">
          {creatorData.heading}
        </h2>

        <p className="text-base-foreground font-bold mt-3 max-w-2xl mx-auto">
          {creatorData.subheading}
        </p>

        <blockquote className="mt-10 text-2xl font-medium leading-relaxed max-w-2xl mx-auto text-base-brand">
          {creatorData.quote}
        </blockquote>

        <div className="mt-5 text-white text-sm">
          <AvatarGroup className="grayscale justify-center">
            {creatorData.techStack.map((tech) => (
              <Avatar key={tech.alt} className="h-10 w-10 bg-base-brand">
                <AvatarImage src={tech.src} alt={tech.alt} />
                <AvatarFallback>{tech.alt.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
            ))}
            <AvatarGroupCount className="h-10 w-10">+10</AvatarGroupCount>
          </AvatarGroup>
        </div>
      </div>
    </section>
  );
}
