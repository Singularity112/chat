<template>
  <div class="message" @click="openDialog(dialogData.id)" :class="activeClass">
    <div class="message-heading">
      <div class="message-heading-title">
        {{ dialogData.subject }}
      </div>
      <div class="message-heading-date">
        {{ dialogData.created | dateConverter }}
      </div>
    </div>
    <div class="message-body">
      {{ dialogData.parts[0].text }}
    </div>
  </div>
</template>

<script>
const MONTHS = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];

export default {
  props: {
    dialogData: {
      type: Object,
      required: true
    }
  },
  methods: {
    openDialog (id) {
      if (this.$route.path !== `/dialog/${id}`) {
        this.$router.push({ path: `/dialog/${id}` })
      }
    }
  },
  computed: {
    activeClass () {
      return this.dialogData.id === parseInt(this.$route.params.id) ? 'active' : ''; 
    }
  },
  filters: {
    dateConverter (val) {
      const date = new Date(val);
      return `${date.getDay()} ${MONTHS[date.getMonth()]} ${date.getFullYear()}`; 
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/scss/variables';

.message {
  height: 100px;
  display: flex;
  justify-content: center;
  padding-left: 23px;
  padding-right: 20px;
  flex-direction: column;
  transition-duration: $transitionTiming;
  cursor: pointer;
  position: relative;

  &:before {
    background-color: $primary;
    height: 100%;
    width: 2px;
    position: absolute;
    left: 0;
    top: 0;
  }

  &:hover {
    background-color: $white;
  }

  &.active {
    background-color: $white;

    &:before {
      content: '';
    }
  }

  .message-heading {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    .message-heading-title {
      font-size: 14px;
      line-height: 20px;
      color: $sidebarSubject;
      max-width: 150px;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .message-heading-date {
      font-size: 10px;
      line-height: 14px;
      color: $dateColor;
      text-transform: uppercase;
    }
  }

  .message-body {
    font-size: 13px;
    line-height: 18px;
    margin-top: 1px;
    color: $sidebarText;
    height: 40px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>