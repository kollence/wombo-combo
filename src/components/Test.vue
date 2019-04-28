<template>
    <div>
              <small style="position: relative;float:right; margin: 10px 10px 0 0">At level: 1</small>
              <div
                class="mylogo ml-3"
              >
                {{single.name}}
              </div>
              
              <v-card-text>
              <v-layout row wrap>
                <v-flex xs12 md2>
                  <v-flex md12 xs2>
                    <v-img :src="image+single.image"></v-img>
                    <span v-for="tag in single.tags" :key="tag">{{tag}} </span>
                  </v-flex>
                </v-flex>
                <v-flex xs6 md2 offset-md1>
                  <small >Damage: {{single.stats.attackdamage  | rounded}}</small>
                  <v-divider light></v-divider>
                  <small >Critical: {{single.stats.crit}}</small>
                  <v-divider light></v-divider>
                  <small >Attack Speed: {{single.stats.attackspeed  | rounded}}</small>
                  <v-divider light></v-divider>
                  <small >Attack Range: {{single.stats.attackrange}}</small>
                  
                </v-flex>
                <v-flex xs6 md2>
                  <small >Ability Power: {{single.stats.ap}}</small>
                  <v-divider light></v-divider>
                  <small >Cooldown: {{single.stats.cd}}</small>
                  <v-divider light></v-divider>
                  <small >Mana: {{single.stats.mp}}</small>
                  <v-divider light></v-divider>
                  <small >Mana Regen: {{single.stats.mpregen}}</small>
                </v-flex>
                <v-flex xs6 md2>
                  <small >Helth: {{single.stats.hp}}</small>
                  <v-divider light></v-divider>
                  <small >Helth Regen: {{single.stats.hpregen}}</small>
                  <v-divider light></v-divider>
                  <small >Armor: {{single.stats.armor}}</small>
                  <v-divider light></v-divider>
                  <small >Magic Resist: {{single.stats.spellblock}}</small>
                  <v-divider light></v-divider>
                  <small >Movement: {{single.stats.movespeed}}</small>
                </v-flex>
                <v-flex xs6 md2>
                  <v-divider></v-divider>
                  <small>Damage Per lvl :</small> <small>+{{single.stats.attackdamageperlevel}}</small>
                  <v-divider light></v-divider>
                  <small>AttackSpeed Per lvl :</small> <small>+{{single.stats.attackspeedperlevel}}%</small>
                  <v-divider light></v-divider>
                    <!--CritPL: {{single.stats.critperlevel}} -->
                  <small>Armor Per lvl :</small> <small>+{{single.stats.armorperlevel}}</small>
                  <v-divider light></v-divider>
                  <small>MagicResist Per lvl :</small> <small>+{{single.stats.spellblockperlevel}}</small>
                  <v-divider light></v-divider>
                  <small>Helth Per lvl :</small> <small>+{{single.stats.hpperlevel}}</small>
                  <v-divider light></v-divider>
                  <small>HelthRegen Per lvl :</small> <small>+{{single.stats.hpregenperlevel}}</small>
                  <v-divider light></v-divider>
                  <small>ManaRegen Per lvl :</small> <small>+{{single.stats.mpregenperlevel}}</small>
                  <v-divider light></v-divider>
                  <small>Mana Per lvl :</small> <small>+{{single.stats.mpperlevel}}</small>
                </v-flex>
              </v-layout>
              <v-divider></v-divider>
              <v-layout row wrap>
                <v-flex xs3 md1 class="mt-1">
                  <!-- <ul> -->
                    <div class="mt-1">Attack</div>
                    <div class="mt-1">Defense</div>
                    <div class="mt-1">Magic</div>
                    <div class="mt-1">Difficulty</div>
                  <!-- </ul> -->
                </v-flex>
                <v-flex xs9 md3 class="mt-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="200" height="100" id="chart">
                    <g 
                    v-for="(infy, key, index) in single.info" :key="index" 
                    :transform="`translate(0, ${index * 25})`">
                    
                      <rect :width="withChart(infy)" height="20" :fill="colorChart(index)"></rect>
                      <text y="15" x="2">{{infy}}</text>
                    </g>
                  </svg>
                  <v-divider></v-divider>
                  
                </v-flex>
                <v-flex xs12 md7  class="text-xs-center px-3 mt-2">{{single.blurb}}</v-flex>
              </v-layout>
          </v-card-text>
    </div>
</template>
<script>
// import ItemsDialog from "./ChampStats";
import { mapGetters} from 'vuex';
import ApiUrl from '../config/ApiUrl'
export default {
  props: ['single'],
  components: {
      // 'item-stats' :ItemsDialog
  },
  data () {
    return {
        // count: 0,
        addonClick: '',
        asked: false,
        itemImage: ApiUrl.itemImage,
        image: ApiUrl.imagesUrl,
        lvl: 0,
        selected: '',
        inhud: [],
        dialog: false,
        styles: {
            'background-image': 'url(' + require('@/assets/hud-bg.jpg') + ')',
            'background-size': '95%',
            // 'width': '332px',
            'height': '58px'
        },
        Stats: {
                attackdamage: '',
                crit: '',
                attackspeed: '',
                attackrange: '',
                ap: '',
                cd: '',
                mp: '',
                mpregen: '',
                hp: '',
                hpregen: '',
                armor: '',
                spellblock: '',
                movespeed: '',
                lifesteal: ''
        }
    }
  },
  mounted () {
        this.showInfo()
        // this.openItems()
  },
  computed: {
    ...mapGetters(['items']),
    itemsInHud () {
      return this.$store.state.itemsInHud
    },
    // trans () {
    //   return this.count+= this.count
    // }
 },
 methods: {
    withChart (val) {
      return (val * 100) / 5
    },
    colorChart(val) {
      if (val == 0) {
        return 'red'
      }else if (val == 1) {
        return 'blue'
      } else if (val == 2){
        return 'purple'
      }else if (val == 3) {
        return 'pink'
      }
    },
     tags (take) {
            return this.$options.filters.parseXML(take);
    },
   open () {
     this.$emit('open', true)
   },
   openOnCall () {
     this.addonClick = 'item-stats'
   },
   addItem(ite) {
     this.$store.commit('ADD_ITEM', {name: ite.name, image: ite.image.full, desc: ite.description})
   },
   drop (i) {
    this.$store.commit('REMOVE_ITEM', i)
   },
   lvlup () {
     if (this.lvl < 17) {
        
        let dmg = this.single.stats.attackdamageperlevel
        let attspeed = this.Stats.attackspeed * this.single.stats.attackspeedperlevel / 100
        // let handred = parseFloat("0.0" + attspeed)
        let mana = this.single.stats.mpperlevel
        let manareg = this.single.stats.mpregenperlevel
        let armor = this.single.stats.armorperlevel
        let mr = this.single.stats.spellblockperlevel 
        let hp = this.single.stats.hpperlevel
        let hpreq = this.single.stats.hpregenperlevel
      
        this.Stats.attackdamage += dmg
        this.Stats.attackspeed +=  attspeed
        this.Stats.mp += mana
        this.Stats.mpregen += manareg
        this.Stats.armor += armor
        this.Stats.spellblock += mr
        this.Stats.hp += hp
        this.Stats.hpregen += hpreq
      this.lvl++
     }
   },
   lvldown () {
          if (this.lvl > 0) {
        let dmg = this.single.stats.attackdamageperlevel
        let attspeed = this.Stats.attackspeed * this.single.stats.attackspeedperlevel / 100 
        // let handred = parseFloat("0.0" + attspeed)
        let mana = this.single.stats.mpperlevel
        let manareg = this.single.stats.mpregenperlevel
        let armor = this.single.stats.armorperlevel
        let mr = this.single.stats.spellblockperlevel 
        let hp = this.single.stats.hpperlevel
        let hpreq = this.single.stats.hpregenperlevel
      
        this.Stats.attackdamage -= dmg
        this.Stats.attackspeed -= attspeed
        this.Stats.mp -= mana
        this.Stats.mpregen -= manareg
        this.Stats.armor -= armor
        this.Stats.spellblock -= mr
        this.Stats.hp -= hp
        this.Stats.hpregen -= hpreq
       this.lvl--
        }
   },
   showInfo () {
        this.Stats.attackdamage = this.single.stats.attackdamage
        this.Stats.crit = this.single.stats.crit
        this.Stats.attackspeed = this.single.stats.attackspeed
        this.Stats.attackrange = this.single.stats.attackrange
        this.Stats.ap = this.single.stats.ap
        this.Stats.cd = this.single.stats.cd
        this.Stats.mp = this.single.stats.mp
        this.Stats.mpregen = this.single.stats.mpregen
        this.Stats.hp = this.single.stats.hp
        this.Stats.hpregen = this.single.stats.hpregen
        this.Stats.armor = this.single.stats.armor
        this.Stats.spellblock = this.single.stats.spellblock
        this.Stats.movespeed = this.single.stats.movespeed
        this.Stats.lifesteal = this.single.stats.lifesteal
      }
 },
//  filters: {
//    rounded  (x) {
//      return (Number.isInteger(x)) ? x : parseFloat(x).toFixed(2)
//    },
//  }
}
</script>
<style scoped>
/* .items > tr > td {
  border: 3px solid rgb(143, 117, 107);
  border-collapse: collapse;
  
}
.items td {
  
  width: 55px;
  height: 55px;
  background: black;
}
.summoners td {
  /* width: 44px;
  height: 44px; */
  /* width: 30%;
  height: 30%; */
  /* background: black; */
/* }
.radioSmall, .chack {
  max-height: '2%';
  width: '1%';
  
}  */
</style>
