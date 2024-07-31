// stores/drawer.ts
import { defineStore } from 'pinia';
import { Position } from '../models/position';
import positionServices from '../services/position';

interface PositionState {
    positions : Position[],
}

export const usePositionStore = defineStore('positions', {
  state: () : PositionState => ({
    positions : []
  }),
  getters: {
    listPosition(state): Position[] {
      return state.positions;
    }
  },
  actions: {
    fetchAll(){
      positionServices.fetchAll()
      .then((results:Position[])=>{
        this.positions = results
      })
    }
  },
});
