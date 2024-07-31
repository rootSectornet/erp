import { Response } from "../../models/response";
import { Config } from "../../models/tools";
import HttpClient from "../httpClient";


class ConfigServices extends HttpClient{
    constructor(){
        super();
    }
    
    async fetchConfigLaba():Promise<Config>{
        return await this.get(`http://127.0.0.1:8000/api/config/laba`,{})
         .then((result:Response)=>{
             return result.data
         }).catch((e)=>{
             console.log(e)
             return []
         })
     }
}
export default new ConfigServices();