import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Clock, ArrowRight, Loader2 } from 'lucide-react';
import { blogsAPI, type ApiBlog } from '../services/api';
import { SEO } from '../components/SEO';

interface PageProps {
  onNavigateHome?: () => void;
}

export const BlogsPage: React.FC<PageProps> = () => {
  const [blogs, setBlogs] = React.useState<ApiBlog[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    blogsAPI.getAll()
      .then(data => setBlogs(data.filter(b => b.published)))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-12 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto animate-fade-in">
      <SEO 
        title="Travel Blogs & Guides - Pakistan Travel Tips" 
        description="Expert travel blogs, destination guides, visa tips & itineraries for Pakistan tours, Umrah, international travel & study abroad. Pak99 Travel & Tours blog." 
        keywords="travel blog pakistan, pakistan travel guide, hunza travel guide, skardu guide, umrah guide, visa tips pakistan, northern pakistan blog, travel tips islamabad, pak99 blog, pakistan tourism blog"
        canonicalPath="/blogs"
      />
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
          <Link to="/" className="hover:text-[#ff5500] cursor-pointer">Home</Link>
          <span>/</span>
          <span className="text-[#0b2f64] uppercase font-extrabold">Blogs & Travel Guides</span>
        </div>

        <div className="bg-gradient-to-r from-[#0b2f64] via-blue-900 to-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl">
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-[#ff5500] text-white">
              <BookOpen className="w-4 h-4 text-amber-200" /> Travel Advice & Insights
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight">
              Latest Travel Guides, Itineraries & News
            </h1>
            <p className="text-slate-200 text-sm leading-relaxed font-medium">
              Read expert tips, seasonal packing guides, weather updates, and visa advice from Pak99 travel specialists.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading ? (
          <div className="col-span-full flex items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-[#ff5500] animate-spin" />
          </div>
        ) : (
          blogs.map((blog, idx) => (
            <article key={idx} className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-md hover:shadow-xl transition-all flex flex-col justify-between">
              <div className="relative h-52 overflow-hidden">
                <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-extrabold bg-[#ff5500] text-white shadow-md">
                  {blog.category}
                </span>
              </div>
  
              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-slate-400 font-bold">
                    <span>{blog.date}</span>
                    <span className="flex items-center gap-1 text-slate-500">
                      <Clock className="w-3 h-3 text-[#ff5500]" /> {blog.readTime || '5 min read'}
                    </span>
                  </div>
                  <h3 className="text-base font-extrabold text-[#0b2f64] leading-snug">{blog.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">{blog.excerpt}</p>
                </div>
  
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    to={`/blog/${(blog as any).id || (blog as any)._id}`}
                    className="text-xs font-extrabold text-[#ff5500] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
};
