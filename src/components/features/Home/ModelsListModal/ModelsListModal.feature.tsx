import Link from "next/link";
import clsx from "clsx";
import { format } from "date-fns";
import { ModalInner } from "@/components/templates/ModalInner/ModalInner.template";
import { colorConfig } from "@/config/color.config";
import { textsConfig } from "@/config/texts.config";
import { useGetModels } from "@/hooks/api/useGetModels.hook";
import { Icons } from "@/icons";

export const ModelsListModal = () => {
  const { data: modelsData } = useGetModels();

  return (
    <ModalInner title={textsConfig.MODAL.MODELS_LIST.TITLE}>
      <div className="flex flex-col items-end justify-between relative gap-2">
        <div className="flex justify-center w-full">
          <Link
            className="flex items-center gap-1 relative text-gray"
            href={"https://platform.openai.com/docs/models"}
            target="_blank"
          >
            <span className="s:hidden">openai.com/models</span>
            <Icons.NewTab
              className="-translate-y-[0px] min-w-[14px] min-h-[14px] stroke-[2.5px]"
              color={colorConfig.gray}
              width={14}
              height={14}
            />
            <span className="s:hidden absolute bottom-1 w-full border-b-[1.5px] opacity-70 border-gray"></span>
          </Link>
        </div>
        <ul className="flex flex-col overflow-y-scroll max-h-96">
          {modelsData?.map((model, i) => (
            <li
              key={i}
              className={clsx(
                "flex gap-2 p-1 border-t border-disableBackground",
                modelsData.length - 1 === i && "border-b"
              )}
            >
              <p className="w-[250px] truncate">{model.id}</p>
              <p className="w-fit text-right">
                {format(new Date(model.created * 1000), "yy/MM/dd - H:00")}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </ModalInner>
  );
};
