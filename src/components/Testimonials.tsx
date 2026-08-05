import React from 'react';
import { Star, Quote, MapPin, Loader2 } from 'lucide-react';
import { reviewsAPI, type ApiReview } from '../services/api';

export const Testimonials: React.FC = () => {
  const [reviews, setReviews] = React.useState<ApiReview[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    reviewsAPI.getAll()
      .then(setReviews)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="reviews" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#ff5500]">Traveler Feedback</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0b2f64]">
            Loved by Thousands of <span className="text-gradient">Explorers</span>
          </h2>
          <p className="text-sm text-slate-600 font-semibold">
            Read authentic stories from families, couples, and groups who traveled with Pak99.
          </p>
        </div>

        <div className="relative w-full overflow-hidden pb-8 pt-4 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          {loading ? (
            <div className="flex items-center justify-center py-10">
              <Loader2 className="w-10 h-10 text-[#ff5500] animate-spin" />
            </div>
          ) : (
            <div className="animate-marquee gap-6 items-stretch">
              {[...reviews, ...reviews].map((review, idx) => (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-[#ff5500]/60 shadow-md hover:shadow-xl flex flex-col justify-between space-y-6 relative transition-all w-[300px] sm:w-[350px] shrink-0"
                >
                <Quote className="absolute top-4 right-4 w-8 h-8 text-orange-500/10" />
  
                <div className="space-y-4">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
  
                  <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed font-medium">
                    "{review.comment}"
                  </p>
                </div>
  
                <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                  <img
                    src={review.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(review.name)}&background=0b2f64&color=fff`}
                    alt={review.name}
                    className="w-11 h-11 rounded-full object-cover border-2 border-orange-500/40"
                  />
                  <div>
                    <h4 className="text-sm font-extrabold text-[#0b2f64]">{review.name}</h4>
                    <div className="text-[11px] text-[#ff5500] font-bold">{review.role}</div>
                    <div className="text-[10px] text-slate-500 flex items-center gap-1 font-semibold">
                      <MapPin className="w-3 h-3 text-slate-400" /> {review.location}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
