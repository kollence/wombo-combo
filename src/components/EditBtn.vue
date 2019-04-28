<template>
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-btn slot="activator" @click="addThem" color="amber lighten-1" flat small>Edit</v-btn>
      <v-card  style="background-color: #4A148C">
        <v-toolbar color="purple darken-3">
          
          <!-- <v-toolbar-title> -->
              <h2 style="color: #FDD835">Edit Post</h2>
          <!-- </v-toolbar-title> -->
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn icon dark @click="cancel">
            <v-icon color="red">fa-times</v-icon>
          </v-btn>
          </v-toolbar-items>
        </v-toolbar>
    <v-content class="pa-2">
                <v-layout row wrap>
            <v-flex xs12 md6 >
                <v-flex xs12 v-if="!itemsInCart.length > 0" class="text-md-center">
                           <h2 class="text-md-center orange--text justfont">You Need To Pick Five Champions</h2>
                </v-flex>
            <v-layout row wrap>
                <v-flex  xs6 md2 v-for="(champ, i) in itemsInCart" :key="champ.name">
                
                <BtnRole @clicked="info" :name="champ.name"></BtnRole>
                <v-flex xs11 offset-xs1>
                    <Champ :single="champ" :index="i"></Champ>
                </v-flex>
                
                
                <v-flex>
                <v-radio-group class="py-0 my-0 pl-3 ml-3" v-model="form.captain" row>
                    <v-radio :value="champ.name" color="green"></v-radio>
                </v-radio-group> 
                </v-flex>
                
                </v-flex>
                <v-flex class="text-xs-center pa-5" style="position: relative;" xs2 md2 v-show="itemsInCart.length < 5">
                    <PickChamp></PickChamp> 
                </v-flex>
            </v-layout>
            
            
            
            </v-flex>
              
            
            <v-flex xs12 md6>
                <v-layout row>
                    <v-flex xs12 md4 class="mt-2 text-xs-center">
                        <small>CAPTAIN:</small>
                        <h4>{{form.captain}}</h4>
                    </v-flex>
                    <v-flex xs12 md4 class="mt-2 text-xs-center">
                        <small>TIME TO ACT:</small>
                        <h4 v-if="form.timetoact.length == 0">Born Ready</h4>
                        <h4 v-else>{{form.timetoact.toString()}}</h4>
                    </v-flex>
                    <v-flex xs12 md4 class="mt-2 text-xs-center">
                        <small>EXPECTED LEVEL:</small>
                        <!-- <h4 v-if="form.lvl == 1">Undefined</h4> -->
                        <h2>{{form.lvl}}</h2>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
        <v-layout row wrap>
            <v-flex xs12 sm6 class="pa-1">
                <!-- <v-layout> -->
                    <v-flex xs12 md12 class="pa-1" >
                        <v-text-field
                            v-model="comp"
                            :counter="70"
                            :rules="rulesTitle"
                            label="Headline"
                            box
                            
                        ></v-text-field>
                    </v-flex>
                    <v-flex class="pa-1" xs12 md12>
                        <v-textarea
                            rows="7"
                            :counter="1300"
                            box
                            :rules="rulesText"
                            name="input-8-4"
                            label="Description"
                            v-model="form.description"
                        ></v-textarea>
                    </v-flex>
                <!-- </v-layout> -->
            </v-flex>
            <v-flex xs12 md6>
                <v-layout row wrap>
                
                <v-flex class="mx-1 pa-1" xs12 md7>
                    <v-select
                    :items="timeofgame"
                    v-model="form.timetoact"
                    label="Time To Act"
                    multiple
                    chips
                    hint="At what point of time in game to expect a gathering"
                    persistent-hint
                    ></v-select>
                </v-flex>
                <v-flex xs6 md1 class="ma-1 pa-2">
                    <small>Leveling</small>
                    <v-btn v-if="form.lvl < 18" flat small icon class="orange darken-2" @click="levelingUp()">
                                <v-icon small class="fa fa-plus"></v-icon>
                    </v-btn>
                    <v-btn v-else flat small icon class="orange darken-2">
                                <v-icon small class="fa fa-plus"></v-icon>
                    </v-btn>
                            
                    <v-btn v-if="form.lvl > 1" flat small icon class="orange darken-4" @click="levelingDown()">
                                <v-icon small class="fa fa-minus" ></v-icon>
                    </v-btn>
                    <v-btn v-else flat small icon class="orange darken-4">
                                <v-icon small class="fa fa-minus" ></v-icon>
                    </v-btn>
                </v-flex>
                <v-flex xs6 md3 class="ml-2 pa-3">
                    <v-checkbox
                    :label="form.invade ? 'Invade: yes': 'Invade: no'"
                    v-model="form.invade"
                    ></v-checkbox>
                    
                </v-flex>
                </v-layout>
                <v-layout row wrap>
                    <!-- <v-flex xs12> -->
                        <v-flex xs12>
                            <h3 class="justfont grey--text">Stats of Team:</h3>
                            <v-divider></v-divider>
                        </v-flex>
                        
                        <v-flex xs6>
                            <v-flex xs12>
                                <div class="justfont">Physical Damage : {{form.damage | rounded}}</div>
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="180" height="15" class="chart">
                                        <g>
                                         <rect :width="form.damage / 7" height="13" fill="#FF3D00"></rect>
                                        </g>
                                    </svg>
                                </div>
                                <div class="justfont">Ability Power : {{form.ability}}</div>
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="180" height="15" class="chart">
                                        <g>
                                         <rect :width="form.ability / 8" height="13" fill="#76FF03"></rect>
                                        </g>
                                    </svg>
                                </div>
                            </v-flex>
                        </v-flex>
                        <v-flex xs6>
                            <v-flex xs12>
                                <div class="justfont">Health : {{form.health  | rounded}}</div>
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="180" height="15" class="chart">
                                            <g>
                                            <rect :width="form.health / 50" height="13" fill="green"></rect>
                                            </g>
                                        </svg>
                                    </div>
                                <div class="justfont">Armor : {{form.armor | rounded}}</div>
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="180" height="15" class="chart">
                                        <g>
                                         <rect :width="form.armor / 4" height="13" fill="yellow"></rect>
                                        </g>
                                    </svg>
                                </div>
                                <div class="justfont">Magic Resist : {{form.magicres | rounded}}</div>
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="180" height="15" class="chart">
                                        <g>
                                         <rect :width="form.magicres / 4" height="13" fill="#AB47BC"></rect>
                                        </g>
                                    </svg>
                                </div>
                            </v-flex>
                        </v-flex>
                    <!-- </v-flex> -->
                </v-layout>
            </v-flex>             
        </v-layout>


        <!-- <v-layout row>
            
               <v-flex xs12 md6 v-if="!itemsInCart.length > 0" class="text-md-center">
                           <h1 class="lime--text">Pick Five Champions</h1>
                <v-btn color="info" big to="/champions">champions</v-btn>
            </v-flex>
            <v-flex d-flex xs12 md6 v-else >
                <v-flex xs2 md2 v-for="(champ, i) in itemsInCart" :key="i"  class="mx-1">
            <BtnRole @clicked="info" :name="champ.name" :see="lines[i].line"></BtnRole>
            <Champ :single="champ" :index="i"></Champ>
            <v-flex>
            <v-radio-group class="py-0 my-0 pl-3 ml-3" v-model="form.captain" row>
                <v-radio :value="champ.name" color="green"></v-radio>
              </v-radio-group> 
            </v-flex>
               
            </v-flex>
            <v-flex class="text-xs-center mt-4  pa-1" xs2 v-if="itemsInCart.length < 5">
                   <PickChamp></PickChamp> 
            </v-flex>
            </v-flex>
              
            
            <v-flex d-flex xs12 md6>
                <v-layout row>
                    <v-flex xs12 md4 class="ma-1 py-1 pl-3">
                        <small>CAPTAIN:</small>
                        <h4>{{form.captain}}</h4>
                    </v-flex>
                    <v-flex xs12 md4 class="mt-2">
                        <small>Time To Act:</small>
                        <h4>Born Ready</h4>
                        <h4>{{form.timetoact.toString()}}</h4>
                    </v-flex>
                    <v-flex xs12 md4 class="mt-2">
                        <small>What Level:</small>
                        <h2>{{form.lvl}}</h2>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout> -->
        <!-- <v-layout row wrap>
            <v-flex xs12 sm6 class="pa-1">
                    <v-flex xs12 md12 class="pa-1" >
                        <v-text-field
                            label="Headline"
                            box
                            v-model="comp"
                        ></v-text-field>
                    </v-flex>
                    <v-flex class="pa-1" xs12 md12>
                        <v-textarea
                            box
                            name="input-8-4"
                            label="Description"
                            v-model="form.description"
                        ></v-textarea>
                    </v-flex>
            </v-flex>
            <v-flex xs12 md6>
                <v-layout>
                
                <v-flex class="mx-1 pa-1" xs12 md7>
                    <v-select
                    :items="timeofgame"
                    v-model="form.timetoact"
                    label="Time To Act"
                    multiple
                    chips
                    hint="At what point of time to expect a gathering"
                    persistent-hint
                    ></v-select>
                </v-flex>
                <v-flex xs6 md2 class="ma-1 pa-2">
                    <small>Leveling</small>
                    <div>
                       <v-btn v-if="form.lvl < 18" flat small icon class="orange darken-2" @click="form.lvl++">
                                <v-icon small class="fa fa-plus"></v-icon>
                            </v-btn>
                            
                            <v-btn v-if="form.lvl > 1" @click="form.lvl--" flat small icon class="orange darken-4">
                                <v-icon small class="fa fa-minus" ></v-icon>
                            </v-btn>  
                    </div>
                   
                </v-flex>
                <v-flex xs6 md3>
                    <v-checkbox
                    :label="form.invade ? 'Invade: yes': 'Invade: no'"
                    v-model="form.invade"
                    ></v-checkbox>
                    
                </v-flex>
                </v-layout>
                <v-layout>
                    <v-flex class="mt-3 pa-2">Stats of Team:</v-flex>
                </v-layout>
            </v-flex>             
        </v-layout> -->
        <v-divider></v-divider>
        <v-layout row>
            <v-flex xs12 class="text-xs-center text-lg-right">
                <v-btn large flat left color="primary" @click="edit" :disabled="itemsInCart.length < 5">Save</v-btn>
                <v-btn large flat right color="orange" @click="cancel">cancel</v-btn>
            </v-flex>
        </v-layout>

                   

        
    </v-content>
      </v-card>
    </v-dialog>
</template>

<script>
import PickChamp from '../components/ChampPickerBtn'
import Champ from '../components/ChampInCart'
import BtnRole from '../components/BtnRole'
export default {
    components: {
        Champ,
        BtnRole,
        PickChamp
    },
    props: ['post'],
    data () {
      return {
        button: 'Evry',
        dialog: false,
        notifications: false,
        sound: true,
        widgets: false,
        butRole: '',
            form: {
                damage: this.post.stats.damage,
                ability: this.post.stats.ability,
                health: this.post.stats.health,
                magicres: this.post.stats.magicres,
                armor: this.post.stats.armor,
                id: this.post.id,
                heros: this.post.combo,
                title: this.post.title,
                description: this.post.description,
                timetoact: this.post.timeforaction[0].timeofaction,
                lvl: this.post.timeforaction[0].lvl,
                invade: this.post.timeforaction[0].invade,
                captain: this.post.captain,
            },
            lines: this.post.combo,
            lvl: 1,
            captain: 'captain',
            PickedCaptain: false,
            
            invade: false,
            e7: [],
            timeofgame: ['early', 'middle','late'],
            rulesTitle: [
                v => !!v || 'Enter Title For Your Post',
                v => (v && v.length <= 70) || 'Too Long Title'
            ],
            rulesText: [
                v => !!v || 'You need to explain your wombo combo',
                v => (v && v.length <= 1300) || 'Dont write a book'
            ]
        }
    },
    created () {
        this.addTeamStats(this.itemsInCart)
    },
    watch: {
        'itemsInCart': {
            handler: function(newValue) {
                this.addTeamStats(newValue)

            },
            deep: true
        }
    },
    computed: {
        itemsInCart () {
             return  this.$store.getters.ChampsInCart
        },
        comp: {
            get: function () {
                return this.form.title
            },
            set: function (params) {
                let upp = params.toUpperCase()
                this.form.title = upp
            }
        }
    },
    methods: {
        addTeamStats (val) {
            let champItems = []
            let dmg = []
            let ap = []
            let hp = []
            let mr = []
            let ar = []
            let apItems = []
            let adItems = []
            let hpItems = []
            let mrItems = []
            let arItems = []
            // let preLvl = []
            val.forEach(x => {
                dmg.push(x.stats.attackdamage)
                ap.push(x.stats.ap)
                hp.push(x.stats.hp)
                mr.push(x.stats.spellblock)
                ar.push(x.stats.armor)
                    let items = x.itemSet 
                    if( items.length > 0) {
                        items.forEach(item => {
                            let itempool = item.stats.stats
                            champItems.push(itempool)
                        })
                    }
                const adperlvl = x.stats.attackdamageperlevel
                const hpperlvl = x.stats.hpperlevel
                const mrperlvl = x.stats.spellblockperlevel
                const arperlvl = x.stats.armorperlevel    
                if(x.lvl > 1){
                    dmg.push(adperlvl * x.lvl - adperlvl)
                    hp.push(hpperlvl * x.lvl - hpperlvl)
                    mr.push(mrperlvl * x.lvl - mrperlvl)
                    ar.push(arperlvl * x.lvl - arperlvl )
                }       
                        // }
                    // }   
            })
            
            if(champItems != undefined) {
                champItems.forEach(g => {
                g.forEach(y => {
                    if(y.Ability_Power != undefined) apItems.push(parseInt(y.Ability_Power))
                    if(y.Attack_Damage != undefined) adItems.push(parseInt(y.Attack_Damage))
                    if(y.Health != undefined) hpItems.push(parseInt(y.Health))
                    if(y.Magic_Resist != undefined) mrItems.push(parseInt(y.Magic_Resist))
                    if(y.Armor != undefined) arItems.push(parseInt(y.Armor))
                   
                })

            })
            }
            let adWithItem = dmg.concat(adItems)
            let apWithItem = ap.concat(apItems)
            let hpWithItem = hp.concat(hpItems)
            let mrWithItem = mr.concat(mrItems)
            let arWithItem = ar.concat(arItems)
            this.form.ability = (apWithItem.reduce((a, b) => a + b, 0)) 
            this.form.damage = (adWithItem.reduce((a, b) => a + b, 0))
            this.form.health = (hpWithItem.reduce((a, b) => a + b, 0)) 
            this.form.armor = (arWithItem.reduce((a, b) => a + b, 0))
            this.form.magicres = (mrWithItem.reduce((a, b) => a + b, 0)) 
        },
        levelingUp () {
            this.form.lvl ++
        },
        levelingDown () {
            this.form.lvl --
        },

        info (val) {
            let found = this.itemsInCart.find(el => {
                return val.name == el.name
            })
            if(found.name == val.name) {
                found.line = val.line
            }  
        },
        addThem () {
            this.form.heros.forEach(champ => {
           this.$store.dispatch('AddToCart', champ) 
        })
        },
        edit () {
            let damage = (this.form.damage != undefined) ? this.form.damage : 0
            let armor = (this.form.armor != undefined) ? this.form.armor : 0
            let health = (this.form.health != undefined) ? this.form.health : 0
            let magicres = (this.form.magicres != undefined) ? this.form.magicres : 0
            let ability = (this.form.ability != undefined) ? this.form.ability : 0
            if (this.form.title.trim() === '' || this.form.description.trim() === '') {
                 return
             }
             if(this.itemsInCart.length < 5) {
                 return
             }
             let valid = { 
                id: this.form.id,
                combo: this.itemsInCart,
                title: this.form.title,
                description: this.form.description,
                timeforaction:[ {invade: this.form.invade, lvl: this.form.lvl, timeofaction: this.form.timetoact}],
                stats: [{damage: damage, ability: ability, health: health, magicres: magicres, armor: armor}],
                captain: this.form.captain
             }

             this.$store.dispatch('EditPost', valid)

                this.dialog = false
            this.$store.commit('REMOVE_ALL_CHAMPS')
            
        },
        cancel () {
            this.dialog = false
            this.$store.commit('REMOVE_ALL_CHAMPS')
        }
    }
}
</script>