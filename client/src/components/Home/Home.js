import React, { useEffect, useState } from 'react'
import './home.css'
import Product from './Product.js'
import Loader from '../layout/loader/Loader'
import Metadata from '../layout/Metadata'
import { getProduct, getDealProductDetails } from '../../actions/productAction'
import { useSelector, useDispatch } from 'react-redux'
import { useAlert } from 'react-alert'
import BannerImg from '../../images/banner.jpg'
import BannerImg2 from '../../images/banner4.jpg'
import BannerImg3 from '../../images/chocolate-covers.jpg'
import BannerImg4 from '../../images/jwel-banner.jpg'
import BannerImg5 from '../../images/back-cover-banner.jpg'




import Carousel from 'react-bootstrap/Carousel';
import { Link } from 'react-router-dom'
import Carousels from "react-elastic-carousel";
import Item from "../../Item";
import LikeableProducts from '../products/LikeableProducts'


const Home = () => {
  const alert = useAlert()
  const dispatch = useDispatch()
  const { loading, error, products, productscount } = useSelector((state) => state.products)
  const { product } = useSelector((state) => state.dealProduct)




  const { isRegistered } = useSelector((state) => state.user)


  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };


  useEffect(() => {

    if (error) {
      return alert.error(error)
    }
    dispatch(getProduct())
    dispatch(getDealProductDetails())
  }, [dispatch, error, alert, isRegistered])


  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2 },
    { width: 768, itemsToShow: 5 },
    { width: 1200, itemsToShow: 5 }
  ];







  {/* <div className="item" data-value="1">1</div> */ }






  return (
    <>
      {
        loading ? <Loader /> : <>
          <Metadata title="Shopgo" />
          <Link className="" to={`/products`}>
            <Carousel activeIndex={index} onSelect={handleSelect}>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={BannerImg}
                  alt="First slide"
                />
                <Carousel.Caption>
                  <h3><span>Welcome To</span>Shopgo.in</h3>

                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img

                  className="d-block w-100"
                  src={BannerImg2}
                  alt="Second slide"
                />

                <Carousel.Caption>
                  <h3 className="ban">Get Huge Discounts on</h3>
                  <h3 className="ban">Shirts & Trousers</h3>

                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>


                <img
                  className="d-block w-100 "
                  src={BannerImg4}
                  alt="Third slide"
                />
              </Carousel.Item>

              <Carousel.Item>


<img
  className="d-block w-100 "
  src={BannerImg3}
  alt="Third slide"
/>
</Carousel.Item>



<Carousel.Item>


<img
  className="d-block w-100 "
  src={BannerImg5}
  alt="Third slide"
/>
</Carousel.Item>
            </Carousel>
          </Link>
          <section className="products">
            <div className="container">

              <div className="row">

                <h2>Feature Products</h2>

                <div className="d-sm-flex align-item-center justify-content-center flex-wrap mt-4">
                  {

                    products && products.map(product => (
                      <Product key={product._id} product={product} />

                    ))

                  }

                </div>

              </div>

            </div>
            <div className="carao">
              <div className="container">
                <div className="row">
                  <div className="col-sm-12 mb-5">
                    <h1>Todays Deal</h1>
                  </div>

                </div>
              </div>
              <Carousels breakPoints={breakPoints}>

                {
                  product && product.map((element) => (


                    <Item>
                      <Link className="" to={`/product/${element._id}`}>
                        <div className="slider-img">
                          <img className="img-fluid" src={element.images[0].url} />
                          <div className="discount">
                            <p className="dis">Upto {element.discount}%</p>
                          </div>
                        </div>

                      </Link>

                    </Item>



                  ))
                }

              </Carousels>




            </div>
            <LikeableProducts />
          </section>
        </>

      }

    </>
  )
}

export default Home