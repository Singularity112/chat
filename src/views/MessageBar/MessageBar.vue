<template>
  <div class="messageBar">
    <div class="messageBar-header">
      <div class="messageBar-header-title">
        Сообщения
      </div>
      <div class="messageBar-header-count">
        {{ dialogs.length || 0}}
      </div>
    </div>
    <div class="messageBar-items">
      <Message
        v-for="dialog in dialogs"
        :key="dialog.id"
        :dialogData="dialog"  
      />
    </div>
  </div>
</template>

<script>
import Message from './Message';
import { mapGetters } from 'vuex'

export default {
  components: {
    Message
  },
  computed: {
    ...mapGetters(['dialogs'])
  }
}
</script>

<style scoped lang="scss">
@import '@/scss/variables';

.messageBar {
  background-color: $sidebarBackground;

  .messageBar-header {
    padding: 24px 0 16px 20px;
    display: flex;
    border-bottom: 1px solid $separatorColor;

    .messageBar-header-title {
      color: $sidebarHeader;
      font-size: 14px;
      line-height: 20px;
    }

    .messageBar-header-count {
      color: $sidebarCount;
      margin-left: 10px;
    }
  }
}
</style>