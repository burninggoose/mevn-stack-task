<template>
  <Modal>
    <div class="modal-header">
      <h5 class="modal-title" id="exampleModalLongTitle">New client</h5>
      <button
          @click="close"
          type="button"
          class="close"
          data-dismiss="modal"
          aria-label="Close"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <div class="container">
        <div class="row">
          <div class="col">
            <ClientForm
                :loadClients="loadClients"
                :requestErrors="errors"
                submitText="Create client"
                :submitForm="submitForm"
            />
          </div>
        </div>
      </div>
    </div>
  </Modal>
</template>

<script>
import ClientForm from "./ClientForm/ClientForm.vue";
import axios from "axios";
import store from "../store";
import Modal from "../rootModal/Modal";
import ModalMixin from "../rootModal/ModalMixin";

export default {
  name: "add-client-window",
  components: {Modal, ClientForm},
  props: {loadClients: Function},
  data: () => ({errors: {}}),
  mixins: [ModalMixin],
  methods: {
    async submitForm(data) {
      try {
        const newData = await axios.post("http://127.0.0.1:3000/client", data);
        this.errors = {};
        this.loadClients();
        store.alerts.pushAlert({
          message: `Added new client: ${newData.data.client.name}`,
          class: "alert-success"
        });
        this.close();
      } catch (error) {
        this.errors = error.response.data.fields;
      }
    }
  },
};
</script>