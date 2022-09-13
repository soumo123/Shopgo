import React from 'react'
import '../../css/sidebar.css'
import { Link } from 'react-router-dom'
import { Doughnut, Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const Sidebar = () => {

    const lineState = {
        labels: ["Initial Amount", "Amount Earned"],
        datasets: [{
            label: "Total Amount",
            data: [0, 3000]
        }]
    }


    const doughnutState = {
        labels: ["Out of Stock", "In Stock"],
        datasets: [{
            backgroundColor: ["#ff0000", "#00FF00"],
            data: [3, 10]
        }]
    }

    return (
        <>
    
                    <div className="col-md-2 col-sm-1 display-table-cell v-align box" id="navigation">
                        <div className="logo">
                            {/* <a hef="home.html"><img src="http://jskrishna.com/work/merkury/images/logo.png" alt="merkery_logo" className="hidden-xs hidden-sm"/>
                        <img src="http://jskrishna.com/work/merkury/images/circle-logo.png" alt="merkery_logo" className="visible-xs visible-sm circle-logo"/>
                    </a> */}
                        </div>
                        <div className="navi">
                            <ul>
                                <li className="active"><Link to="/"><i className="fa fa-home" aria-hidden="true"></i><span className="hidden-xs hidden-sm">Home</span></Link></li>
                                <li><Link to="/admin/dashboard"><i className="fa fa-tasks" aria-hidden="true"></i><span className="hidden-xs hidden-sm">Dashboard</span></Link></li>
                                <li><Link to="/admin/products"><i className="fa fa-bar-chart" aria-hidden="true"></i><span className="hidden-xs hidden-sm">All Products</span></Link></li>
                                <li><Link to="/admin/create"><i className="fa fa-plus" aria-hidden="true"></i><span className="hidden-xs hidden-sm">Add Product</span></Link></li>
                                <li><Link to="/admin/orders"><i className="fa fa-shopping-cart" aria-hidden="true"></i><span className="hidden-xs hidden-sm">Orders</span></Link></li>
                                <li><Link to="/admin/users"><i className="fa fa-user" aria-hidden="true"></i><span className="hidden-xs hidden-sm">Users</span></Link></li>
                                <li><Link to="/admin/reviews"><i className="fa fa-commenting-o" aria-hidden="true"></i><span className="hidden-xs hidden-sm">Reviews</span></Link></li>
                            </ul>
                        </div>
                    </div>
                    
               
        </>
    )
}

export default Sidebar