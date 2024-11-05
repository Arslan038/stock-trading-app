<template>
    <div class="transactions">
        <h2>Transactions</h2>
        <Search />

        <SearchResults class="mt-5" />
    </div>
</template>

<script setup>
import SearchResults from '@/components/transactions/SearchResults.vue';
</script>