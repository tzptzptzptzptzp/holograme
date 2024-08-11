import { Button } from "@/components/atoms/Button/Button.atom";
import { textsConfig } from "@/config/texts.config";
import { useModal } from "@/hooks/useModal.hook";

const WrapperClassName = "max-h-[50vh] overflow-y-scroll";
const InnerClassName = "flex flex-col gap-4";

const Form = ({
  buttonDisabled = false,
  buttonText,
  children,
  enableButton = true,
  onSubmit,
}: {
  buttonDisabled?: boolean;
  buttonText: string;
  children: React.ReactNode;
  enableButton?: boolean;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
}) => {
  return (
    <form className="flex flex-col gap-4" onSubmit={onSubmit}>
      <div className={WrapperClassName}>
        <div className={InnerClassName}>{children}</div>
      </div>
      {enableButton && (
        <Buttons disabled={buttonDisabled} buttonText={buttonText} />
      )}
    </form>
  );
};

const Div = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={WrapperClassName}>
      <div className={InnerClassName}>{children}</div>
    </div>
  );
};

const Buttons = ({
  disabled = false,
  buttonText,
}: {
  disabled?: boolean;
  buttonText: string;
}) => {
  const { handleClose } = useModal();
  return (
    <div className="flex justify-center gap-8">
      <Button
        className="!w-1/3"
        onClick={handleClose}
        type="reset"
        variant="cancel"
      >
        {textsConfig.BUTTON.CANCEL}
      </Button>
      <Button
        className="!w-1/3"
        disabled={disabled}
        type="submit"
        variant={disabled ? "disable" : "primary"}
      >
        {buttonText}
      </Button>
    </div>
  );
};

type Props = {
  buttonDisabled?: boolean;
  buttonText?: string;
  children: React.ReactNode;
  enableButton?: boolean;
  form?: boolean;
  title?: string;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
};

export const ModalInner = ({
  buttonDisabled = false,
  buttonText = textsConfig.BUTTON.CREATE,
  children,
  enableButton = true,
  form = false,
  title,
  onSubmit,
}: Props) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      {title && <p className="text-[20px] text-center">{title}</p>}
      {form ? (
        <Form
          buttonDisabled={buttonDisabled}
          buttonText={buttonText}
          enableButton={enableButton}
          onSubmit={onSubmit}
        >
          {children}
        </Form>
      ) : (
        <Div>{children}</Div>
      )}
    </div>
  );
};
