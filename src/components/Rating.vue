<template>
  <div>
    <v-rating small color="amber" v-model="stars"></v-rating>
  </div>
</template>
<script>
export default {
    props: ['stars']
}
</script>
