<template>
  <div class="customer-section mx-4">
    <v-list lines="two">
      <v-list-item
        title="Total Biaya Material"
        :subtitle="toRupiah(calculateTotalCost().toString())"
      ></v-list-item>
      <v-list-item
        title="Biaya Karyawan"
        :subtitle="toRupiah(totalCoststep.toString())"
      ></v-list-item>
      <v-list-item
        title="Biaya Transport"
        :subtitle="toRupiah(transportCost)"
      ></v-list-item>
      <v-list-item
        title="Biaya Modal Proyek"
        :subtitle="toRupiah(totalModalProyek.toString())"
      ></v-list-item>
      <v-list-item
        title="Total Laba"
      >
      <v-list-item-subtitle>
        <v-expansion-panels>
            <v-expansion-panel :title="additionalLaba ?  toRupiah(customLaba.toString()) : toRupiah(totalLaba.toString())" class="mx-0 px-0">
              <v-expansion-panel-text>
                <v-list-item
                  title="Laba Perhari"
                  :subtitle=" additionalLaba ?  toRupiah(customLabaPerhari.toString()) : toRupiah(labaDiharapkan)"
                ></v-list-item>
                <v-list-item
                  title="Durasi Pengerjaan"
                  :subtitle="totalDuration"
                ></v-list-item>
                <v-divider class="mb-3"></v-divider>
                <v-checkbox v-model="additionalLaba" label="Custom Keuntungan ?" hide-details  class="shrink mr-2"></v-checkbox>
                    <div v-if="additionalLaba">
                      <div class="text-caption">
                       Persentase diharapkan
                      </div>
                      <v-slider
                        v-model="projectStore.persentaseCustomLaba"
                        :thumb-size="24"
                        :min="0"
                        :step="1"
                        :max="100"
                        thumb-label="always"
                      >
                    
                    <template v-slot:append>
                      <v-text-field
                        v-model="projectStore.persentaseCustomLaba"
                        density="compact"
                        style="width: 70px"
                        type="number"
                        variant="outlined"
                        hide-details
                      ></v-text-field>
                    </template>
                  </v-slider>
                    </div>
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
      </v-list-item-subtitle>
      </v-list-item>
      <v-list-item
        title="Total Minimum Biaya Proyek"
        :subtitle="toRupiah(totalMinimumBiayaProyek.toString())"
      ></v-list-item>
      <v-list-item
        title="Total Biaya Proyek"
        :subtitle="toRupiah(totalBiayaProyek.toString())"
      ></v-list-item>
    </v-list>
  </div>
  </template>
  

  <script lang="ts">
  import { computed, defineComponent, onMounted,ref,watch } from 'vue';
  import { useMaterialStore } from '../../../stores/materials';
  import { useProjectStore } from '../../../stores/projects';
  import {toRupiah} from '../../../helpers/currency'
  
  export default defineComponent({
    // Komponen Vue di sini
    setup(){
      const materialStore = useMaterialStore();
      const projectStore = useProjectStore();
      const projectMaterials = computed(() => materialStore.listProjectdMaterial);
      const calculateTotalCost = (): number =>{
          return projectMaterials.value.reduce((total, material) => {
              return total + ((parseFloat(material.customPrice || material.price) * material.qty) + parseFloat(material.additionalPrice || "0"));
          }, 0);
      }

      
      const totalCoststep = computed(()=>{
        return projectStore.listProjectSteps?.reduce((total,step)=>{
          return Number(total) + Number(step.totalCost)
        },0)
      })
      
      const totalDuration = computed(()=>{
        return projectStore.listProjectSteps?.reduce((total,step)=>{
          return Number(total) + Number(step.duration)
        },0)
      })

      const transportCost = computed(()=>{
        return projectStore.costTransport
      })

      const totalModalProyek = computed(()=>{
        return calculateTotalCost() + Number(totalCoststep.value) + Number(transportCost.value)
      })

      const labaDiharapkan = computed(()=>{
        return projectStore.getLaba
      })

      onMounted(()=>{
        projectStore.fetchLabaData()
      })

      const totalLaba = computed(()=>{
        return Number(totalDuration.value) * Number(labaDiharapkan.value)
      })

      const additionalLaba = ref(false)

      watch(() => additionalLaba.value, (newVal) => {
        if(!newVal){
          projectStore.setPersentaseCustomLaba(0)
        }
      });
      const customLaba = computed(()=>{
        return (Number(totalModalProyek.value) / 100) * Number(projectStore.persentaseCustomLaba)
      })
      const customLabaPerhari = computed(()=>{
        return Number(customLaba.value) / Number(totalDuration.value)
      })
      
      const totalBiayaProyek = computed(()=>{
        return  additionalLaba.value ? Number(customLaba.value) + Number(totalModalProyek.value)  : Number(totalModalProyek.value) + Number(totalLaba.value)
      })
      const totalMinimumBiayaProyek = computed(()=>{
        return Number(totalModalProyek.value) + Number(totalLaba.value)
      })


      return {
          calculateTotalCost,
          projectMaterials,
          toRupiah,
          totalCoststep,
          totalDuration,
          transportCost,
          totalModalProyek,
          labaDiharapkan,
          totalLaba,
          totalBiayaProyek,
          additionalLaba,
          customLaba,
          customLabaPerhari,
          totalMinimumBiayaProyek,
          projectStore
      }
    }
  });
  </script>
  
  