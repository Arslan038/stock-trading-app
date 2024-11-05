<template>
    <v-card>
        <v-card-text>
            <h2>Recent Transactions</h2>
            <Loading v-if="loading" />

            <v-table v-if="data && data.length">
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
                        <tr v-for="(row, index) in data" :key="index" class="border-t">
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

                <p v-else>You don't have any transactions yet.</p>
        </v-card-text>
    </v-card>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue';
import { useTransactionStore } from '@/stores/transaction';
import Loading from '@/components/Loading.vue';

const transactionStore = useTransactionStore();

const data = computed(() => transactionStore.recentTransactions);

const loading = ref(false);

onMounted(() => {
    actions.getRecentTransactions();
})

const actions = {
    async getRecentTransactions() {
        await transactionStore.getRecentTransactions();
    }
}
</script>