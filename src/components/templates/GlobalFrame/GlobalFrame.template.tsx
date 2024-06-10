import { Avatar } from "../../atoms/Avatar/Avatar.atom";
import { Background } from "../../atoms/Background/Background.atom";
import { FrameShadow } from "../../atoms/FrameShadow/FrameShadow.atom";
import { Navigation } from "../../organisms/Navigation. organism";

export const GlobalFrame = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center justify-center relative z-0 w-screen h-screen p-12">
      <div className="relative overflow-hidden w-full h-full rounded-3xl">
        <Background />
        <div className="flex z-10 w-full h-full">
          <div className="flex flex-none items-end relative top-0 h-full px-8">
            <Avatar />
          </div>
          <main className="flex flex-col items-center justify-center flex-1 relative top-0 w-full h-full p-8 pl-0">
            {children}
          </main>
          <Navigation />
        </div>
        <FrameShadow />
      </div>
    </div>
  );
};
