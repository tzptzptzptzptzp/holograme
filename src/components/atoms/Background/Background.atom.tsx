import { getImageProps } from "next/image";

export const Background = () => {
  const common = {
    alt: "background",
    loading: "eager" as const,
    className:
      "absolute top-0 right-0 bottom-0 left-0 w-full h-full object-cover select-none pointer-events-none blur-[2px]",
  };

  const {
    props: { srcSet: desktop },
  } = getImageProps({
    ...common,
    width: 1000,
    height: 667,
    quality: 90,
    src: "/images/background.jpg",
  });

  const {
    props: { srcSet: mobile, ...rest },
  } = getImageProps({
    ...common,
    width: 300,
    height: 649,
    quality: 80,
    src: "/images/sp/background.jpg",
  });

  return (
    <picture>
      <source media="(min-width: 768px)" srcSet={desktop} />
      <source media="(max-width: 767px)" srcSet={mobile} />
      <img {...rest} alt="background" />
    </picture>
  );
};
