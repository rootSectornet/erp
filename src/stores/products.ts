// stores/drawer.ts
import { defineStore } from 'pinia';
import { Product, ProductStep } from '../models/product';
import { CategoryProduct } from '../models/categoryProduct';
import { id } from 'vuetify/locale';


const sampleCategoryProducts : CategoryProduct[] = [
  {
    id:1,
    name:"Canopy",
    active:true
  },
  {
    id:2,
    name:"Kursi",
    active:true
  }
]

const sampleProductSteps : ProductStep[] = [
  {
    id:1,
    name:"Potong Besi & Prepare Bahan",
    rank:0,
    notes:"Harus Benar Benar Presisi sesuai ukuran & juga harus tepat waktu",
    maxDuration:1
  },
  {
    id:2,
    name:"Pemasangan Kerangka",
    rank:1,
    notes:"Harus Benar Benar Presisi sesuai ukuran & juga harus tepat waktu",
    maxDuration:1
  },
  {
    id:3,
    name:"Finshing",
    rank:2,
    notes:"Harus Benar Benar Presisi sesuai ukuran & juga harus tepat waktu",
    maxDuration:1
  },
]



const sampleProducts : Product[] = [
    {
        id:1,
        name:"KANOPI BAJA RINGAN ASBES",
        isActive:true,
        idCategory:1,
        selected:false,
        createdAt:new Date(),
        updatedDt:new Date(),
        productSteps : sampleProductSteps
    },
    {
        id:2,
        name:"KANOPI BAJA RINGAN GENTENG",
        isActive:true,
        idCategory:2,
        selected:false,
        createdAt:new Date(),
        updatedDt:new Date(),
        productSteps : sampleProductSteps
    },
    {
        id:3,
        name:"KANOPI BAJA RINGAN TRIPLEK",
        isActive:true,
        idCategory:1,
        selected:false,
        createdAt:new Date(),
        updatedDt:new Date(),
        productSteps : sampleProductSteps
    },
    {
        id:4,
        name:"KANOPI BAJA RINGAN DAUN",
        isActive:true,
        idCategory:2,
        selected:false,
        createdAt:new Date(),
        updatedDt:new Date(),
        productSteps : sampleProductSteps
    },
    {
        id:5,
        name:"KANOPI BAJA RINGAN BIJI DAUN",
        isActive:true,
        idCategory:1,
        selected:false,
        createdAt:new Date(),
        updatedDt:new Date(),
        productSteps : sampleProductSteps
    },
    {
        id:6,
        name:"KANOPI BAJA RINGAN BIJI NANGKA",
        isActive:true,
        idCategory:1,
        selected:false,
        createdAt:new Date(),
        updatedDt:new Date(),
        productSteps : sampleProductSteps
    },
    {
        id:7,
        name:"KANOPI BAJA RINGAN BIJI BIJIAN",
        isActive:true,
        idCategory:2,
        selected:false,
        createdAt:new Date(),
        updatedDt:new Date(),
        productSteps : sampleProductSteps
    },
    {
        id:8,
        name:"KANOPI BAJA RINGAN BIJI GUA DUA",
        isActive:true,
        idCategory:1,
        selected:false,
        createdAt:new Date(),
        updatedDt:new Date(),
        productSteps : sampleProductSteps
    },
    {
        id:9,
        name:"KANOPI BAJA RINGAN NIH",
        isActive:true,
        idCategory:1,
        selected:false,
        createdAt:new Date(),
        updatedDt:new Date(),
        productSteps : sampleProductSteps
    },
    {
        id:10,
        name:"KANOPI BAJA RINGAN AH",
        isActive:true,
        idCategory:2,
        selected:false,
        createdAt:new Date(),
        updatedDt:new Date(),
        productSteps : sampleProductSteps
    }
  ];

interface ProductState {
    categorys : CategoryProduct[],
    products : Product[],
    product : Product
    category : CategoryProduct
}

export const useProductStore = defineStore('products', {
  state: () : ProductState => ({
      categorys : sampleCategoryProducts,
      products: sampleProducts,
      category : {} as CategoryProduct,
      product: {} as Product
  }),
  getters: {
    listCategorys(state): CategoryProduct[] {
      return state.categorys;
    },
    listProducts(state): Product[] {
      return state.products;
    },
    selectedProduct(state): Product {
      return state.product;
    },
    selectedCategory(state): CategoryProduct {
      return state.category;
    },
  },
  actions: {
    setSelectedProduct(value: Product) {
      this.$state.products = this.products.map((v:Product)=>{
        return {...v,selected:v.id == value.id}
      });
      this.product = value;
    },
    searchProducts(query:string){
        this.product = {} as Product;
        const items = this.$state.products.filter((v:Product)=>
            v.name.toLowerCase().includes(query.toLowerCase())
        );
        this.products = query == "" ? sampleProducts : items
        this.products = this.products.map((v:Product)=>{
          return {...v,selected:false}
        });
    },
    addSteps(step:ProductStep){
      this.product.productSteps.push(step)
    },
    deleteSteps(idStep: number) {
      // Filter out the step to be deleted
      this.product.productSteps = this.product.productSteps.filter((v: ProductStep) => v.id !== idStep);
    
      // Reindex the remaining steps
      this.product.productSteps.forEach((step, index) => {
        step.rank = index; // Assign new rank starting from 1
      });
    },
    changeRank(position:string,idStep:number){
      const steps : ProductStep[] = this.product.productSteps
      if(position === "up"){
          const selectedIndex = steps.findIndex((v)=>v.id == idStep);
          if(selectedIndex >= 0){
            const currentRank = steps[selectedIndex].rank
            if(currentRank > 0){
              const selectedWillChanges = steps.findIndex(v=>v.rank == (currentRank-1))
              if(selectedWillChanges >= 0){
                steps[selectedIndex].rank = steps[selectedWillChanges].rank
                steps[selectedWillChanges].rank = currentRank
              }
            }
          }
      }
      if(position === "down"){
          const selectedIndex = steps.findIndex((v)=>v.id == idStep);
          if(selectedIndex >= 0){
            const currentRank = steps[selectedIndex].rank
            if(currentRank < steps.length){
              const selectedWillChanges = steps.findIndex(v=>v.rank == (currentRank+1))
              if(selectedWillChanges >= 0){
                steps[selectedIndex].rank = steps[selectedWillChanges].rank
                steps[selectedWillChanges].rank = currentRank
              }
            }
          }
      }
    }
  },
});
