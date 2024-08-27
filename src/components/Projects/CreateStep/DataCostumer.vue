<template>
  <div class="customer-section mx-4">
    <!-- Nama Customer -->
    <div class="d-flex justify-space-between align-center">
      <TextWithIcon icon="mdi mdi-account" text="Customer" />
      <v-text-field
        v-model="customer.name"
        label="Customer Name"
        hide-details
        dense
        solo
      ></v-text-field>
    </div>
    <v-divider class="my-3"></v-divider>

    <!-- Nomor Telepon -->
    <div class="d-flex justify-space-between align-center">
      <TextWithIcon icon="mdi mdi-phone" text="Phone" />
      <v-text-field
        v-model="customer.phone"
        label="Phone Number"
        hide-details
        dense
        solo
      ></v-text-field>
    </div>
    <v-divider class="my-3"></v-divider>

    <!-- Email -->
    <div class="d-flex justify-space-between align-center">
      <TextWithIcon icon="mdi mdi-email" text="Email" />
      <v-text-field
        v-model="customer.email"
        label="Email Address"
        hide-details
        dense
        solo
      ></v-text-field>
    </div>
    <v-divider class="my-3"></v-divider>

    <!-- Alamat -->
    <div class="d-flex justify-space-between align-center">
      <TextWithIcon icon="mdi mdi-map-marker" text="Address" />
      <v-textarea
        v-model="customer.address"
        label="Address"
        hide-details
        dense
        solo
      ></v-textarea>
    </div>
    <v-divider class="my-3"></v-divider>

    <!-- Tombol Simpan -->
    
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const customer = ref({
      name: "",
      phone: "",
      email: "",
      address: "",
    });

    const saveCustomerData = () => {
      // Logic untuk menyimpan data customer
      console.log("Customer Data Saved:", customer.value);
    };

    return {
      customer,
      saveCustomerData,
    };
  },
});
</script>
