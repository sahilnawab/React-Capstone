import  { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Select, Input, RTE } from './index'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import fileService from '../appwrite/fileService'
import postService from '../appwrite/postService'

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, getValues, control } = useForm({
        defaultValues: {
            title: post?.title || "",
            content: post?.content || "",
            slug: post?.slug || "",
            status: post?.status || "active",
        },
    })
    const navigate = useNavigate();
    // get the user data from the store
    const userData = useSelector((state) => state.auth.userData);
    
    console.log("user id is ", userData);
   
    

    //if post is present then update the post else create a new post

    const submit = async (data) => {
        console.log("data is ",data);
        
        if (post) {
            const file = data.image[0] ? await fileService.uploadFile(data.image[0]) : null;

            if (file) {
                fileService.deleteFile(post.featuredImage);
            }

            const dbPost = await postService.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined,
            });

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        } else {
            const file = await fileService.uploadFile(data.image[0]);

            if (file) {
                const fileId = file.$id;
                data.featuredImage = fileId;
                console.log("id is ",userData.$id);
                
                const dbPost = await postService.createPost({ ...data, userId: userData.$id });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        }
    };

    //slugTransform function is used to transform the title to slug


const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
        return value
            .trim()
            .toLowerCase()
            .replace(/[^a-zA-Z\d\s]+/g, "-")
            .replace(/\s/g, "-");

    return "";
}, []);















useEffect(() => {
    const subscription = watch((value, { name }) => {
        if (name === "title") {
            setValue("slug", slugTransform(value.title), { shouldValidate: true });
        }
    });

    return () => subscription.unsubscribe();
}, [watch, slugTransform, setValue]);

return (
    <div className="w-full">
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
            <div className="mb-4">
                <Input
                    placeholder="Title"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    {...register("title", { required: true })}
                />
            </div>
            <div className="mb-4">
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
            </div>
            <div className="mb-4">
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
                </div>
            </div>

            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={fileService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["Active", "Inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
        </div>
)
}