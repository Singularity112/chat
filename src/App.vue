<template>
  <div id="app">
    <div class="layout container" v-if="dialogs.length">
      <MessageBar />
      <DialogView />
    </div>
    <div v-else class="loader-container">
      <div class="loader"></div>
    </div>
  </div>
</template>

<script>
import MessageBar from '@/views/MessageBar/MessageBar';
import DialogView from '@/views/Dialog/DialogView';
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    MessageBar,
    DialogView
  },
  computed: {
    ...mapGetters(['dialogs'])
  },
  methods: {
    ...mapActions(['loadDialogs'])
  },
  mounted () {
    this.loadDialogs();
  }
}
</script>

<style lang="scss" scoped>
#app {
  height: 100vh;

  .loader-container {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .layout {
    height: 100%;
    display: grid;
    grid-template-areas: 
    'messageBar dialog';
    grid-template-columns: 300px 680px;

    &::v-deep {
      .dialog {
        grid-area: dialog;
        position: relative;
      }

      .messageBar {
        grid-area: messageBar;
      }
    }
  }
}
</style>
