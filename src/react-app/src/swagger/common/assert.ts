export const assert = (expr:any,msg:string) =>{
    if(!expr) {
        console.error('assert:' + msg);
    }
}