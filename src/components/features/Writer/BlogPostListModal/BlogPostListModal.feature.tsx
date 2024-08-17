import { BlogPost } from "@prisma/client";
import { useSetRecoilState } from "recoil";
import { Button } from "@/components/atoms/Button/Button.atom";
import { ModalInner } from "@/components/templates/ModalInner/ModalInner.template";
import { useGetBlogPost } from "@/hooks/api/useGetBlogPost.hook";
import { useWriter } from "@/hooks/features/useWriter.hook";
import { useModal } from "@/hooks/useModal.hook";
import { CurrentBlogPostState } from "@/recoil/atoms.recoil";
import { cn } from "@/utils/Cn.util";
import { Icons } from "@/icons";

export const BlogPostListModal = () => {
  const setCurrentBlogPost = useSetRecoilState(CurrentBlogPostState);
  const { writer } = useWriter();
  const { data } = useGetBlogPost(writer.id);
  const { handleOpen } = useModal();

  const handleClick = (article: BlogPost) => {
    const jsonData: {
      title: string;
      description: string;
      content: string;
    } = JSON.parse(article.content);
    setCurrentBlogPost({
      id: article.id,
      title: jsonData.title,
      description: jsonData.description,
      content: jsonData.content,
      prompt: article.prompt,
    });
  };
  return (
    <ModalInner className="max-w-5xl" title={"a"}>
      <ul className="flex flex-col overflow-y-scroll w-full">
        {data.map((blogPost, i) => (
          <li
            key={i}
            className={cn(
              "flex justify-between gap-2 w-full p-1 border-t border-disableBackground",
              data.length - 1 === i && "border-b"
            )}
          >
            <Button
              className="flex items-center justify-between w-full text-left truncate hover:opacity-70"
              hover={false}
              onClick={() => {
                handleClick(blogPost);
                handleOpen("showBlogPost");
              }}
            >
              {blogPost.title}
              <Icons.ArrowRightCircle width={22} height={22} />
            </Button>
          </li>
        ))}
      </ul>
    </ModalInner>
  );
};
