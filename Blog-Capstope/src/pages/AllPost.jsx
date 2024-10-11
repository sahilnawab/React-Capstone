import postService from "../appwrite/postService"
import { Container, PostCard } from "../components/index";
import { useEffect, useState } from "react";


function AllPost() {
    
    const [post,setPost]=useState([]);
    useEffect(()=>{},[])

   postService.getAllActivePosts()
        .then((posts)=>{
            if(posts){
                setPost(posts.documents);
            }
        })
        .catch((error)=>
            {
                console.log("error occured during fetching posts",error);
            })

            return (
                <div className='w-full py-8'>
                    <Container>
                        <div className='flex flex-wrap'>
                            {post.map((post) => (
                                <div key={post.$id} className='p-2 w-1/4'>
                                    <PostCard {...post} />
                                </div>
                            ))}
                        </div>
                        </Container>
                </div>
              )
}

export default AllPost