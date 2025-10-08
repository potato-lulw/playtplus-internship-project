"use client";
import { Upload } from "lucide-react";
import CustomDialog from "../CustomDialog";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { toast } from "sonner"

interface CreatePostForm {
  text: string;
  image: FileList;
}

const CreatePostDialog = () => {
  const { data } = useSession();
  // console.log(data?.user)
  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm<CreatePostForm>();

  const onSubmit = async (formData: CreatePostForm) => {
    const body = new FormData();
    body.append("text", formData.text);
    if (formData.image && formData.image[0]) body.append("image", formData.image[0]);
    body.append("author", data?.user?._id || "");
    console.log(formData);
    try {
       
      const res = await fetch("http://localhost:8800/api/v1/posts/createpost", {
        method: "POST",
        body,
        credentials: "include",
      });

      if (!res.ok) {
         
        const errorData = await res.json().catch(() => ({ message: "Server error" }));
        throw new Error(errorData.message || `Server responded with status ${res.status}`);
      }
      toast.success("Post created successfully!")
      reset(); 
    } catch (err) {
      console.error("Error creating post:", err instanceof Error ? err.message : "An unknown error occurred");
      toast.error("Error creating post!");
    }
  };
  
  return (
    <CustomDialog
      triggerIcon={<Upload size={22} color="#fff" />}
      title="Create a Post"
      description="Share an update or an image with your community."
      submitLabel="Post"
      isLoading={isSubmitting}
      onSubmit={handleSubmit(onSubmit)}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full mt-2">
        <div className="flex flex-col gap-1">
          <label className="font-semibold text-sm text-foreground">Post Text</label>
          <textarea
            {...register("text", { required: "Text is required" })}
            placeholder="What's on your mind?"
            className="w-full border border-border rounded-md p-2 text-sm min-h-[100px] bg-background"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-semibold text-sm text-foreground">Upload Image</label>
          <input type="file" accept="image/*" {...register("image")} className="w-full text-sm" />
        </div>
      </form>
    </CustomDialog>
  );
};

export default CreatePostDialog;
