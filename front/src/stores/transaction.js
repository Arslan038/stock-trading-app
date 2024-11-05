import { defineStore } from 'pinia';
import BaseApi from "@/api/BaseApi";
import { useAppStore } from './app';

const api = new BaseApi();

export const useTransactionStore = defineStore('transaction', {
    state: () => ({
        searchResult: [],
        portfolio: [],
        recentTransactions: [],
    }),

    actions: {
        // Search Instrument
        async searchInstrument(payload) {
            const appStore = useAppStore();

            return new Promise((resolve, reject) => {
                api.get(`instrument/${payload}`).then((response) => {
                    if (response.status === 200) {
                        this.searchResult = [...response.data.result]
                        resolve(response.data);

                    } else {
                        reject(response);
                    }
                }).catch((error) => {
                    appStore.showAlert(error.response && error.response.data);
                    reject(error);
                });
            })
        },

        async buyShares(payload) {
            const appStore = useAppStore();
            return new Promise((resolve, reject) => {
                api.post(`transaction/buy`, payload).then((response) => {
                    if (response.status === 201) {
                        appStore.showAlert(response.data);
                        resolve(response.data);
                    } else {
                        reject(response);
                    }
                }).catch((error) => {
                    reject(error.message);
                });
            })
        },

        async sellShares(payload) {
            const appStore = useAppStore();
            return new Promise((resolve, reject) => {
                api.post(`transaction/sell`, payload).then((response) => {
                    if (response.status === 201) {
                        appStore.showAlert(response.data);
                        resolve(response.data);
                    } else {
                        reject(response);
                    }
                }).catch((error) => {
                    appStore.showAlert(error.response && error.response.data);
                    reject(error.message);
                });
            })
        },

        async getTransactions(ticker, query) {
            const appStore = useAppStore();
            return new Promise((resolve, reject) => {
                api.get(`transactions/${ticker}`, { params: { ...query } }).then((response) => {
                    if (response.status === 200) {
                        resolve(response.data);
                    } else {
                        reject(response);
                    }
                }).catch((error) => {
                    appStore.showAlert(error.response && error.response.data);
                    reject(error.message);
                });
            })
        },

        async getRecentTransactions() {
            const appStore = useAppStore();
            return new Promise((resolve, reject) => {
                api.get(`transactions`, { params: { limit: 5 } }).then((response) => {
                    if (response.status === 200) {
                        this.recentTransactions = [...response.data.transactions];
                        resolve(response.data);
                    } else {
                        reject(response);
                    }
                }).catch((error) => {
                    appStore.showAlert(error.response && error.response.data);
                    reject(error.message);
                });
            })
        },

        async getPortfolio() {
            const appStore = useAppStore();
            return new Promise((resolve, reject) => {
                api.get(`transaction/portfolio`).then((response) => {
                    if (response.status === 200) {
                        this.portfolio = [...response.data];
                        resolve(response.data);

                    } else {
                        reject(response);
                    }
                }).catch((error) => {
                    appStore.showAlert(error.response && error.response.data);
                    reject(error);
                });
            })
        }
    }
});
