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

const DeleteChatMessagesContent = dynamic(
  () =>
    import(
      "@/components/features/Chat/DeleteChatMessagesModal/DeleteChatMessagesModal.feature"
    ).then((mod) => mod.DeleteChatMessagesModal),
  { loading: () => <Loader /> }
);

const EditChatContent = dynamic(
  () =>
    import(
      "@/components/features/Chat/EditChatModal/EditChatModal.feature"
    ).then((mod) => mod.EditChatModal),
  { loading: () => <Loader /> }
);

const CreateChatStandardPhraseContent = dynamic(
  () =>
    import(
      "@/components/features/Chat/CreateChatStandardPhraseModal/CreateChatStandardPhraseModal.feature"
    ).then((mod) => mod.CreateChatStandardPhraseModal),
  { loading: () => <Loader /> }
);

const EditChatStandardPhraseModalContent = dynamic(
  () =>
    import(
      "@/components/features/Chat/EditChatStandardPhraseModal/EditChatStandardPhraseModal.feature"
    ).then((mod) => mod.EditChatStandardPhraseModal),
  { loading: () => <Loader /> }
);

const DeleteChatStandardPhraseModalContent = dynamic(
  () =>
    import(
      "@/components/features/Chat/DeleteChatStandardPhraseModal/DeleteChatStandardPhraseModal.feature"
    ).then((mod) => mod.DeleteChatStandardPhraseModal),
  { loading: () => <Loader /> }
);

const CreateFavoriteModalContent = dynamic(
  () =>
    import(
      "@/components/features/Home/CreateFavoriteModal/CreateFavoriteModal.feature"
    ).then((mod) => mod.CreateFavoriteModal),
  { loading: () => <Loader /> }
);

const EditFavoriteModalContent = dynamic(
  () =>
    import(
      "@/components/features/Home/EditFavoriteModal/EditFavoriteModal.feature"
    ).then((mod) => mod.EditFavoriteModal),
  { loading: () => <Loader /> }
);

const DeleteFavoriteModalContent = dynamic(
  () =>
    import(
      "@/components/features/Home/DeleteFavoriteModal/DeleteFavoriteModal.feature"
    ).then((mod) => mod.DeleteFavoriteModal),
  { loading: () => <Loader /> }
);

const CreateWriterModalContent = dynamic(
  () =>
    import(
      "@/components/features/Writer/CreateWriterModal/CreateWriterModal.feature"
    ).then((mod) => mod.CreateWriterModal),
  { loading: () => <Loader /> }
);

const EditWriterModalContent = dynamic(
  () =>
    import(
      "@/components/features/Writer/EditWriterModal/EditWriterModal.feature"
    ).then((mod) => mod.EditWriterModal),
  { loading: () => <Loader /> }
);

const BlogPostListModalContent = dynamic(
  () =>
    import(
      "@/components/features/Writer/BlogPostListModal/BlogPostListModal.feature"
    ).then((mod) => mod.BlogPostListModal),
  { loading: () => <Loader /> }
);

const ShowBlogPostModalContent = dynamic(
  () =>
    import(
      "@/components/features/Writer/ShowBlogPostModal/ShowBlogPostModal.feature"
    ).then((mod) => mod.ShowBlogPostModal),
  { loading: () => <Loader /> }
);

const EmojiSelectModalContent = dynamic(
  () =>
    import(
      "@/components/features/Home/EmojiSelectModal/EmojiSelectModal.feature"
    ).then((mod) => mod.EmojiSelectModal),
  { loading: () => <Loader /> }
);

const ModelsListModalContent = dynamic(
  () =>
    import(
      "@/components/features/Home/ModelsListModal/ModelsListModal.feature"
    ).then((mod) => mod.ModelsListModal),
  { loading: () => <Loader /> }
);

export const ModalContentsSwitcher = (selectedContent: ModalContentType) => {
  switch (selectedContent) {
    case "createChat":
      return <CreateChatContent />;
    case "deleteChat":
      return <DeleteChatContent />;
    case "deleteChatMessages":
      return <DeleteChatMessagesContent />;
    case "editChat":
      return <EditChatContent />;
    case "createChatStandardPhrase":
      return <CreateChatStandardPhraseContent />;
    case "editChatStandardPhrase":
      return <EditChatStandardPhraseModalContent />;
    case "deleteChatStandardPhrase":
      return <DeleteChatStandardPhraseModalContent />;
    case "createFavorite":
      return <CreateFavoriteModalContent />;
    case "editFavorite":
      return <EditFavoriteModalContent />;
    case "deleteFavorite":
      return <DeleteFavoriteModalContent />;
    case "createWriter":
      return <CreateWriterModalContent />;
    case "editWriter":
      return <EditWriterModalContent />;
    case "blogPostList":
      return <BlogPostListModalContent />;
    case "showBlogPost":
      return <ShowBlogPostModalContent />;
    case "emojiSelect":
      return <EmojiSelectModalContent />;
    case "modelsList":
      return <ModelsListModalContent />;
  }
};
