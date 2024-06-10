<template>
    <div>
        <v-card class="d-flex flex-column justify-start px-3 py-3"  color="indigo">
            <p class="fs-10">Total biaya</p>
            <p class="fs-16 font-weight-bold py-3">{{ toRupiah(totalBiaya) }}</p>
            <p class="fs-12">{{totalMaterial}} <span class="">Material</span></p>
        </v-card>
    </div>
</template>
<script lang="ts">
    import { defineComponent } from 'vue'
    import {toRupiah} from '../../helpers/currency'
    export default defineComponent({
        props: {
            totalBiaya: {
                type: String,
                required: true
            },
            totalMaterial: {
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