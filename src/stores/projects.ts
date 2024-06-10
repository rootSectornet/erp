// stores/drawer.ts
import { defineStore } from 'pinia';
import { Project, ProjectStatus, ProjectStep, durationType } from '../models/project';
interface ProjectState {
    projects : Project[],
    showCreate : boolean,
    activeCreateState : number
}

export const useProjectStore = defineStore('project', {
  state: () : ProjectState => ({
    projects: [
      {
        projectNo: "PRO0098787",
        productId: 2,
        productName: "Canopy Baja Ringan Asbes",
        durationType: durationType.DAY,
        durationNumber: 5,
        amount: "5000000",
        status: ProjectStatus.OFFERING,
        isActive: true,
        createdAt: new Date(),
        updateDt: new Date(),
        totalStep: 0,
        steps: [],
      },
      {
        projectNo: "PRO0098789",
        productId: 2,
        productName: "Canopy Baja Ringan Genteng",
        durationType: durationType.DAY,
        durationNumber: 5,
        amount: "5000000",
        status: ProjectStatus.OFFERING,
        isActive: true,
        createdAt: new Date(),
        updateDt: new Date(),
        totalStep: 0,
        steps: [],
      },
    ],
    showCreate: false,
    activeCreateState: 0,
  }),
  getters: {
    listProjects(state): Project[] {
      return state.projects;
    },
    show(state) : boolean {
      return state.showCreate
    },
    stateCreateActive(state) : number {
      return state.activeCreateState
    }
  },
  actions: {
    toggleCreate(value: boolean) {
      this.$state.showCreate = value;
    },
    setActiveCreateStep(value: number) {
      this.$state.activeCreateState = value;
    },
    addStep(step:ProjectStep,projectNo:string){
      this.projects = this.projects.map((element:Project)=>{
        return element.projectNo == projectNo ? {...element,step:step} : element
      })
    }
  },
});
