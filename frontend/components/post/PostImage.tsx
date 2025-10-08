import Image from "next/image";

interface PostImageProps {
  src: string;
  alt: string;
}

const PostImage = ({ src, alt }: PostImageProps) => {
  return (
    <div className="w-full overflow-hidden ">
      <Image
        src={src}
        alt={alt}
        width={400}
        height={300}
        className="w-full max-h-[400px] h-auto object-cover hover:scale-105 transition-transform duration-300"
      />
    </div>
  );
};

export default PostImage;