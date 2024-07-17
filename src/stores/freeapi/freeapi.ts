// stores/drawer.ts
import { defineStore } from 'pinia';
import { Article } from '../../models/article';
import FreeApi from '../../services/freeapi';
const freeApi = new FreeApi();

interface FreeApiState {
    articles : Article[],
}

export const useFreeApiStore = defineStore('freeapis', {
  state: () : FreeApiState => ({
    articles : []
  }),
  getters: {
    listPosition(state): Article[] {
      return state.articles;
    }
  },
  actions: {
    fetchAll() {
        freeApi.fetchAll().then((articles:Article[])=>{
            this.articles = articles
        }).catch((err)=>console.log(err))
    },
  },
});
