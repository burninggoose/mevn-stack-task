<template>
  <div>
    <div class="input-group mb-3">
      <div class="input-group-prepend">
        <span class="input-group-text">Name</span>
      </div>
      <input class="form-control" type="text" name="name" id="name" v-model="name">
      <small style="color: red" v-if="errors.name">{{errors.name}}</small>
    </div>

    <div class="input-group mb-3">
      <div class="input-group-prepend">
        <span class="input-group-text">Email</span>
      </div>
      <input class="form-control" type="text" name="email" id="email" v-model="email">
      <small style="color: red" v-if="errors.email">{{errors.email}}</small>
    </div>

    <div class="input-group mb-3">
      <div class="input-group-prepend">
        <span class="input-group-text">Phone</span>
      </div>
      <input class="form-control" type="text" name="phone" id="text" v-model="phone">
      <small style="color: red" v-if="errors.phone">{{errors.phone}}</small>
    </div>
    <ProvidersList
      @loadClients="loadClients"
      @updateProviders="updateProviders"
      v-bind:activeProviders="providers"
    />
    <div class="text-center">
      <button @click="checkForm" class="btn btn-success" type="submit">{{submitText}}</button>
    </div>
  </div>
</template>

<script>
import ProvidersList from "./ProvidersList";
export default {
  name: "client-form",
  components: { ProvidersList },
  props: {
    initialValues: { type: Object },
    submitText: { type: String }
  },
  data() {
    return {
      errors: {
        name: null,
        email: null,
        phone: null
      },
      name: this.initialValues ? this.initialValues.name : null,
      email: this.initialValues ? this.initialValues.email : null,
      phone: this.initialValues ? this.initialValues.phone : null,
      providers: this.initialValues ? this.initialValues.providers : []
    };
  },
  methods: {
    loadClients: function() {
      this.$emit("loadClients");
    },
    updateProviders: function(providers) {
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
    checkForm: function(e) {
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
        this.$emit("submitForm", fields);
      }
      e.preventDefault();
    }
  }
};
</script>