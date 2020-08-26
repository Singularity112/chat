<template>
  <div class="dialog">
    <div class="dialog-window">
      <router-view />
    </div>
    <div class="dialog-input" v-if="!loading">
      <div class="input">
        <input placeholder="Введите текст..." v-model="userInput" @keyup.enter="submit" ref="input" />
      </div>
      <div class="dialog-input-submit" @click="submit">
        <svg width="22" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.00936317 17.2563C0.00989464 17.6114 0.3701 17.8528 0.698756 17.7183L20.8694 9.46274C21.2835 9.29324 21.2835 8.70676 20.8694 8.53726L0.698758 0.281704C0.370102 0.14719 0.00989463 0.388579 0.00936317 0.743697L0.000660091 6.55894C0.000282918 6.81096 0.187529 7.02387 0.437532 7.05569L11.8171 8.504C12.3996 8.57814 12.3996 9.42186 11.8172 9.496L0.437533 10.9443C0.187529 10.9761 0.000282918 11.189 0.000660091 11.4411L0.00936317 17.2563Z" fill="white"/>
        </svg>
      </div>
    </div>
    <div class="dialog-input-loader" v-else>
      <div class="loader"></div>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      userInput: '',
      loading: false
    }
  },
  methods: {
    ...mapActions(['submitMessage']),
    submit () {
      if (!this.userInput) return;

      this.submitMessage({
        id: parseInt(this.$route.params.id),
        message: this.userInput
      });

      this.userInput = '';
      this.loading = true;

      setTimeout(() => {
        this.loading = false;
        setTimeout(() => {
          this.$refs.input.focus();
        }, 10);
      }, 200);
    }
  }
}
</script>
<style scoped lang="scss">
@import '@/scss/variables';

.dialog {
  background-color: $white;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;

  .dialog-window {
    width: 100%;
    height: 100%;
    display: flex;
  }

  &-input {
    margin-top: auto;
    height: 80px;
    border-top: 1px solid $separatorColor;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;

    &-loader {
      background-color: rgba(0, 0, 0, .6);
      min-height: 80px;
      display: flex;
      align-items: center;
      justify-content: center;

      .loader {
        height: 50px;
        width: 50px;

        &:after {
          width: 24px;
          height: 24px;
        }
      }
    }

    & .input {
      width: 100%;
      padding-left: 33px;
      padding-right: 33px;

      input {
        width: 100%;
        font-size: 14px;
        border: none;
        outline: none;
      }
    }

    &-submit {
      background-color: $primary;
      min-height: 80px;
      min-width: 80px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>