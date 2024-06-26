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
const DeleteChatContent = dynamic(
  () =>
    import(
      "@/components/features/Chat/DeleteChatModal/DeleteChatModal.feature"
    ).then((mod) => mod.DeleteChatModal),
  { loading: () => <Loader /> }
);

const EditChatContent = dynamic(
  () =>
    import(
      "@/components/features/Chat/EditChatModal/EditChatModal.feature"
    ).then((mod) => mod.EditChatModal),
  { loading: () => <Loader /> }
);

export const ModalContentsSwitcher = (selectedContent: ModalContentType) => {
  switch (selectedContent) {
    case "createChat":
      return <CreateChatContent />;
    case "deleteChat":
      return <DeleteChatContent />;
    case "editChat":
      return <EditChatContent />;
  }
};
