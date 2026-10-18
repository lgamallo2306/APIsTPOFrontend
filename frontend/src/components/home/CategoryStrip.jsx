import { Link } from "react-router-dom";
import './CategoryStrip.css'

const COLORES = ['#c9cdf0', '#e6dcc7', '#f3c4a8', '#bfdcc8', '#ede0cc', '#f0d77a', '#d9c8ee', '#bfe0e6']


function CategoryStrip({ categories }){
    if(categories.length === 0) return null

    return(
        <section className="category-strip">
            <div className="category-strip-head">
                <h2 className="h2">Explorá por categoría</h2>
                <Link to="/catalogo" className="small category-strip-more">Ver todas →</Link>
            </div>
            <div className="card category-strip-list">
                {categories.map((category, index) => (
                    <Link key={category.id} to={`/catalogo?categoryId=${category.id}`} className="category-strip-item">
                        <span className="category-strip-circle" style={{ background: COLORES[index % COLORES.length] }}>
                            {category.description[0]}
                        </span>
                        <span className="small category-strip-name">{category.description}</span>
                    </Link>
                ))}
            </div>
        </section>
    )
}


export default CategoryStrip