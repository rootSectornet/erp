/**
 * CREATE TABLE `Materials` (
  `id` integer PRIMARY KEY,
  `name` varchar(255),
  `price` varchar(16),
  `unit` varchar(10),
  `type` ENUM ('BERAT', 'RINGAN'),
  `isActive` bool,
  `createdAt` timestamp,
  `updatedDt` timestamp
);

CREATE TABLE `ProjectMaterial` (
  `id` integer PRIMARY KEY,
  `projectNo` varchar(24),
  `materialId` integer,
  `qyt` integer,
  `price` varchar(16),
  `customPrice` varchar(16),
  `additionalPrice` varchar(16),
  `deliveryStatus` ENUM ('PROCESSING','DELIVERED', 'FAILED', 'RETURNED', 'REPLACED'),
  `reason` text,
  `remainingQty` integer
);
 */

export enum MaterialType{
    BERAT = "BERAT",
    RINGAN = "RINGAN"
}

export enum DeliveryStatus{
    PROCESSING = "PROCESSING",
    DELIVERED = "DELIVERED",
    RETURNED = "RETURNED",
    FAILED = "FAILED",
    REPLACED = "REPLACED",
}

export interface Material{
    id:number;
    name:string;
    price:string;
    unit:string;
    type: MaterialType;
    isActive : boolean;
    createdAt : Date;
    updatedDt : Date;
}

export interface ProjectMaterial{
    id:number;
    projectNo?:string;
    material:Material;
    qty:number;
    price:string;
    customPrice?:string;
    additionalPrice?:string;
    deliveryStatus:DeliveryStatus;
    reason:string;
    remainingQty?:number
}