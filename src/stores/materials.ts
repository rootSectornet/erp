// stores/drawer.ts
import { defineStore } from 'pinia';
import { DeliveryStatus, Material, MaterialType, ProjectMaterial } from '../models/material';

const sampleProjectMaterial : ProjectMaterial[] = [
  {
    id:1,
    projectNo:"00000",
    material : {
          id:1,
          createdAt:new Date(),
          isActive:true,
          name:"Besi Hole 2x5cm",
          price:"40000",
          type:MaterialType.RINGAN,
          unit:"meter",
          updatedDt: new Date()
      },
    deliveryStatus:DeliveryStatus.PROCESSING,
    price:"50000",
    qty:2,
    reason:"",
    customPrice:"10000",
    remainingQty:2
  },
  {
    id:1,
    projectNo:"00000",
    material : {
          id:1,
          createdAt:new Date(),
          isActive:true,
          name:"Besi Hole 2x5cm",
          price:"40000",
          type:MaterialType.RINGAN,
          unit:"meter",
          updatedDt: new Date()
      },
    deliveryStatus:DeliveryStatus.PROCESSING,
    price:"50000",
    qty:12,
    reason:"",
    additionalPrice:"5000",
    remainingQty:12
  }
]

const sampleMaterial : Material[] = [
    {
        id:1,
        createdAt:new Date(),
        isActive:true,
        name:"Besi Hole 2x5cm",
        price:"40000",
        type:MaterialType.RINGAN,
        unit:"meter",
        updatedDt: new Date()
    },
    {
        id:2,
        createdAt:new Date(),
        isActive:true,
        name:"Besi Hole 3x5cm",
        price:"41000",
        type:MaterialType.RINGAN,
        unit:"meter",
        updatedDt: new Date()
    },
    {
        id:3,
        createdAt:new Date(),
        isActive:true,
        name:"Besi Hole 4x5cm",
        price:"43000",
        type:MaterialType.RINGAN,
        unit:"meter",
        updatedDt: new Date()
    }
];

interface MaterialState {
    materials : Material[],
    material : Material,
    projectMaterials : ProjectMaterial[]
}

export const useMaterialStore = defineStore('materials', {
  state: () : MaterialState => ({
        materials: [] as Material[],
        material: {} as Material,
        projectMaterials : sampleProjectMaterial
  }),
  getters: {
    listMaterials(state): Material[] {
      return state.materials;
    },
    selectedMaterial(state): Material {
      return state.material;
    },
    listProjectdMaterial(state): ProjectMaterial[] {
      return state.projectMaterials;
    },
  },
  actions: {
    setSelectedMaterial(value: Material) {
      this.material = value;
    },
    searchMaterials(query:string){
        this.material = {} as Material;
        const items = sampleMaterial.filter((v:Material)=>
            v.name.toLowerCase().includes(query.toLowerCase())
        );
        this.materials = query == "" ? [] : items
    },
    addProjectMaterial(value:ProjectMaterial){
        const index = this.projectMaterials.findIndex((v:ProjectMaterial)=>{
            return v.material.id == value.material.id
        })
        if(index < 0){
            this.projectMaterials.push(value)
        }
    },
    editProjectMaterial(value:ProjectMaterial){
        this.projectMaterials = this.projectMaterials.map((v:ProjectMaterial)=>{
            return v.id == value.id ? {...value} : {...v}
        })
    },
    deleteProjectMaterial(id : number){
      this.projectMaterials = this.projectMaterials.filter((v:ProjectMaterial)=>v.id!=id)
    }
  },
});
