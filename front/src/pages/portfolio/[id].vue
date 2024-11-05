<template>
    <div>
        <h2 class="mb-3">Transactions for {{ route.params.id }}</h2>
        <v-card v-if="data">
            <v-card-text>
                <v-table>
                    <thead>
                        <tr>
                            <th class="text-left">Symbol</th>
                            <th class="text-left">Price</th>
                            <th class="text-left">Quantity</th>
                            <th class="text-left">Transaction Type</th>
                            <th class="text-left">Transaction Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(row, index) in data.transactions" :key="index" class="border-t">
                            <td class="p-2">{{ row.instrumentSymbol || 'N/A' }}</td>
                            <td class="p-2">{{ row.price || 'N/A' }}</td>
                            <td class="p-2">{{ row.quantity || 'N/A' }}</td>
                            <td class="p-2">
                                <v-chip label :color="row.transactionType === 'BUY' ? 'success' : 'warning'">{{ row.transactionType }}</v-chip>
                            </td>
                            <td class="p-2">{{ new Date(row.transactionDate).toLocaleString() }}</td>
                        </tr>
                    </tbody>
                </v-table>

                <v-pagination v-if="data && data.transactions && data.transactions.length" v-model="pagination.page" color="primary" :length="data.totalPages" @update:model-value="actions.getTransactions"></v-pagination>
            </v-card-text>
        </v-card>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useTransactionStore } from '@/stores/transaction';

const route = useRoute();
const transactionStore = useTransactionStore();

const loading = ref(false);
const data = ref(null);

const pagination = ref({
    limit: 5,
    page: 1,
})

onMounted(() => {
    actions.getTransactions();
})

const actions = {
    async getTransactions() {
        const ticker = route.params.id;
        loading.value = true;

        await transactionStore.getTransactions(ticker, pagination.value).then((resp) => {
            data.value = { ...resp };
            pagination.value.page = resp.currentPage;
        }).finally(() => {
            loading.value = false;
        });
    }
}
</script>