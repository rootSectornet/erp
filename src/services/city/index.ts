import { City } from "../../models/project";
import { Response } from "../../models/response";
import HttpClient from "../httpClient";

class CityService extends HttpClient{
    constructor(){
        super();
    }
    async sarchCity(query:string):Promise<City[]>{
        return await this.get(`http://127.0.0.1:8000/api/search/city?query=${query}`,{})
         .then((result:Response)=>{
             return result.data
         }).catch((e)=>{
             console.log(e)
             return []
         })
     }
}
export default new CityService();