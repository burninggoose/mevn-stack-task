<template>
  <tr>
    <td v-if="editingStatus" class="col text-left">
      <div class="input-group">
        <input class="form-control form-control-sm" v-model="name" type="text" name="name">
        <div class="input-group-append">
          <button
              @click="submit"
              type="submit"
              class="btn btn-sm btn-success"
              :disabled="this.editLoading"
          >{{ this.editLoading ? 'Loading' : 'Save' }}
          </button>
        </div>
      </div>
      <small style="color: red" v-if="errors.name">{{ errors.name }}</small>
    </td>
    <td v-else class="col text-left">
      <label class="checkbox-container">
        {{ provider.name }}
        <input
            :value="provider.checked"
            :checked="provider.checked"
            type="checkbox"
            @click="switchProvider(provider.id)"
            :id="provider.id"
        >
        <span class="checkmark"/>
      </label>
    </td>
    <td class="col text-right">
      <button
          @click="switchEditing"
          class="btn btn-sm btn-info"
      >{{ this.editingStatus ? 'Cancel' : 'Edit' }}
      </button>
    </td>
    <td class="col text-right">
      <button
          @click="deleteProvider"
          class="btn btn-sm btn-danger"
          :disabled="deleteLoading"
      >{{ deleteLoading ? 'Loading' : 'Delete' }}
      </button>
    </td>
  </tr>
</template>

<script>
import axios from "axios";
import store from "../../store";

export default {
  name: "provider-field",
  props: {provider: Object, switchProvider: Function, reloadProviders: Function, loadClients: Function},
  data() {
    return {
      editingStatus: false,
      name: this.provider.name,
      deleteLoading: false,
      editLoading: false,
      errors: {name: null}
    };
  },
  methods: {
    async submit() {
      const fields = {
        name: this.name
      };
      this.errors.name = fields.name ? null : "Required";
      if (!this.errors.name) {
        await this.editProvider(fields);
      }
    },
    async editProvider(data) {
      this.editLoading = true;
      try {
        const newData = await axios.patch(`http://127.0.0.1:3000/provider/${this.provider.id}`, data);
        await this.reloadProviders();
        await this.loadClients();
        this.switchEditing();
        store.alerts.pushAlert({
          message: `Edited provider: ${newData.data.provider.name}`,
          class: "alert-info"
        });
        this.editLoading = false;
      } catch (error) {
        console.log(error)
        this.errors = error.response.data.fields;
        this.editLoading = false;
      }
    },
    async deleteProvider() {
      this.deleteLoading = true;
      if (this.provider.checked) this.switchProvider();
      await axios.delete(`http://127.0.0.1:3000/provider/${this.provider.id}`);
      store.alerts.pushAlert({
        message: `Deleted provider: ${this.provider.name}`,
        class: "alert-danger"
      });
      await this.reloadProviders();
      await this.loadClients();
    },
    switchEditing() {
      this.editingStatus = !this.editingStatus;
    }
  }
};
</script>

