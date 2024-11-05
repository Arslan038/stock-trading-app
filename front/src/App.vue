<template>
  <v-app>
    <Navbar />
    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
      
    </v-main>

    <v-snackbar
      v-model="alert.show"
      :timeout="2000"
      :color="alert.color"
      location="top right"
      elevation="24"
    >
      {{ alert && alert.message }}
    </v-snackbar>
  </v-app>
</template>

<script setup>
import { computed } from 'vue';
import Navbar from '@/components/Navbar.vue';
import { useAppStore } from "@/stores/app";

const appStore = useAppStore();

const alert = computed(() => appStore.alert);
</script>
