// stores/drawer.ts
import { defineStore } from 'pinia';
import { Product, ProductStep } from '../models/product';
import { CategoryProduct } from '../models/categoryProduct';
import CategoryService from '../services/category';
import ProductServices from '../services/products';
import { useProjectStore } from './projects';
import { ProjectStep, Workers } from '../models/project';
const categoryService = new CategoryService();

interface ProductState {
    categorys : CategoryProduct[],
    products : Product[],
    productSteps : ProductStep[],
    searchedproducts : Product[],
    product : Product
    category : CategoryProduct
}

export const useProductStore = defineStore('products', {
  state: () : ProductState => ({
      categorys : [],
      products: [],
      productSteps: [],
      searchedproducts: [],
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
    listProductStep(state): ProductStep[] {
      return state.productSteps;
    },
    listSearchProducts(state): Product[] {
      return state.searchedproducts;
    },
    selectedProduct(state): Product {
      return state.product;
    },
    selectedCategory(state): CategoryProduct {
      return state.category;
    },
  },
  actions: {
    fetchAll(){
      categoryService.fetchAll().then((result:CategoryProduct[])=>{
        this.categorys = result
      })
    },
    fetchProduct(id:number){
      ProductServices.fetchByCategory(id).then((results:Product[])=>{
        this.products = results
        this.searchedproducts = results
      })
    },
    fetchProductsteps(product_id:number){
      ProductServices.fetchProductSteps(product_id).then((results:ProductStep[])=>{
        this.productSteps = results;
        const projectStore = useProjectStore();
        const data : ProjectStep[] = results.map((v:ProductStep)=>{
          return {
            id : v.id,
            additionalCost:v.additionalCost,
            created_at:v.created_at,
            duration:v.maxDuration,
            is_active:v.is_active,
            name:v.name,
            rank:v.rank,
            updated_dt:v.updated_dt,
            workers:[] as Workers[],
            notes:v.notes,
            totalCost:"0",
          } as ProjectStep
        })
        projectStore.setDefaultProjectSteps(data);
      })
    },
    setSelectedProduct(value: Product) {
      this.$state.searchedproducts = this.products.map((v:Product)=>{
        return {...v,selected:v.id == value.id}
      });
      this.product = value;
    },
    searchProducts(query:string){
        this.product = {} as Product;
        const productsCopy = [...this.$state.products];
        const items = productsCopy.filter((v:Product)=>
            v.name.toLowerCase().includes(query.toLowerCase())
        );
        this.searchedproducts = query == "" ? this.$state.products : items
        this.searchedproducts = this.searchedproducts.map((v:Product)=>{
          return {...v,selected:false}
        });
    },
    addSteps(step:ProductStep){
      this.product.productSteps.push(step)
    }
  },
});
