import { Bounce, ToastContainer } from "react-toastify";
import { Avatar } from "../../atoms/Avatar/Avatar.atom";
import { Background } from "../../atoms/Background/Background.atom";
import { FrameShadow } from "../../atoms/FrameShadow/FrameShadow.atom";
import { Navigation } from "../../organisms/Navigation/Navigation. organism";

type Props = { children: React.ReactNode; contents?: boolean };

export const GlobalFrame = ({ children, contents = true }: Props) => {
  return (
    <div className="flex items-center justify-center relative z-0 w-screen h-screen p-12">
      <div className="relative overflow-hidden w-full h-full rounded-3xl">
        <Background />
        <div className="flex z-10 w-full h-full">
          {contents && (
            <div className="flex flex-none items-end relative top-0 h-full pl-8">
              <Avatar />
            </div>
          )}
          <main className="u-shadow-sm flex flex-col items-center justify-center flex-1 relative top-0 overflow-y-scroll w-full h-full pr-10 pl-8">
            {children}
          </main>
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
      </div>
    </div>
  );
};
