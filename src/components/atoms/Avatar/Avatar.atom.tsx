import Image from "next/image";

export const Avatar = () => {
  return (
    <Image
      alt="background"
      className="u-shadow-avatar h-[82vh] w-auto"
      src="/bisyojo_chan.png"
      width={800}
      height={800}
    />
  );
};
