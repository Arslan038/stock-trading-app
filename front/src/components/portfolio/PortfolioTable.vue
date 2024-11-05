<template>
    <div>
        <!-- <div class="d-flex justify-space-between align-center mb-4">
            <v-spacer></v-spacer>
            <v-btn @click="actions.getPortfolio" color="primary" class="text-capitalize"
                :loading="loading">Refresh</v-btn>
        </div> -->

        <v-card>
            <v-card-text>
                <h2>Instrument Portfolio</h2>
                <v-table v-if="data && data.length">
                    <thead>
                        <tr>
                            <th class="text-left">Symbol</th>
                            <th class="text-left">Cost Basis</th>
                            <th class="text-left">Market Value</th>
                            <th class="text-left">Unrealized P&amp;L</th>
                            <th class="text-left">Unrealized Return Rate</th>
                            <th class="text-left">View</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(row, index) in data" :key="index" class="border-t">
                            <td class="p-2">{{ row.instrumentSymbol || 'N/A' }}</td>
                            <td class="p-2">{{ row.costBasis || 'N/A' }}</td>
                            <td class="p-2">{{ row.marketValue || 'N/A' }}</td>
                            <td class="p-2">{{ row.unrealizedPL || 0 }}</td>
                            <td class="p-2">{{ row.unrealizedReturnRate || 0 }}</td>
                            <td class="p-2">
                                <v-btn :to="`/portfolio/${row.instrumentSymbol}`" size="small" color="primary"
                                    class="text-capitalize">View</v-btn>
                            </td>
                        </tr>
                    </tbody>
                </v-table>

                <p v-else>You don't have any portfolio yet.</p>
            </v-card-text>
        </v-card>
    </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue';
import { useTransactionStore } from '@/stores/transaction';

const transactionStore = useTransactionStore();

const data = computed(() => transactionStore.portfolio);

const loading = ref(false);

onMounted(() => {
    actions.getPortfolio();
})

const actions = {
    async getPortfolio() {
        loading.value = true;
        await transactionStore.getPortfolio().finally(() => {
            loading.value = false;
        })
    }
}
</script>