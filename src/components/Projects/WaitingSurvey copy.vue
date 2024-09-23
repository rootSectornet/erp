<template>
  <v-tabs
    v-model="activeTab"
    color="primary"
    background-color="transparent"
    centered
    class="tabs-centered"
  >
    <v-tab
      value="waiting"
      class="custom-tab"
      :class="{'active-tab': activeTab === 'waiting'}"
      grow
    >
      Waiting Survey
    </v-tab>
    <v-tab
      value="done"
      class="custom-tab"
      :class="{'active-tab': activeTab === 'done'}"
      grow
    >
      Done
    </v-tab>
  </v-tabs>
  <v-text-field
    append-inner-icon="mdi-magnify"
    density="compact"
    label="Search"
    v-model="search"
    variant="outlined"
    rounded
    class="mb-3"
  ></v-text-field>
   <!-- Display cards based on active tab -->
   <ProjectCard
      v-if="activeTab === 'waiting'"
      v-for="item in filteredItems"
      :key="item.projectNo"
      :project="item"
      class="mb-3"
    />

    <ProjectCardDone
      v-if="activeTab === 'done'"
      v-for="item in filteredItems"
      :key="item.projectNo"
      :project="item"
      class="mb-3"
    >
      <template v-slot:default="{ project }">
        <div>{{ project.name }}</div>
      </template>
    </ProjectCardDone>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, watch } from 'vue';
import { useProjectStore } from '../../stores/projects';
import ProjectCard from './ProjectCard.vue';
import ProjectCardDone from './ProjectCardDone.vue'; // Impor ProjectCardDone
import { useRouter } from 'vue-router';

export default defineComponent({
  components: {
    ProjectCard,
    ProjectCardDone, // Tambahkan ProjectCardDone ke daftar komponen
  },
  setup() {
    const projectStore = useProjectStore();
    const router = useRouter();
    const search = ref<string>('');
    const activeTab = ref('waiting');

    const fetchProjects = () => {
      const projectType = activeTab.value === 'waiting' ? 'OFFERING' : 'DONE';
      projectStore.fetchByType(projectType, 0, 10);
    };

    watch(activeTab, () => {
      fetchProjects();
      console.log('Active Tab:', activeTab.value);
      console.log('Projects:', projectStore.listProjects);
    });

    const items = computed(() => projectStore.listProjects);

    const filteredItems = computed(() => {
      return items.value.filter(item => 
        item.name.toLowerCase().includes(search.value.toLowerCase())
      );
    });

    const goToProjectDetail = (projectNo: string) => {
      router.push({ name: 'ProjectDetail', params: { projectNo } });
    };

    onMounted(() => {
      fetchProjects();
    });

    return {
      items,
      filteredItems,
      search,
      activeTab,
      goToProjectDetail,
    };
  },
});
</script>

<style scoped>
/* Meratakan tab ke tengah */
.tabs-centered {
  justify-content: center;
  margin-bottom: 15px;
}

/* Memberikan background biru saat tab aktif */
.custom-tab {
  background-color: transparent;
  color: black;
  width: 50%;
}

.active-tab {
  background-color: #C9C0A7 !important;
  color: black !important;
  width: 50%;
}
</style>
