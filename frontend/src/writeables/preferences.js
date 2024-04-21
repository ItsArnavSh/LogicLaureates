import { writable } from 'svelte/store';
const statesOfIndia = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli', 'Daman and Diu', 'Delhi', 'Lakshadweep', 'Puducherry'
  ];
let ques = [
    ["How often will you need to access your storage?",2,"Frequent Access",["Daily","Weekly","Monthly","Yearly"]],//0 means true false
    ["What State will you prefer for your storage?",2,"Location",statesOfIndia],//1 means an input
    ["What will be your recommended price?",1,"Price"],
    ["Will you need transportation?",0,"Transport"],

];
ques.push(["Let's Find your Space!",0]);
let ans = new Array(ques.length-1).fill(false);
export const question = writable(ques);
export const preference = writable(ans)