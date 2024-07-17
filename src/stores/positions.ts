// stores/drawer.ts
import { defineStore } from 'pinia';
import { Position } from '../models/position';

const samplePositions : Position[] = [
    {
        id:1,
        name:"Tukang coli",
        salary:"230000"
    },
    {
        id:2,
        name:"Kenek sodok",
        salary:"130000"
    },
    {
        id:3,
        name:"Tukang Lihat",
        salary:"330000"
    },
]

interface PositionState {
    positions : Position[],
}

export const usePositionStore = defineStore('positions', {
  state: () : PositionState => ({
    positions : samplePositions
  }),
  getters: {
    listPosition(state): Position[] {
      return state.positions;
    }
  },
  actions: {
  },
});
