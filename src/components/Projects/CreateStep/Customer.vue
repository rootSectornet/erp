<template>
    <form>
      <v-card-text>
        <v-text-field
          label="Nama Customer"
          name="name"
          v-model="customer.name"
          :error-messages="nameErrors"
        ></v-text-field>
        <v-text-field
          label="Email Customer"
          name="email"
          v-model="customer.email"
          :error-messages="emailErrors"
        ></v-text-field>
        <v-combobox
          label="Search City *"
          item-title="name"
          item-value="id"
          :items="citys"
          v-model="customer.city_id"
          v-model:search-input="searchQuery"
          @update:search="search"
          loading
          clearable
        ></v-combobox>
        <v-textarea
          label="Address"
          name="address"
          v-model="customer.address"
          :error-messages="addressErrors"
        ></v-textarea>
        <v-text-field
          label="Phone"
          name="phone"
          v-model="customer.phone"
          :error-messages="phoneErrors"
        ></v-text-field>
      <v-text-field
        label="Transport Cost"
        name="cost"
        v-model="cost"
      ></v-text-field>
      </v-card-text>
    </form>
  </template>
  
  <script lang="ts">
  import { computed, defineComponent, ref, watch } from 'vue';
  import { useField, useForm } from 'vee-validate';
  import { object, string, number } from 'yup';
  import { useCityStore } from '../../../stores/city';
  import { useCustomerStore } from '../../../stores/customer';
  import { useProjectStore } from '../../../stores/projects';
  
  export default defineComponent({
    setup() {
      const cityStore = useCityStore();
      const customerStore = useCustomerStore();
      const projectStore = useProjectStore();

      const transportCost = computed(() => projectStore.costTransport);
      const citys = computed(() => cityStore.items);
      const customer = computed(() => customerStore.customer);
  
      const validationSchema = object({
        name: string().required('Name is required.').min(3, 'Name must be at least 3 characters.'),
        email: string().required('Email is required.').min(3, 'Name must be at least 3 characters.'),
        address: string().required('Address is required.'),
        phone: string().required('Phone is required.').min(10, 'Phone must be at least 10 digits.'),
        cityId: number().required('City is required.'),
      });
  
      const { handleSubmit, errors } = useForm({
        validationSchema,
        initialValues: customer.value,
      });
  
      const { value: name } = useField('name');
      const { value: email } = useField('email');
      const { value: address } = useField('address');
      const { value: phone } = useField('phone');
      const { value: city_id } = useField('cityId');
  
      const nameErrors = computed(() => errors.value?.name);
      const emailErrors = computed(() => errors.value?.email);
      const addressErrors = computed(() => errors.value?.address);
      const phoneErrors = computed(() => errors.value?.phone);
  
      watch(customer, (newCustomer) => {
        name.value = newCustomer.name;
        email.value = newCustomer.email;
        address.value = newCustomer.address;
        phone.value = newCustomer.phone;
        city_id.value = newCustomer.city_id;
      }, { deep: true });
  
      const search = (query: string) => {
        cityStore.searchCity(query);
      };
  
      const searchQuery = ref('');
      const cost = ref('');
      cost.value = "0";
      watch(cost, (newCost) => {
        projectStore.setTransportCost(newCost);
      });
      return {
        name,
        email,
        address,
        phone,
        city_id,
        nameErrors,
        emailErrors,
        addressErrors,
        phoneErrors,
        searchQuery,
        citys,
        search,
        customer,
        transportCost,
        cost
      };
    },
  });
  </script>
  