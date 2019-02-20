<template>
  <tr class="client-row">
    <td>{{client.name}}</td>
    <td>{{client.email}}</td>
    <td>{{client.phone}}</td>
    <td>{{`${client.providers.map(provider => {return provider.name})}`}}</td>
    <td>
      <button class="btn btn-info" @click="editClient">Edit</button>
    </td>
    <td>
      <button
        class="btn btn-danger"
        :disabled="loading"
        @click="deleteClient"
      >{{loading ? 'Loading' : 'Delete'}}</button>
    </td>
  </tr>
</template>

<script>
import axios from "axios";
import store from "../store";

export default {
  name: "client-row",
  props: { client: { type: Object } },
  data() {
    return { loading: false };
  },
  methods: {
    editClient: function(e) {
      this.$emit("editClient", this.client);
      e.preventDefault();
    },
    deleteClient: function(e) {
      this.loading = true;
      axios
        .delete("http://127.0.0.1:3000/client/" + this.client.id)
        .then(data => {
          this.$emit("loadClients");
          this.loading = false;
          store.alerts.pushAlert({
            message: `Deleted client: ${this.client.name}`,
            class: "alert-danger"
          });
        });
      e.preventDefault();
    }
  }
};
</script>