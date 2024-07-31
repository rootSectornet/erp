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
            {{ toRupiah(step.totalCost) }}
          </v-chip>
          <TextWithIcon icon="mdi mdi-clock-time-three-outline" :text="`Max : ${step.duration} hari`" class="py-2" @click="toggleEditMaxDuration(true)"></TextWithIcon>
        </div>
        <v-divider class="my-2"></v-divider>
          <v-chip v-for="worker in step.workers"
            :key="worker.id"
            class="ma-2"
            color="indigo"
            prepend-icon="mdi-account-circle"
            @click="showEditWorker(worker)"
          >
            {{ worker.position.name }} 1
          </v-chip>
        <v-divider class="my-2"></v-divider>
      </v-card-text>
      <v-card-actions class="d-flex justify-space-between align-center">
        <v-btn color="#E53935" icon="mdi mdi-delete-empty" variant="text" @click="toggleDeleteDialog(true)"></v-btn>
        <v-btn color="#1a4bdd" icon="mdi mdi-account-multiple-plus" variant="outlined" @click="toggleAddWorkerDialog(true)"></v-btn>
        <div>
          <v-btn color="primary" icon="mdi mdi-chevron-up" @click="up" variant="text"></v-btn>
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

      
      <v-dialog v-model="addWorkerDialog" max-width="400" persistent>
        <v-card>
          <v-form>
            <v-card-title class="d-flex justify-space-between align-center">
              <div class="text-h5 text-medium-emphasis ps-2">
                Tambah Pekerja
              </div>
              <v-btn icon="mdi-close" variant="text" @click="toggleAddWorkerDialog(false)"></v-btn>
            </v-card-title>
            <v-card-text>
                <v-combobox
                  label="Pilih Pekerja"
                  class="mx-3"
                  item-title="name"
                  item-value="id"
                  :items="positions"
                  v-model="selectedPosition"
                  @update:modelValue="onChange"
                  loading
                  clearable
                  ></v-combobox>
                  <v-text-field
                    v-if="selectedPosition != null"
                    label="Salary"
                    name="salary"
                    class="mx-3"
                    v-model="salary"
                    :placeholder="selectedPosition.salary"
                    prefix="Rp. "
                  ></v-text-field>
            </v-card-text>
            <v-card-actions class="my-2 d-flex justify-end">
              <v-btn class="text-none" rounded="xl" text="Tutup" @click="toggleAddWorkerDialog(false)"></v-btn>
              <v-btn class="text-none" color="primary" rounded="xl" variant="flat" @click="saveWorker">
                Tambah
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-dialog>

      <v-dialog v-model="showDialogEditSalary" max-width="400" persistent>
        <v-card>
          <v-form>
            <v-card-title class="d-flex justify-space-between align-center">
              <div class="text-h5 text-medium-emphasis ps-2">
                Info Pekerja
              </div>
              <v-btn icon="mdi-close" variant="text" @click="toggleShowDialogEditSalary(false)"></v-btn>
            </v-card-title>
            <v-card-text>
                <v-combobox
                  label="Pilih Pekerja"
                  class="mx-3"
                  item-title="name"
                  item-value="id"
                  :items="positions"
                  v-model="selectedPosition"
                  @update:modelValue="onChange"
                  loading
                  clearable
                  ></v-combobox>
                  <v-text-field
                    v-if="selectedPosition != null"
                    label="Salary"
                    name="salary"
                    class="mx-3"
                    v-model="salary"
                    :placeholder="selectedPosition.salary"
                    prefix="Rp. "
                  ></v-text-field>
            </v-card-text>
            <v-card-actions class="my-2 d-flex justify-end">
              <v-btn class="text-none" rounded="xl" text="Tutup" @click="toggleShowDialogEditSalary(false)"></v-btn>
              <v-btn class="text-none" color="primary" rounded="xl" variant="flat" @click="editWorker">
                Update
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-dialog>
      
      <v-dialog v-model="showDialogDuration" max-width="400" persistent>
        <v-card>
          <v-form>
            <v-card-title class="d-flex justify-space-between align-center">
              <div class="text-h5 text-medium-emphasis ps-2">
                Info Max Duration
              </div>
              <v-btn icon="mdi-close" variant="text" @click="toggleEditMaxDuration(false)"></v-btn>
            </v-card-title>
            <v-card-text>
            <v-text-field
              label="Max Duration"
              name="maxDuration"
              v-model="maxDuration"
              type="number"
              suffix="hari"
            ></v-text-field>
            </v-card-text>
            <v-card-actions class="my-2 d-flex justify-end">
              <v-btn class="text-none" rounded="xl" text="Tutup" @click="toggleEditMaxDuration(false)"></v-btn>
              <v-btn class="text-none" color="primary" rounded="xl" variant="flat" @click="editDuration">
                Update
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-dialog>
    </v-card>
</template>
<script lang="ts">
    import { defineComponent,ref,PropType, computed,onMounted } from 'vue'
    import { ProjectStep } from '../../models/project';
    import { Workers } from '../../models/project';
    import {Position} from '../../models/position';
    import { useProductStore } from '../../stores/products';
    import { useProjectStore } from '../../stores/projects';
    import { usePositionStore } from '../../stores/positions';
    import { toRupiah } from '../../helpers/currency';
    export default defineComponent({
    props: {
      step: {
            type: {} as PropType<ProjectStep>,
            required: true
        }
    },
    setup(props){
      
      const projectStore = useProjectStore();
      const productStore = useProductStore();
      const positionStore = usePositionStore();
      const deleteDialog = ref<boolean | false>(false)
      const addWorkerDialog = ref<boolean | false>(false)
      const selectedPosition = ref<Position | null>(null)
      const showDialogEditSalary = ref<boolean | false>(false)
      const salary = ref<string | "">("")
      const selectedWorker = ref<Workers | null>(null)
      const showDialogDuration = ref<boolean | false>(false)
      const maxDuration = ref<number | 1>(1)
      const toggleEditMaxDuration = (value:boolean)=>{
        showDialogDuration.value = value
        maxDuration.value = props.step.duration
      }
      const toggleShowDialogEditSalary = (value:boolean)=>{
        showDialogEditSalary.value= value
      }
      const showEditWorker = (worker : Workers)=>{
        selectedPosition.value = worker.position
        salary.value = worker.salary
        showDialogEditSalary.value = true
        selectedWorker.value = worker
      }
      const toggleAddWorkerDialog = (value:boolean)=>{
        selectedPosition.value = null
        salary.value = "0"
        addWorkerDialog.value = value
      }
      const toggleDeleteDialog = (value:boolean)=>{
          deleteDialog.value = value
      }
      const deleteStep = ()=>{
        projectStore.deleteStep((props.step.id || 0))
        deleteDialog.value = false
      }
      const up = ()=>{
        projectStore.changeRank("up",props.step.id)
      }
      const down = ()=>{
        projectStore.changeRank("down",props.step.id)
      }
      
      const positions = computed(() => {
        return positionStore.listPosition
      });
      
      const product = computed(() => {
        return productStore.product
      });

      const onChange = (position : Position)=>{
        salary.value = position?.salary || "0"
      }

      const saveWorker = ()=>{
        const worker : Workers = {
          id:Math.random(),
          salary:salary.value,
          position:selectedPosition.value || {} as Position,
          customSalary:"0"
        }
        projectStore.addWorkerToStep(props.step.id,worker);
        
        addWorkerDialog.value = false
      }

      const editWorker = ()=>{
        const worker : Workers = {
          id:selectedWorker.value?.id || Math.random(),
          customSalary:"0",
          salary:salary.value,
          position:selectedPosition.value || {} as Position,
        }
        projectStore.editWorker(props.step,worker)
        showDialogEditSalary.value = false
      }

      const editDuration = ()=>{
        projectStore.editDurationStep(props.step.id,maxDuration.value);
        showDialogDuration.value = false
      }

      onMounted(()=>{
        positionStore.fetchAll()
      })

      return {
        deleteDialog,
        toggleDeleteDialog,
        deleteStep,
        up,
        down,
        toRupiah,
        addWorkerDialog,
        toggleAddWorkerDialog,
        positions,
        selectedPosition,
        salary,
        onChange,
        saveWorker,
        showDialogEditSalary,
        toggleShowDialogEditSalary,
        showEditWorker,
        selectedWorker,
        editWorker,
        showDialogDuration,
        maxDuration,
        toggleEditMaxDuration,
        editDuration
      }
    }
    })
</script>