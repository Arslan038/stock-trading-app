<template>
    <div>
        <v-app-bar color="primary" density="compact">
            <template v-if="name === 'xs'" v-slot:prepend>
                <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
            </template>

            <v-app-bar-title>Stock App</v-app-bar-title>

            <template v-if="name !== 'xs'">
                <v-spacer></v-spacer>

                <v-btn v-for="link in menuLinks" :key="link.title" :to="link.to" class="text-capitalize">{{ link.title }}</v-btn>
            </template>
        </v-app-bar>

        <v-navigation-drawer v-model="drawer" temporary>
            <v-list density="compact" nav>
                <v-list-item title="Stock App" subtitle="Ledger"></v-list-item>
                <v-divider></v-divider>
                <v-list-item v-for="link in menuLinks" :key="link.title" link :to="link.to"
                    :title="link.title"></v-list-item>
            </v-list>
        </v-navigation-drawer>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useDisplay } from 'vuetify'

const { name } = useDisplay();

const drawer = ref(false);

const menuLinks = [
    { title: 'Home', to: '/' },
    { title: 'Portfolio', to: '/portfolio' },
    { title: 'Transactions', to: '/transactions' }
]
</script>