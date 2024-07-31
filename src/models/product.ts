import { Position } from "./position";

export interface Product {
    id: number;
    name: string;
    id_category:number;
    is_active: boolean;
    selected : boolean;
    created_at: Date;
    updated_dt: Date;
}

export interface ProductStep {
    id: number;
    name: string;
    notes?: string;
    rank: number;
    maxDuration:number;
    additionalCost:string;
    is_active:boolean;
    created_at:string;
    updated_dt:string;
}

export interface ProductStepResponse{
    code:string;
    message:string;
    data:ProductStep[];
}

