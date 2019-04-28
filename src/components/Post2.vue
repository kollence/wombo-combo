<template>
        <v-flex xs12 class="colorborder">
              <v-layout row wrap >
                <v-flex v-for="(single, i) in post.combo" :key="i" xs2 md1 class="post-champ">
                  <v-img
                    :src="image+single.image"
                    contain
                  >
                  <b style="color:#F4FF81;">{{single.line}}</b>
                  <small class="text-xs-right" style="bottom: 0; right: 0; position: absolute">level 1</small>
                  </v-img>
                </v-flex>
                 <v-layout class="mx-1 px-1">
                  <v-flex xs3 md3>
                  <span>
                    <small style="color: yellow;">CAPETAN: </small>
                    <h5 style="color:#00E676;">{{post.captain}}</h5>
                  </span>
                  <span>
                     <small style="color: yellow;">POST MADE:</small>
                     <h5 style="color:#00E676;">{{post.creatorName}}</h5>
                    </span>
                     
                </v-flex>
                <v-flex xs3 md4>
                  <small style="color: yellow;">BASIC INFO:</small>
                  <div  v-for="(stat, i) in post.timeforaction" :key="i">
                     
                     <div v-if="stat.lvl"><small>Expected Level: </small>
                     <strong style="color:#00E676;"> {{stat.lvl}} </strong></div>
                     
                     <div v-if="stat.invade">
                       <small>Invade: </small>
                       <strong style="color:#00E676;">Yes</strong>
                     </div>
                    <div  v-if="stat.timeofaction">
                       <small>Expected action:</small>
                       <strong style="color:#00E676;"> {{stat.timeofaction.toString()}}</strong>
                     </div>
                     
                  </div>
                    
                </v-flex>
                <v-flex xs3 md4>
                  <small style="color: yellow;">Stats of Team:</small>
                  <div>
                     
                     <div>
                       <small>Damage: </small>
                     <strong style="color:#00E676;">{{post.stats[0].damage}}</strong>
                     </div>
                     
                     <div>
                       <small>Ability: </small>
                       <strong style="color:#00E676;">{{post.stats[0].ability}}</strong>
                     </div>
                    <div>
                       <small>Health:</small>
                       <strong style="color:#00E676;">{{post.stats[0].health}}</strong>
                     </div>
                     <div>
                       <small>Armor:</small>
                       <strong style="color:#00E676;">{{post.stats[0].armor}}</strong>
                     </div>
                     <div>
                       <small>Magic Resist:</small>
                       <strong style="color:#00E676;">{{post.stats[0].magicres}}</strong>
                     </div>
                  </div>
                    
                </v-flex>

                </v-layout>
              </v-layout>
              
              <v-divider light></v-divider>
              
              <v-divider light></v-divider>
              <v-layout row>
                  <v-flex>
                    <h1 class="text-md-center justfont">{{post.title}}</h1>
                    </v-flex>
              </v-layout>
              <v-layout class="ma-1 pa-1">
                
                <v-flex>
                 {{post.description}}
                 <!-- <p>{{post.id}}</p> -->
                </v-flex>
              </v-layout>
              
                <!-- <v-card-actions> -->
                  <!-- <Rating :stars="5"></Rating> -->
                  <v-card-actions>
                    <v-flex v-if="isItAuth(post.creatorId)" >
                        <EditBtn :post="post"></EditBtn>
                        <Delete :postId="post.id"></Delete>
                    </v-flex>
                    <v-spacer></v-spacer>
                      <!-- <v-btn
                      
                      flat
                      dark
                      icon
                      @click="details = true"
                      ><v-icon color="primary">fa-info-circle</v-icon></v-btn>
                     <v-btn small flat icon color="blue lighten-2" @click="liked">
                      <v-icon small>fa-thumbs-up</v-icon>
                    </v-btn><p  class="blue--text">{{post.like}}</p>
                    <v-btn small flat icon color="red lighten-2" @click="disliked">
                      <v-icon small>fa-thumbs-down</v-icon>
                    </v-btn>
                    
                    <p class="red--text">{{post.dislike}}</p> -->
                  </v-card-actions>
                      
                    
                    
                  
                  <!-- <v-btn flat small color="orange">Share</v-btn>
                  <v-btn flat small color="orange">Explore</v-btn> -->
                <!-- </v-card-actions> -->
                 <v-dialog
      v-model="details"
      max-width="1000"
      height="1000"
    >
      <v-card class="purple darken-4">
        <v-card-title class="headline">
          <v-btn
              small
              absolute
              
              right
              fab icon color="pink" @click="details = false" flat class="mt-2">
              <v-icon>fa-times</v-icon>
          </v-btn>
         </v-card-title>

        <v-card-text>
            <v-layout row wrap >
                <v-flex v-for="(single, i) in post.combo" :key="i" xs2 md1 class="post-champ">
                  <v-img
                    :src="image+single.image"
                    contain
                  >
                  <b style="color:#F4FF81;">{{single.line}}</b>
                  </v-img>
                </v-flex>
                 <v-layout xs12 md6 class="mx-1 px-1">
                  <v-flex xs3 md3>
                  <span>
                    <small style="color: yellow;">CAPETAN: </small>
                    <h5 style="color:#00E676;">{{post.captain}}</h5>
                  </span>
                  <span>
                     <small style="color: yellow;">POST MADE:</small>
                    
                     <h5 style="color:#00E676;">{{post.creatorName}}</h5>
                    </span>
                     
                </v-flex>
                <v-flex xs3 md6>
                  <small style="color: yellow;">BASIC INFO:</small>
                  <div  v-for="(stat, i) in post.timeforaction" :key="i">
                     
                     <div v-if="stat.lvl"><small>Expected Level: </small>
                     <strong style="color:#00E676;"> {{stat.lvl}} </strong></div>
                     
                     <div v-if="stat.invade">
                       <small>Invade: </small>
                       <strong style="color:#00E676;">Yes</strong>
                     </div>
                    <div  v-if="stat.timeofaction">
                       <small>Expected action:</small>
                       <strong style="color:#00E676;"> {{stat.timeofaction.toString()}}</strong>
                     </div>
                     
                  </div>
                    
                </v-flex>

                </v-layout>
              </v-layout>
              
              <v-divider light></v-divider>
              
              <v-divider light></v-divider>
              <v-layout row>
                  <v-flex>
                    <h1 class="text-md-center">{{post.title}}</h1></v-flex>
              </v-layout>
              <v-layout class="ma-1 pa-1">
                
                <v-flex>
                 {{post.description}}
                 <!-- <p>{{post.id}}</p> -->
                </v-flex>
              </v-layout>
              
                <!-- <v-card-actions> -->
                  <!-- <Rating :stars="5"></Rating> -->
                  <v-card-actions>
                    <v-flex v-if="isItAuth(post.creatorId)" >
                        <EditBtn :post="post"></EditBtn>
                        <Delete :postId="post.id"></Delete>
                    </v-flex>
                    <v-spacer></v-spacer>
                     <v-btn small flat icon color="blue lighten-2" @click="liked">
                      <v-icon small>fa-thumbs-up</v-icon>
                    </v-btn><p  class="blue--text">{{post.like}}</p>
                    <v-btn small flat icon color="red lighten-2" @click="disliked">
                      <v-icon small>fa-thumbs-down</v-icon>
                    </v-btn>
                    
                    <p class="red--text">{{post.dislike}}</p>
                  </v-card-actions>
        </v-card-text>
<v-list class="deep-purple darken-4 ma-0 pa-0">
   <v-list-group
          no-action
          sub-group
          v-model="com"
        >
          <v-list-tile slot="activator">
            <v-list-tile-title>Comments:</v-list-tile-title>
          </v-list-tile>
          <v-card class="px-2 mb-3 deep-purple accent-2">
              <v-textarea
              auto-grow
              rows="1"
              single-line
            label="leave comment"
          ></v-textarea>
          </v-card>
          <v-card
           class="deep-purple darken-2"
            v-for="(commrnt, i) in comments"
            :key="i"
          >
            <v-list-tile-title class="px-2" v-text="commrnt.user"></v-list-tile-title>
            <v-list-tile-action-text >
              <p class="px-2 light-green--text text--accent-1">{{commrnt.text}}</p>
            </v-list-tile-action-text>
          </v-card>
        </v-list-group>
</v-list>

       
      </v-card>
    </v-dialog>
    </v-flex>
</template>

<script>
// import firebase from 'firebase'
// import {mapState} from 'vuex'
import ApiUrl from '../config/ApiUrl'
import EditBtn from '../components/EditBtn'
import Delete from '../components/DeleteBtn'
  export default {
      props:['post'],
    components: {
      EditBtn,
      Delete
    },
    data () {
      return {
        com: false,
        drawer: null,
        details: false,
        rating: 0,
        test: [],
        image: ApiUrl.imagesUrl,
        comments: [
          {user: 'Hrushcov', text: 'Working working'},
          {user: 'Karenjina', text: 'Omg wtf'},
          {user: 'Dostojevski', text: 'minja boli zivot'},
          {user: 'ana', text: 'lose your self to find your self'},
        ]
      }
    },
    // mounted () {
    //   firebase.auth().onAuthStateChanged((user) => {
    //         if (user) {
    //             this.$store.dispatch('ProfilePosts', user.uid)
    //             // update data or vuex state
    //         } else {
    //             console.log('User is not logged in.');
    //         }

    
    //   })
    // },
    computed: {
    //   ...mapState(['profilePosts']),
    //     userIsAuth () {
    //     return this.$store.getters.User !== null && this.$store.getters.User !== undefined
    //   },
    //   posts () {
    //       return this.profilePosts
    //   }
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
          
        },
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
</style>
