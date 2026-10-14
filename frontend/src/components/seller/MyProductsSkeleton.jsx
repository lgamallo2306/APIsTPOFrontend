import './MyProductsSkeleton.css'

const ROWS = [1, 2, 3, 4, 5]

function MyProductsSkeleton() {
  return (
    <div className="card my-products-skeleton">
      {ROWS.map((row) => (
        <div key={row} className="skel my-products-skeleton-row" />
      ))}
    </div>
  )
}

export default MyProductsSkeleton