<template>
        <v-flex class="my-1">
            <v-btn flat small
              absolute
              right
              fab icon class="red accent-3" @click="Remove(index)">
                  <v-icon small class="fa fa-times"></v-icon>
            </v-btn>
        <v-expansion-panel>
        <v-expansion-panel-content style="background-color:#311B92;">
            <template>
            <div slot="header">
                <v-layout row wrap>
                    <v-flex xs12 md2>
                    <v-flex md12 xs2>
                        <v-img :src="image+champ.image"></v-img>
                        <span v-for="tag in champ.tags" :key="tag">{{tag}} </span>
                    </v-flex>
                    </v-flex>
                    <v-flex xs6 md2 offset-md1>
                    <small >Damage: {{Attack_Damage | rounded}}</small>
                    <v-divider light></v-divider>
                    <small >Critical: {{Critical_Strike_Chance | rounded | to100crit}}</small>
                    <v-divider light></v-divider>
                    <small >Attack Speed: {{Stats.attackspeed | rounded | to250attspeed}}</small>
                    <v-divider light></v-divider>
                    <small >Attack Range: {{Stats.attackrange | rounded}}</small>
                    </v-flex>
                    <v-flex xs6 md2>
                    <small >Ability Power: {{Stats.ap | rounded}}</small>
                    <v-divider light></v-divider>
                    <small >Cooldown: {{Stats.cd | rounded | to40cd}}</small>
                    <v-divider light></v-divider>
                    <small >Mana: {{Stats.mp | rounded}}</small>
                    <v-divider light></v-divider>
                    <small >Mana Regen: {{Stats.mpregen | rounded}}</small>
                    </v-flex>
                    <v-flex xs6 md2>
                    <small >Helth: {{Stats.hp | rounded}}</small>
                    <v-divider light></v-divider>
                    <small >Helth Regen: {{Stats.hpregen | rounded}}</small>
                    <v-divider light></v-divider>
                    <small >Armor: {{Stats.armor | rounded}}</small>
                    <v-divider light></v-divider>
                    <small >Magic Resist: {{Stats.spellblock | rounded}}</small>
                    <v-divider light></v-divider>
                    <small >Movement: {{Stats.movespeed | rounded}}</small>
                    </v-flex>
                    <v-flex xs6 md2>
                    <v-divider></v-divider>
                    <small>Damage Per lvl :</small> <small>+{{champ.stats.attackdamageperlevel}}</small>
                    <v-divider light></v-divider>
                    <small>AttackSpeed Per lvl :</small> <small>+{{champ.stats.attackspeedperlevel}}%</small>
                    <v-divider light></v-divider>
                        <!--CritPL: {{champ.stats.critperlevel}} -->
                    <small>Armor Per lvl :</small> <small>+{{champ.stats.armorperlevel}}</small>
                    <v-divider light></v-divider>
                    <small>MagicResist Per lvl :</small> <small>+{{champ.stats.spellblockperlevel}}</small>
                    <v-divider light></v-divider>
                    <small>Helth Per lvl :</small> <small>+{{champ.stats.hpperlevel}}</small>
                    <v-divider light></v-divider>
                    <small>HelthRegen Per lvl :</small> <small>+{{champ.stats.hpregenperlevel}}</small>
                    <v-divider light></v-divider>
                    <small>ManaRegen Per lvl :</small> <small>+{{champ.stats.mpregenperlevel}}</small>
                    <v-divider light></v-divider>
                    <small>Mana Per lvl :</small> <small>+{{champ.stats.mpperlevel}}</small>
                    </v-flex>
                </v-layout>
                        <!-- {{item.stats}} -->
            </div>
            
            </template>
            <v-card color="purple darken-4">
            <v-card-text>
                <v-layout row wrap>
                <v-flex>
                    <ItemCart :added="champ.itemSet" :name="champ.name" @removeItem="drop"></ItemCart>

                </v-flex>
                <v-flex xs12>
                    <ItemsStats @hereItem="addItem($event,champ.name)"></ItemsStats>
                </v-flex>
                </v-layout>
                
            </v-card-text>
            </v-card>
        </v-expansion-panel-content>
        
        </v-expansion-panel>
    </v-flex>
</template>
<script>
import ApiUrl from '../config/ApiUrl'
// import Champ from './Champ'
import ItemsStats from "./ChampStats";
import ItemCart from "./ItemCart"

export default {
    props: ['champ','index'],
    components: {
        ItemsStats,
        ItemCart
    },
    data () {
        return {
            items: [],
            image: ApiUrl.imagesUrl,
            itemImage: ApiUrl.itemImage,
            champAttSpeed: this.champ.stats.attackspeed,
            Stats: {
                attackdamage: 0,
                crit: 0,
                attackspeed: 0,
                attackrange: 0,
                ap: 0,
                cd: 0,
                mp: 0,
                mpregen: 0,
                hp: 0,
                hpregen: 0,
                armor: 0,
                spellblock: 0,
                movespeed: 0
        }
        }
    },
    created () {
        this.populate()
    },
    mounted () {
        
    },
    updated () {
    },
    computed: {
        inCart () {
          return  this.$store.getters.ChampsInCart
        },
        Attack_Damage: {
        get: function() {return this.Stats.attackdamage},
        set: function(val) {this.Stats.attackdamage = val}
        },
        Attack_Speed: {
        get: function() {return this.Stats.attackspeed},
        set: function(val) {
            this.Stats.attackspeed = val
        }
        },
        Ability_Power: {
        get: function() {return this.Stats.ap},
        set: function(val) {this.Stats.ap = val}
        },
        Health: {
        get: function() {return this.Stats.hp},
        set: function(val) {this.Stats.hp = val}
        },
        Mana: {
        get: function() {return this.Stats.mp},
        set: function(val) {this.Stats.mp = val}
        },
        Base_Mana_Regen: {
        get: function() {return this.Stats.mpregen},
        set: function(val) {this.Stats.mpregen = val}
        },
        Cooldown_Reduction: {
        get: function() {return this.Stats.cd},
        set: function(val) {
            this.Stats.cd = val
        }
        },
        Base_Health_Regen: {
        get: function() {return this.Stats.hpregen},
        set: function(val) {this.Stats.hpregen = val}
        },
        Magic_Resist: {
        get: function() {return this.Stats.spellblock},
        set: function(val) {this.Stats.spellblock = val}
        },
        Armor: {
        get: function() {return this.Stats.armor},
        set: function(val) {this.Stats.armor = val}
        },
        Critical_Strike_Chance: {
        get: function() {return this.Stats.crit},
        set: function(val) {
            this.Stats.crit = val
        }
        },
        Movement_Speed: {
        get: function() {return this.Stats.movespeed},
        set: function(val) {this.Stats.movespeed = val}
        },
        Attack_Range: {
        get: function() {return this.Stats.attackrange},
        set: function(val) {return this.Stats.attackrange = val}
        }
    },
    methods: {
        Remove (cha) {
            // this.inCart.splice(cha, 1)
            // console.log(this.inCart);
            this.$store.commit('REMOVE_CHAMP', cha)
        },
        // inCart () {
        //   return  this.$store.getters.ChampsInCart
        // },
        addItem (item,name) {
            if (this.items.length < 6) {
                this.$store.dispatch('AddItem', {name: name, item: item})
                this.addStats(item.stats)
            }
            
        },
        drop (champ,i,item) {
                this.$store.commit('REMOVE_ITEM', {name: champ, item: i})
                this.removeStats(i, item)
        
        },
        addTo (test, value) {
            if(test == test){
            if (test == "Attack_Speed") {
                 this[test] += this.champAttSpeed * (parseInt(value) / 100)
            }else if (test == "Critical_Strike_Chance" || test == "Cooldown_Reduction") {
               this[test] += parseInt(value)
            }else {
                (value.toString().indexOf('%') != -1) ? this[test] += this[test] * (parseInt(value) / 100) : this[test] += parseInt(value)
            }
            // console.log(test,value);
            }
        },
        subTo (test, value) {
            if(test == test){
            if (test == "Attack_Speed") {
                this[test] -= this.champAttSpeed * (parseInt(value) / 100)
            }else if (test == "Critical_Strike_Chance" || test == "Cooldown_Reduction") {  
                this[test] -= parseInt(value)
            }else {
                (value.toString().indexOf('%') != -1) ? this[test] -= this[test] * (parseInt(value) / 100) : this[test] -= parseInt(value)
            }
            // console.log(test,value);
            }
        },
        addStats (pass) {
            pass.stats.forEach(x => {
                this.addTo(x.key,x.value)
            })
        },
        removeStats (index, remove) {
            remove.stats.forEach(x => {
                this.subTo(x.key, x.value)
            })
        },
        populate () {
            this.Stats.attackdamage = this.champ.stats.attackdamage
            this.Stats.crit = this.champ.stats.crit
            this.Stats.attackspeed = this.champ.stats.attackspeed
            this.Stats.attackrange = this.champ.stats.attackrange
            this.Stats.mp = this.champ.stats.mp
            this.Stats.mpregen = this.champ.stats.mpregen
            this.Stats.hp = this.champ.stats.hp
            this.Stats.hpregen = this.champ.stats.hpregen
            this.Stats.armor = this.champ.stats.armor
            this.Stats.spellblock = this.champ.stats.spellblock
            this.Stats.movespeed = this.champ.stats.movespeed
            this.items = this.champ.itemSet   
        }

    },
    filters: {
        to40cd: function (val) {
            if (val > 40) {
                return 40
            }else {
                return val
            }
        },
        to250attspeed: function (val) {
            if (val >= 2.50) {
                return 2.50
            }else {
                return val
            }
        },
        to100crit: function (val) {
            if (val > 100) {
                return 100
            }else {
                return val
            }
        }
    }
    
}
</script>
<style scoped>
  td {
    background-color: black;
    width:50px;
    height: 50px;
    border: solid yellow 1px;
  }
</style>