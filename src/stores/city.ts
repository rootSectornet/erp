// stores/drawer.ts
import { defineStore } from 'pinia';
import { City } from '../models/project';
import cityService from '../services/city';

interface CityState {
    citys : City[],
}

export const useCityStore = defineStore('city', {
  state: () : CityState => ({
    citys : []
  }),
  getters: {
    items(state): City[] {
      return state.citys;
    }
  },
  actions: {
    searchCity(query:string){
        cityService.sarchCity(query).then((results:City[])=>{
            this.citys = results;
        })
    }
  },
});
