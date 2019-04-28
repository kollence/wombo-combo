<template>
        <v-layout row wrap>
            
            <v-flex xs2 md2 v-for="(champ, i) in inCart" :key="i" style="margin-left:10px;">
                <!-- <Champ :single="champ"></Champ> -->
                    <v-flex>
                        <v-hover>
                        <v-card
                            slot-scope="{ hover }"
                            :class="`elevation-${hover ? 12 : 2}`"
                            >
                            <v-img
                            :src="image+champ.image"
                            contain
                            >
                                <v-expand-transition>
                                    <div
                                    v-if="hover"
                                    class="d-flex transition-fast-in-fast-out v-card--reveal display-3 white--text"
                                    >
                                
                                <v-flex  xs6>
                                    <v-btn flat small icon class="orange darken-4 mr-1" @click="Remove(champ)">
                                    <v-icon small class="fa fa-minus"></v-icon>
                                
                                    </v-btn> 
                                    
                                </v-flex>
                                
                                    
                                    
                                    
                                </div>
                                </v-expand-transition>
                            </v-img>
                        
                        </v-card>  
                        </v-hover>
                    </v-flex>
            </v-flex>
            <v-flex xs12 style="width: 100%" v-if="inCart.length == 5">
                <v-btn small color="green" to="/form">Create Post</v-btn>
                <v-btn small color="orange" to="/five">play ground</v-btn>
            </v-flex>
        </v-layout>
</template>
<script>
import ApiUrl from '../config/ApiUrl'
// import Champ from './Champ'
export default {
    props: ['item'],
    components: {
        // Champ
    },
    data () {
        return {
            image: ApiUrl.imagesUrl
        }
    },
    updated () {
        // console.log(this.inCart);
        
    },
    computed: {
        inCart () {
          return  this.$store.getters.ChampsInCart
        },
    },
    methods: {
       Remove (cha) {
        // let one = this.$store.state.champions.find(elem => elem.name == cha.name)
        // one.in = false
        // this.carter = false
        this.$store.dispatch('RemoveFromCart', cha)

       },
    }
    
}
</script>
