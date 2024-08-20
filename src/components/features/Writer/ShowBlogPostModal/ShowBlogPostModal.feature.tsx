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
import { cn } from "@/utils/Cn.util";

const Header = ({
  children,
  copyContent,
  title,
}: {
  children?: React.ReactNode;
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
      {children && children}
    </div>
  );
};

export const ShowBlogPostModal = () => {
  const [blogPost, setBlogPost] = useState({
    id: 0,
    title: "",
    content: "",
    prompt: "",
  });
  const [isShowContent, setIsShowContent] = useState(true);
  const [isShowPrompt, setIsShowPrompt] = useState(false);
  const { currentBlogPost } = useBlogPost();

  useEffect(() => {
    setBlogPost(currentBlogPost);
  }, [currentBlogPost, setBlogPost]);

  const handleShowContent = () => {
    setIsShowContent((prev) => !prev);
  };

  const handleShowPrompt = () => {
    setIsShowPrompt((prev) => !prev);
  };
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
          <div className="flex flex-col gap-2">
            <Header
              copyContent={blogPost.content}
              title={textsConfig.MODAL.BLOG_POST.ARTICLE}
            >
              <Button className="pr-2" onClick={handleShowContent}>
                {isShowContent ? (
                  <Icons.ChevronUp className="stroke-2" />
                ) : (
                  <Icons.ChevronDown className="stroke-2" />
                )}
              </Button>
            </Header>
            <div
              className={cn(
                "grid duration-500",
                isShowContent ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              )}
            >
              <div className="overflow-hidden">
                <CustomReactMarkdown markdown={blogPost.content} />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Header
              copyContent={blogPost.prompt}
              title={textsConfig.MODAL.BLOG_POST.PROMPT}
            >
              <Button className="pr-2" onClick={handleShowPrompt}>
                {isShowPrompt ? (
                  <Icons.ChevronUp className="stroke-2" />
                ) : (
                  <Icons.ChevronDown className="stroke-2" />
                )}
              </Button>
            </Header>
            <div
              className={cn(
                "grid duration-500",
                isShowPrompt ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              )}
            >
              <div className="overflow-hidden">
                <CustomReactMarkdown markdown={blogPost.prompt} />
              </div>
            </div>
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
