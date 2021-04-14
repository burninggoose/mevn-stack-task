<template>
  <section style="background: rgba(0, 0, 0, 0.5)" :class="{ modal: true, activeModal: modal.component }">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <component
          v-if="modal"
          :is="modal.component"
          v-bind:close="modal.close"
          v-bind="modal.props"
          :class="{ 'd-block': modal.component }"
      />
    </div>
  </section>
</template>

<script>
import ModalService from './modal.service';
import Modal from './Modal.vue';

export default {
  components: {Modal},
  data() {
    return {
      modal: {},
    }
  },
  created() {
    ModalService.$on('open', ({component, props, resolve}) => {
      this.modal = {
        component,
        props,
        close: value => {
          this.modal = {};
          resolve(value);
        },
      };
    });
  }
}
</script>

<style>
.activeModal {
  display: block;
}
</style>
