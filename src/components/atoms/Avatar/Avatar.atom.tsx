import Image from "next/image";

export const Avatar = () => {
  return (
    <Image
      alt="background"
      className="h-[82vh] w-auto"
      src="/bisyojo_chan.png"
      style={{
        filter:
          "drop-shadow(0px 3px 12px rgba(0,0,0,0.5)) drop-shadow(2px 0px 5px rgba(0,0,0,0.3))",
      }}
      width={800}
      height={800}
    />
  );
};
