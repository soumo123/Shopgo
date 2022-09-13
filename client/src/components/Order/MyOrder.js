import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { getProclearErrors, myOrders } from "../../actions/orderAction";
import { DataGrid } from "@material-ui/data-grid";
import Loader from "../layout/loader/Loader";
import { Link} from "react-router-dom";
import LaunchIcon from "@material-ui/icons/Launch";


const MyOrder = () => {
    const dispatch = useDispatch()

    const {loading,error,orders}  = useSelector((state) => state.myOrders)

    const {user}  = useSelector((state) => state.user)

    const columns = [
        { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },
    
        {
          field: "status",
          headerName: "Status",
          minWidth: 150,
          flex: 0.5,
          cellClassName: (params) => {
            return params.getValue(params.id, "status") === "Delivered"
              ? "greenColor"
              : "redColor";
          },
        },
        {
          field: "itemsQty",
          headerName: "Items Qty",
          type: "number",
          minWidth: 150,
          flex: 0.3,
        },
    
        {
          field: "amount",
          headerName: "Amount",
          type: "number",
          minWidth: 270,
          flex: 0.5,
        },
    
        {
          field: "actions",
          flex: 0.3,
          headerName: "Actions",
          minWidth: 150,
          type: "number",
          sortable: false,
          renderCell: (params) => {
            return (
              <Link to={`/order/${params.getValue(params.id, "id")}`}>
                <LaunchIcon />
              </Link>
            );
          },
        },
      ];

    const rows  =[]
    
    orders &&
    orders.forEach((item, index) => {
      rows.push({
        itemsQty: item.orderItems.length,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice.toFixed(1),
      });
    });




    useEffect(() => {

        if(error){
            alert(error)
            dispatch(getProclearErrors())
        }
        dispatch(myOrders())
     
    }, [dispatch,error,alert])
    


    return (
        <>

            {
                loading ? (<Loader />) : (
                    <div>

                        <DataGrid rows={rows} columns={columns} pageSize={10} disableSelectionOnClick className="" autoHeight />
                        <b><p>{user?.name}'s Orders </p></b>
                    </div>

                )
            }

        </>
    )
}

export default MyOrder