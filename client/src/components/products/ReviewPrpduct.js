import React from 'react'
import '../../css/singleProduct.css'
import { Rating } from "@material-ui/lab";
import { useSelector } from 'react-redux';


const ReviewPrpduct = () => {

 

  // const breakPoints = [
  //   { width: 1, itemsToShow: 1 },
  //   { width: 550, itemsToShow: 2 },
  //   { width: 768, itemsToShow: 3 },
  //   { width: 1200, itemsToShow: 4 }
  // ];
  const product = useSelector((state)=>state.product)
  const{reviews} = product




  return (
    <>
      {/* <div className="carao">
        <div className="container">
          <div className="row mt-5">
<div className="col-sm-12">
<Carousels breakPoints={breakPoints}>
          <Item>
          <Card>
       <Card.Img  className = "profileimg" variant="top" src={profile} />
      <Card.Body>
        <Card.Title>{review.name}</Card.Title>
        <Card.Text>
          {review.comment}
        </Card.Text>
        <Rating {...options}/>
      </Card.Body>
    </Card>
          </Item>

          

        </Carousels>

</div>

          </div>
        </div>
        
      </div> */}
      <div class="container">
       <div class="row mt-5 mb-5 justify-content-center text-center">
  {reviews && reviews[0] ? (
            <>
                {
                  reviews && reviews.map((review)=>(
                   
                    <div class="col-sm-3">
                      <div class="cad">
                        
                        <div class="">
                        <h5 class="">{review.name}</h5>
                        <Rating  size="large" value= {review?.rating} precision= {0.5}  readOnly="true"/>
                                                   <p class="">{review.comment}</p>
                        </div>
                      </div>
                    </div>
                    
                  ))
                }
             </>
            ):(
              <div class="col-sm-3"> <div class="cad"> <p>No reviews there</p></div></div>
             
             
            )}   




</div>
</div>
    </>

    //         <Card>
    //    <Card.Img  className = "profileimg" variant="top" src={profile} />
    //   <Card.Body>
    //     <Card.Title>{review.name}</Card.Title>
    //     <Card.Text>
    //       {review.comment}
    //     </Card.Text>
    //     <Rating {...options}/>
    //   </Card.Body>
    // </Card>










  )
}

export default ReviewPrpduct