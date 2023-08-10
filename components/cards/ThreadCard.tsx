import Image from "next/image";
import Link from "next/link";

interface Props {
  id: string;
  currentUserId: string;
  parentId: string | null;
  content: string;
  author: {
    name: string;
    image: string;
    id: string;
  };
  community: {
    id: string;
    name: string;
    image: string;
  } | null;
  createdAt: string;
  comments: {
    author: {
      image: string;
    };
  }[];
  isComment?: boolean;
}

const ThreadCard = ({
  id,
  currentUserId,
  parentId,
  content,
  author,
  community,
  createdAt,
  comments,
  isComment,
}: Props) => {
  return (
    <article className="flex flex-col rounded-xl bg-dark-2 p-7">
        <div className="flex items-start justify-between">
              <div className="flex w-full flex-1 flex-flow gap-4">
                  <div className=" flex flex-col items-center">
                      <Link href={`/profile/${author.id}`} className="relative h-11 w-11">
                          <Image
                              src={author.image}
                              alt="Profile Image"
                              fill
                              className="cursor ointer rounded-full"
                          />
                      </Link>
                      <div className="thread-card_bar"/>
                  </div>

                  <div className="flex w-full flex-col">
                    <Link href={`/profile/${author.id}`} className="w-full">
                          <h4 className="cursor-pointer text-base-semibold text-light-1">{author.name}</h4>
                      </Link>
                      
                      <p className="mt-2 text-small-regular text-light-2">
                          {content}
                      </p>

                      <div className="flex mt-5 flex-col gap-3">
                          <div className="flex gap-3.5">
                              <Image
                                src='/assets/heart-gray.svg' alt="Heart" width={24} height={24}
                                className="cursor-pointer object-contain"
                              />

                              <Link href={`/thread/${id}`}>
                                <Image
                                    src='/assets/reply.svg' alt="reply" width={24} height={24}
                                    className="cursor-pointer object-contain"
                                />
                              </Link>
                              <Image
                                src='/assets/repost.svg' alt="repost" width={24} height={24}
                                className="cursor-pointer object-contain"
                              />
                              <Image
                                src='/assets/share.svg' alt="share" width={24} height={24}
                                className="cursor-pointer object-contain"
                              />
                          </div>

                          {isComment && comments.length > 0 && (
                            <Link href={`/thread/${id}`}>
                                <p className='mt-1 text-subtle-medium text-gray-1'>
                                    {comments.length} repl{comments.length > 1 ? "ies" : "y"}
                                </p>
                            </Link>
                            )}
                      </div>
                  </div>
              </div>      
        </div>
    </article>
  )
}

export default ThreadCard