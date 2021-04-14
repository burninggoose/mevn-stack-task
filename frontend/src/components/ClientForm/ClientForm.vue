<template>
  <div class="text-center">
    <small
        style="color: red; marign-top: -10px"
        class="text-center"
        v-if="requestErrors.name || errors.name"
    >{{ requestErrors.name || errors.name }}</small>
    <div class="input-group mb-2">
      <div class="input-group-prepend">
        <span class="input-group-text">Name</span>
      </div>
      <input class="form-control" type="text" name="name" id="name" v-model="name">
    </div>
    <small
        style="color: red"
        v-if="requestErrors.email || errors.email"
    >{{ requestErrors.email || errors.email }}</small>
    <div class="input-group mb-2">
      <div class="input-group-prepend">
        <span class="input-group-text">Email</span>
      </div>
      <input class="form-control" type="text" name="email" id="email" v-model="email">
      <br>
    </div>
    <small
        style="color: red"
        v-if="requestErrors.phone || errors.phone"
    >{{ requestErrors.phone || errors.phone }}</small>
    <div class="input-group mb-2">
      <div class="input-group-prepend">
        <span class="input-group-text">Phone</span>
      </div>
      <input class="form-control" type="text" name="phone" id="text" v-model="phone">
      <br>
    </div>
    <ProvidersList
        :loadClients="loadClients"
        :updateProviders="updateProviders"
        :activeProviders="providers"
    />
    <div class="text-center">
      <button @click.prevent="submit" class="btn btn-success" type="submit">{{ submitText }}</button>
    </div>
  </div>
</template>

<script>
import ProvidersList from "./ProvidersList";

export default {
  name: "client-form",
  components: {ProvidersList},
  props: {
    initialValues: Object,
    submitText: String,
    requestErrors: Object,
    loadClients: Function,
    submitForm: Function,
  },
  data() {
    return {
      errors: {
        name: null,
        email: null,
        phone: null
      },
      name: this.initialValues?.name ?? null,
      email: this.initialValues?.email ?? null,
      phone: this.initialValues?.phone ?? null,
      providers: this.initialValues?.providers ?? []
    };
  },
  methods: {
    updateProviders(providers) {
      this.providers = [];
      for (let i in providers) {
        if (providers[i].checked) {
          this.providers.push({
            id: providers[i].id,
            name: providers[i].name
          });
        }
      }
    },
    async submit() {
      const fields = {
        name: this.name,
        email: this.email,
        phone: this.phone,
        providers: this.providers
      };
      this.errors.name = fields.name ? null : "Required";
      this.errors.email = fields.email ? null : "Required";
      this.errors.phone = fields.phone ? null : "Required";
      if (!this.errors.name && !this.errors.email && !this.errors.phone) {
        await this.submitForm(fields);
      }
    }
  }
};
</script>