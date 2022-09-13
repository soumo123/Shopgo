import React from 'react'
import {useSelector} from 'react-redux'
import { Typography, Stepper, StepLabel, Step } from "@material-ui/core";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import LibraryAddCheckIcon from "@material-ui/icons/LibraryAddCheck";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";


const DispatchDetails = () => {
    const {order} = useSelector((state) => state.orderDetails)

const {orderStatus} = order

console.log("orderStatus",orderStatus)
    const steps = [
        {
          label: <Typography>Order Dispatch</Typography>,
          icon: <LocalShippingIcon />,
        },
        {
          label: <Typography>Shipped</Typography>,
          icon: <LibraryAddCheckIcon />,
        },
        {
          label: <Typography>Delivered</Typography>,
          icon: <AccountBalanceIcon />,
        },
      ];
      const stepStyles = {
        boxSizing: "border-box",
      };

var activeStep = order && order?.orderStatus=="Processing"? 0 : order?.orderStatus =="Delivered" ? 2 :1
var currdate =  order?.createdAt
var newdate= order?.createdAt + 
console.log(currdate)
console.log(newdate)




  return (
    <>
    
 <Stepper alternativeLabel activeStep={activeStep} style={stepStyles}>
            {steps.map((item, index) => (
              <Step
                key={index}
                active={activeStep === index ? true : false}
                completed={activeStep >= index ? true : false}
              >
                <StepLabel
                  style={{
                    color: activeStep >= index ? "tomato" : "rgba(0, 0, 0, 0.649)",
                  }}
                  icon={item.icon}
                >
                  {item.label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
    
    </>
  )
}

export default DispatchDetails