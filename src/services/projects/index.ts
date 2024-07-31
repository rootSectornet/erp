import { ProjectItem, ProjectPayload } from "../../models/project";
import { Response } from "../../models/response";
import HttpClient from "../httpClient";

interface ResponseProjectByType{
    code:number;
    message:string;
    data:ProjectItem[]
}
class ProjectServices extends HttpClient{
    constructor(){
        super();
    }
    async fetchAll(offset:number,limit:number,type:string):Promise<ProjectItem[]>{
        return await this.get(`http://127.0.0.1:8000/api/projects?type=${type}&offset=${offset}&limit=${limit}`,{})
         .then((result:ResponseProjectByType)=>{
             return result.data
         }).catch((e)=>{
             console.log(e)
             return []
         })
    }
    async create(payload : ProjectPayload):Promise<Response>{
        return await this.post(`http://127.0.0.1:8000/api/projects`,payload,{})
    }
}
export default new ProjectServices();