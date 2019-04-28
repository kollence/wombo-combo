<template>
    
       <v-dialog v-model="dialog" max-width="600px">
      <v-btn xs1  icon  slot="activator">
          <v-icon large class="fa fa-plus-circle"></v-icon>
      </v-btn>
      <v-card class="deep-purple darken-1 mb-0">
        <!-- <v-card-title class=""> -->
          <p class="text-md-center ml-2 pt-2 purple--text text--accent-2">SEARCH TO ADD</p>
        <v-card-title class="pa-0">
        </v-card-title>
        <v-card-text>
            <v-autocomplete
              v-model="picked"
              :disabled="isUpdating"
              :items="champs"
              box
              chips
              label="Filter Champions"
              item-text="name"
              item-value="name"
              multiple
            >
              <template
                slot="selection"
                slot-scope="data"
              >
                <v-chip
                  :selected="data.selected"
                  close
                  class="chip--select-multi"
                  @input="remove(data.item)"
                >
                  <v-avatar>
                    <img :src="image+data.item.image">
                  </v-avatar>
                  {{ data.item.name }}
                </v-chip>
              </template>
              
                <template
                
                slot="item"
                slot-scope="data"
              >
                <template v-if="typeof data.item !== 'object'">
                  <v-list-tile-content v-text="data.item.line"></v-list-tile-content>
                </template>
                <template v-else>
                 
                    <v-list-tile-avatar>
                    <img :src="image+data.item.image">
                  </v-list-tile-avatar>
                  <v-list-tile-content >
                    <v-list-tile-title v-html="data.item.name"></v-list-tile-title>
                  </v-list-tile-content>
                  
                  
                </template>
              </template>
              
              
            </v-autocomplete>
            <v-layout row wrap>
                <v-flex style="width: 100%">
                    <Cart></Cart>
                </v-flex>
            </v-layout>
        </v-card-text>
      </v-card>
    </v-dialog>
</template>

<script>
import ApiUrl from '../config/ApiUrl'
import Cart from '@/components/Cart'
// import Champ from '@/components/Champ'
export default {
    components: {
    //   Champ,
      Cart
    },
    data () {
      return {
        image: ApiUrl.imagesUrl,
        dialog: false,
        autoUpdate: true,
        picked: [],
        isUpdating: false
      }
    },
    watch: {
        picked (val) {
            let add = this.$store.getters.Champ(val[val.length-1])
            // console.log(add);
            if (add) {
              // let hero = { 
              //           name: add.name, 
              //           image: add.image, 
              //           stats: add.stats,
              //           tags: add.tags,
              //           lvl: add.lvl,
              //           itemSet: []
              //         }
              this.$store.dispatch('AddToCart', add)  
            }
        },
        dialog (val) {
          if (val == false) {
            this.picked = []
          }
          
        }
    },
    computed: {
        champs () {
        return this.$store.getters.Champions
      },
      pick () {
          return this.$store.dispatch('AddToCart', this.picked)
      }
    },
    methods: {
        remove (item) {
        const index = this.picked.indexOf(item.name)
        if (index >= 0) this.picked.splice(index, 1)
      },
      add () {
        //  if (this.picked) {

        //    this.$store.dispatch('AddToCart', this.picked)
        //  }
       },
    }
}
</script>
