'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useForm } from 'react-hook-form'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,  
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"

import { Input } from "../ui/input"
import { usePathname, useRouter } from "next/navigation"
import { CommentValidation} from "@/lib/validations/thread"
import { addCommentToThread } from "@/lib/actions/thread.actions"
import Image from "next/image"


interface Props{
    threadId: string;
    currentUserImg: string;
    currentUserId: string
}

export const Comment = ({
    threadId,
    currentUserImg,
    currentUserId
}: Props) => {
    const router = useRouter();
    const pathname = usePathname();
    
    const form = useForm({
        resolver: zodResolver(CommentValidation),
        defaultValues: {
            thread: '',            
        },
    });

    const onSubmit = async(values: z.infer<typeof CommentValidation>) => {
        await addCommentToThread(
            threadId,
            values.thread,
            JSON.parse(currentUserId),
            pathname
        );
        form.reset();
    }

    return (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="comment-form">
                
        <FormField
          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem className="flex w-full items-center gap-3">
                <FormLabel >
                      <Image
                          src={currentUserImg}
                          alt="Current User"
                          width={48}
                          height={48}
                         className="rounded-full object-cover" 
                        />                                   
                </FormLabel>                  
                <FormControl className="border-none bg-transparent">
                      <Input
                        type="text"
                        {...field}
                        placeholder="Comment..."                          
                        className="no-focus text-light-1 outline-none"
                      />
                </FormControl>                             
            </FormItem>
          )}
         /> 

        <Button type="submit" className="comment-form_btn bg-primary-500 ">
            Reply
        </Button>                
     </form>
    </Form> 
    )
}
