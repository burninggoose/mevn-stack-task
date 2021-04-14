<template>
  <Modal>
    <div class="modal-header">
      <h5 class="modal-title" id="exampleModalLongTitle">Edit client</h5>
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
      <ClientForm
          :requestErrors="errors"
          submitText="Save client"
          :loadClients="loadClients"
          :initialValues="client"
          :submitForm="submitForm"
      />
    </div>
  </Modal>
</template>

<script>
import ClientForm from "../../ClientForm/ClientForm.vue";
import axios from "axios";
import store from "../../../store";
import Modal from "../../../rootModal/Modal";
import ModalMixin from "../../../rootModal/ModalMixin";

export default {
  name: "edit-client-window",
  template: 'rootModal',
  components: {Modal, ClientForm},
  props: {client: Object, loadClients: Function},
  data: () => ({errors: {}}),
  mixins: [ModalMixin],
  methods: {
    async submitForm(data) {
      try {
        const newData = await axios.patch(`http://127.0.0.1:3000/client/${this.client.id}`, data);
        await this.loadClients();
        store.alerts.pushAlert({
          message: `Edited client: ${newData.data.client.name}`,
          class: "alert-info"
        });
        this.close();
      } catch (error) {
        this.errors = error.response.data.fields;
      }
    }
  },
};
</script>
