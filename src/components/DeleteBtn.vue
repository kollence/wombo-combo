<template>
    <v-dialog v-model="dialog" left persistent max-width="350">
      <v-btn slot="activator" color="red accent-3" flat small>Delete</v-btn>
      <v-card class="justfont text-xs-center pt-3 deep-purple darken-1">
        <h2 class="red--text">Delete ?</h2>
        <v-card-text>Are you sure you want to delete this post</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click="dialog = false">Cancel</v-btn>
          <v-btn  class="red--text" flat @click="deletePost(postId)">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>
<script>
  export default {
    props: ['postId'],
    data () {
      return {
        // postsId: this.postId,
        dialog: false
      }
    },
    methods: {
        deletePost (id) {
        this.dialog = false
        this.$store.dispatch('DeletePost', id)
    }
    }
  }
</script>