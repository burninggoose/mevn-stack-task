<template>
  <div>
    <ProviderCreateForm @submitForm="createProvider"/>
    <ProviderField
      v-for="provider in providers"
      @switchProvider="switchProvider"
      @reloadProviders="getProviders"
      @loadClients="loadClients"
      v-bind:provider="provider"
      :key="provider.id"
    />
  </div>
</template>

<script>
import axios from "axios";
import ProviderField from "./ProviderField";
import ProviderCreateForm from "./ProviderCreateForm";
import store from "../store";

export default {
  name: "providers-list",
  components: { ProviderField, ProviderCreateForm },
  props: { activeProviders: { type: Array } },
  data: function() {
    return { providers: null };
  },
  mounted: function() {
    this.getProviders();
  },
  methods: {
    loadClients: function() {
      this.$emit("loadClients");
    },
    switchProvider: function(id) {
      for (let i in this.providers) {
        if (this.providers[i].id == id) {
          this.providers[i].checked = !this.providers[i].checked;
          this.$emit("updateProviders", this.providers);
          break;
        }
      }
    },
    createProvider: function(data) {
      return axios
        .post("http://127.0.0.1:3000/provider", data)
        .then(newData => {
          store.alerts.pushAlert({
            message: `Created provider: ${newData.data.provider.name}`,
            class: "alert-success"
          });
          this.getProviders();
        });
    },
    getProviders: function() {
      return axios.get("http://127.0.0.1:3000/provider").then(data => {
        const providers = data.data.providers;
        for (let i in this.activeProviders) {
          for (let k in providers) {
            if (this.activeProviders[i].id == providers[k].id)
              providers[k].checked = true;
          }
        }
        this.providers = providers;
      });
    }
  }
};
</script>