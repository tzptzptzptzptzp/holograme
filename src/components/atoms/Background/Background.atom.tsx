import Image from "next/image";

export const Background = () => {
  return (
    <Image
      alt="background"
      className="absolute top-0 right-0 bottom-0 left-0 w-full h-full object-cover select-none pointer-events-none blur-[1.5px]"
      src="/background.jpg"
      width={960}
      height={540}
    />
  );
};
