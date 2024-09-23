<template>
    <div>
      <v-breadcrumbs :items="breadCumbs" class="mx-3">
        <template v-slot:prepend>
          <v-icon
            icon="mdi mdi-arrow-left"
            class="mr-2"
            @click="$emit('back')"
            size="small"
          ></v-icon>
        </template>
      </v-breadcrumbs>
  
      <p v-if="products.length == 0 && searchQuery == ''">Product Kosong</p>
      <p v-else-if="products.length == 0 && searchQuery != ''">
        Tidak Ada Product dengan pencarian {{ searchQuery }}
      </p>
      <div v-else>
        <div class="customer-section mx-4 mt-5">
          <!-- Ukuran -->
          <div class="d-flex justify-space-between align-center">
            <TextWithIcon text="Ukuran" />
            <v-select
              :items="ukuranOptions"
              v-model="selectedUkuran"
              label="Pilih Ukuran"
              hide-details
              dense
              solo
              class="width-small"
            ></v-select>
          </div>
          <v-divider class="my-3"></v-divider>
  
          <!-- Volume -->
          <div class="d-flex justify-space-between align-center">
            <TextWithIcon text="Volume" />
            <v-text-field hide-details dense solo></v-text-field>
          </div>
          <v-divider class="my-3"></v-divider>
  
          <!-- Spek Rangka -->
          <div class="d-flex flex-column align-start width-small">
            <TextWithIcon text="Spek Rangka" />
            <v-text-field
              hide-details
              dense
              solo
              class="width-small mt-2"
            ></v-text-field>
          </div>
          <v-divider class="my-3"></v-divider>
  
          <!-- Harga permeter -->
          <div class="d-flex flex-column align-start width-small">
            <TextWithIcon text="Harga Permeter" />
            <v-text-field
              hide-details
              dense
              solo
              class="width-small mt-2"
            ></v-text-field>
          </div>
          <v-divider class="my-3"></v-divider>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, computed, ref, PropType } from "vue";
  import { useProductStore } from "../../../stores/products";
  import { CategoryProduct } from "../../../models/categoryProduct";
  
  export default defineComponent({
    props: {
      category: {
        type: {} as PropType<CategoryProduct>,
        required: true,
      },
    },
    setup(props) {
      const breadCumbs = ["Categorys"];
      if (props.category) {
        breadCumbs.push(props.category.name);
      }
      const searchQuery = ref("");
      const productStore = useProductStore();
      const products = computed(() =>
        props.category ? productStore.listSearchProducts : []
      );
      const search = () => {
        productStore.searchProducts(searchQuery.value);
      };
  
      // Options for dropdown
      const ukuranOptions = ref(["Small", "Medium", "Large", "Extra Large"]);
      const selectedUkuran = ref<string>("");
  
      return {
        products,
        searchQuery,
        search,
        breadCumbs,
        ukuranOptions,
        selectedUkuran,
      };
    },
  });
  </script>
  
  <style scoped>
  .width {
    width: 100% !important;
  }
  
  .width-small {
    width: 100%;
  }
  </style>
  