<template>
    <v-dialog v-model="localShow" max-width="500" persistent>
      <v-card rounded="lg">
        <v-card-title class="d-flex justify-space-between align-center">
          <div class="text-h5 text-medium-emphasis ps-2">
            Pilih Material
          </div>
          <v-btn icon="mdi-close" variant="text" @click="$emit('close')"></v-btn>
        </v-card-title>
  
        <v-divider class="mb-4"></v-divider>
        <v-combobox
        label="Pilih Material"
        class="mx-3"
        item-title="name"
        item-value="id"
        :items="materials"
        v-model:search-input="searchQuery"
        v-model="selectedMaterial"
        @update:search="search"
        loading
        clearable
        ></v-combobox>
        <v-card-text v-if="typeof selectedMaterial == 'object' && selectedMaterial">
          <v-text-field
            label="Qty"
            v-model="qty"
            type="number"
            ></v-text-field>
          <div class="text-medium-emphasis mb-4">
            <p>Harga : {{ toRupiah(selectedMaterial?.price || "0") }} / {{ selectedMaterial?.unit }}</p>
            <p>Type : {{ selectedMaterial?.type?.toLocaleLowerCase() }}</p>
            <p>Total : {{ toRupiah((qty * Number(selectedMaterial.price)).toString() || "0") }}</p>
          </div>
            <v-checkbox v-model="haveCustomPrice" hide-details label="Perubahan Harga ?" class="shrink mr-2"></v-checkbox>
          <v-text-field
            v-if="haveCustomPrice"
            label="Harga baru"
            v-model="customPrice"
            prefix="Rp. "
            ></v-text-field>
            <v-divider></v-divider>
          <v-checkbox v-model="haveAdditionalPrice" label="Biaya Tambahan ?" hide-details  class="shrink mr-2"></v-checkbox>
          <v-text-field
            v-if="haveAdditionalPrice"
            label="Biaya Tambahan"
            v-model="additionalPrice"
            prefix="Rp. "
            ></v-text-field>
        </v-card-text>
  
  
        <v-card-actions class="my-2 d-flex justify-end">
          <v-btn class="text-none" rounded="xl" text="Tutup" @click="$emit('close')"></v-btn>
          <v-btn
            class="text-none"
            color="primary"
            rounded="xl"
            text="Tambah"
            variant="flat"
            :disabled="!(typeof selectedMaterial == 'object' && selectedMaterial)"
            @click="addMaterialProject()"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  <script lang="ts">
  import { computed, defineComponent, ref, watch } from 'vue';
import { useMaterialStore } from '../../stores/materials';
import { DeliveryStatus, Material, ProjectMaterial } from '../../models/material';
import { toRupiah } from '../../helpers/currency';
  
  export default defineComponent({
    props: {
      show: {
        type: Boolean,
        required: true
      }
    },
    setup(props,{emit}) {
        const materialStore = useMaterialStore();    
        const selectedMaterial = ref<Material | null>(null);
        const haveCustomPrice = ref<boolean | false>(false);
        const haveAdditionalPrice = ref<boolean | false>(false);
        const customPrice = ref<string | "">("");
        const additionalPrice = ref<string | "">("");
        const qty = ref<number | 0>(0);
        const localShow = ref(props.show);
        const materials = computed(() => materialStore.listMaterials);
        const searchQuery = ref('');
        const search = (query : string)=>{
            materialStore.searchMaterials(query);
        }
        watch(() => props.show, (newVal) => {
            localShow.value = newVal;
        });
    

        const addMaterialProject = ()=>{
          const materialProject : ProjectMaterial = {
            id:Math.random(),
            deliveryStatus:DeliveryStatus.PROCESSING,
            material:{...selectedMaterial.value} as Material,
            price:selectedMaterial.value?.price || "0",
            qty:qty.value || 0,
            reason:"",
            additionalPrice:additionalPrice.value,
            customPrice:customPrice.value,
            projectNo:"testingno1001",
            remainingQty:qty.value
          }
          materialStore.addProjectMaterial(materialProject);
          emit('close')
        }

        return {
            haveCustomPrice,
            haveAdditionalPrice,
            customPrice,
            additionalPrice,
            localShow,
            searchQuery,
            search,
            toRupiah,
            materials,
            selectedMaterial,
            qty,
            addMaterialProject
        };
    }
  });
  </script>
  