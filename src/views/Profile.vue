<template>
    <v-container>
<v-flex xs12 v-if="loading">
      <template>
        <v-progress-linear :indeterminate="true"></v-progress-linear>
      </template>
    </v-flex>
    <v-flex v-else>
       <h1 class="justfont text-md-center">{{user.name}}</h1>
       <v-layout v-if="posts.length == 0">
        <v-flex>
            <h1>Make your first Combo Wombo</h1>
            <p>Pick you'r five <v-btn small flat color="primary" to="/champions">champions</v-btn> for combo</p>
        </v-flex>
    </v-layout>
  <v-layout row wrap v-else>
    <Post v-for="(post, i) in posts" :key="i" :post="post"></Post>
  </v-layout>
    </v-flex>
   
  </v-container>
</template>
<script>
// import firebase from 'firebase'
import {mapState} from 'vuex'
import ApiUrl from '../config/ApiUrl'
import Post from '../components/Post1'
// import EditBtn from '../components/EditBtn'
// import Delete from '../components/DeleteBtn'
  export default {
    components: {
      // EditBtn,
      // Delete,
      Post
    },
    data () {
      return {
        // name: '',
        rating: 0,
        test: [],
        image: ApiUrl.imagesUrl
      }
    },
    mounted () {
      this.$store.dispatch('ProfilePosts')
      
      // firebase.auth().onAuthStateChanged((user) => {
      //       if (user) {
      //           this.$store.dispatch('ProfilePosts', user.uid)
      //           this.name = user.displayName
      //       } else {
      //           console.log('User is not logged in.');
      //       }

    
      // })
    },
    computed: {
      ...mapState(['profilePosts', 'user']),
      loading () {
      return this.$store.getters.Loading
      },
        userIsAuth () {
        return this.$store.getters.User !== null && this.$store.getters.User !== undefined
      },
      posts () {
          return this.profilePosts
      },
      user () {
        return this.$store.getters.User
      }
    },
    // methods: {
    //     liked () {
    //       console.log("Liked once");
          
    //     },
    //     disliked () {
    //       console.log("disLiked once");
          
    //     },
    // }
}
</script>
