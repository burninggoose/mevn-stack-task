<template>
  <tr>
    <td v-if="editingStatus" class="col text-left">
      <div class="input-group mb-3">
        <input class="form-control" v-model="name" type="text" name="name">
        <div class="input-group-append">
          <button
            @click="checkForm"
            type="submit"
            class="btn btn-success"
            :disabled="this.editLoading"
          >{{this.editLoading ? 'Loading' : 'Save'}}</button>
        </div>
      </div>
    </td>
    <td v-else class="col text-left">
      <label class="checkbox-container">
        {{provider.name}}
        <input
          v-bind:value="provider.checked"
          v-bind:checked="provider.checked"
          type="checkbox"
          @click="switchProvider"
          :id="provider.id"
        >
        <span class="checkmark"/>
      </label>
    </td>
    <td class="col text-right">
      <button
        @click="switchEditing"
        class="btn btn-info"
      >{{this.editingStatus ? 'Cancel' : 'Edit' }}</button>
    </td>
    <td class="col text-right">
      <button
        @click="deleteProvider"
        class="btn btn-danger"
        :disabled="deleteLoading"
      >{{deleteLoading ? 'Loading' : 'Delete'}}</button>
    </td>
  </tr>
</template>

<script>
import axios from "axios";
import store from "../store";

export default {
  name: "provider-field",
  props: { provider: { type: Object } },
  data() {
    return {
      editingStatus: false,
      name: this.provider.name,
      deleteLoading: false,
      editLoading: false,
      errors: { name: null }
    };
  },
  methods: {
    checkForm: function(e) {
      const fields = {
        name: this.name
      };
      this.errors.name = fields.name ? null : "Required";
      if (!this.errors.name) {
        this.editProvider(fields);
      }
      e.preventDefault();
    },
    editProvider: function(data) {
      this.editLoading = true;
      axios
        .patch("http://127.0.0.1:3000/provider/" + this.provider.id, data)
        .then(newData => {
          this.$emit("reloadProviders");
          this.$emit("loadClients");
          this.switchEditing();
          store.alerts.pushAlert({
            message: `Edited provider: ${newData.data.provider.name}`,
            class: "alert-info"
          });
          this.editLoading = false;
        });
    },
    deleteProvider: function(data) {
      this.deleteLoading = true;
      if (this.provider.checked) this.switchProvider();
      axios
        .delete("http://127.0.0.1:3000/provider/" + this.provider.id)
        .then(() => {
          store.alerts.pushAlert({
            message: `Deleted provider: ${this.provider.name}`,
            class: "alert-danger"
          });
          this.$emit("reloadProviders");
          this.$emit("loadClients");
        });
    },
    switchProvider: function() {
      this.$emit("switchProvider", this.provider.id);
    },

    switchEditing: function() {
      this.editingStatus = !this.editingStatus;
    }
  }
};
</script>

