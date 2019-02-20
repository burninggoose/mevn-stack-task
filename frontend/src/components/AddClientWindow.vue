<template>
  <div style="background: rgba(0, 0, 0, 0.5)" class="modal activeModal">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLongTitle">New client</h5>
          <button
            @click="toggleModal"
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
                <ClientForm submitText="Create client" @submitForm="submitForm"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ClientForm from "./ClientForm.vue";
import axios from "axios";
import store from "../store";

export default {
  name: "add-client-window",
  components: { ClientForm },
  props: { showModal: { type: Boolean } },
  methods: {
    toggleModal: function() {
      this.$emit("toggleModal");
    },
    submitForm: function(data) {
      axios.post("http://127.0.0.1:3000/client", data).then(newData => {
        this.$emit("loadClients");
        store.alerts.pushAlert({
          message: `Added new client: ${newData.data.client.name}`,
          class: "alert-success"
        });
        this.toggleModal();
      });
    }
  }
};
</script>

<style>
.activeModal {
  display: block;
}
</style>