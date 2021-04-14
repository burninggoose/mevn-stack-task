<template>
  <div id="app">
    <ModalRoot/>
    <Alerts/>
    <div class="container">
      <Header :toggleModal="openClientModal"/>
      <ClientsTable :clients="clients" :toggleModal="openClientModal" :loadClients="loadClients"/>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import AddClientWindow from "./components/AddClientWindow";
import Alerts from "./components/Alerts";
import Header from "./components/Header";
import ModalService from './rootModal/modal.service'
import ModalRoot from "./rootModal/ModalRoot";
import ClientsTable from "./components/ClientsTable/ClientsTable";

export default {
  components: {ClientsTable, Header, Alerts, ModalRoot},
  name: "app",
  data: () => ({
    clients: null,
    providers: null,
    showCreateClientModal: false,
  }),
  methods: {
    async loadClients() {
      const response = await axios.get("http://127.0.0.1:3000/client");
      this.providers = response.data.providers;
      this.clients = response.data.clients.map(client => ({
        ...client,
        providers: client.providers.map(({id}) => this.providers.find(p => p.id === id))
      }))
    },
    openClientModal() {
      ModalService.open(AddClientWindow, {
        loadClients: this.loadClients,
      });
    }
  },
  mounted() {
    this.loadClients();
  }
};
</script>

