
import { Suspense } from 'react';
import { fetchBlog } from '@/app/lib/actions/fetchBlogs';

async function  BlogsContent() {
    const blogs =await fetchBlog(); 

    return (
        <div>
            {/* <Blogs blogs={data}></Blogs> */}
            {blogs.map((post:any) => (
          <div key={post.id} className="m-4 md:m-6 lg:m-8 p-4 md:p-6 lg:p-8 rounded-lg border-2">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="md:col-span-2 lg:col-span-2">
                <div className="flex flex-col gap-2">
                  {/* <Link to={`/blog/${post.id}`} className="text-2xl md:text-3xl lg:text-4xl font-extrabold max-w-lg"> */}
                    {post.title}
                  {/* </Link> */}
                  <div className="text-sm md:text-md lg:text-md text-slate-800">
                    {post.content.length > 200 ? `${post.content.substring(0, 200)}...` : post.content}
                  </div>
                  <div>
                    estimated read time : {post.content.length / 200 < 1 ? "less than a minute" : `${(post.content.length / 200).toFixed(1)} minute(s)`}
                  </div>

                </div>
              </div>
              <div className="mt-4 md:mt-0 md:ml-9">
                <div>Author</div>
                <div className="flex items-center gap-2 m-4">
                  <div className="profile-icon bg-zinc-400 rounded-full h-6 w-6 flex items-center justify-center text-black text-sm font-light">
                    {post.author?.User?.[0] || 'A'}
                  </div>
                  <div className="flex flex-col">
                    <div>Author: {post.User?.name || 'Anonymous'}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        </div>
    );
}

function BlogsPage() {
    return (
        <Suspense fallback={<p className='mt-10'>Loading...</p>}>
            <BlogsContent />
        </Suspense>
    );
}

export default BlogsPage;
