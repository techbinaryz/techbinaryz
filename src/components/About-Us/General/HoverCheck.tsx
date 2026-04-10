import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

const HOVER_CARD_SIDES = [
  "left",
  "top",
  "bottom",
  "right",
] as const;

export function HoverCheck() {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {HOVER_CARD_SIDES.map((side) => (
        <HoverCard
          key={side}
          openDelay={100}
          closeDelay={100}
        >
          <HoverCardTrigger asChild>
            <Button
              variant="ghost"
              className="
    capitalize
    text-white
    bg-primary-brand
    border border-white/20
    hover:border-white/40
    rounded-full
    transition-all duration-200
  "
            >
              {side}
            </Button>
          </HoverCardTrigger>
          <HoverCardContent
            side={side}
            className="
    bg-primary-brand
    border border-white/10
    rounded-2xl
    text-gray-400
  "
          >
            <div className="flex flex-col gap-1">
              <h4 className="font-medium text-white">
                Hover Card
              </h4>
              <p className="text-sm text-gray-400">
                This hover card appears on the{" "}
                {side} side of the trigger.
              </p>
            </div>
          </HoverCardContent>
        </HoverCard>
      ))}
    </div>
  );
}
