<template>
    <div class="px-4">
      <SummaryCard :totalCost="calculateTotalCost().toString()" title="Ukuran" :total="projectMaterials.length"/>
  
      <!-- Tombol Plus -->
      <v-fab
        key="mdi-plus"
        color="green"
        icon="mdi-plus"
        class="mb-4"
        location="bottom center"
        size="100"
        absolute
        app
        appear
        width="0px !important"
        @click="handlePlusClick"
      ></v-fab>
  
      <DialogAddMaterial v-if="showAddMaterial" :show="showAddMaterial" @close="closeAddMaterial"/>
      <v-dialog v-model="deleteDialog" max-width="400" persistent>
        <v-card prepend-icon="mdi mdi-delete-empty" :text="`Apakah anda yakin ingin menghapus ${selectedProjectMaterial?.material?.name}`" title="Hapus Project Material ?">
          <v-card-actions class="my-2 d-flex justify-end">
            <v-btn class="text-none" rounded="xl" text="Tutup" @click="toggleDeleteDialog(false, {} as ProjectMaterial)"></v-btn>
            <v-btn class="text-none" color="red" rounded="xl" text="Hapus" variant="flat" @click="deleteProjectMaterial()"></v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
  
      <v-list lines="two">
        <v-list-item class="mx-1 pl-0 ml-0" v-for="projectMaterial in projectMaterials" :key="projectMaterial.id" :title="projectMaterial.material.name" variant="plain">
          <template v-slot:subtitle>
            <p :class="`${projectMaterial.customPrice ? 'text-red' : 'text-muted'}`">{{ toRupiah((projectMaterial.customPrice || projectMaterial.price)) }} / {{ projectMaterial.material.unit }} {{ projectMaterial.additionalPrice ?  `+ ${toRupiah(projectMaterial.additionalPrice || "0")}` : ''}}</p>
          </template>
          <template v-slot:prepend>
            <v-btn color="#E53935" icon="mdi mdi-delete-empty" variant="text" @click="toggleDeleteDialog(true, projectMaterial)"></v-btn>
          </template>
          <template v-slot:append>
            <v-btn color="blue-darken-4" icon="mdi-information" variant="text">{{ projectMaterial.qty }} {{  projectMaterial.material.unit }}</v-btn>
          </template>
        </v-list-item>
      </v-list>
    </div>
  </template>
  
  <script lang="ts">
  import { computed, defineComponent, ref } from 'vue';
  import { useMaterialStore } from '../../../stores/materials';
  import { toRupiah } from '../../../helpers/currency';
  import { ProjectMaterial } from '../../../models/material';
  import { useRouter } from 'vue-router';
  
  export default defineComponent({
    setup() {
      const router = useRouter();
      const materialStore = useMaterialStore();
      const projectMaterials = computed(() => materialStore.listProjectdMaterial);
      const deleteDialog = ref<boolean | false>(false);
      const selectedProjectMaterial = ref<ProjectMaterial | null>(null);
      const showAddMaterial = ref(false);
      
      const currentItem = ref('estimasi'); // Track the active tab
  
      const calculateTotalCost = (): number => {
        return projectMaterials.value.reduce((total, material) => {
          return total + ((parseFloat(material.customPrice || material.price) * material.qty) + parseFloat(material.additionalPrice || "0"));
        }, 0);
      }
  
      const handlePlusClick = () => {
        if (currentItem.value === 'estimasi') {
          router.push('/projects/createEstimasi');
        } else if (currentItem.value === 'hasilSurvey') {
          router.push('/projects/create');
        }
      };
  
      const closeAddMaterial = () => {
        showAddMaterial.value = false;
      }
  
      const toggleDeleteDialog = (value: boolean, id: ProjectMaterial) => {
        deleteDialog.value = value;
        selectedProjectMaterial.value = id;
      }
  
      const deleteProjectMaterial = () => {
        materialStore.deleteProjectMaterial((selectedProjectMaterial.value?.id || 0));
        deleteDialog.value = false;
      }
  
      return {
        currentItem,
        closeAddMaterial,
        calculateTotalCost,
        showAddMaterial,
        handlePlusClick,
        projectMaterials,
        toRupiah,
        deleteDialog,
        toggleDeleteDialog,
        deleteProjectMaterial,
        selectedProjectMaterial,
      };
    }
  });
  </script>
  