<template>
  <v-layout row wrap class="pa-3 mt-2">
    <v-flex xs12>
      <v-flex v-if="error" xs-12 style="position: absolute; top: 0; right: 0;">
            <Alert @dismissed="onDismissed" :text="error.message"></Alert>
      </v-flex>
      <v-flex xs12 v-if="loading">
      <template>
        <v-progress-linear :indeterminate="true"></v-progress-linear>
      </template>
    </v-flex>
      <v-layout row wrap v-else>
         
      <v-flex xs12 md7 class="pa-4">
      
        <v-autocomplete
              v-model="picked"
              :disabled="isUpdating"
              :items="Champions"
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
      </v-flex>
      <v-flex v-if="ChampsInCart.length > 0"  xs12 md5 class="text-xs-center mylogo pt-2" style="border-radius: 10px;background-color: #7C4DFF;">
        <Cart></Cart>
      </v-flex>
      <v-flex xs12 md5 v-else class="pt-4 text-xs-center mylogo" style="border-radius: 10px;background-color: #7C4DFF;">
        <v-flex>Champion Cart</v-flex>
        <v-divider light></v-divider>
        <small>pick five champions</small>
        </v-flex>
      </v-layout>

    </v-flex>
      <v-flex xs4 md1 v-for="(champ, i) in filte()" :key="i" class="pa-2">
          <Champ :single="champ"></Champ>
    </v-flex>
  </v-layout>
</template>
<script>
import ApiUrl from '../config/ApiUrl'
import Cart from '@/components/Cart'
import Champ from '@/components/Champ'
import { mapGetters } from 'vuex'
  export default {
    components: {
      Champ,
      Cart
    },
    data () {
      return {
        itemsDialog: false,
        image: ApiUrl.imagesUrl,
        dialog: false,
        autoUpdate: true,
        picked: [],
        isUpdating: false
      }
    },
    created () {
    },
    updated () {
    },
    computed: {
      ...mapGetters(['Champions','Loading','FilterChamps','Error','ChampsInCart']),
      loading () {
      return this.Loading
      },
      error () {
            return this.Error
      },
      
    },
     watch: {
      isUpdating (val) {
        if (val) {
          setTimeout(() => (this.isUpdating = false), 3000)
        }
      },
      

    },

    methods: {
      openItems (val) {
        this.itemsDialog = val
      },
      remove (item) {
        const index = this.picked.indexOf(item.name)
        if (index >= 0) this.picked.splice(index, 1)
      },
      loadChamp () {
        this.dialog = false
      },
      onDismissed () {
            console.log('Dismissed alert')
            this.$store.dispatch('clearError')
        },
        filte () {
        return (this.picked.length > 0) ? this.FilterChamps(this.picked) : this.Champions
      }

    }
}
</script>
<style>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  /* opacity: .5; */
  position: absolute;
  width: 100%;
  cursor: default;
}
</style>


