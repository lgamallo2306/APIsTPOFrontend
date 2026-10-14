import CategoriesContainer from '../../components/admin/CategoriesContainer'

function CategoriesView({ token, onCategorySaved, onCategoryDeleted, onLogout }) {
  return (
    <main>
      <CategoriesContainer
        token={token}
        onCategorySaved={onCategorySaved}
        onCategoryDeleted={onCategoryDeleted}
        onLogout={onLogout}
      />
    </main>
  )
}

export default CategoriesView
