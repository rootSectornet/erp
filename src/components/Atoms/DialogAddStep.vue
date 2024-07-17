<template>
  <v-dialog v-model="localShow" max-width="500" persistent>
    <v-card rounded="lg">
      <form @submit.prevent="submit">
        <v-card-title class="d-flex justify-space-between align-center">
          <div class="text-h5 text-medium-emphasis ps-2">
            Tambah Step Pengerjaan
          </div>
          <v-btn icon="mdi-close" variant="text" @click="$emit('close')"></v-btn>
        </v-card-title>

        <v-divider class="mb-4"></v-divider>
        <v-card-text>
          <v-text-field
            label="Title"
            name="stepTitle"
            v-model="stepTitle.value.value"
            :error-messages="stepTitleErrorMessage"
          ></v-text-field>
          <v-textarea label="Notes" v-model="stepNotes"></v-textarea>
          <v-text-field
            label="Max Duration"
            name="maxDuration"
            v-model="maxDuration.value.value"
            :error-messages="maxDurationErrorMessage"
            type="number"
            suffix="hari"
          ></v-text-field>
        </v-card-text>
        <v-card-actions class="my-2 d-flex justify-end">
          <v-btn class="text-none" rounded="xl" text="Tutup" @click="$emit('close')"></v-btn>
          <v-btn class="text-none" color="primary" rounded="xl" variant="flat" type="submit">
            Tambah
          </v-btn>
        </v-card-actions>
      </form>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue';
import { useField, useForm } from 'vee-validate';
import { object, string, number } from 'yup';
import { useProductStore } from '../../stores/products';
export default defineComponent({
  props: {
    show: {
      type: Boolean,
      required: true
    }
  },
  setup(props, { emit }) {
    
    const productStore = useProductStore();
    const lastIdStep = computed(() => (productStore.product.productSteps?.length || 0) + 1);
    const localShow = ref(props.show);
    watch(() => props.show, (newVal) => {
      localShow.value = newVal;
    });

    const validationSchema = object({
      stepTitle: string().min(10, 'Title needs to be at least 10 characters.').required('Title is required.'),
      maxDuration: number().positive('Duration must be greater than 0.').required('Duration is required.'),
    });

    const { handleSubmit, errors } = useForm({
      validationSchema,
    });

    const stepTitle = useField('stepTitle');
    const stepNotes = ref('');
    const maxDuration = useField('maxDuration');

    const submit = handleSubmit(values => {
      productStore.addSteps({
        id:lastIdStep.value + 1,
        maxDuration:Number(values.maxDuration),
        name:values.stepTitle,
        rank:lastIdStep.value - 1,
        notes:stepNotes.value,
        additionalCost:"0",
        totalCost:"0",
        workers:[]
      })
      emit('close');
    });

    const stepTitleErrorMessage = ref('');
    const maxDurationErrorMessage = ref('');

    watch(errors, (newErrors) => {
      stepTitleErrorMessage.value = newErrors.stepTitle || '';
      maxDurationErrorMessage.value = newErrors.maxDuration || '';
    });

    return {
      localShow,
      stepTitle,
      stepNotes,
      maxDuration,
      stepTitleErrorMessage,
      maxDurationErrorMessage,
      submit,
    };
  }
});
</script>
