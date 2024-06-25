import dynamic from "next/dynamic";
import { Loader } from "@/components/atoms/Loader/Loader.atom";
import { ModalContentType } from "@/types";

const CreateChatContent = dynamic(
  () =>
    import(
      "@/components/features/Chat/CreateChatModal/CreateChatModal.feature"
    ).then((mod) => mod.CreateChatModal),
  { loading: () => <Loader /> }
);

export const ModalContentsSwitcher = (selectedContent: ModalContentType) => {
  switch (selectedContent) {
    case "createChat":
      return <CreateChatContent />;
  }
};
