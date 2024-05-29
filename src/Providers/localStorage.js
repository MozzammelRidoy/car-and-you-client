const getStoredCartFromLS = () => {

    const storedCart = localStorage.getItem('myCart'); 
    if(storedCart){
        return JSON.parse(storedCart)
    }
    return []; 

}

const saveInLocalStorage = myCart => {
    const myCartConvertStringfied = JSON.stringify(myCart); 
    localStorage.setItem('myCart' , myCartConvertStringfied); 
}

const removeFormLocalStorage = _id => {
    const myCart = getStoredCartFromLS(); 
    const remaining = myCart.filter(id => id !== _id); 
    saveInLocalStorage(remaining); 
}


const addInLocalStorage = _id => {
    const myCart = getStoredCartFromLS(); 
    if(myCart.includes(_id)){
        return 
    }
    else{
        myCart.push(_id); 
    saveInLocalStorage(myCart); 
    return 
}






}

export {addInLocalStorage, getStoredCartFromLS, removeFormLocalStorage} 