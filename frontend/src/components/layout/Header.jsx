import React from "react";
import {Link} from 'react-router-dom'

function Header(){
    return(
        <nav>
            <ul>
                <li>
                    <Link to ='CatalogView'>Inicio</Link>
                </li>
                <li>
                    <Link to = 'CartView'>Carrito</Link>
                </li>
                <li>
                    <Link to = '/LoginView'>Registrate</Link>
                </li>
                <li>
                    <Link>Buscar</Link>
                </li>
                <li>
                    <Link to='CategoriesView'>Categorias</Link>
                </li>
            </ul>

        </nav>
    )    
    
}

export default Header