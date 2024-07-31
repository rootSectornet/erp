// stores/drawer.ts
import { defineStore } from 'pinia';
import { Project, ProjectItem, ProjectPayload, ProjectStatus, ProjectStep, Workers, durationType } from '../models/project';
import ProjectServices from '../services/projects';
import configServices from '../services/config'
import { Config } from '../models/tools';
import { Response } from '../models/response';
interface ProjectState {
    projects : ProjectItem[],
    projectSteps : ProjectStep[],
    showCreate : boolean,
    activeCreateState : number,
    transportCost : string,
    laba : string,
    loading:boolean,
    errorCreate:string,
    persentaseCustomLaba : number
}

export const useProjectStore = defineStore('project', {
  state: () : ProjectState => ({
    projects: [],
    projectSteps : [],
    showCreate: false,
    activeCreateState: 0,
    transportCost : "0",
    laba : "0",
    loading:false,
    errorCreate:"",
    persentaseCustomLaba : 10
  }),
  getters: {
    listProjects(state): ProjectItem[] {
      return state.projects;
    },
    costTransport(state):string{
      return state.transportCost
    },
    listProjectSteps(state): ProjectStep[] {
      return state.projectSteps;
    },
    show(state) : boolean {
      return state.showCreate
    },
    stateCreateActive(state) : number {
      return state.activeCreateState
    },
    getLaba(state) : string {
      return state.laba
    },
    projectLoading(state):boolean{
      return state.loading
    },    
    getPersentaseCustomLaba: (state) => state.persentaseCustomLaba,

  },
  actions: {
    setPersentaseCustomLaba(value: number) {
      this.persentaseCustomLaba = value;
    },
    fetchByType(type:string,offset:number,limit:number){
      ProjectServices.fetchAll(offset,limit,type).then((result:ProjectItem[])=>{
        this.projects = result
      })
    },
    fetchLabaData(){
      configServices.fetchConfigLaba().then((result:Config)=>{
        this.laba = result.value
      })
    },
    async createProject(payload :ProjectPayload){
      this.loading = true;
      try{
        const response : Response = await ProjectServices.create(payload)
        if(response.code == 200){
          this.loading = false;
        }
      }catch(e){
        this.loading = false;
        console.log(e)
      }
    },
    setTransportCost(value:string){
      this.transportCost = value
    },
    toggleCreate(value: boolean) {
      this.$state.showCreate = value;
    },
    setActiveCreateStep(value: number) {
      this.$state.activeCreateState = value;
    },
    setDefaultProjectSteps(steps: ProjectStep[]) {
      this.projectSteps = steps;
    },
    addStep(step:ProjectStep){
      this.projectSteps.push(step)
    },
    deleteStep(stepId:number){
      console.log(stepId);
      this.projectSteps = this.projectSteps.filter((item:ProjectStep)=>{
        return item.id != stepId
      })
    },
    addWorkerToStep(stepId:number,workers:Workers){
      const indexStep : number = this.projectSteps.findIndex((item:ProjectStep)=>{
        return item.id == stepId
      })
      if(indexStep>=0){
        this.projectSteps[indexStep]?.workers.push(workers);
        this.projectSteps[indexStep].totalCost = Number(this.projectSteps[indexStep].totalCost) +  (Number(workers.salary) * Number(this.projectSteps[indexStep].duration))
      }
    },
    editWorker(step:ProjectStep,worker:Workers){
      const stepindex = this.projectSteps.findIndex((item:ProjectStep)=>item.id == step.id)
      if(stepindex >= 0){
      const workerIndex =  this.projectSteps[stepindex].workers.findIndex((v:Workers)=>v.id == worker.id)
      if(workerIndex >= 0){
        this.projectSteps[stepindex].totalCost = Number(this.projectSteps[stepindex].totalCost) -  (Number(this.projectSteps[stepindex].workers[workerIndex].salary) *Number(step.duration) )
        this.projectSteps[stepindex].workers[workerIndex] = worker
        this.projectSteps[stepindex].totalCost += Number(worker.salary) * Number(step.duration)
      }
      }
    },
    editDurationStep(idStep:number,duration:number){
      const indexStep = this.projectSteps.findIndex((v:ProjectStep)=>v.id == idStep);
      if(indexStep >= 0){
        this.projectSteps[indexStep].duration = duration
      }
    },
    changeRank(position:string,idStep:number){
      const steps : ProjectStep[] = this.projectSteps
      if(position === "up"){
          const selectedIndex = steps.findIndex((v)=>v.id == idStep);
          if(selectedIndex >= 0){
            const currentRank = steps[selectedIndex].rank
            if(currentRank > 0){
              const selectedWillChanges = steps.findIndex(v=>v.rank == (currentRank-1))
              if(selectedWillChanges >= 0){
                steps[selectedIndex].rank = steps[selectedWillChanges].rank
                steps[selectedWillChanges].rank = currentRank
              }
            }
          }
      }
      if(position === "down"){
          const selectedIndex = steps.findIndex((v)=>v.id == idStep);
          if(selectedIndex >= 0){
            const currentRank = steps[selectedIndex].rank
            if(currentRank < steps.length){
              const selectedWillChanges = steps.findIndex(v=>v.rank == (currentRank+1))
              if(selectedWillChanges >= 0){
                steps[selectedIndex].rank = steps[selectedWillChanges].rank
                steps[selectedWillChanges].rank = currentRank
              }
            }
          }
      }
    }
  },
});
