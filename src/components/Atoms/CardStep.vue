<template>
    <v-card class="my-3">
      <v-card-title>
        {{ step.name }}
      </v-card-title>
      <v-card-text>
        <div class="notes">
          <p>{{ step.notes }}</p>
        </div>
        <div class="status my-2 d-flex justify-space-between align-center">
          <v-chip>
            Pending
          </v-chip>
          <TextWithIcon icon="mdi mdi-clock-time-three-outline" :text="`Max : ${step.maxDuration} hari`" class="py-2"></TextWithIcon>
        </div>
        <v-divider class="my-2"></v-divider>
      </v-card-text>
      <v-card-actions class="d-flex justify-space-between align-center">
        <v-btn color="#E53935" icon="mdi mdi-delete-empty" variant="text" @click="toggleDeleteDialog(true)"></v-btn>
        <div>
          <v-btn color="primary" icon="mdi mdi-chevron-up" @click="up" variant="text" v-if="step.rank > 0"></v-btn>
          <v-btn color="primary" icon="mdi mdi-chevron-down" @click="down" variant="text"></v-btn>
        </div>
      </v-card-actions>
      
    <v-dialog
          v-model="deleteDialog"
          max-width="400"
          persistent
          >
          <v-card
              prepend-icon="mdi mdi-delete-empty"
              :text="`Apakah anda yakin ingin menghapus ${step.name}`"
              title="Hapus Project Material ? "
          >
              <v-card-actions class="my-2 d-flex justify-end">
                  <v-btn class="text-none" rounded="xl" text="Tutup" @click="toggleDeleteDialog(false)"></v-btn>
                  <v-btn
                      class="text-none"
                      color="red"
                      rounded="xl"
                      text="Hapus"
                      variant="flat"
                      @click="deleteStep()"
                  ></v-btn>
              </v-card-actions>
          </v-card>
      </v-dialog>
    </v-card>
</template>
<script lang="ts">
    import { defineComponent,ref,PropType } from 'vue'
import { ProductStep } from '../../models/product';
import { useProductStore } from '../../stores/products';
    export default defineComponent({
    props: {
      step: {
            type: {} as PropType<ProductStep>,
            required: true
        }
    },
    setup(props){
      const productStore = useProductStore();
      const deleteDialog = ref<boolean | false>(false)
      const toggleDeleteDialog = (value:boolean)=>{
          deleteDialog.value = value
      }
      const deleteStep = ()=>{
          productStore.deleteSteps((props.step.id || 0))
          deleteDialog.value = false
      }
      const up = ()=>{
        productStore.changeRank("up",props.step.id)
      }
      const down = ()=>{
        productStore.changeRank("down",props.step.id)
      }
      return {
        deleteDialog,
        toggleDeleteDialog,
        deleteStep,
        up,
        down
      }
    }
    })
</script>