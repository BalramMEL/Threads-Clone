import ThreadCard from "@/components/cards/ThreadCard";
import {currentUser} from "@clerk/nextjs"

const Page = () => {
  return (
      <div>
        <ThreadCard
            key={post._id}
            id={post._id}
            currentUserId={user?.id || ""}
            parentId={post.parentId}
            content={post.text}
            author={post.author}
            community={post.community}
            createdAt={post.createdAt}
            comments={post.children}                   
        />
    </div>
  )
}

export default Page