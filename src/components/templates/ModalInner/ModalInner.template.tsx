import { Button } from "@/components/atoms/Button/Button.atom";
import { useModal } from "@/hooks/useModal.hook";

const className = "flex flex-col gap-4";

const Form = ({
  buttonText,
  children,
  onSubmit,
}: {
  buttonText: string;
  children: React.ReactNode;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
}) => {
  return (
    <form className={className} onSubmit={onSubmit}>
      {children}
      <Buttons buttonText={buttonText} />
    </form>
  );
};

const Div = ({ children }: { children: React.ReactNode }) => {
  return <div className={className}>{children}</div>;
};

const Buttons = ({ buttonText }: { buttonText: string }) => {
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
      <Button className="!w-1/3" type="submit" variant="primary">
        {buttonText}
      </Button>
    </div>
  );
};

type Props = {
  buttonText?: string;
  children: React.ReactNode;
  form?: boolean;
  title: string;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
};

export const ModalInner = ({
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
        <Form buttonText={buttonText} onSubmit={onSubmit}>
          {children}
        </Form>
      ) : (
        <Div>{children}</Div>
      )}
    </div>
  );
};
