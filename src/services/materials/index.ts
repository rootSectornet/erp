import { Material, SearchMaterialResponse } from "../../models/material";
import HttpClient from "../httpClient";

class MaterialServices extends HttpClient{
    constructor(){
        super();
    }
    async searchMaterials(query:string):Promise<Material[]>{
        return await this.get(`http://127.0.0.1:8000/api/search/materials?name=${query}`,{})
         .then((result:SearchMaterialResponse)=>{
             return result.data
         }).catch((e)=>{
             console.log(e)
             return []
         })
     }
}
export default new MaterialServices();