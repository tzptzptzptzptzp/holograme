import { Bounce, ToastContainer } from "react-toastify";
import { useRecoilValue } from "recoil";
import { Avatar } from "@/components/atoms/Avatar/Avatar.atom";
import { Background } from "@/components/atoms/Background/Background.atom";
import { FrameShadow } from "@/components/atoms/FrameShadow/FrameShadow.atom";
import { Modal } from "@/components/organisms/Modal/Modal.organism";
import { Navigation } from "@/components/organisms/Navigation/Navigation. organism";
import { useDevice } from "@/hooks/useDevice.hook";
import { SelectedContentState } from "@/recoil/atoms.recoil";
import { cn } from "@/utils/Cn.util";

type Props = {
  children: React.ReactNode;
  contents?: boolean;
  shadow?: boolean;
};

export const GlobalFrame = ({
  children,
  contents = true,
  shadow = true,
}: Props) => {
  const currentContent = useRecoilValue(SelectedContentState);

  const { type } = useDevice();
  return (
    <div className="flex items-center justify-center relative z-0 w-screen h-screen s:h-svh p-12 s:p-2">
      <div className="relative z-0 overflow-hidden w-full h-full rounded-3xl isolate">
        <Background />
        <div className="flex s:flex-col z-10 w-full h-full pr-20 s:pr-0 s:pb-[46px]">
          {contents && type === "PC" && (
            <div className="flex s:hidden items-end relative top-0 w-[50%] h-full pl-4">
              <Avatar />
            </div>
          )}
          <main
            className={cn(
              "flex flex-col items-center justify-center flex-1 s:flex-auto relative top-0 s:z-10 w-[50%] s:w-full min-w-[600px] s:min-w-0 h-full pr-10 pl-4 s:p-4",
              shadow && "u-shadow-sm"
            )}
          >
            {children}
          </main>
          {contents && type === "SP" && currentContent === "home" && (
            <div className="flex flex-none items-end justify-center relative top-0 z-0 h-full max-h-[62svh] pl-4 s:px-2">
              <Avatar />
            </div>
          )}
          {contents && <Navigation />}
        </div>
        <FrameShadow />
        <ToastContainer
          className="u-shadow w-fit"
          position="top-left"
          autoClose={2500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover={false}
          theme="light"
          transition={Bounce}
        />
        <Modal />
      </div>
    </div>
  );
};
