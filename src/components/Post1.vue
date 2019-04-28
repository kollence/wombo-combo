<template>
<v-card class="my-2 pa-2" :style="colorCard">
      <v-layout row wrap>
         
        <v-flex xs12 md5>
            <v-layout row wrap>
                <v-flex xs2 v-for="(single, i) in post.combo" :key="i"
                    dark
                    class="ml-2"
                    >
                    <v-tooltip v-if="single.itemSet.length >0"
                    color="black"
                    bottom>
                        <v-img  slot="activator"
                                :src="image+single.image"
                                contain
                            >
                            <b style="color:#F4FF81;">{{single.line}}</b>
                            <small v-if="single.lvl" class="text-xs-right" style="bottom: 0; right: 0; position: absolute">level {{single.lvl}}</small>
                        </v-img>
                        <span style="padding: 0; margin: 0">  
                            <!-- {{single.itemSet}} -->
                            <table>
                                <tr>
                                <td v-if="single.itemSet[0]">
                                    <v-img
                                    class="ml-1"
                                    width="30"
                                    height="30"
                                
                                    :src="itemImage+single.itemSet[0].image.full"
                                    ></v-img>
                                </td>
                                <td v-else></td>
                                <td v-if="single.itemSet[1]">
                                    <v-img
                                    class="ml-1"
                                    width="30"
                                    height="30"
                                
                                    :src="itemImage+single.itemSet[1].image.full"
                                    ></v-img>
                                </td>
                                <td v-else></td>
                                <td v-if="single.itemSet[2]">
                                    <v-img
                                    class="ml-1"
                                    width="30"
                                    height="30"
                                
                                    :src="itemImage+single.itemSet[2].image.full"
                                    ></v-img>
                                </td>
                                <td v-else></td>
                                <td v-if="single.itemSet[3]">
                                    <v-img
                                    class="ml-1"
                                    width="30"
                                    height="30"
                                
                                    :src="itemImage+single.itemSet[3].image.full"
                                    ></v-img>
                                </td>
                                <td v-else></td>
                                <td v-if="single.itemSet[4]">
                                    <v-img
                                    class="ml-1"
                                    width="30"
                                    height="30"
                                
                                    :src="itemImage+single.itemSet[4].image.full"
                                    ></v-img>
                                </td>
                                <td v-else></td>
                                <td v-if="single.itemSet[5]">
                                    <v-img
                                    class="ml-1"
                                    width="30"
                                    height="30"
                                
                                    :src="itemImage+single.itemSet[5].image.full"
                                    ></v-img>
                                </td>
                                <td v-else></td>
                                </tr>
                            </table>
                            </span>
                    </v-tooltip>
                    <v-img  v-else
                                :src="image+single.image"
                                contain
                            >
                            <b style="color:#F4FF81;">{{single.line}}</b>
                            <small v-if="single.lvl" class="text-xs-right" style="bottom: 0; right: 0; position: absolute">level {{single.lvl}}</small>
                        </v-img>
                    </v-flex>
                    
                    <v-flex xs12 class="mx-2"><small style="color:#B388FF;">if champion have items, you can see them by hover over icon</small></v-flex>
                    <v-flex xs12 class="mx-2"><small class="justfont">
                        <!-- {{formatDate()}} -->
                        </small></v-flex>
                   
            </v-layout>
            
        </v-flex>

        <v-flex xs12 md7>
            <v-layout row wrap>
                  <v-flex xs6 md3>
                  <span>
                    <small style="color: yellow;">CAPETAN: </small>
                    <h5 style="color:#00E676;">{{post.captain}}</h5>
                  </span>
                  <span>
                     <small style="color: yellow;">POST MADE:</small>
                     <h5 style="color:#00E676;">{{post.creatorName}}</h5>
                    </span>
                     
                </v-flex>
                <v-flex xs6 md4>
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
                <v-flex xs12 md4>
                  
                  <div>
                     <small style="color: yellow;" class="text-md-center">Stats of Team:</small>
                     <table>
                         <tr>
                             <td style="text-align: right"><small>Damage: </small></td>
                             <td><small style="color:#FF3D00;">{{post.stats[0].damage  | rounded}}</small></td>
                         </tr>
                       
                         <tr>
                             <td style="text-align: right"><small>Ability: </small></td>
                             <td ><small style="color:#76FF03;">{{post.stats[0].ability}}</small></td>
                         </tr>
                        <tr>
                             <td style="text-align: right"><small>Health:</small></td>
                             <td ><small style="color:#00E676;">{{post.stats[0].health  | rounded}}</small></td>
                            
                        </tr>
                       
                       
                        <tr>
                             <td style="text-align: right"><small>Armor:</small></td>
                             <td ><small style="color:yellow;">{{post.stats[0].armor | rounded}}</small></td>

                        </tr>
                        <tr>
                             <td style="text-align: right"><small>Magic Resist:</small></td>
                             <td ><small style="color:#AB47BC;">{{post.stats[0].magicres | rounded}}</small></td>
                            
                        </tr> 
                  </table>
                    </div>
                </v-flex>
            </v-layout><v-divider></v-divider>
        </v-flex>
        <v-layout row wrap>
            <v-flex xs12>
                  <v-flex>
                    <h1 class="text-md-center justfont" style="color: #CFD8DC">{{post.title}}</h1>
                    </v-flex>
              </v-flex>
                <v-flex xs12 class="justfont pa-4">
                 {{post.description}}
                </v-flex>
                <v-flex class="justfont" xs12 v-if="isItAuth(post.creatorId)" >
                        <EditBtn :post="post"></EditBtn>
                        <Delete :postId="post.id"></Delete>
                </v-flex>
                
        </v-layout>
    </v-layout> 
</v-card>
 
</template>

<script>
import ApiUrl from '../config/ApiUrl'
import EditBtn from '../components/EditBtn'
import Delete from '../components/DeleteBtn'
export default {
    props:['post'],
    components: {
      EditBtn,
      Delete
    },
    data() {
        return {
        com: false,
        drawer: null,
        details: false,
        rating: 0,
        test: [],
        image: ApiUrl.imagesUrl,
        itemImage: ApiUrl.itemImage,
        colorCard: {
            'background-image': 'linear-gradient(65deg, #6200EA, #4A148C)',
            'border': '2px solid black',
            'borderRadius': '10px'
        }
        }
    },
    created () {
        // console.log(this.formatDate());
    }, 
    updated () {
    //   this.$store.commit('DELETE_POST', this.post.id)

    },
    methods: {
        formatDate () {
            let d = this.post
            return d
        },
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
    },
    computed: {
        
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

}
</script>

<style>

</style>
