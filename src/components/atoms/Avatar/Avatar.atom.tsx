import Image from "next/image";

export const Avatar = () => {
  return (
    <Image
      alt="Avatar"
      className="u-shadow-avatar h-[82vh] w-auto select-none pointer-events-none"
      src="/bisyojo_chan.png"
      width={800}
      height={800}
    />
  );
};
