<template>
  <div>
    <div class="alerts">
      <Alert
        v-for="alert in alerts.array"
        v-bind:key="alert.id"
        :alert="alert"
        @pullAlert="pullAlert"
      />
    </div>
  </div>
</template>
<script>
import Alert from "./Alert";
import store from "../../store";

export default {
  name: "alerts-row",
  components: { Alert },
  data() {
    return { alerts: store.alerts };
  },
  methods: {
    pullAlert(alertId) {
      this.alerts.pullAlert(alertId);
    }
  }
};
</script>

<style>
.alerts {
  position: fixed;
  top: 20px;
  right: 20px;
  height: 200px;
  z-index: 9999;
}
</style>
