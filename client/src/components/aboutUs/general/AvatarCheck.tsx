import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@/components/ui/avatar";

export function AvatarCheck() {
  return (
    <AvatarGroup className="grayscale justify-center">
      <Avatar className="h-10 w-10 bg-base-brand">
        <AvatarImage
          src="https://cdn.simpleicons.org/nextdotjs"
          alt="Next.js"
        />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Avatar className="h-10 w-10 bg-base-brand">
        <AvatarImage
          src="https://cdn.simpleicons.org/vite"
          alt="Vite"
        />
        <AvatarFallback>LR</AvatarFallback>
      </Avatar>
      <Avatar className="h-10 w-10 bg-base-brand">
        <AvatarImage
          src="https://cdn.simpleicons.org/tanstack"
          alt="TanStack"
        />
        <AvatarFallback>LR</AvatarFallback>
      </Avatar>
      <Avatar className="h-10 w-10 bg-base-brand">
        <AvatarImage
          src="https://cdn.simpleicons.org/openaigym"
          alt="OpenAI"
        />
        <AvatarFallback>LR</AvatarFallback>
      </Avatar>
      <Avatar className="h-10 w-10 bg-base-brand">
        <AvatarImage
          src="https://cdn.simpleicons.org/typescript"
          alt="TypeScript"
        />
        <AvatarFallback>LR</AvatarFallback>
      </Avatar>
      <Avatar className="h-10 w-10 bg-base-brand">
        <AvatarImage
          src="https://cdn.simpleicons.org/spacex"
          alt="SpaceX"
        />
        <AvatarFallback>ER</AvatarFallback>
      </Avatar>
      <AvatarGroupCount className="h-10 w-10">
        +10
      </AvatarGroupCount>
    </AvatarGroup>
  );
}
