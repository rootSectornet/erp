<template>
    <div>
        <v-card class="d-flex flex-column justify-start px-3 py-3"  color="indigo">
            <p class="fs-10">Total biaya</p>
            <p class="fs-16 font-weight-bold py-3">{{ toRupiah(totalCost) }}</p>
            <p class="fs-12">{{total}} <span class="">{{ title }}</span></p>
        </v-card>
    </div>
</template>
<script lang="ts">
    import { defineComponent } from 'vue'
    import {toRupiah} from '../../helpers/currency'
    export default defineComponent({
        props: {
            totalCost: {
                type: String,
                required: true
            },
            title: {
                type: String,
                required: true
            },
            total: {
                type: Number,
                required: true
            }
        },
        setup(){
            return {
                toRupiah
            }
        }
    })
</script>