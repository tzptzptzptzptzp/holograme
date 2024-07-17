import { Button } from "@/components/atoms/Button/Button.atom";
import { useModal } from "@/hooks/useModal.hook";

const className = "flex flex-col gap-4";

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
    <form className={className} onSubmit={onSubmit}>
      {children}
      {enableButton && (
        <Buttons disabled={buttonDisabled} buttonText={buttonText} />
      )}
    </form>
  );
};

const Div = ({ children }: { children: React.ReactNode }) => {
  return <div className={className}>{children}</div>;
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
        閉じる
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
  buttonText = "作成",
  children,
  enableButton = true,
  form = false,
  title,
  onSubmit,
}: Props) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <p className="text-[20px] text-center">{title}</p>
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
