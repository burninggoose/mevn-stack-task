<template>
  <div class="row">
    <div class="col-12">
      <table class="table">
        <thead>
        <tr>
          <td>Name</td>
          <td>Email</td>
          <td>Phone</td>
          <td>Providers</td>
          <td/>
          <td colspan="2">Actions</td>
        </tr>
        <tr/>
        </thead>
        <tbody>
        <ClientRow
            v-for="client in clients"
            :client="client"
            :loadClients="loadClients"
            :key="client.id"
        />
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import ClientRow from "./ClientRow/ClientRow";

export default {
  name: 'clients-table',
  components: { ClientRow },
  props: {toggleModal: Function, loadClients: Function, clients: Array,},
}
</script>