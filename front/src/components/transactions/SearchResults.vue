<template>
    <v-card v-if="data && data.length">
        <v-card-text>
            <v-table>
                <thead>
                    <tr>
                        <th class="text-left">Name</th>
                        <th class="text-left">Bid</th>
                        <th class="text-left">Ask</th>
                        <th class="text-left">Currency</th>
                        <th class="text-left">Price</th>
                        <th class="text-left">Day High</th>
                        <th class="text-left">Day Low</th>
                        <th class="text-left">Change (value)</th>
                        <th class="text-left">Change (%)</th>
                        <th class="text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(row, index) in data" :key="index" class="border-t">
                        <td class="p-2">{{ row.shortName || 'N/A' }}</td>
                        <td class="p-2">{{ row.bid || 'N/A' }}</td>
                        <td class="p-2">{{ row.ask || 'N/A' }}</td>
                        <td class="p-2">{{ row.currency || 'N/A' }}</td>
                        <td class="p-2">{{ row.regularMarketPrice || 'N/A' }}</td>
                        <td class="p-2">{{ row.regularMarketDayHigh || 'N/A' }}</td>
                        <td class="p-2">{{ row.regularMarketDayLow || 'N/A' }}</td>
                        <td class="p-2">{{ row.regularMarketChange || 'N/A' }}</td>
                        <td class="p-2">{{ row.regularMarketChangePercent || 'N/A' }}</td>
                        <td class="p-2">
                            <template v-if="row.bid && row.ask && row.regularMarketPrice">
                                <v-btn color="success" @click="actions.showPopup('buy', row)" size="small"
                                    class="mr-1">Buy</v-btn>
                                <v-btn color="warning" @click="actions.showPopup('sell', row)" size="small">Sell</v-btn>
                            </template>
                            <template v-else>
                                <v-chip size="small" color="red">Not Tradeable</v-chip>
                            </template>
                        </td>
                    </tr>
                </tbody>
            </v-table>

            <TradePopup v-if="showPopup" :isVisible="showPopup" :instrument="instrument" :title="popupTitle" :type="popupType"
                @close="showPopup = !showPopup" />
        </v-card-text>
    </v-card>
</template>

<script setup>
import { ref, computed } from 'vue';
import TradePopup from '@/components/transactions/TradePopup.vue';
import { useTransactionStore } from '@/stores/transaction';

const showPopup = ref(false);
const popupTitle = ref('');
const popupType = ref('');
const instrument = ref(null);

const transactionStore = useTransactionStore();

const data = computed(() => transactionStore.searchResult);

const actions = {
    showPopup(type, data) {
        instrument.value = { ...data };
        if (type === 'buy') {
            popupType.value = 'buy';
            popupTitle.value = 'Buy Shares'
        }
        if (type === 'sell') {
            popupType.value = 'sell';
            popupTitle.value = 'Sell Shares'
        }

        showPopup.value = true;
    }
}
</script>