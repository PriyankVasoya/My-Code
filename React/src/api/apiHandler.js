
import { axiosClient } from "./apiClient";

export function signUpp(data){
    return axiosClient.post('/api/v1/auth/signup',data); 
}

export function Loginapi(data){
    return axiosClient.post('/api/v1/auth/login',data); 
}

export function Homepage(){ 
    return axiosClient.get('api/v1/phone/product_list');
}

export function cpass(data){
    return axiosClient.post('/api/v1/auth/changepassword',data); 
}

export function companyname(){
    return axiosClient.get('/api/v1/phone/company'); 
}


export function Logoutapi(data){
    return axiosClient.post('/api/v1/auth/logout',data); 
}

export function editApi(data){
    return axiosClient.post('/api/v1/auth/editprofile',data); 
}

export function showProfile(){
    return axiosClient.get('/api/v1/auth/profileshow'); 
}

export function forgotPassword(data){
    return axiosClient.post('/api/v1/auth/forgotPassword',data); 
}

export function cartDetails(data){
    return axiosClient.post('/api/v1/phone/showcart',data); 
}

export function AddtoCart(data){
    return axiosClient.post('/api/v1/phone/addtocart',data); 
}

export function removeitem(data){
    return axiosClient.post('/api/v1/phone/removecartitem',data); 
}

export function Filterapi(data){
    return axiosClient.post('/api/v1/phone/product_list_by_category',data); 
}






