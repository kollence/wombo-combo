<template>
        <v-flex class="my-1">
            <v-btn flat small
              absolute
              right
              fab icon class="red accent-3" @click="Remove(index)">
                  <v-icon small class="fa fa-times"></v-icon>
            </v-btn>
        <v-expansion-panel>
        <v-expansion-panel-content style="background-color:#1A237E;">
            
            <template>
            <div slot="header">
                <h3 style="position: absolute; top: 0; right: 0; margin: 6px 10px 0 0;">Level: {{LVL_UP}}</h3>
                <v-layout row wrap>
                    
                    <v-flex xs12 md2>
                        
                    <v-flex md12 xs2 class="mr-2">
                        <v-img :src="image+hero.image"><v-flex class="text-xs-center"></v-flex></v-img>
                        <span v-for="tag in hero.tags" :key="tag">{{tag}} </span>
                    </v-flex>
                    
                    </v-flex>
                    <v-flex xs6 md2>
                        <SvgChart :val="Attack_Damage | rounded" :name="'Damage'" :colored="'#DD2C00'"></SvgChart>

                        <SvgChart :val="Critical_Strike_Chance | rounded | to100crit" :name="'Critical'" :colored="'#FF7043'"></SvgChart>

                        <SvgChart :val="Attack_Speed | rounded | to250attspeed" :name="'Attack Speed'" :colored="'#b3d9ff'"></SvgChart>

                        <SvgChart :val="Attack_Range | rounded" :name="'Attack Range'" :colored="'grey'"></SvgChart>

                        <SvgChart :val="Life_Steal | rounded" :name="'Life Steal'" :colored="'grey'"></SvgChart>
                    </v-flex>
                    
                    
                    <v-flex xs6 md2 offset-md1>
                        <SvgChart :val="Ability_Power | rounded" :name="'Ability Power'" :colored="'green'"></SvgChart>

                        <SvgChart :val="Cooldown_Reduction | rounded | to40cd" :name="'Cooldown'" :colored="'white'"></SvgChart>

                        <SvgChart :val="Mana | rounded" :name="'Mana'" :colored="'blue'"></SvgChart>

                        <SvgChart :val="Base_Mana_Regen | rounded" :name="'Mana Regen'" :colored="'lightblue'"></SvgChart>
                    
                    </v-flex>
                    <v-flex xs6 md2 offset-md1>
                        <SvgChart :val="Health | rounded" :name="'Health'" :colored="'#ace600'"></SvgChart>

                        <SvgChart :val="Base_Health_Regen | rounded" :name="'Health Regen'" :colored="'#ecffb3'"></SvgChart>

                        <SvgChart :val="Armor | rounded" :name="'Armor'" :colored="'#ffff00'"></SvgChart>

                        <SvgChart :val="Magic_Resist | rounded" :name="'Magic Resist'" :colored="'#cc00cc'"></SvgChart>

                        <SvgChart :val="Movement_Speed | rounded" :name="'Movement'" :colored="'#ffa64d'"></SvgChart>


                    </v-flex>
                    
                </v-layout>
                        <!-- {{item.stats}} -->
            </div>
            
            </template>
            <v-card color="purple darken-4">
            <v-card-text>
                <v-layout row wrap>
                <v-flex xs12 md7>
                    <v-layout row wrap>
                        <v-flex xs12 md6>
                            <ItemCart :added="hero.itemSet" :name="hero.name" @removeItem="drop"></ItemCart>
                            
                        </v-flex>
                        <v-flex xs12 md6>
                            <v-btn color="pink darken-1" small v-if="swap" :loading="loading"  @click="openItemsBtn()">Load Items</v-btn>
                            <v-btn color="pink darken-1" small v-else @click ="closeItemsBtn()">Close Items</v-btn>
                    
                        </v-flex>
                    </v-layout>
                </v-flex>
                <!-- <v-flex xs12 md1>
                    
                    
                </v-flex> -->
                <v-flex xs12 md5>
                    <v-layout row wrap>
                        <v-flex xs2 offset-md2>
                            <v-btn flat icon color="blue lighten-2" @click="lvlup()">
                            <v-icon class="ma-0 pa-0">fa-plus</v-icon>
                            </v-btn>

                            <v-btn flat icon color="red lighten-2" @click="lvldown()">
                            <v-icon class="ma-0 pa-0">fa-minus</v-icon>
                            </v-btn>
                        </v-flex>
                        <v-flex xs8>
                        <table class="tb-perlvl">
                        <tr>
                            <td><small>Damage Per lvl +</small> <small style="color: #76FF03;">{{hero.stats.attackdamageperlevel}}</small></td>
                            <td><small>Helth Per lvl +</small> <small style="color: #76FF03;">{{hero.stats.hpperlevel}}</small></td>
                        </tr>
                        <tr>
                            <td><small>AttackSpeed Per lvl +</small> <small style="color: #76FF03;">{{hero.stats.attackspeedperlevel}}%</small></td>
                            <td><small>HelthRegen Per lvl +</small> <small style="color: #76FF03;">{{hero.stats.hpregenperlevel}}</small></td>
                        </tr>
                        <tr>
                            <td><small>Armor Per lvl +</small> <small style="color: #76FF03;">{{hero.stats.armorperlevel}}</small></td>
                            <td><small>Mana Per lvl +</small> <small style="color: #76FF03;">{{hero.stats.mpperlevel}}</small></td>
                        </tr>
                        <tr>
                            <td><small>MagicResist Per lvl +</small> <small style="color: #76FF03;">{{hero.stats.spellblockperlevel}}</small></td>
                            <td><small>ManaRegen Per lvl +</small> <small style="color: #76FF03;">{{hero.stats.mpregenperlevel}}</small></td>
                        </tr>
                        </table>
                        </v-flex>
                    </v-layout>
                    
                </v-flex>
                <v-flex xs12>
                    <component :is="component"  @hereItem="addItem($event,hero.name)"></component>
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
import SvgChart from './SvgChart'
import ItemsStats from "./ChampStats";
import ItemCart from "./ItemCart"

export default {
    props: ['hero','index'],
    components: {
        'item-stats': ItemsStats,
        ItemCart,
        SvgChart
    },
    data () {
        return {
            lvl: 1,
            loading: false,
            swap: true,
            component: '',
            items: [],
            image: ApiUrl.imagesUrl,
            itemImage: ApiUrl.itemImage,
            attspeedprecent: 0,
            give: {
                LVL_UP: 0,
                Attack_Damage: 0,
                Critical_Strike_Chance: 0,
                Attack_Speed: 0,
                Attack_Range: 0,
                Ability_Power: 0,
                Cooldown_Reduction: 0,
                Mana: 0,
                Base_Mana_Regen: 0,
                Health: 0,
                Base_Health_Regen: 0,
                Armor:0,
                Magic_Resist: 0,
                Movement_Speed: 0,
                Life_Steal: 0
            }
        }
    },
    created() {
        this.give.LVL_UP = this.hero.lvl
        this.give.Attack_Damage = this.hero.stats.attackdamage
        this.give.Critical_Strike_Chance = this.hero.stats.crit
        this.give.Attack_Speed = this.hero.stats.attackspeed
        this.give.Attack_Range = this.hero.stats.attackrange
        this.give.Ability_Power = this.hero.stats.ap
        this.give.Cooldown_Reduction = this.hero.stats.cd
        this.give.Mana = this.hero.stats.mp
        this.give.Base_Mana_Regen = this.hero.stats.mpregen
        this.give.Health = this.hero.stats.hp
        this.give.Base_Health_Regen = this.hero.stats.hpregen
        this.give.Armor = this.hero.stats.armor
        this.give.Magic_Resist = this.hero.stats.spellblock
        this.give.Movement_Speed = this.hero.stats.movespeed
        this.give.Life_Steal = this.hero.stats.lifesteal
    },
    computed: {
        inCart () {
          return  this.$store.getters.ChampsInCart
        },
        champItems () {
            return this.hero.itemSet
        },
        HERO_ITEMS: {
            get: function () {return this.hero.itemSet},
            set: function (val) {this.hero.itemSet.push(val)}
        },
        LVL_UP: {
            get: function() { return this.give.LVL_UP},
            set: function(val) {this.give.LVL_UP = val}
        },
        Attack_Damage: {
        get: function() {return this.give.Attack_Damage},
        set: function(val) {this.give.Attack_Damage = val}
        },
        Attack_Speed: {
        get: function() {return this.give.Attack_Speed},
        set: function(val) { this.give.Attack_Speed = val}
        },
        Ability_Power: {
        get: function() {return this.give.Ability_Power},
        set: function(val) {this.give.Ability_Power = val}
        },
        Health: {
        get: function() {return this.give.Health},
        set: function(val) {this.give.Health = val}
        },
        Mana: {
        get: function() {return this.give.Mana},
        set: function(val) {this.give.Mana = val}
        },
        Base_Mana_Regen: {
        get: function() {return this.give.Base_Mana_Regen},
        set: function(val) {this.give.Base_Mana_Regen = val}
        },
        Cooldown_Reduction: {
        get: function() {return this.give.Cooldown_Reduction},
        set: function(val) {this.give.Cooldown_Reduction = val}
        },
        Base_Health_Regen: {
        get: function() {return this.give.Base_Health_Regen},
        set: function(val) {this.give.Base_Health_Regen = val}
        },
        Magic_Resist: {
        get: function() {return this.give.Magic_Resist},
        set: function(val) {this.give.Magic_Resist= val}
        },
        Armor: {
        get: function() {return this.give.Armor},
        set: function(val) {this.give.Armor = val}
        },
        Critical_Strike_Chance: {
        get: function() {return this.give.Critical_Strike_Chance},
        set: function(val) {this.give.Critical_Strike_Chance = val}
        },
        Movement_Speed: {
        get: function() {return this.give.Movement_Speed},
        set: function(val) {this.give.Movement_Speed = val}
        },
        Attack_Range: {
        get: function() {return this.give.Attack_Range},
        set: function(val) {return this.give.Attack_Range = val}
        },
        Life_Steal: {
        get: function() {return this.give.Life_Steal},
        set: function(val) {return this.give.Life_Steal = val}
        }

    },
    methods: {
        
        openItemsBtn () {
            this.component = 'item-stats'
            this.swap = false
            
        },
        closeItemsBtn () {
            this.component = ''
            this.swap = true
            // this.loading = false
        },
        Remove (cha) {
            this.$store.commit('REMOVE_CHAMP', cha)
            Object.assign(this.$data, this.$options.data());
        },
        addItem (item,name) {
            if (this.hero.itemSet.length < 6) {
                this.$store.dispatch('AddItem', {name: name, item: item})
                this.addStats(item.stats)
                // console.log(this.hero.itemSet);
                
            }
            
        },
        drop (hero,i,item) {
                this.$store.dispatch('RemoveItem', {name: hero, item: i})
                this.removeStats(i, item)
                // console.log(this.heroItems);

        },
        addTo (test, value) {
            if(test == test){
                (value.toString().indexOf('%') != -1) ? this[test] += this.give[test] * (parseInt(value) / 100) : this[test] += parseInt(value)
                // if (test == "Attack_Speed") {
                //     this[test] += this.take[test] * (parseInt(value) / 100)
                // }else if (test == "Critical_Strike_Chance" || test == "Cooldown_Reduction" || test == "Life_Steal") {
                // this[test] += parseInt(value)
                // }else if (test == "Base_Health_Regen" || "Base_Mana_Regen") {
                //     this[test] += this.take[test] * (parseInt(value) / 100)
                // }else {
                //     (value.toString().indexOf('%') != -1) ? this[test] += this.take[test] * (parseInt(value) / 100) : this[test] += parseInt(value)
                // }
            }
        },
        subTo (test, value) {
            if(test == test){
                (value.toString().indexOf('%') != -1) ? this[test] -= this.give[test] * (parseInt(value) / 100) : this[test] -= parseInt(value)
                // if (test == "Attack_Speed") {

                //     this[test] -= this.take[test] * (parseInt(value) / 100)

                // }else if (test == "Critical_Strike_Chance" || test == "Cooldown_Reduction" || test == "Life_Steal") { 

                //     this[test] -= parseInt(value)
                    
                // }else if (test == "Base_Health_Regen" || "Base_Mana_Regen") {
                //     this[test] -= this.take[test] * (parseInt(value) / 100)
                // }else {
                //     (value.toString().indexOf('%') != -1) ? this[test] -= this.take[test] * (parseInt(value) / 100) : this[test] -= parseInt(value)
                // }
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
        lvlup () {
            if (this.LVL_UP < 18) {
                // this.lvl++
                this.LVL_UP += this.lvl
                // const perlvl = (this.lvl < 8) ? Math.floor(this.hero.stats.attackspeed) : this.hero.stats.attackspeed
                this.Attack_Damage += this.hero.stats.attackdamageperlevel
                this.Attack_Speed += this.attspeedprecent * (this.hero.stats.attackdamageperlevel / 100)
                this.Armor += this.hero.stats.armorperlevel
                this.Magic_Resist += this.hero.stats.spellblockperlevel
                this.Health += this.hero.stats.hpperlevel
                this.Base_Health_Regen += this.hero.stats.hpregenperlevel
                this.Mana += this.hero.stats.mpperlevel
                this.Base_Mana_Regen += this.hero.stats.mpregenperlevel
            } 
        },
        lvldown () {
            if (this.LVL_UP > 1) {
                // this.lvl--
            this.LVL_UP -= this.lvl
            this.Attack_Damage -= this.hero.stats.attackdamageperlevel
            this.Attack_Speed -= this.attspeedprecent * (this.hero.stats.attackdamageperlevel / 100)
            this.Armor -= this.hero.stats.armorperlevel
            this.Magic_Resist -= this.hero.stats.spellblockperlevel
            this.Health -= this.hero.stats.hpperlevel
            this.Base_Health_Regen -= this.hero.stats.hpregenperlevel
            this.Mana -= this.hero.stats.mpperlevel
            this.Base_Mana_Regen -= this.hero.stats.mpregenperlevel
            }
            
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
.tb-perlvl td{
  padding: 0 5px 0 5px;
}
</style>