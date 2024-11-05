<template>
    <v-dialog v-if="visible" v-model="visible" max-width="600">
        <v-card>
            <v-card-text>
                <div class="d-flex justify-space-between align-center mb-3">
                    <h3>{{ title }}</h3>
                    <v-icon @click="actions.close">mdi-close</v-icon>
                </div>
                <v-divider></v-divider>

                <v-form ref="tradeForm" class="mt-4" validate-on="submit lazy" @submit.prevent="actions.submit">
                    <v-text-field v-model="quantity" placeholder="Enter Quantity" type="number" :min="1" :rules="[val => !!val || 'Quantity is required.']"></v-text-field>
                    <v-btn color="primary" block variant="flat" type="submit" :loading="loading">{{ title }}</v-btn>
                </v-form>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useTransactionStore } from '@/stores/transaction';

const props = defineProps({
    instrument: {
        type: Object,
        required: true,
    },
    isVisible: {
        type: Boolean,
        default: false,
    },
    title: {
        type: String,
        default: 'Buy Shares'
    },
    type: {
        type: String,
        default: 'buy'
    }
});

const emit = defineEmits(['close']);

const visible = computed(() => props.isVisible);

const loading = ref(false);
const quantity = ref(null);

const tradeForm = ref('');

const transactionStore = useTransactionStore();

const actions = {
    close() {
        emit('close')
    },
    setQuantity(val) {
        quantity.value = Number(val);
    },
    async submit() {
        const form = await tradeForm.value.validate();
        if (!form.valid) {
            return
        }
        const payload = {
            ticker: props.instrument.symbol,
            quantity: quantity.value
        }

        loading.value = true;

        if (props.type === 'buy') {
            // Buy Shares
            await transactionStore.buyShares(payload).finally(() => {
                loading.value = false;
            });

        }
        if (props.type === 'sell') {
            // Sell Shares
            await transactionStore.sellShares(payload).finally(() => {
                loading.value = false;
            })
        }

        actions.close();
    }
}
</script>