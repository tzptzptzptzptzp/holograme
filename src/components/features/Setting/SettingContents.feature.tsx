import { ContentHead } from "@/components/molecules/ContentHead/ContentHead.molecule";
import { ContentWrapper } from "@/components/templates/ContentWrapper/ContentWrapper.template";
import { Icons } from "@/icons";

export const SettingContents = () => {
  return (
    <ContentWrapper>
      <div className="flex gap-3">
        <ContentHead>
          <Icons.Config color="white" />
          <p>Setting</p>
        </ContentHead>
      </div>
      <div>
        <p>Setting Contents</p>
      </div>
    </ContentWrapper>
  );
};
