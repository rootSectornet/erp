// stores/drawer.ts
import { defineStore } from 'pinia';

interface DrawerState {
  isOpen : boolean
}

export const useDrawerStore = defineStore('drawer', {
  state: () : DrawerState => ({
    isOpen: false,
  }),
  getters: {
    status(state): boolean {
      return state.isOpen;
    },
  },
  actions: {
    hideShow(value: boolean) {
      this.$state.isOpen = value;
    },
  },
});
