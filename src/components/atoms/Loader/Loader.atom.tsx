import styles from "./Loader.module.scss";

type Props = {
  centering?: boolean;
  no?: number;
};

export const Loader = ({ centering = true, no = 1 }: Props) => {
  const loaderClass = `loader${no}`;
  if (centering)
    return (
      <div className="flex items-center justify-center w-full h-full">
        <div className={styles[loaderClass]}></div>;
      </div>
    );
  return <div className={styles[loaderClass]}></div>;
};
