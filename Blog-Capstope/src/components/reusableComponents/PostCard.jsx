import { Link } from "react-router-dom"
import fileService from "../../appwrite/fileService"

function    PostCard({
    $id,
    title,
    featuredImage,
}) {
  return (
    <Link to={`/post/${$id}`}>
        <div className=" bg-violet-300 rounded-xl p-4 shadow-2xl">
            <div className="w-full justify-center mb-4">
                <img src={fileService.getFilePreview(featuredImage)} alt={fileService.getFilePreview(featuredImage)}  className="w-72 h-36 h object-cover rounded-lg" />
            </div>
            <div className="w-full text-center">
                <h2 className="text-xl font-bold  overflow-hidden text-ellipsis">{title}</h2>
        </div>
</div>
    
    </Link>
)   
}

export default PostCard