import React,{useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import Carousels  from "react-elastic-carousel";
import Item from "../../Item";
import { getallLikebleProducts } from '../../actions/productAction';
import {Link} from 'react-router-dom'

const LikeableProducts = () => {

  const dispatch = useDispatch()


  const {products} = useSelector((state) => state.likeableProducts)


    const breakPoints = [
        { width: 1, itemsToShow: 1 },
        { width: 550, itemsToShow: 2 },
        { width: 768, itemsToShow: 4 },
        { width: 1200, itemsToShow: 4 }
      ];
      
      
useEffect(() => {
 dispatch(getallLikebleProducts())
}, [dispatch])


  return (
    <>
    {/* <div className="carao">
<h1>Most Liked Products</h1>
      <Carousels breakPoints={breakPoints}>

{ 
  products && products.map((element)=>(
 
      
      <Item>
  <Link className="" to={`/product/${element._id}`}>
  <img src={element.images[0].url}/>
  <div className="discount">
  <p>{element?.likes} likes</p>
  </div>

  </Link>

  </Item>
  


  ))
}

      </Carousels>

     


    </div>
     */}

<div className="carao">
<div className="container">
  <div className="row">
    <div className="col-sm-12 mb-5">
    <h1>Top Liked Products</h1>
    </div>
  
  </div>
</div>
      <Carousels breakPoints={breakPoints}>

{ 
  products && products.map((element)=>(
 
      
      <Item>
  <Link className="" to={`/product/${element._id}`}>
    <div className="slider-img">
  <img className="img-fluid" src={element.images[0].url}/>
  <div className="discount">
  <span className="fa fa-heart">{element?.likes}</span>
  {/* <p></p> */}
  </div>
  </div>

  </Link>

  </Item>
  


  ))
}

      </Carousels>

     


    </div>
    
    
    </>
  )
}

export default LikeableProducts