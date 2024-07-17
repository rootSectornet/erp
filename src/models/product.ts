import { Position } from "./position";

export interface Product {
    id: number;
    name: string;
    idCategory:number;
    isActive: boolean;
    selected : boolean;
    createdAt: Date;
    updatedDt: Date;
    productSteps? : ProductStep[]
}

export interface ProductStep {
    id: number;
    name: string;
    notes?: string;
    rank: number;
    maxDuration:number;
    workers:Workers[];
    totalCost:string;
    additionalCost:string;
}


export interface Workers {
    id:number;
    position:Position;
    salary:string;
    customSalary:string;
}