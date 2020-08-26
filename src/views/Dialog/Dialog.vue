<template>
  <div class="dialog-body" v-if="!loading" ref="body">
    <DialogMessage v-for="message in messages.parts" :key="message.id" :messageData="message" />
  </div>
  <div class="dialog-loader" v-else>
    <div class="loader"></div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import DialogMessage from './DialogMessage'; 

export default {
  computed: {
    ...mapGetters(['dialogById'])
  },
  data () {
    return {
      messages: {},
      loading: true,
      timeout: setTimeout(() => {})
    }
  },
  watch: {
    '$route.params.id' (id) {
      this.simulateLoading(id);
    }
  },
  updated () {
    if (!this.$refs.body) return;
      this.$refs.body.scrollTop += this.$refs.body.scrollHeight;
  },
  methods: {
    simulateLoading (id) {
      clearTimeout(this.timeout);
      this.loading = true;
      this.timeout = setTimeout(() => {
        this.messages = this.dialogById(parseInt(id));
        
        if (!this.messages) {
          this.$router.push({ path: `/dialog/1` });
        }

        this.loading = false; 
      }, 500);
    }
  },
  mounted () {
    this.simulateLoading(this.$route.params.id);
  },
  components: {
    DialogMessage
  }
}
</script>
<style scoped lang="scss">
.dialog-loader {
  background-color: rgba(0,0,0,.7);
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dialog-body {
  width: 100%;
  margin-top: auto;
  padding: 0 16px 43px 40px;
  max-height: calc(100vh - 81px);
  overflow: auto;
  box-sizing: border-box;

  &::v-deep {
    .dialogMessage + .dialogMessage {
      margin-top: 20px;
    }
  }
}
</style>