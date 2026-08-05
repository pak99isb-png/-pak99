import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogsAPI, type ApiBlog } from '../services/api';
import { SEO } from '../components/SEO';
import { Clock, Loader2, ArrowLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export const BlogDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<ApiBlog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (id) {
      blogsAPI.getAll().then((data) => {
        const found = data.find(b => b.id === id || b._id === id);
        setBlog(found || null);
      }).catch(console.error).finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-slate-50"><Loader2 className="w-10 h-10 text-[#ff5500] animate-spin" /></div>;
  }

  if (!blog) {
    return <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50"><h2 className="text-2xl font-bold text-[#0b2f64]">Blog not found</h2><Link to="/blogs" className="mt-4 text-[#ff5500] hover:underline">Return to Blogs</Link></div>;
  }

  return (
    <div className="w-full bg-slate-50 min-h-screen pb-20">
      <SEO 
        title={(blog as any).seoTitle || blog.title} 
        description={(blog as any).seoDescription || blog.excerpt}
        keywords={(blog as any).seoKeywords || `blog, travel, ${blog.category}`}
      />
      
      {/* Header Image */}
      <section className="relative w-full h-[50vh] min-h-[400px] overflow-hidden bg-slate-900">
        <img
          src={blog.image}
          alt={blog.title}
          className="absolute inset-0 w-full h-full object-cover filter brightness-[0.5]"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10 max-w-4xl mx-auto mt-10">
          <div className="mb-4">
            <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-[#ff5500] text-white shadow-md uppercase tracking-wider">
              {blog.category}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight drop-shadow-xl">
            {blog.title}
          </h1>
          <div className="flex items-center gap-4 mt-6 text-slate-300 text-sm font-semibold uppercase tracking-widest">
            <span>{blog.date}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4 text-[#ff5500]" /> {blog.readTime || '5 min read'}
            </span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl border border-slate-100">
          <Link to="/blogs" className="inline-flex items-center gap-2 text-[#ff5500] font-bold text-sm hover:underline mb-8">
            <ArrowLeft className="w-4 h-4" /> Back to Blogs
          </Link>
          
          <article className="prose prose-slate prose-lg max-w-none prose-headings:text-[#0b2f64] prose-headings:font-extrabold prose-a:text-[#ff5500] prose-a:font-bold hover:prose-a:text-orange-600 prose-img:rounded-2xl prose-img:shadow-lg">
            {blog.content ? (
              <ReactMarkdown>{blog.content}</ReactMarkdown>
            ) : (
              <p className="text-slate-500 italic">No detailed content provided for this blog yet.</p>
            )}
          </article>
        </div>
      </section>
    </div>
  );
};
