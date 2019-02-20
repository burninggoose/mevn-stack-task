<template>
  <div>
    <ProviderCreateForm :requestErrors="errors" @submitForm="createProvider"/>
    <table style=" border-collapse:separate; 
  border-spacing: 0 10px;">
      <ProviderField
        v-for="provider in providers"
        @switchProvider="switchProvider"
        @reloadProviders="getProviders"
        @loadClients="loadClients"
        v-bind:provider="provider"
        :key="provider.id"
      />
    </table>
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
    return { providers: null, errors: {} };
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
          this.errors = {};
          store.alerts.pushAlert({
            message: `Created provider: ${newData.data.provider.name}`,
            class: "alert-success"
          });
          this.getProviders();
        })
        .catch(error => {
          this.errors = error.response.data.fields;
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