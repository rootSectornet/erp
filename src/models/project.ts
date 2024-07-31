import { Component, DefineComponent } from "vue";
import { Position } from "./position";
import { ProjectMaterial } from "./material";

export enum durationType {
    MONTH = "MONTH",
    WEEK = "WEEK",
    DAY = "DAY"
}
export enum ProjectStatus {
    OFFERING = "OFFERING",
    SURVEY = "SURVEY",
    ACTIVE_PROJECT = "ACTIVE_PROJECT",
    DONE_PROJECT = "DONE_PROJECT",
    CANCEL = "CANCEL"
}
interface Status {
    title: string;
    color: string;
}

interface ProjectStatusChip {
    [key: string]: Status;
}

export const ProjectStatusChip: ProjectStatusChip = {
    "OFFERING": {
        title: "Waiting Survey",
        color: "red"
    },
    "SURVEY": {
        title: "Waiting Payment",
        color: "green"
    },
    "ACTIVE_PROJECT": {
        title: "Running",
        color: "secondary"
    },
    "DONE_PROJECT": {
        title: "Done",
        color: "primary"
    },
    "CANCEL": {
        title: "Cancelled",
        color: "red"
    }
};


export enum ProjectStepStatus {
    DONE = "DONE",
    PENDING = "PENDING",
    RUNNING = "RUNNING",
    STOP = "STOP",
    SKIPPED = "SKIPPED",
    ON_HOLD = "ON_HOLD"
}



export interface Project{
    projectNo : string;
    productId : number;
    productName : string;
    durationType : durationType;
    durationNumber : number;
    amount : string;
    status: ProjectStatus;
    isActive: boolean;
    reason?: string; // Optional property
    createdAt: Date;
    updateDt: Date;
    totalStep : number;
    steps?: ProjectStep[];
}
  

export interface ProjectStateStep{
    id:number;
    title:string;
    key:string;
    component: any;
}
export interface ProjectStep {
    id: number;
    name: string;
    notes?: string;
    rank: number;
    duration:number;
    additionalCost:string;
    totalCost : string;
    is_active:boolean;
    created_at:string;
    updated_dt:string;
    workers : Workers[];
}


export interface ProjectItem{
    projectNo: string;
    amount: string;
    transport_cost: string;
    type: ProjectStatus;
    reason: string;
    survey_date: string;
    created_at: string;
    updated_at: string;
    name: string;
    jumlahMaterial: number;
    duration: string;
}

export interface Workers {
    id:number;
    position:Position;
    salary:string;
    customSalary:string;
}

export interface City{
    id:number;
    name:string;
}

export interface Customer{
    id:number;
    name:string;
    email:string;
    address:string;
    phone:string;
    city_id:any;
}

export interface PayloadMaterial{
    material_id:number;
    qty:number;
    customPrice?:number;
}

export interface ProjectPayload {
    customer:Customer;
    product_id:number;
    materials:PayloadMaterial[];
    project_steps:ProjectStep[];
    transport_cost:number;
    custom_profit:number;
}