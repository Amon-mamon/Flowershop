
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import React from 'react'


const page = async () => {
  const posts = await prisma.post.findMany()
  console.log(posts)
  return (  
    <div className=''>
      <h1>
        all posts
      </h1>
      <ul>
        {posts.map((post)=>(
          <li key={post.id} >
            <Link className='border-b-1' href={`/posts/${post.slug}`}>
            {post.title}
            </Link>
            <p>{post.content}</p>
          </li>
        ))}

      </ul>
    </div>
  )
}

export default page