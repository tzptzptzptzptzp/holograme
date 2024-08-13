import { ModalInner } from "@/components/templates/ModalInner/ModalInner.template";
import { textsConfig } from "@/config/texts.config";

export const ShowBlogPostModal = () => {
  return (
    <ModalInner title={textsConfig.FORM.WRITER.TITLE.CREATE}>
      <div>ShowBlogPostModal</div>
    </ModalInner>
  );
};
