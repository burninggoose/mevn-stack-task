<template>
  <form id="client-form" @submit.prevent="submit">
    <small
        style="color: red"
        v-if="requestErrors.name || errors.name"
    >{{ requestErrors.name || errors.name }}</small>
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
        >{{ this.loadingCreate ? 'Loading' : "Create provider" }}
        </button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: "provider-form",
  props: {requestErrors: Object, submitForm: Function},
  data: () => ({
    errors: {
      name: null
    },
    name: null,
    loadingCreate: false
  }),
  methods: {
    async submit() {
      this.loadingCreate = true;
      const fields = {
        name: this.name
      };
      this.errors.name = fields.name ? null : "Provider name required";
      if (!this.errors.name) {
        await this.submitForm(fields);
      }
      this.loadingCreate = false;
    }
  }
};
</script>