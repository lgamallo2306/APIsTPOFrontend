import EmptyState from '../ui/EmptyState'
import ReviewsSkeleton from './ReviewsSkeleton'
import ReviewSummary from './ReviewSummary'
import ReviewItem from './ReviewItem'

function ReviewsResults({ loading, error, reviews, onRetry }) {
  if (loading) return <ReviewsSkeleton />

  if (error) {
    return <EmptyState title="No pudimos cargar las reseñas" text={error} actionLabel="Reintentar" onAction={onRetry} />
  }

  if (reviews.length === 0) {
    return <EmptyState title="Todavía no hay reseñas" text="Las reseñas las dejan quienes ya compraron." />
  }

  return (
    <>
      <ReviewSummary reviews={reviews} />
      {reviews.map((review) => (
        <ReviewItem key={review.id} review={review} />
      ))}
    </>
  )
}

export default ReviewsResults
