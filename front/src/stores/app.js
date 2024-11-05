// Utilities
import { defineStore } from "pinia";
import BaseApi from "@/api/BaseApi";

const api = new BaseApi();

export const useAppStore = defineStore("app", {
  state: () => ({
    alert: {
      show: false,
      color: "success",
      message: "",
    }
  }),

  actions: {
    showAlert(data) {
      if (data && data.success) {
        this.alert.show = true;
        this.alert.color = "green";
        this.alert.message = data.message || "Something went wrong.";
      } else {
        this.alert.show = true;
        this.alert.color = "red";
        this.alert.message = data && data.message || "Something went wrong.";
      }
    },

    clearAlert() {
      this.alert.show = false;
    }
  },
});
