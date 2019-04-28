<template>
      <v-layout>
        <v-card  flat class="px-1" color="purple darken-4">
            <v-card-title>
              <v-layout row wrap align-center>
                <v-flex xs6 md2>
                  <v-checkbox  class="ma-0 pa-0"  hide-details v-model="selected" label="Damage" value="Damage"></v-checkbox>
                  <v-divider></v-divider>
                  <v-checkbox  class="ma-0 pa-0"  hide-details v-model="selected"  label="Critical Strike" value="CriticalStrike"></v-checkbox>
                  <v-divider></v-divider>
                  <v-checkbox  class="ma-0 pa-0"  hide-details v-model="selected"  label="Attack Speed" value="AttackSpeed"></v-checkbox>
                  <v-divider></v-divider>
                  <v-checkbox  class="ma-0 pa-0"  hide-details v-model="selected"  label="Life Steal" value="LifeSteal"></v-checkbox>
                  <v-divider></v-divider>
                </v-flex>
                <v-flex xs6 md2>
                  <v-checkbox class="ma-0 pa-0"  hide-details v-model="selected"  label="Ability Power" value="SpellDamage"></v-checkbox>
                  <v-divider></v-divider>
                  <v-checkbox  class="ma-0 pa-0"  hide-details v-model="selected"  label="Cooldown" value="CooldownReduction"></v-checkbox>
                  <v-divider></v-divider>
                  <v-checkbox  class="ma-0 pa-0"  hide-details v-model="selected"  label="Mana" value="Mana"></v-checkbox>
                  <v-divider></v-divider>
                  <v-checkbox  class="ma-0 pa-0"  hide-details v-model="selected"  label="Mana Regen" value="ManaRegen"></v-checkbox> 
                  <v-divider></v-divider>
                </v-flex>
                <v-flex xs6 md2>
                  <v-checkbox  class="ma-0 pa-0"   hide-details v-model="selected" label="Health" value="Health"></v-checkbox>
                  <v-divider></v-divider>
                  <v-checkbox  class="ma-0 pa-0"  hide-details v-model="selected"  label="Health Regen" value="HealthRegen"></v-checkbox>
                  <v-divider></v-divider>
                  <v-checkbox  class="ma-0 pa-0"  hide-details v-model="selected"  label="Magic Resists" value="SpellBlock"></v-checkbox>
                  <v-divider></v-divider>
                  <v-checkbox  class="ma-0 pa-0"  hide-details v-model="selected"  label="Armor" value="Armor"></v-checkbox>  
                  <v-divider></v-divider>
                </v-flex>
                <v-flex xs6 md2>
                  <v-checkbox  class="ma-0 pa-0"   hide-details v-model="selected"  label="Armor Penetration" value="ArmorPenetration"></v-checkbox>
                  <v-divider></v-divider>
                  <v-checkbox  class="ma-0 pa-0"   hide-details v-model="selected"  label="Boots" value="Boots"></v-checkbox>
                  <v-divider></v-divider>
                  <v-checkbox class="ma-0 pa-0"    hide-details v-model="selected"  label="Movement" value="NonbootsMovement"></v-checkbox>
                  <v-divider></v-divider>
                  <v-checkbox  class="ma-0 pa-0"  hide-details v-model="selected"  label="Consumables" value="Consumable"></v-checkbox>
                  <v-divider></v-divider>
                </v-flex>
                <v-flex xs12 md2 offset-md-2>
                  <v-btn color="orange lighten-1" small @click.native.stop="minionChart = true">Minion CS Chart</v-btn>
                </v-flex>
              </v-layout>
          </v-card-title>

            
          <v-divider></v-divider>
          <v-card-text>
            <v-layout row wrap>
              <!-- <v-flex xs12 md6> -->
                <div style="width:50px; height:50px;" v-for="(item, i) in itemsSelect" :key="i"  @click="addItem(item)">

                <LoadedItems :item="item"></LoadedItems>
                
              </div>
              <!-- </v-flex> -->
              
            </v-layout>
              
            
          </v-card-text>
          
        </v-card>
           <v-dialog v-model="minionChart" max-width="530">
            <v-card class="pa-0 ma-0" light>
              <!-- <v-card-title>League of Legends Minion Gold Chart</v-card-title> -->
              <v-card-text  class="pa-0 ma-0">

                    <v-data-table  
                      light
                      :headers="headers"
                      :items="goldChart"
                      hide-actions
                      class="elevation-1"
                    >
                      <template slot="items" slot-scope="props"  >
                        <td>{{ props.item.time }}</td>
                        <td>{{ props.item.perfectCs }}</td>
                        <td>{{ props.item.maxGold }}</td>
                        <td>Every {{ props.item.cannon }} wave</td>
                      </template>
                    </v-data-table>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green darken-1" flat="flat" @click.native="minionChart = false">Close</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
      </v-layout> 
</template>
<script>
// let _ = require('lodash')
import LoadedItems from "./Item";
import { mapState} from 'vuex';
import ApiUrl from '../config/ApiUrl'
export default {
  props: ['name'],
  components: {
      LoadedItems,
  },
  data () {
    return {
      minionChart: false,
      itemImage: ApiUrl.itemImage,
      image: ApiUrl.imagesUrl,
      lvl: 0,
      selected: [],
      inhud: [],
      dialog: false,
      headers: [
        {sortable: false,text: 'Time',value: 'time'},
        {sortable: false,text: 'Perfect CS',value: 'perfectCs'},
        {sortable: false,text: 'Max Gold',value: 'maxGold'},
        {sortable: false,text: 'Cannon Minion',value: 'cannon'},
      ],
      goldChart: [
        {time: '5:00',perfectCs: '44',maxGold: '1214',cannon: '3'},
        {time: '10:00',perfectCs: '107',maxGold: '3081',cannon: '3'},
        {time: '15:00',perfectCs: '171',maxGold: '5059',cannon: '2'},
        {time: '20:00',perfectCs: '236',maxGold: '7166',cannon: '2'},
        {time: '25:00',perfectCs: '301',maxGold: '9276',cannon: ''},
        {time: '30:00',perfectCs: '370',maxGold: '11746',cannon: ''},
        {time: '35:00',perfectCs: '440',maxGold: '14306',cannon: ''},
        {time: '40:00',perfectCs: '510',maxGold: '16866',cannon: ''},
        {time: '45:00',perfectCs: '580',maxGold: '19426',cannon: ''},
        {time: '50:00',perfectCs: '650',maxGold: '21986',cannon: ''},

      ],
      styleTable: { 'backgroundColor': '#651FFF'}
    }
  },
  mounted() {
    // this.$nextTick(function () {
    //     console.log('Could pass here');
        
    //   })
  },
  computed: {
    ...mapState(['items']),
     show: {
      get () {
        return this.value
      },
      set (value) {
         this.$emit('input', value)
      }
    },
    itemsSelect () {
      
      return (this.selected.length == 0) ? this.items : this.callToHelp()
    },
    itemsInHud () {
      return this.$store.state.itemsInHud
    }
 },
 methods: {
   tags (take) {
            return this.$options.filters.parseXML(take);
    },
   open () {
     this.$emit('open', true)
   },
   addItem(ite) {
    
    this.$emit('hereItem', ite)
   },
   drop (i) {
    this.$store.commit('REMOVE_ITEM', i)
   },
   callToHelp () {
  //     // OPEN JUST SELECTED ITEMS WITHOUT REPITE SAME ONE
      var you = []
        for (var i = 0; i < this.selected.length; i++) {
          let val = this.items.filter(item => {return item.tags.includes(this.selected[i].toString())})
          you.push(...val)
        }
        return  [...new Set(you)]
   }

 },
 filters: {

 }

}
</script>
<style scoped>
.items > tr > td {
  border: 3px solid rgb(143, 117, 107);
  border-collapse: collapse;
  
}
.items td {
  width: 74px;
  height: 74px;
  background: black;
}
.summoners td {
  width: 44px;
  height: 44px;
  background: black;
}

</style>