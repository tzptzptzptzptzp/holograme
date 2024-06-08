import { Avatar } from "../atoms/Avatar/Avatar.atom";
import { Background } from "../atoms/Background/Background.atom";
import { FrameShadow } from "../atoms/FrameShadow/FrameShadow.atom";

export const GlobalFrame = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center justify-center relative z-0 w-screen h-screen p-12">
      <div className="relative overflow-hidden w-full h-full rounded-3xl">
        <div className="absolute z-0 w-full h-full max-w-full max-h-full">
          <Background />
          <div className="flex h-full">
            <div className="flex flex-none items-end relative top-0 h-full px-8">
              <Avatar />
            </div>
            <div className="flex-1 relative top-0 z-10 w-full h-full p-8 pl-0">
              {children}
            </div>
          </div>
          <FrameShadow />
        </div>
      </div>
    </div>
  );
};
