import React,{useEffect} from 'react'
import Sidebar from './Sidebar'
import '../../css/dashboard.css'
import { Link } from 'react-router-dom'
import { Doughnut, Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import {useSelector,useDispatch} from 'react-redux'
import { getAdminProducts } from '../../actions/productAction'
import { getAllOrders } from '../../actions/orderAction';
import { getAllUsers } from '../../actions/userAction';
import Metadata from '../layout/Metadata';



const Dashboard = () => {
  const dispatch = useDispatch()

let outOfStock=0 

let totalAmount = 0;


const {products} = useSelector((state) => state.products)
const{orders} = useSelector((state) => state.allOrders)
const{users} = useSelector((state) => state.allUsers)

orders &&
  orders.forEach((item) => {
    totalAmount += item.totalPrice;
  });
// console.log("orderssss", orders.length)

products && products.map((item)=>{
  if(item.stock==0){
    outOfStock +=1
  }
})


useEffect(() => {
  dispatch(getAdminProducts());
  dispatch(getAllOrders())
  dispatch(getAllUsers())
}, [dispatch]);

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [{
      label: "Total Amount",
      data: [0, totalAmount]
    }]
  }


  const doughnutState = {
    labels: ["Out of Stock", "In Stock"],
    datasets: [{
      backgroundColor: ["#ff0000", "#00FF00"],
      data: [outOfStock, products.length - outOfStock]
    }]
  }
  return (
   
    <div className="container-fluid display-table">
       <Metadata title="Dashboard"/>
      <div className="row display-table-row mt-5">
        <Sidebar />
        <div className="col-md-10 col-sm-11 display-table-cell v-align">


        <div className="row mt-5">
          <div className="col-sm-3">
            <div className="productbox">               
                <div className="d-sm-flex productitem align-items-center">
                   <div className="amout">
                   <p>Total Ammount</p>
                   </div>
                   <div className="number">
                   <div className="numbers">
                   <p>₹{totalAmount.toFixed(1)}</p>
                   </div>
                   </div>
                </div>

            </div>            
          </div>
          <div className="col-sm-3">
            <div className="productbox">
            <Link to="/admin/products">
            <div className="d-sm-flex productitem align-items-center">
              
                   <div className="amout">
                   <p>Product</p>
                   </div>
                   <div className="number">
                   <div className="numbers">
                   <p>{products && products.length}</p>
                   </div>
                   </div>
                </div>
              
           </Link>
            </div>
          </div>
          <div className="col-sm-3">
            <div className="productbox">
            <Link to="/admin/users">
            <div className="d-sm-flex productitem align-items-center">
              
                   <div className="amout">
                   <p>Users</p>
                   </div>
                   <div className="number">
                   <div className="numbers">
                   <p>{users && users.length}</p>
                   </div>
                   </div>
                </div>
              
           </Link>
            </div>
          </div>

          <div className="col-sm-3">
            <div className="productbox">
            <Link to="/admin/orders">
            <div className="d-sm-flex productitem align-items-center">
              
                   <div className="amout">
                   <p>Orders</p>
                   </div>
                   <div className="number">
                   <div className="numbers">
                   <p> {orders && orders.length}</p>
                   </div>
                   </div>
                </div>
              
           </Link>
            </div>
          </div>

        </div>
        
        
        <div className="row mt-5 mb-5 align-items-center">
        <div className="col-sm-7">
              <div className="linsechart">


                <Line data={lineState} />
                </div>
        </div>

        <div className="col-sm-5">
        <div className="doughnutchart">


<Doughnut data={doughnutState} />
</div>
          </div>
        </div>
    
       
       
      </div>

    </div>
      </div>
  )
}

export default Dashboard