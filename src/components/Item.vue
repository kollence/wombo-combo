<template>
  <v-card class="pa-1 ma-1" color="lime darken-4">
                  <v-tooltip 
                  color="black"
                  top
                  max-width="400"
                  >
                    <v-img slot="activator"
                    :src="itemImage+item.image.full"
                    >
                    </v-img>
                    <v-flex ><div class="white--text title">{{item.name}}</div>  <div>Gold: <span class="yellow--text pa-2">{{item.gold}}</span></div>
                    <div class="blue-grey--text text--lighten-4 pt-1" v-for="(pars, u) in tags(item.description)" :key="u">{{pars.toString()}}</div></v-flex>
                    
                  </v-tooltip>
                    
  </v-card>
</template>

<script>
import ApiUrl from '../config/ApiUrl'
// import { bus } from '../main'
export default {
    props: ['item'],
    data () {
      return {
      itemImage: ApiUrl.itemImage,
      image: ApiUrl.imagesUrl,
      }
    },
    methods: {
        tags (take) {
              return this.$options.filters.parseXML(take);
        },
    }
}
</script>

<style>

</style>
