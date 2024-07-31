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

export interface Config{
    key:string;
    value:string;
    created_at:string;
    updated_at:string;
}