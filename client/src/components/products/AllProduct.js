import React, { useEffect, useState } from 'react'
import { getProduct, getProclearErrors } from '../../actions/productAction'
import Loader from '../layout/loader/Loader'
import { useSelector, useDispatch } from 'react-redux'
import { useAlert } from 'react-alert'
import Product from '../Home/Product'
import { useParams } from 'react-router-dom'
import Pagination from "react-js-pagination";
import '../../css/pagination.css'
import '../../css/category.css'
import Slider from '@mui/material/Slider';
import Metadata from '../layout/Metadata'
import iot from '../../IOT.pdf'

const categories = [
  "Men-Shirts",
  "Men-Trousers",
  "Sharees",
  "Womens-Accessory",
  "Mobile-covers",
  "Chocolate-Covers",
  "Home-Decoratives",
  "Paintings",
  "jewellery"
    // "oven",
    // "electronics",
    // "machine",
    // "accesries",
    // "Shirts",
    // "Jweallries"
  ]
const AllProduct = () => {

 
  const dispatch = useDispatch()
  const alert = useAlert()
  const [currentPage, setCurrentPage] = useState(1)
  const[category,setCategory] = useState("")
  const[ratings,setRatings] = useState(0)
const [price, setPrice] = useState([0, 20000])

  const { products, loading, error, productscount, resultPerPage, filterProductsCount } = useSelector((state) => state.products)
  const { keyword } = useParams()

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice)
  }

  useEffect(() => {
    if (error) {
       alert.error(error)
       dispatch(getProclearErrors())
    }
    dispatch(getProduct(keyword, currentPage, price,category))
  }, [dispatch, keyword, currentPage, price,category,alert,error])


  let count = filterProductsCount
  return (
    <>
      {
        loading ? <Loader /> :
          <>
          <Metadata title="All Products"/>
            <div className="container-fluid">
              <div className="row">
                <div className="col-sm-2">
                  <div className="sidebar">
                  <div className="sidebar-title">
                        <p>Price</p>
                  </div>                 
                  <Slider
                    getAriaLabel={() => 'Temperature range'}
                    value={price}
                    onChange={priceHandler}
                    valueLabelDisplay="auto"
                    aria-labelledby='range-slider'
                    min={0}
                    max={20000}
                  />

                  <div className="sidebar-title">
                        <p>Categories</p>
                  </div>  


                
                  <ul className="catagory-list">
                  {
                    categories.map((category)=>(
                      <li className="caegory-item" key={category} onClick={()=>setCategory(category)}>
                        {category}
                      </li>
                    ))
                  }

                  </ul>
                </div>
                </div>
                <div className="col-sm-10">
                  <div className="row">

                    {

                      products && products.map(product => (
                        <Product key={product._id} product={product} />
                      ))

                    }
                  </div>
                </div>
              </div>
            </div>


          </>
      }

      {
        resultPerPage < count && (
          <div className="paginationbox">
            <Pagination
              activePage={currentPage}
              itemsCountPerPage={resultPerPage}
              totalItemsCount={productscount}
              onChange={(e) => setCurrentPage(e)}
              nextPageText="Next"
              prevPageText="Prev"
              firstPageText="1st"
              lastPageText="Last"
              itemClass="page-item"
              linkClass="page-link"
              activeClass="pageItemActive"
              activeLinkClass="pageLinkActive"

            />

          </div>
        )
      }


    </>
  )
}

export default AllProduct