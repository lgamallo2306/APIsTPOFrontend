import React, { useEffect } from 'react'
import ProductCard from './ProductCard';

function ProductGrid (){
    const [posts, setPosts] = useState([])
    console.log(posts);

    const URL = 'http://localhost:8080/'// local host

    useEffect(()=>{
        fetch(`${URL}/Product`)
        .then((response)=> response.json())
        .then((data)=>{
            setPosts(data)

        })
        .catch((error)=>{
            console.error(error)

        })
    },[])
 return(
    <>
      <h1>Publicaciones.</h1>
      {
        posts.map((post)=>{
            <ProductCard 
            id={post.id}
            title={post.title}
            body={post.body}
            key={post.id}/>

        })
      }
    </>
    )

}

export default ProductGrid
