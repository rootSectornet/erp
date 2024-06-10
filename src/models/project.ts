import { Component, DefineComponent } from "vue";

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
  
export interface ProjectStep {
    id: number;
    name: string;
    notes?: string;
    rank: number;
    status: ProjectStepStatus;
    dateStart?: Date;
    dateEnd?: Date;
    projectNo: string;
}

export interface ProjectStateStep{
    id:number;
    title:string;
    key:string;
    component: any;
}