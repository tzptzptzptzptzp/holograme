import styles from "./Loader.module.scss";

export const Loader = ({ no = 1 }: { no?: number }) => {
  const loaderClass = `loader${no}`;
  return <div className={styles[loaderClass]}></div>;
};
