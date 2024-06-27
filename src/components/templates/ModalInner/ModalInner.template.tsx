import { Button } from "@/components/atoms/Button/Button.atom";
import { useModal } from "@/hooks/useModal.hook";

const className = "flex flex-col gap-4";

const Form = ({
  buttonDisabled = false,
  buttonText,
  children,
  onSubmit,
}: {
  buttonDisabled?: boolean;
  buttonText: string;
  children: React.ReactNode;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
}) => {
  return (
    <form className={className} onSubmit={onSubmit}>
      {children}
      <Buttons disabled={buttonDisabled} buttonText={buttonText} />
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
  form?: boolean;
  title: string;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
};

export const ModalInner = ({
  buttonDisabled = false,
  buttonText = "作成",
  children,
  form = false,
  title,
  onSubmit,
}: Props) => {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-[20px] text-center">{title}</p>
      {form ? (
        <Form
          buttonDisabled={buttonDisabled}
          buttonText={buttonText}
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
