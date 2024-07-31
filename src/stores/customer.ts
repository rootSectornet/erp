// stores/drawer.ts
import { defineStore } from 'pinia';
import { Customer } from '../models/project';

interface CustomerState {
    customer : Customer,
}

export const useCustomerStore = defineStore('customer', {
  state: () : CustomerState => ({
    customer : {} as Customer
  }),
  getters: {
    item(state): Customer {
      return state.customer;
    }
  },
  actions: {
    setCustomer(customer: Partial<Customer>) {
      this.customer = { ...this.customer, ...customer };
    },
  },
});
