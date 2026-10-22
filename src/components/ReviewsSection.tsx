import React from 'react';
import {
  CustomerReview,
  VERIFIED_CUSTOMER_REVIEWS,
  shouldShowReviewsSection,
} from '../utils/waterCycleLogic';

export const ReviewsSection: React.FC<{
  reviews?: readonly CustomerReview[];
}> = ({ reviews = VERIFIED_CUSTOMER_REVIEWS }) => {
  if (!shouldShowReviewsSection(reviews)) {
    return null;
  }

  return (
    <section
      id="reviews"
      aria-labelledby="reviews-heading"
      className="py-20 bg-[#ABCDE9] border-t-2 border-[#156D95]"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <span className="inline-block px-3.5 py-1 rounded-full bg-[#063D5B] text-[#ABCDE9] text-xs font-bold tracking-wider uppercase mb-3">
            Customer Reviews
          </span>
          <h2
            id="reviews-heading"
            className="text-2xl sm:text-3xl font-bold text-[#063D5B] tracking-tight"
          >
            What Our Customers Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <article
              key={review.id}
              className="p-6 rounded-2xl bg-[#62A1C2] text-white border-2 border-[#156D95] flex flex-col justify-between shadow-sm"
            >
              <p className="text-sm text-[#EFF7FD] leading-relaxed">
                &ldquo;{review.comment}&rdquo;
              </p>
              <div className="mt-6 pt-4 border-t border-[#ABCDE9]/35 flex items-center justify-between text-xs text-[#DCEBFA]">
                <span className="font-bold text-white">
                  {review.customerName}
                </span>
                <span>
                  {review.serviceCategory} · {review.dateLabel}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
