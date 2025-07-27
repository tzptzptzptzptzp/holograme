"use client";
import { Bounce, ToastContainer } from "react-toastify";
import { Background } from "@/components/atoms/Background/Background.atom";
import { FrameShadow } from "@/components/atoms/FrameShadow/FrameShadow.atom";
import { Modal } from "@/components/organisms/Modal/Modal.organism";
import { useDevice } from "@/hooks/useDevice.hook";

type Props = {
  children: React.ReactNode;
};

export const GlobalFrame = ({ children }: Props) => {
  const { isSp } = useDevice();

  return (
    <div className="flex items-center justify-center relative z-0 w-screen h-full p-12 s:p-0">
      <div className="relative z-0 overflow-hidden w-full h-full rounded-3xl s:rounded-none isolate">
        <Background />
        <main className="w-full h-full">{children}</main>
        <FrameShadow />
        <ToastContainer
          className="u-shadow w-fit s:w-screen s:p-2"
          position={isSp ? "top-center" : "top-left"}
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
