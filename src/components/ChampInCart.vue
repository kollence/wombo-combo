<template>

<v-flex  class="text-xs-center">
   
    <v-flex>
    <v-hover>
      <v-card
        slot-scope="{ hover }"
        :class="`elevation-${hover ? 12 : 2}`"
        >
        <v-img
        :src="image+single.image"
        contain
        ><small>Level: {{single.lvl}}</small>
            <v-expand-transition>
                <div
                v-if="hover"
                class="d-flex transition-fast-in-fast-out v-card--reveal display-3 white--text"
                >
                
                <v-flex xs6>
                <v-btn
                  flat
                  slot="activator"
                  @click="showInfo()"
                  small icon class="orange darken-4 ml-1">
                  <v-icon small class="fa fa-info"></v-icon>
                </v-btn>
              </v-flex>
              <v-spacer></v-spacer>
              <v-flex  xs6 v-if="cartChampions">
                <v-btn flat small icon class="orange darken-4 mr-1" @click="Remove(single)">
                  <v-icon small class="fa fa-minus"></v-icon>
               
                </v-btn> 
                 
              </v-flex>
              
              <v-flex  xs6 v-else>
                <v-btn flat small icon class="orange darken-4 mr-1" @click="add(single)">
                  <v-icon small class="fa fa-plus"></v-icon>
                </v-btn> 
              </v-flex>
              
                
                  
                
              </div>
            </v-expand-transition>
        </v-img>
      
      </v-card>  
    </v-hover>
</v-flex>

      <v-dialog
          v-model="asked"
          max-width="1100"
          >
          <v-card color="purple darken-4">    
              <component :is="aftermount"  :hero="single"></component>
                <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="primary"
                  flat
                  @click="closed()"
                >
                  close
                </v-btn>
              </v-card-actions>   
          </v-card>
            
      </v-dialog> 
</v-flex>
</template>
<script>
import ApiUrl from '../config/ApiUrl'
import ChampStats from './ChampCart'
import { mapGetters} from 'vuex';
export default {
    components: {
      'champ-stats': ChampStats
    },
    props: ['single'],
    data () {
        return {
            aftermount: '',
            component: '',
            carter: false,
            asked: false,
            sendSingle: [],
            image: ApiUrl.imagesUrl,
        }
    },
    // watch: {
    //   see (val) {
    //     if (val == true) {
    //       val = true
    //     }else {
    //       val = false
    //     }
        
    //   }
    // },
    mounted () {
      
      // this.aftermount = 'champ-stats'
    },
    
    computed: {
      ...mapGetters(['ChampsInCart']),
       cartChampions () {
            return this.ChampsInCart.find(x => x.name == this.single.name)
        },

    },
    methods: {
      test() {
        console.log('Swap component')
        this.component = 'champ-stats'
        
      },
       singleInfo () {
        //  this.dialog = true
         this.asked = true
       },
       Remove (cha) {
        this.$store.dispatch('RemoveFromCart', cha)

       },
       add (champ) {
         if (champ) {
          //  let hero = Object.assign({}, champ)
           this.$store.dispatch('AddToCart', champ)
          
         }
       },
      showInfo () {
        this.aftermount = 'champ-stats'
        this.asked = true
      },
      closed () {
        this.aftermount = ''
        this.asked = false
      }
    }
}
</script>
<style scoped>

</style>


