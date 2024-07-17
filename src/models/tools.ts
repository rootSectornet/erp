export interface ToolTypes {
    id:number;
    name:string;
}
export interface SubToolTypes {
    id:number;
    name:string;
    type:ToolTypes;
}
export interface Tools {
    id:number;
    name:string;
    type?:ToolTypes;
    subType?:SubToolTypes;
}