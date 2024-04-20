import { writable } from 'svelte/store';
let ques = [
    ["Do you want Land Nearby?",0,"Nearby"],//0 means true false
    ["What city do you prefer for storage",1,"Location"]//1 means city
];
ques.push(["Let's Find your Space!",0]);
let ans = new Array(ques.length-1).fill(false);
export const question = writable(ques);
export const preference = writable(ans)