<template>
  <div class="alert" :class="alert.class" role="alert">{{alert.message}}</div>
</template>

<script>
export default {
  name: "alert",
  props: { alert: { type: Object } },
  mounted() {
    setTimeout(() => {
      this.pullAlert(this.alert.id);
    }, 2500);
  },
  methods: {
    pullAlert(alertId) {
      this.$emit("pullAlert", alertId);
    }
  }
};
</script>

