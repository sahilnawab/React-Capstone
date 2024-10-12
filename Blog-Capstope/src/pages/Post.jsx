import  { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import postService from "../appwrite/postService";
import  fileService from "../appwrite/fileService";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    //get the slug from the url
    const { slug } = useParams();
    const navigate = useNavigate();

    //get the user data from the store
    const userData = useSelector((state) => state.auth.userData);

    //check if the user is the author of the post
    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            postService.getPost(slug).then((post) => {
                if (post) {setPost(post)
                    console.log("post is ",post);
                    
                }
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        postService.deletepost(post.$id).then((status) => {
            if (status) {
                fileService.deleteFile(post.featuredImage);
                navigate("/");
                alert("Post deleted successfully");
            }
        });
    };
    // const htmlPost=parse(post.content);
    return post ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={fileService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                  {parse(post.content)}
                     
                    </div>
            </Container>
        </div>
    ) : null;
}