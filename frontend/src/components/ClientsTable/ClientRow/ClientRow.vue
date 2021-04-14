<template>
  <tr class="client-row">
    <td>{{ client.name }}</td>
    <td>{{ client.email }}</td>
    <td>{{ client.phone }}</td>
    <td>{{ client.providers.map(provider => provider.name).join(', ') }}
    </td>
    <td class="text-right">
      <button class="btn btn-info" @click.prevent="openModal">Edit</button>
    </td>
    <td>
      <button
          class="btn btn-danger"
          :disabled="loading"
          @click.prevent="deleteClient"
      >{{ loading ? 'Loading' : 'Delete' }}
      </button>
    </td>
  </tr>
</template>

<script>
import axios from "axios";
import store from "../../../store";
import EditClientWindow from "./EditClientWindow";
import ModalService from "../../../rootModal/modal.service";

export default {
  name: "client-row",
  props: {client: Object, editClient: Function, loadClients: Function},
  data: () => ({loading: false, editModalOpen: false}),
  methods: {
    openModal() {
      ModalService.open(EditClientWindow, {
        loadClients: this.loadClients,
        client: this.client,
      });
    },
    async deleteClient() {
      this.loading = true;
      try {
        await axios.delete(`http://127.0.0.1:3000/client/${this.client.id}`);
        this.loadClients();
        this.loading = false;
        store.alerts.pushAlert({
          message: `Deleted client: ${this.client.name}`,
          class: "alert-danger"
        });
      } catch (e) {
        this.loading = false;
      }
    }
  },
};
</script>
