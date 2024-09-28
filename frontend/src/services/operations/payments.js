import { apiConnector } from "../apiConnector";
import { paymentEndpoints } from "../apis";

function loadScript(src){
    return new Promise((resolve)=>{
        const script = document.createElement('script');
        script.src = src;
        script.onload = ()=>{
            resolve(true);
        }
        script.onerror = ()=>{
            resolve(false);
        }
        document.body.appendChild(script);
    })
}

export const buyStorage = async (token , lands , userDetails) => {

    try{
       const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

       if(!res){
        throw new Error("Failed to load payment gateway");
       }

       const orderRes = await apiConnector("POST" , paymentEndpoints.capturePayment  , {lands} , {Authorization: `Bearer ${token}`});

       if(!orderRes.data.success){
        // toast.error("Failed to create order");
        throw new Error(orderRes.data.message);
       }
    //    console.log(orderRes);

       const options=  {
        key: "rzp_test_MJYbmICdRtbT31",
        currency: orderRes.data.currency,
        amount: orderRes.data.amount,
        order_id: orderRes.data.orderId,
        name: "Ampl",
        description: "Thank you for renting the land",
        prefill: {
            name: userDetails.firstName,
            email: userDetails.email
        },
        theme:{
            color: '#000000'
        },
        handler: function(response){
            verfiyPayment({...response , lands} , token);
        }
    };

    console.log(options);

    const paymentObject = new Razorpay(options);
    paymentObject.open();
    paymentObject.on('payment.failed' , function(response){
        toast.error("Payment failed");
        console.log(error);
    })

    } catch(error){
        console.log(error);
    }
    
};


async function verfiyPayment(bodyData , token){
    try{
        const res = await apiConnector("POST" ,paymentEndpoints.verifyPayment , bodyData , {Authorisation: `Bearer ${token}`});

        if(!res.data.success){
            throw new Error(res.data.message);
        }   
    } catch(error){
        console.log("VERIFY PAYMENT ERROR:" , error);
    }
   
}