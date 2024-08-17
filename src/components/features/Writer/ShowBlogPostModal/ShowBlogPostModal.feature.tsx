import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Border } from "@/components/atoms/Border/Border.atom";
import { Button } from "@/components/atoms/Button/Button.atom";
import { Loader } from "@/components/atoms/Loader/Loader.atom";
import { CustomReactMarkdown } from "@/components/organisms/CustomReactMarkdown/CustomReactMarkdown.organism";
import { ModalInner } from "@/components/templates/ModalInner/ModalInner.template";
import { textsConfig } from "@/config/texts.config";
import { useBlogPost } from "@/hooks/features/useBlogPost.hook";
import { Icons } from "@/icons";

const Header = ({
  copyContent,
  title,
}: {
  copyContent?: string;
  title: string;
}) => {
  const handleCopy = () => {
    if (!copyContent) return;
    navigator.clipboard
      .writeText(copyContent)
      .then(() => {
        toast(textsConfig.TOAST.CLIPBOARD_SAVE.SUCCESS);
      })
      .catch(() => {
        toast.error(textsConfig.TOAST.CLIPBOARD_SAVE.ERROR);
      });
  };
  return (
    <div className="flex items-center gap-2">
      <Border className="-translate-y-[1px] w-4 bg-primary" />
      <p className="min-w-fit text-[22px]">{title}</p>
      {copyContent && (
        <Button onClick={handleCopy}>
          <Icons.Copy className="stroke-2" width={22} height={22} />
        </Button>
      )}
      <Border className="-translate-y-[1px] bg-primary" />
    </div>
  );
};

export const ShowBlogPostModal = () => {
  const [blogPost, setBlogPost] = useState({
    id: 0,
    title: "",
    description: "",
    content: "",
    prompt: "",
  });
  const { currentBlogPost } = useBlogPost();

  useEffect(() => {
    setBlogPost(currentBlogPost);
  }, [currentBlogPost, setBlogPost]);
  return (
    <ModalInner
      className="max-w-5xl"
      title={
        blogPost.title !== ""
          ? blogPost.title
          : textsConfig.MODAL.BLOG_POST.AWAITING
      }
    >
      {blogPost.id !== 0 ? (
        <div className="flex flex-col gap-6">
          <div>
            <Header
              copyContent={blogPost.description}
              title={textsConfig.MODAL.BLOG_POST.DESCRIPTION}
            />
            <p>{blogPost.description}</p>
          </div>
          <div>
            <Header
              copyContent={blogPost.content}
              title={textsConfig.MODAL.BLOG_POST.ARTICLE}
            />
            <CustomReactMarkdown markdown={blogPost.content} />
          </div>
          <div>
            <Header title={textsConfig.MODAL.BLOG_POST.PROMPT} />
            <CustomReactMarkdown markdown={blogPost.prompt} />
          </div>
        </div>
      ) : (
        <div className="flex items-end min-h-32">
          <Loader color="secondary" />
        </div>
      )}
    </ModalInner>
  );
};
