<template>
<div>
  <v-layout v-if="loading">
    <v-flex xs12>
      <template>
        <v-progress-linear :indeterminate="true"></v-progress-linear>
      </template>
    </v-flex>
  </v-layout>
  <v-layout row wrap  v-else>
    <v-carousel dark hide-delimiters hide-controls>
    <v-carousel-item
      v-for="(item,i) in carouseling"
      :key="i"
      :src="item.image"
    ><v-flex class="text-xs-center mt-4">
       <h1 class="headlines">{{item.text}}</h1> 
      </v-flex></v-carousel-item>
  </v-carousel>
  <v-container>
     <h1>DELETE REACTIV MUTATION POST</h1>
    <Post v-for="(post, i) in posts" :key="i" :post="post"></Post>
  </v-container>

  
  </v-layout>
  </div>
</template>

<script>
// import { mapState } from 'vuex'
// import Cart from '../components/Cart'
import ApiUrl from '../config/ApiUrl'
// import EditBtn from '../components/EditBtn'
// import Delete from '../components/DeleteBtn'
import Post from '../components/Post1'
  export default {
    components: {
      // EditBtn,
      // Delete,
      Post
    },
    data () {
      return {
        rating: 0,
        test: [],
        image: ApiUrl.imagesUrl,
        carouseling: [
          {image: require('@/assets/wc2.jpg'), text: 'Find Wombo Combo You Like'},
          {image: require('@/assets/wc3.jpg'), text: 'Do It With Your Friends'},
          {image: require('@/assets/wc4.jpg'), text: 'Sing up And Make Your Own'},
        ]
      }
    },
    created () {
    // this.$store.dispatch('LoadPosts')
    // this.$store.dispatch('ListOfItems')
    },
    updated() {
      this.posts
    },
    computed: {
      // ...mapState(['items']),
      // ...mapState({dc: state => state.items.description}),
      posts () {
        return this.$store.getters.posts
      },
      items () {
        // return this.$store.state.items.map(that => that.description)
        return this.$store.getters.ParseXmlDesc
      },
      loading () {
      return this.$store.getters.Loading
      },
      userIsAuth () {
        return this.$store.getters.User !== null && this.$store.getters.User !== undefined
      },
      user () {
        return this.$store.getters.User
      }
      

    },
    
    methods: {
       onDismissed () {
            console.log('Dismissed alert')
            this.$store.dispatch('clearError')
        },
        isItAuth (postId) {
          if (!this.userIsAuth) {
          return false
        }
         return this.$store.getters.User.id === postId
        },
        liked () {
          console.log("Liked once");
          
        },
        disliked () {
          console.log("disLiked once");
          
        }
    }
  }
</script>
<style scoped>

.colorborder {
  border: 2px solid #827717;
  border-radius: 10px;
  margin-bottom: 3px;
  padding: 4px;
  /* background-color: #263238; */
  /* background-image: url('../assets/postBG.jpg'); */
  /* box-shadow:0px 0px 40px 10px #00435c; */
}
.post-champ {
  border: 1px solid #827717;
  margin: 2px;
}
.move-right {
  right: 0px;
}


   /* color:#00E676;-webkit-text-stroke: 1px black; */
  /* font-family: 'Sofachrome Regular'; */
.headlines {
  font-family: "Coiny Regular Regular", Arial, sans-serif;
  color:rgb(111, 0, 230);-webkit-text-stroke: 1px #00E676;
  font-size: 450%;
}
</style>

