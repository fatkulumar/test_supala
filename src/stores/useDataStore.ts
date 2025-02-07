import { defineStore } from "pinia";
import type { IData } from '../types/IData';
import { useApi } from "../composables/useApi";

export const useDataStore = defineStore("data", {
  state: () => ({
    data: {} as IData,
  }),
  actions: {
    async fetchData(): Promise<void> {
      try {
        const { fetchData } = useApi();
        const data = await fetchData<IData>("products");

        if (data) {
          this.data = data;
        }
      } catch (e) {
        console.error("error", e);
      }
    },
  },
});
