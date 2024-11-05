<template>
    <v-card class="mt-5">
        <v-card-text>
            <h3 class="mb-3">Search Instrument</h3>
            <v-form @submit.prevent="actions.searchInstrument">
                <v-row>
                    <v-col cols="12" sm="8" md="10" xl="10">
                        <v-text-field v-model="query" variant="outlined" density="compact"
                            placeholder="Enter Ticker Code" hide-details></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4" md="2" xl="2">
                        <v-btn type="submit" color="primary" block :loading="loading">Search</v-btn>
                    </v-col>
                </v-row>
            </v-form>
        </v-card-text>
    </v-card>
</template>

<script setup>
import { ref } from 'vue';
import { useTransactionStore } from '@/stores/transaction';
import SearchResults from '@/components/transactions/SearchResults.vue';

const transactionStore = useTransactionStore();

const query = ref('');
const loading = ref(false);

const actions = {
    async searchInstrument() {
        loading.value = true;
        await transactionStore.searchInstrument(query.value).finally(() => {
            loading.value = false;
        })
    }
}
</script>