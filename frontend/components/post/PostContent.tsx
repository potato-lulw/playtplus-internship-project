interface PostContentProps {
  text: string;
}

const PostContent = ({ text }: PostContentProps) => {
  return (
    <div className="px-6 py-3">
      <p className="text-foreground whitespace-pre-wrap">{text}</p>
    </div>
  );
};

export default PostContent;
