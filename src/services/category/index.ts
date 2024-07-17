import HttpClient from "../httpClient";
import { CategoryProduct } from "../../models/categoryProduct";

interface ResponseCategory{
    code:number;
    message:string;
    data:CategoryProduct[]
}
export default class CategoryService extends HttpClient{

    constructor(){
        super();
    }

    async fetchAll():Promise<CategoryProduct[]>{
       return await this.get('http://127.0.0.1:8000/api/categories',{})
        .then((result:ResponseCategory)=>{
            return result.data
        }).catch((e)=>{
            console.log(e)
            return []
        })
    }

}