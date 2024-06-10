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
}