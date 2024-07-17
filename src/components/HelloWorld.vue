<template>
  <v-container class="fill-height">
    <ul>
      <li v-for="item in items" :key="item.id">{{ item.title }}</li>
    </ul>
  </v-container>
</template>

<script lang="ts">
import { computed, defineComponent,onMounted,ref } from 'vue'
import {useFreeApiStore} from '../stores/freeapi/freeapi';

export default defineComponent({
  setup() {
    const freeApiStore = useFreeApiStore()
    const items = computed(() => freeApiStore.articles);
    const fetchArticles = ()=>{
      freeApiStore.fetchAll();
    }

    onMounted(() => {
      fetchArticles();
    });
    return {
      items,
    }
  },
})
</script>
