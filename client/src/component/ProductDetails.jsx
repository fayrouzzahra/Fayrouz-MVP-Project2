import React from 'react'

function ProductDetails({one,addToCart,deleteProduct,switchView}) {
  console.log("test",one);
    console.log(one);
  return (
    <div style={{display:'flex', flexDirection:'row' ,justifyContent:'center'}}>
                   <div className="product-card" key={one.id}>
                        <img src={one.imgurl} alt="No content" height={300} width={300}/>
                        <h2>{one.name}</h2>
                        <p>{one.description}</p>
                        <p className='card-item-price'>Price: ${one.price}</p>
                        {/* <p className='card-item-cat'>Category: Books</p> */}
                        <div className="product-card-buttons">
                            <button onClick={()=>{
                              switchView('update',one)
                            }} >Update Product</button>
                            <button onClick={()=>{
                              deleteProduct(one.id)
                            }} >Delete Product</button>
                            <button onClick={()=>{ addToCart ({name:one.name,price:one.price,imgurl:one.imgurl})}}>Add to Cart</button>
                        </div>
                    </div>
   </div>
  )
}

export default ProductDetails