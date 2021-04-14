<template>
  <div class="alert" :class="alert.class" role="alert">{{ alert.message }}</div>
</template>

<script>
export default {
  name: "alert",
  props: {alert: Object, pullAlert: Function},
  mounted() {
    setTimeout(() => {
      this.pullAlert(this.alert.id);
    }, 2500);
  },
};
</script>

