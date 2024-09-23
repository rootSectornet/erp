<template>
    <v-bottom-sheet v-model="showCreate" inset :fullscreen="true" close-on-back>
      <v-card class="">
        <v-card-text class="sticky-header">
          <div class="d-flex justify-space-between align-center">
            <v-btn variant="text" icon="mdi mdi-close" @click="showCreate = !showCreate"></v-btn>
            <h4>{{ capitalizeFirstLetter(product.name || "New Project") }}</h4>
          </div>
          <div class="d-flex justify-space-between align-center">
            <v-btn prepend-icon="mdi-chevron-left" variant="text" :disabled="indexActiveState == 0" @click="toggleStep(false)">
              <template v-slot:prepend>
                <v-icon color="secondary"></v-icon>
              </template>
              Back
            </v-btn>
           <p>{{ listCreateStep[indexActiveState].title }}</p>
            <v-btn append-icon=" mdi mdi-send" v-if="indexActiveState == listCreateStep.length - 1"  variant="text"   @click="saveProject()">
              <template v-slot:append>
                <v-icon color="secondary"></v-icon>
              </template>
              Simpan
            </v-btn>
            <v-btn append-icon="mdi-chevron-right" variant="text" v-else  :disabled="indexActiveState == listCreateStep.length-1" @click="toggleStep(true)">
              <template v-slot:append>
                <v-icon color="secondary"></v-icon>
              </template>
              Next
            </v-btn>
          </div>
        </v-card-text>
        <div class="scrollable-content">   
          <keep-alive>
            <component v-bind:is="activeComponent"></component>
          </keep-alive>
        </div>
      </v-card>
    </v-bottom-sheet>
  </template>
  
  <script lang="ts">
  import { computed, defineAsyncComponent, defineComponent, ref } from 'vue';
  import { useProjectStore } from '../../stores/projects';
import {  ProjectStateStep } from '../../models/project';
import { useProductStore } from '../../stores/products';
  import { useMaterialStore } from '../../stores/materials';
  import { useCustomerStore } from '../../stores/customer';
import CategoryProduct from './CreateEstimasi/CategoryProduct.vue';
import DataCostumer from './CreateEstimasi/DataCostumer.vue';
import Material from './CreateEstimasi/Material.vue';
import Step from './CreateEstimasi/Step.vue';
import Customer from './CreateEstimasi/Customer.vue';
import Result from './CreateEstimasi/Result.vue';
import {ProjectPayload,PayloadMaterial,ProjectStep} from '../../models/project';
import Ukuran from './CreateEstimasi/Ukuran.vue';
  export default defineComponent({
    setup() {
      const projectStore = useProjectStore();
      const showCreate = computed({
        get(): boolean {
          return projectStore.show;
        },
        set(new_val: boolean) {
          projectStore.toggleCreate(new_val);
        },
      });
      
      const listCreateStep : ProjectStateStep[] =  [
        {
          id:1,
          key:"DataCostumer",
          title:"Data Cosutmer",
          component: DataCostumer
        },
        {
          id:2,
          key:"PRODUCT",
          title:"Pilih Product",
          component: CategoryProduct
        },
        {
          id:3,
          key:"UKURAN",
          title:"Pengukuran",
          component: Ukuran
        },
        {
          id:4,
          key:"MATERIAL",
          title:"Pilih Material",
          component: Material
        },
        
        {
          id:5,
          key:"STEP",
          title:"Step Pengerjaan",
          component: Step
        },
        {
          id:6,
          key:"CUSTOMER",
          title:"Data Customer",
          component: Customer
        },
        {
          id:7,
          key:"RESULT",
          title:"Perkiraan Biaya Proyek",
          component:Result
        },
      ];
      const indexActiveState = computed(() => projectStore.stateCreateActive);
      const activeComponent = computed(()=>listCreateStep[indexActiveState.value].component);
      
      const toggleStep = (next:boolean) => {
        projectStore.setActiveCreateStep(next ? indexActiveState.value+1 : indexActiveState.value-1);
      };
      function capitalizeFirstLetter(str: string): string {
        return str.split(" ").map((v)=>v.charAt(0).toUpperCase() + v.slice(1).toLowerCase()).join(" ")
      }
      
      const productStore = useProductStore();
      const product = computed(() => productStore.selectedProduct);
      
      const materialStore = useMaterialStore();
      const customerStore = useCustomerStore();
      const payloadMaterial : PayloadMaterial[] = materialStore.listProjectdMaterial.map((v) : PayloadMaterial=>{
        return {
          customPrice:Number(v.customPrice || 0),
          material_id:v.material.id,
          qty:v.qty
        }
      })
      const saveProject = ()=>{
        const payload : ProjectPayload = {
          customer : {
            ...customerStore.customer,
            city_id : Number(customerStore.customer.city_id?.id)
          },
          custom_profit : projectStore.persentaseCustomLaba,
          materials : payloadMaterial,
          product_id : productStore.product.id,
          project_steps : projectStore.listProjectSteps,
          transport_cost:Number(projectStore.costTransport)
        }
        projectStore.createProject(payload);
      }
      return {
        showCreate,
        product,
        indexActiveState,
        listCreateStep,
        activeComponent,
        toggleStep,
        capitalizeFirstLetter,
        saveProject
      };
    },
  });
  </script>
  
  