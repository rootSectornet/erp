<template>
    <div>      
        <v-breadcrumbs :items="breadCumbs" class="mx-3" >
            <template v-slot:prepend>
                <v-icon icon="mdi mdi-arrow-left" class="mr-2" @click="$emit('back')" size="small"></v-icon>
            </template>
        </v-breadcrumbs>
        <v-text-field
                append-inner-icon="mdi-magnify"
                density="compact"
                label="Search"
                v-model="searchQuery"
                @keyup="search()"
                variant="outlined"
                rounded
                class="mx-4 mt-2"
        ></v-text-field>
        <p v-if="products.length == 0 && searchQuery == ''">Product Kosong</p>
        <p v-else-if="products.length == 0 && searchQuery != ''">Tidak Ada Product dengan pencarian {{ searchQuery }}</p>
        <div v-else>
            <CardProduct v-for="product in products" :key="product.id" :product="product"/>
        </div>
    </div>
  </template>
<script lang="ts">
    import { defineComponent,computed,ref, PropType } from 'vue'
    import { useProductStore } from '../../../stores/products';
import { CategoryProduct } from '../../../models/categoryProduct';
    export default defineComponent({
        props: {
            category: {
                type: {} as PropType<CategoryProduct>,
                required: true
            }
        },
        setup(props){
            const breadCumbs = ["Categorys"]
            if(props.category){
                breadCumbs.push(props.category.name)
            }
            const searchQuery = ref('');
            const productStore = useProductStore();
            const products = computed(() => props.category ? productStore.listSearchProducts : []);
            const search = ()=>{
                productStore.searchProducts(searchQuery.value);
            }
            return {
                products,
                searchQuery,
                search,
                breadCumbs
            }
        }
    })
</script>