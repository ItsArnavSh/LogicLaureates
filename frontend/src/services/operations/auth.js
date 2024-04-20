import {apiConnector} from '../apiConnector';
import {authEndpoints} from '../apis';
import {navigate} from 'svelte-routing';
import {token , user} from '../../writeables/authWriteables'

export const loginApi = async (email, password) => {
    try{

        const response = await apiConnector("POST" , authEndpoints.login , {email , password});

        localStorage.setItem('token', response.data.token);
        token.set(response.data.token);
        user.set(response.data.user);

        if(response.data.accountType === 'Admin'){
            navigate('/admin-dashboard');
        }
        else if(response.data.accountType === 'Renter'){
            navigate('/user-dashboard');
        }
        else{
            navigate('/storage-owner-dashboard');
        }        

    } catch(error){
        console.log(error);
    }
}

export const loginTokenApi = async()=>{
    try{

        const response = await apiConnector("POST" , authEndpoints.loginToken , {} , {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        });

        user.set(response.data.user);

        if(response.data.accountType === 'Admin'){
            navigate('/admin-dashboard');
        }
        else if(response.data.accountType === 'Renter'){
            navigate('/user-dashboard');
        }
        else{
            navigate('/storage-owner-dashboard');
        }  

        

    } catch(error){
        console.log(error);
    }
}