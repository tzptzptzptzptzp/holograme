import { Border } from "@/components/atoms/Border/Border.atom";
import { Loader } from "@/components/atoms/Loader/Loader.atom";
import { CustomReactMarkdown } from "@/components/organisms/CustomReactMarkdown/CustomReactMarkdown.organism";
import { ModalInner } from "@/components/templates/ModalInner/ModalInner.template";
import { textsConfig } from "@/config/texts.config";
import { useBlogPost } from "@/hooks/features/useBlogPost.hook";

const Header = ({ title }: { title: string }) => {
  return (
    <div className="flex items-center gap-2">
      <Border className="-translate-y-[1px] w-4 bg-primary" />
      <p className="min-w-fit text-[22px]">{title}</p>
      <Border className="-translate-y-[1px] bg-primary" />
    </div>
  );
};

export const ShowBlogPostModal = () => {
  const { currentBlogPost } = useBlogPost();
  return (
    <ModalInner
      className="max-w-5xl"
      title={
        currentBlogPost.title !== ""
          ? currentBlogPost.title
          : textsConfig.MODAL.BLOG_POST.AWAITING
      }
    >
      {currentBlogPost.id !== 0 ? (
        <div className="flex flex-col gap-6">
          <div>
            <Header title={textsConfig.MODAL.BLOG_POST.DESCRIPTION} />
            <p>{currentBlogPost.description}</p>
          </div>
          <div>
            <Header title={textsConfig.MODAL.BLOG_POST.ARTICLE} />
            <CustomReactMarkdown markdown={currentBlogPost.content} />
          </div>
          <div>
            <Header title={textsConfig.MODAL.BLOG_POST.PROMPT} />
            <CustomReactMarkdown markdown={currentBlogPost.prompt} />
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
