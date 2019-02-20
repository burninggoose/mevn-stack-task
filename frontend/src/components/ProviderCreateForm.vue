<template>
  <form id="client-form" @submit="checkForm">
    <small
      style="color: red"
      v-if="requestErrors.name || errors.name"
    >{{requestErrors.name || errors.name}}</small>
    <div class="input-group mb-3">
      <div class="input-group-prepend">
        <span class="input-group-text">Providers</span>
      </div>
      <input class="form-control" type="text" name="name" id="name" v-model="name">
      <div class="input-group-append">
        <button
          class="btn"
          :disabled="this.loadingCreate"
          type="submit"
        >{{this.loadingCreate ? 'Loading' : "Create provider"}}</button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: "provider-form",
  props: { requestErrors: { type: Object } },
  data() {
    return {
      errors: {
        name: null
      },
      name: null,
      loadingCreate: false
    };
  },
  methods: {
    checkForm: function(e) {
      e.preventDefault();

      this.loadingCreate = true;
      const fields = {
        name: this.name
      };
      this.errors.name = fields.name ? null : "Provider name required";
      if (!this.errors.name) {
        this.$emit("submitForm", fields);
      }
      this.loadingCreate = false;
    }
  }
};
</script>