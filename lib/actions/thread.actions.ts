"use server"

import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import { connectToDB } from "../mongoose"
import Thread from "../models/thread.model";

interface Params{
    text: string,
    author: string,
    communityId: string | null,
    path: string,
}

export async function createThread({ 
    text,
    author,
    communityId,
    path,
}: Params) {
    try {
        connectToDB();
        const createdThread = await Thread.create({
            text,
            author,
            communityId: null,            
        })

        // User Update Model
        await User.findByIdAndUpdate(author, {
            $push: {threads: createdThread._id },
        });
        revalidatePath(path);
    } catch (error:any) {
        throw new Error(`Failed to create thread: ${error.message}`);
    }
}

export async function fetchPosts(pageNumber = 1, pageSize = 20) {
    connectToDB();

    // Calculate the number of posts to skip based on the page number and page size
    const skipAmount = (pageNumber - 1) * pageSize;

    // Create a query to fetch the posts that have no parent (top-level threads) => (The thread that is not a comment/reply's)
    const postsQuery = Thread.find({ parentId: { $in: [null, undefined] } })
    
        .sort({ createdAt: 'desc' })    // display threads in descending order means new threads display on top
        .skip(skipAmount)
        .limit(pageSize)

        .populate({
            path: 'author',
            model: User,
        })
        // .populate({
        //     path: 'community',
        //     model: Community,
        // })
    
        .populate({
            path: 'children',  //Populate the children field
            populate: {
                path: 'author',   // Populate author field within children
                model: User,
                select: "_id name parentId image",   // Select only _id and username fields of the author
            }
        })
    
    // Count the total number of top-level posts i.e, threads that are not comments
    const totalPostsCount = await Thread.countDocuments({
        parentId: { $in: [null, undefined] },        
    });    // Get the total count of posts

    const posts = await postsQuery.exec();

    const isNext = totalPostsCount > skipAmount + posts.length;

    return {posts, isNext};
}

export async function fetchThreadById(threadId: string) {
  connectToDB();

  try {
    const thread = await Thread.findById(threadId)
      .populate({
        path: "author",
        model: User,
        select: "_id id name image",
      }) // Populate the author field with _id and username
        
    //   .populate({
    //     path: "community",
    //     model: Community,
    //     select: "_id id name image",
    //   }) // Populate the community field with _id and name
        
        
      .populate({
        path: "children", // Populate the children field
        populate: [
          {
            path: "author", // Populate the author field within children
            model: User,
            select: "_id id name parentId image", // Select only _id and username fields of the author
          },
          {
            path: "children", // Populate the children field within children
            model: Thread, // The model of the nested children (assuming it's the same "Thread" model)
            populate: {
              path: "author", // Populate the author field within nested children
              model: User,
              select: "_id id name parentId image", // Select only _id and username fields of the author
            },
          },
        ],
      })
      .exec();

    return thread;
  } catch (err) {
    console.error("Error while fetching thread:", err);
    throw new Error("Unable to fetch thread");
  }
}
 
export async function addCommentToThread(
    threadId: string,
    commentText: string,
    userId: string,
    path: string,
) {
    connectToDB();

    try {
        // Find the original thread by its ID
        const originalThread = await Thread.findById(threadId);

        if (!originalThread) {
            throw new Error("Thread is not Found");
        }

        // Create new comment thread
        const commentThread = new Thread({
            text: commentText,
            author: userId,
            parentId: threadId,  // Set the parent ID to the original thread's Id
        })

        // Save the comment thread to the database
        const savedCommentThread = await commentThread.save();

        // Add comment's Id to the Original thread's children array
        originalThread.children.push(savedCommentThread._id);

        // Save the original updated thread to the database
        await originalThread.save();
        
        revalidatePath(path);
    } catch (err) {   
        console.error("Error while adding comment:", err);
            throw new Error("Unable to add comment");
    }
}
