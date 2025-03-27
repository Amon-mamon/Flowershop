import React from 'react'
import { prisma } from '@/lib/prisma';

interface Types {
    params:{slug: string;}
}
const  page = async ({params}: Types) => {
const post = await prisma.post.findUnique({
    where: {
        slug:params.slug,
    },
});
  return (
    <div>
    <h1>
      Redirect
    </h1>
    <h2>{post?.title}</h2>
    <p>{post?.content}</p>
  </div>
  )
}
export default page