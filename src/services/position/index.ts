import { Position } from "../../models/position";
import { Response } from "../../models/response";
import HttpClient from "../httpClient";

class PositonServices extends HttpClient{
    constructor(){
        super();
    }
    async fetchAll():Promise<Position[]>{
        return await this.get(`http://127.0.0.1:8000/api/positions`,{})
         .then((result:Response)=>{
             return result.data
         }).catch((e)=>{
             console.log(e)
             return []
         })
     }
}
export default new PositonServices();