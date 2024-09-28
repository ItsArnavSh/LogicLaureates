import { apiConnector } from "../apiConnector";
import {toasts} from 'svelte-toasts'
import { landEndpoints } from "../apis";

export const storageApproval = async(response , _id , token)=>{
    try{    

        const res  =await apiConnector("POST" , landEndpoints.approveStorage , {response , propertyId: _id} , {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        });

        console.log("Successfully recorded admin's response", res);
        toasts.success("Approved");

    } catch(error){
        toasts.error("Error approving");
        console.log(error);
    }
}