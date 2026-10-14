import './PageLoading.css'

// Se muestra en las rutas protegidas mientras llega GET /users/me
function PageLoading() {
  return (
    <main className="page-loading" aria-busy="true">
      <div className="skel page-loading-title" />
      <div className="skel page-loading-block" />
    </main>
  )
}

export default PageLoading
