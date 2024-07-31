import { Product, ProductStep } from "../../models/product";
import { Response } from "../../models/response";
import HttpClient from "../httpClient";


class ProductServices extends HttpClient{
    constructor(){
        super();
    }
    
    async fetchByCategory(id:number):Promise<Product[]>{
        return await this.get(`http://127.0.0.1:8000/api/products?id_category=${id}`,{})
         .then((result:Response)=>{
             return result.data
         }).catch((e)=>{
             console.log(e)
             return []
         })
     }
     async fetchProductSteps(product_id:number):Promise<ProductStep[]>{
        return await this.get(`http://127.0.0.1:8000/api/product-steps?product_id=${product_id}`,{})
         .then((result:Response)=>{
             return result.data
         }).catch((e)=>{
             console.log(e)
             return []
         })
     }
}
export default new ProductServices();