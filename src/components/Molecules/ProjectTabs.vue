<template>
  <v-tabs v-model="currentItem" fixed-tabs color="primary" class="position-sticky">
    <v-tab
      v-for="item in items"
      :key="item.key"
      :text="item.title"
      :value="item.key"
    ></v-tab>
  </v-tabs>
  <v-tabs-window v-model="currentItem">
    <v-tabs-window-item
      v-for="item in items"
      :key="item.key"
      :value="item.key"
    >
      <v-card flat>
        <v-card-text>
          <!-- Render dynamic component -->
          <component :is="item.content"></component>
        </v-card-text>
      </v-card>
    </v-tabs-window-item>
  </v-tabs-window>
  <v-fab
    key="mdi-plus"
    color="green"
    icon="mdi-plus"
    class="mb-4"
    location="bottom center"
    size="64"
    absolute
    app
    appear
    width="0px !important"
    @click="navigateToCreatePage"
  ></v-fab>
</template>

<script>
import { markRaw } from 'vue';
import WaitingSurvey from '../Projects/WaitingSurvey.vue';
import Estimasi from '../Projects/Estimasi.vue';
import { useProjectStore } from '../../stores/projects';
  import { computed } from 'vue'
import { useRouter } from 'vue-router';

export default {

  data() { 
    return {
      currentItem: 'estimasi', // Set default selected tab
      items: [
        { title: "Estimasi", key: "estimasi", content: Estimasi },
        { title: "Hasil Survey", key: "hasilSurvey", content: WaitingSurvey }
      ]
    };
  },
  components: {
    WaitingSurvey: markRaw(WaitingSurvey),
    Estimasi: markRaw(Estimasi)
  },
  setup() {
    const router = useRouter();
    const projectStore = useProjectStore();

    const navigateToCreatePage = () => {
      if (this.currentItem === 'estimasi') {
        router.push('/project/estimasi/create');
      } else if (this.currentItem === 'hasilSurvey') {
        router.push('/project/hasilSurvey/create');
      }
    };
    const toggleCreate = () => {
        projectStore.toggleCreate(!projectStore.showCreate);
      };
      const loading = computed(()=>{
        return projectStore.projectLoading
      })

    return {
      navigateToCreatePage,
      toggleCreate,
      loading
    };
  },
  watch: {
    currentItem(newVal) {
      console.log('Active Tab:', newVal);
    }
  }
};
</script>
