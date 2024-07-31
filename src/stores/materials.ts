// stores/drawer.ts
import { defineStore } from 'pinia';
import { DeliveryStatus, Material, MaterialType, ProjectMaterial } from '../models/material';
import materialsServices from '../services/materials';
interface MaterialState {
    materials : Material[],
    material : Material,
    projectMaterials : ProjectMaterial[]
}

export const useMaterialStore = defineStore('materials', {
  state: () : MaterialState => ({
        materials: [] as Material[],
        material: {} as Material,
        projectMaterials : [] as ProjectMaterial[]
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
      materialsServices.searchMaterials(query).then((result:Material[])=>{
        this.materials = result
      })
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
