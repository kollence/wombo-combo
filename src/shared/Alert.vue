<template>
    <div>
    <v-alert
      style="border-radius: 10px"
      :value="true"
      @input="onClose"
      dismissible
      type="error"
      transition="scale-transition"
    >
      {{ text }}
    </v-alert>
  </div> 

</template>
<script>
export default {
    props: ['text'],
    methods: {
        onClose () {
            this.$emit('dismissed')
        }
    }
}
</script>
<style scoped>

</style>
