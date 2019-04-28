<template>
<v-container>
    <!-- <h1>Champ chart not to spred value on other state! or Champ stats to be pulled clean {becouse add or remove stats wont go away}</h1> -->
  <div>
    <v-layout row wrap>
        <v-flex xs12 v-for="(hero, i) in champsInCart" :key="hero.key" >
            <v-btn flat small
              absolute
              right
              fab icon class="red accent-3" @click="Remove(hero)">
                  <v-icon small class="fa fa-times"></v-icon>
            </v-btn>
            <ChampInCart :hero="hero" :index="i"></ChampInCart>
        </v-flex>
        <v-flex xs12 class="ma-2 pa-1" v-if="champsInCart.length < 5"><PickChamp></PickChamp></v-flex>
    </v-layout>
   </div>
</v-container>

</template>
<script>
import PickChamp from './ChampPickerBtn'
import ChampInCart from './ChampCart'
import { mapState } from 'vuex'
export default {
    // props: ['item'],
    components: {
        ChampInCart,
        PickChamp
    },
    data () {
        return {
        }
    },
    created () {
      
    },
    updated () {
      
    },
    computed: {
        ...mapState(['champsInCart']),
        // inCart () {
        //   return  this.champsInCart
        // },
    },
    methods: {
        Remove (cha) {
            // this.$store.commit('REMOVE_CHAMP', cha)
            this.$store.dispatch('RemoveFromCart', cha)

        },
    }
    
}
</script>
<style scoped>
</style>
