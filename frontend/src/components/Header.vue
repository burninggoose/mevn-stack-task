<template>
  <div class="row">
    <div class="col text-left">
      <h1>Clients</h1>
    </div>
    <div class="col text-right">
      <button
        style="margin-top: 10px"
        class="btn btn-success align-bottom"
        @click="toggleModal"
      >Add client
      </button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'app-header',
  props: { toggleModal: Function },
}
</script>
