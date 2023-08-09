'use client'

import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useForm } from 'react-hook-form'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,  
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { UserValidation } from "@/lib/validations/user"
import Image from "next/image"
import { ChangeEvent, useState } from "react"
import { Textarea } from "../ui/textarea"
import { isBase64Image } from "@/lib/utils"
import { useUploadThing } from "@/lib/uploadthing";
import { usePathname, useRouter } from "next/navigation"
import { updateUser } from "@/lib/actions/user.actions"



interface Props{
    user: {
        id: string;
        name: string;
        username: string;
        bio: string;
        objectId: string;
        image: string;
    };
    btnTitle:string;
}

const AccountProfile = ({ user, btnTitle }: Props) => {

    const [files, setFiles] = useState<File[]>([]);
    const { startUpload } = useUploadThing("media"); 
    
    const router = useRouter();
    const pathname = usePathname();
    
    const form = useForm({
        resolver: zodResolver(UserValidation),
        defaultValues: {
            profile_photo: user?.image || '',
            name: user?.name || '',
            username: user?.username || '',
            bio: user?.bio || ''
        },
    });

    const handleImage = (e: ChangeEvent<HTMLInputElement>, fieldChange: (value: string) => void) => {
        e.preventDefault();

        const fileReader = new FileReader();

        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setFiles(Array.from(e.target.files));

            if (!file.type.includes('image')) return;
            
            fileReader.onload = async (event) => {
                const imageDataUrl = event.target?.result?.toString() || '';
                fieldChange(imageDataUrl);
            }
            fileReader.readAsDataURL(file);
        }
    }

    const onSubmit = async (values: z.infer<typeof UserValidation>) => {    
        const blob = values.profile_photo;
        
        const hasImageChanged = isBase64Image(blob);
        if (hasImageChanged) {
            const imgRes = await startUpload(files);

            if (imgRes && imgRes[0].fileUrl) {
                values.profile_photo = imgRes[0].fileUrl;
            }
        }

        // TODO: update the user profile
        await updateUser({
            userId: user.id,
            username: values.username,
            name: values.name,
            bio: values.bio,
            image: values.profile_photo,
            path: pathname,
        });
        
        if (pathname === '/profile/edit') {
            router.back();
        } else {
            router.push('/');   
        }
  };

  return (
      <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col justify-start gap-10">
        <FormField
          control={form.control}
          name="profile_photo"
          render={({ field }) => (
            <FormItem className="flex items-center gap-4">
                <FormLabel className="account-form_image-label">
                      {
                          field.value ? (
                              <Image
                                  src={field.value}
                                  alt="Profile_icon"
                                  width={96}
                                  height={96}
                                  priority
                                  className="rounded-full object-contain"
                              />
                          ) : (
                                <Image
                                  src='/assets/profile.svg'
                                  alt="Profile_icon"
                                  width={24}
                                  height={24}                                  
                                  className="object-contain"
                              />
                          ) 
                    }                      
                  </FormLabel>
                  
              <FormControl className="flex-1 text-base-semibold text-gray-200">
                      <Input
                          type='file'
                          placeholder="Add profile photo"
                          accept="image/*"
                          className="account-form_image-input"
                          onChange={(e) => handleImage(e, field.onChange)}
                      />
              </FormControl>  
              <FormMessage />
            </FormItem>
          )}
        />
              
         <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-3 w-full">
                <FormLabel className="text-base-semibold text-light-2">
                      Name                                    
                  </FormLabel>                  
              <FormControl>
                      <Input
                          placeholder="name"
                          type='text'
                          className="account-form_input no-focus"
                          {...field}
                      />
              </FormControl>  
              <FormMessage />              
            </FormItem>
          )}
        />       


         <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-3 w-full">
                <FormLabel className="text-base-semibold text-light-2">
                      Username                                    
                  </FormLabel>                  
              <FormControl>
                      <Input
                          placeholder="example12"
                          type='text'
                          className="account-form_input no-focus"
                          {...field}
                      />
              </FormControl> 
              <FormMessage />              
            </FormItem>
          )}
        />       


         <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-3 w-full">
                <FormLabel className="text-base-semibold text-light-2">
                      Bio                                    
                  </FormLabel>                  
              <FormControl>
                      <Textarea
                        placeholder="Tell us a little bit about yourself"
                          rows={10}
                          className="account-form_input no-focus"
                          {...field}
                      />
              </FormControl>  
              <FormMessage />              
            </FormItem>
          )}
        />           

        <Button type="submit" className="bg-primary-500 hover:bg-slate-500">Submit</Button>
      </form>
    </Form>
  )
}

export default AccountProfile