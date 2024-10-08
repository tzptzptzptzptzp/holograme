import { useModal } from "@/hooks/useModal.hook";
import { cn } from "@/utils/Cn.util";
import { ModalContentsSwitcher } from "@/utils/ModalContentsSwitcher.util";

export const Modal = () => {
  const { content, isCloseDisabled, isOpen, handleClose } = useModal();

  return (
    <div
      className={cn(
        "flex items-center justify-center absolute top-0 right-0 bottom-0 left-0 z-30 p-12 s:p-4 duration-300 transition-all",
        isOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      )}
    >
      <div
        className="absolute z-0 w-full h-full bg-black bg-opacity-30 cursor-pointer"
        onClick={() => {
          !isCloseDisabled && handleClose();
        }}
      ></div>
      <div className="u-shadow-sm flex items-center justify-center z-10 overflow-x-hidden overflow-y-scroll max-w-[820px] s:max-w-full min-w-[600px] s:min-w-full max-h-[80%] p-8 s:p-4 rounded-3xl bg-white">
        {ModalContentsSwitcher(content)}
      </div>
    </div>
  );
};
