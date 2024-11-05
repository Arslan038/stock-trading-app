<template>
    <div class="portfolio">
        <PortfolioTable />
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useTransactionStore } from '@/stores/transaction';
import Loading from '@/components/Loading.vue';
import PortfolioTable from '@/components/portfolio/PortfolioTable.vue';

const transactionStore = useTransactionStore();

const loading = ref(false);

// onMounted(() => {
//     actions.getPortfolio();
// })

// const actions = {
//     async getPortfolio() {
//         loading.value = true;
//         await transactionStore.getPortfolio().finally(() => {
//             loading.value = false;
//         })
//     }
// }
</script>