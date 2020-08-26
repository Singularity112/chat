<template>
  <div class="dialogMessage" :class="dialogAuthor">
    <div class="dialogMessage-body">
      {{ messageData.text }}
    </div>
    <div class="dialogMessage-info">
      <div class="dialogMessage-info-name">
        {{ messageData.author }}
      </div>
      <div class="dialogMessage-info-date">
        {{ messageData.created | dateConverter }}
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    messageData: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters(['username']),
    dialogAuthor () {
      return this.username === this.messageData.author ? 'self' : 'companion'
    }
  },
  filters: {
    dateConverter (val) {
      const date = new Date(val);
      return `${ ('0' + date.getDay()).slice(-2) }.
        ${('0' + date.getMonth()).slice(-2)}.
        ${date.getFullYear()}
        ${date.getHours()}:${date.getMinutes()}`; 
    }
  }
}
</script>
<style scoped lang="scss">
@import '@/scss/variables';

.dialogMessage {
  width: 100%;

  &-body {
    border-radius: 8px 8px 8px 0px;
    padding: 21px 21px 16px 22px;
    max-width: 380px;
  }

  &.self {
    .dialogMessage-body {
      background-color: $dialogSelfBackground;
      color: $dialogSelfText;
    }
  }

  &.companion {
    margin-left: auto;

    .dialogMessage-body {
      background-color: $dialogCompanionBackground;
      color: $dialogCompanionText;
      margin-left: auto;
    }

    .dialogMessage-info {
      justify-content: flex-end;
    }
  }

  .dialogMessage-info {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 12px;

    &-name {
      font-size: 13px;
      color: $dialogName;
    }

    &-date {
      font-size: 10px;
      margin-left: 12px;
      color: $dateColor;
    }
  }
}
</style>