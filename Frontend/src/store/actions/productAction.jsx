import axios from '../../api/axioconfig'
import { loadproduct } from '../../reducers/productSlice'

export const asyncloadproduct = () => async (dispath , getState) =>{
    try {
        const {data} = await axios.get("/products")
        dispath(loadproduct(data))
    } catch (error) {
     console.log(error)   
    }
}

export const asynccreateproduct = (product) => async(dispath,getState)=>{
    try {
        await axios.post("/products",product)
        dispath(asyncloadproduct())
        
    } catch (error) {
        console.log(error)
    }
}

export const asyncupdateproduct = (id ,product) => async (dispath,getState) =>{
    try {
       await axios.patch("/products/" + id, product);
       dispath(asyncloadproduct())
        
    } catch (error) {
        console.log(error)
        
    }
}

export const asyncdeleteproduct = (id) => async (dispath,getState) => {
    try {
        await axios.delete("/products/" + id )
        dispath(asyncloadproduct())
    } catch (error) {
        console.log(error)
    }
}