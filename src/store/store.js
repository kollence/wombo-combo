import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase/app'
import '@firebase/firestore'
import db from '../config/FirebaseInit'
import ApiUrl from '../config/ApiUrl'

// import { auth } from '../config/FirebaseInit'
// import { QuerySnapshot } from '@firebase/firestore-types';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    posts: [],
    profilePosts: [],
    champions: [],
    items: [],
    itemsInHud: [],
    lines: [
      { line: 'Evry'},
      { line: 'Top' },
      { line: 'Jungler' },
      { line: 'Mid' },
      { line: 'Adc' },
      { line: 'Supp' }
    ],
    itemStats: [],
    champsInCart: [],
    XMLitemdesc: [],
    loading: false,
    user: null,
    error: null,
  },
  mutations: {
    SET_POSTS (state, payload) {
      state.posts = payload
    },
    EDIT_POST (state, payload) {
      // state.posts.push(payload)
      const edited = state.posts.find(post => {
        return payload.id === post.id
      })
      // console.log(edited);
      if (payload.combo) {
        edited.combo = payload.combo
      }
      if (payload.title) {
        edited.title = payload.title
      }
      if (payload.description) {
        edited.description = payload.description
      }
      if (payload.captain) {
        edited.captain = payload.captain
      }
      if (payload.stats) {
        edited.stats = payload.stats
      }
      if (payload.timeforaction) {
        edited.timeforaction = payload.timeforaction
      }
      if (payload.createdAt) {
        edited.createdAt = payload.createdaAt
      }
      if (payload.creatorId) {
        edited.creatorId = payload.creatorId
      }
      // state.posts.unshift(edited)
      
    },
    ADD_POST (state, payload) {
      state.posts.unshift(payload)
    },
    DELETE_POST(state, payload) {
      const inx = state.posts.findIndex(post => post.id == payload)
      state.posts.splice(inx, 1)
     
    },
    SET_CHAMPIONS (state, payload) {
      state.champions = payload
    },
    IS_IT_LOADING (state, payload) {
      state.loading = payload
    },
    ERROR (state, payload) {
      state.error = payload
    },
    CLEAR_ERROR (state) {
      state.error = null
    },
    ADD_TO_CART (state, payload) {
      // state.champsInCart = payload
      if (state.champsInCart.length < 5 ) {
      let them = state.champsInCart
      let found = them.some(function (el) {
        return el.name === payload.name;
      })
      if (!found) {
       state.champsInCart.push(payload)
        // state.champsInCart = Object.assign({}, payload)

       
      }
      }
    },
    REMOVE_CHAMP (state, payload) {
      
      state.champsInCart.splice(payload,1)
    },
    REMOVE_ALL_CHAMPS (state) {
      state.champsInCart = []
    },
    ITEMS (state, payload) {
      state.items = payload
              
    },
    ADD_ITEM (state, payload) {
        let hero = state.champsInCart.find(name => name.name == payload.name)
        if (hero.itemSet.length < 6) {
          hero.itemSet.push(payload.item)
        }
    },
    REMOVE_ITEM (state, payload) {
      
      let hero = state.champsInCart.find(name => name.name == payload.name)
      hero.itemSet.splice(payload.item, 1)
    },
    SET_USER (state, payload) {
      state.user = payload
    },
    PROFILE_POSTS (state, payload) {
      state.profilePosts = payload
    },
  },
  actions: {
    LoadPosts ({commit}) {
      commit('IS_IT_LOADING', true)
      let posts = []
      let post
      db.collection('posts')
      .orderBy('createdAt', 'desc')
      // .get()
      .onSnapshot((snapshot) => {
        let liveChange = snapshot.docChanges()
        liveChange.forEach((change) =>{
          if(change.type == 'added') {
            
          post = {
            id: change.doc.id,
            title: change.doc.data().title,
            captain: change.doc.data().captain,
            combo: change.doc.data().combo,
            description: change.doc.data().description,
            stats: change.doc.data().stats,
            timeforaction: change.doc.data().timeforaction,
            
            creatorId: change.doc.data().creatorId,
            creatorName: change.doc.data().creatorName,
            like: change.doc.data().like,
            dislike: change.doc.data().dislike
          }
            // let dateAdded = (change.doc.data().createdAt.toDate() != null) ? change.doc.data().createdAt.toDate() : change.doc.data().createdAt
          // let mutation = Object.assign({}, post, { createdAt: dateAdded})
          posts.push(post)
          
          }
        })
        
        commit('IS_IT_LOADING', false)
        commit('SET_POSTS', posts)
        
      })
      // .catch(error => console.error(error))
        
        
    },
    ProfilePosts ({commit}) {
      commit('IS_IT_LOADING', true)
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          // const userId = payload
      let posts = []
      let post
      db.collection('posts').where("creatorId", "==", user.uid)
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());
                     post = {
                       id: doc.id,
                       title: doc.data().title,
                       captain: doc.data().captain,
                       combo: doc.data().combo,
                       description: doc.data().description,
                       stats: doc.data().stats,
                       timeforaction: doc.data().timeforaction,
                       creatorId: doc.data().creatorId,
                       creatorName: doc.data().creatorName,
                       like: doc.data().like,
                       dislike: doc.data().dislike
                     }
            posts.push(post)
          })
          commit('IS_IT_LOADING', false)
          commit('PROFILE_POSTS', posts)
        })
        .catch(function (error) {
          console.log("Error getting documents: ", error);
        })
        } else {
          console.log('User is not logged in.');
        }


      })
      
  
    },
    LoadChamps ({commit}) {
     
      const champions = []
      commit('IS_IT_LOADING', true)
      fetch(ApiUrl.championsUrl)
        .then(res => res.json())
        .then(data => {
          let add = {
            ap: 0,
            cd: 0,
            lifesteal: 0
          }
          
          let champs = data.data
          for (let champ in champs) {
            champions.push({
              lvl: 1,
              key: champs[champ].key,
              name: champs[champ].name,
              blurb: champs[champ].blurb,
              image: champs[champ].image.full,
              tags: champs[champ].tags,
              stats: Object.assign(champs[champ].stats, add),
              info: champs[champ].info,
              itemSet: []
            })
            // console.log(champs[champ].name, champs[champ].stats);
            
          }
          
          
        })
        
      commit('IS_IT_LOADING', false)
      commit('SET_CHAMPIONS', champions)
      
     
    },
    ListOfItems({ commit }) {
      // let items = []
      let send = []
      // let shape = []
      let exp = /\+\d+%?\s(Ability Power|Attack Damage|Base Mana Regen|Health|Critical Strike Chance|Mana|Armor|Magic Resist|Movement Speed|Base Health Regen|Life Steal|Cooldown Reduction|Bonus Health|Attack Speed)/gm
      let izZagrade = /\((.*?)\)/gm
      fetch(ApiUrl.itemsUrl)
        .then(res => res.json())
        .then(data => {
          
          let him = data.data
          for (const key in him) {
            if (him.hasOwnProperty(key)) {
              // const element = item[key]
              if (him[key].maps["10"] == true || him[key].maps["11"] == true || him[key].maps["12"] == true) {
                let it = him[key]
                var obj = []
                let str = it.description.replace(izZagrade, '')
                let found = str.match(exp)
                if (found != null) {
                 found.forEach((x) => {
                    let val = x.split(' ', 1)
                    let how = val.toString().length
                    let text = x.slice(how + 1)
                    let samename = text.replace(/\s/g, '_').toString()
                    obj.push({ key: samename, value: val, [samename]: val });
                  })
                }
                
                if (it.name.indexOf('Manamune') != -1 || it.name.indexOf('Tear of the Goddess') != -1 || it.name.indexOf("Archangel's Staff") != -1) {
                  // console.log(it.name);
                  obj.splice(-1, 1)
                  // console.log(obj);
                }
                let pushthis = { name: it.name, stats: obj }

                // if(pushthis.indexOf('Tear of the Goddess') || )
                // shape.push(pushthis)
                // { description: it.description, name: it.name, image: it.image, stats: pushthis }
                send.push({ description: it.description, name: it.name, image: it.image, stats: pushthis, tags: it.tags, gold: it.gold.total})
              }
            }
          }

        })
      // 
      // console.log(send);
      
      commit('ITEMS', send)

    },
    SavePost({ commit, getters },payload) {
      commit('IS_IT_LOADING', true)
      // console.log(payload)
      let post = {
        combo: payload.combo,
        title: payload.title,
        description: payload.description,
        captain: payload.captain,
        timeforaction: payload.timeforaction,
        stats: payload.stats,
        like: 0,
        dislike: 0,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        creatorId: getters.User.id,
        creatorName: getters.User.name
      } 
      // let dateAdded = new Date()
      db.collection("posts").add(post)
        .then(function () {
          console.log('New Added');
        })
        .catch(function (error) {
          console.error("Error adding document: ", error);
        });
      commit('IS_IT_LOADING', false)
      // let mutation = Object.assign({}, post, { createdAt: dateAdded})
      // commit('ADD_POST', post)
    },
    DeletePost({ commit }, payload) {
      
      db.collection('posts').doc(payload).delete()
      commit('DELETE_POST', payload)
    },
    AddToCart ({commit}, payload) {
      const here = payload
      commit('ADD_TO_CART', here)
        
    },
    AddItem ({commit}, payload) {
      let name = payload.name
      let ite = payload.item
      commit('ADD_ITEM', { name: name, item: ite })
    },
    RemoveItem ({commit}, payload) {
        commit('REMOVE_ITEM', payload)
    },
    IsChampInCart ({state},payload) {
      return state.champsInCart.includes(payload)
    },
    RemoveFromCart({ commit, state}, payload) {
      // console.log(payload);
      
      let index = state.champsInCart.findIndex(elem => elem.name == payload.name)
      commit('REMOVE_CHAMP', index)
    },
    SignUp({commit}, payload) {
      // commit('IS_IT_LOADING', true)
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(
          (user) => {
            if (user) {
              let thisuser = firebase.auth().currentUser
              thisuser.updateProfile({
                displayName: payload.name
              })
              .then(() => {
                const user = firebase.auth().currentUser
                 const newUser = {
                  id: user.uid,
                  name: user.displayName
                }
                commit('SET_USER', newUser)
                db.collection('users').doc(user.uid).set(newUser).then(() => console.log("New User Added")).catch(err => console.error(err))
                
              })
              .catch(err => console.error(err))
            }
            
            commit('CLEAR_ERROR')
          }
        )
        .catch(
          error => {
            // commit('IS_IT_LOADING', false)
            commit('ERROR', error)
            console.log(error)
          }
        )
    },
    autoSingIn ({commit}, payload) {
      // const user = {id: payload.uid, name: payload.displayName}
      commit('SET_USER', payload)
    },
    User (payload) {
      db.collection('users').add({
        name: payload.name,
        userId: payload.id
      })
      .then(function () {
        console.log('Added User name with id')
      })
      .catch(error => console.error(error))
    },
    Login ({commit}, payload) {
      commit('IS_IT_LOADING', true)      
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      .then(
        user => {
          commit('IS_IT_LOADING', false)
          commit('CLEAR_ERROR')
          const newUser = {
            id: user.uid,
            name: user.displayName
          }
          commit('SET_USER', newUser)
          // console.log(newUser);
          
        }
      )
      // .then(() => {let user = firebase.auth().currentUser
      //   console.log(user.displayName);
        
      // })
      .catch(
        error => {
          commit('IS_IT_LOADING', false)
          commit('ERROR', error)
          console.log(error)
        }
      )
    },
    Logout ({commit}) {
        firebase.auth().signOut()
        commit('SET_USER', null)
    },
    clearError ({commit}) {
      commit('CLEAR_ERROR')
    },
    EditPost ({commit}, data) {
      commit('IS_IT_LOADING', true)
      // console.log(data);
      let obj = {
        combo: data.combo,
        title: data.title,
        description: data.description,
        captain: data.captain,
        timeforaction: data.timeforaction,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        stats: data.stats
      }

      db.collection('posts').doc(data.id).update(obj)
      .then(
        console.log('Updated')
        
        
      ).catch(err => console.error(err))
      commit('IS_IT_LOADING', false)
        obj.id = data.id
        commit('EDIT_POST', obj)
    },
    filteritems({state}, payload) {
      var you = []
      if (payload.length === 0) {
        return state.items
      } else if (payload.length >= 1) {
        for (var i = 0; i < payload.length; i++) {
          let val = state.items.filter(item => {
            return item.tags.includes(payload[i].toString())
          })
          you.push(...val)
          // you.push(this.items.filter(item => {return item.tags.includes(this.selected[i].toString())}))
          // return  this.items.filter(item => {return item.tags.includes(this.selected[i].toString())})
        }
        const distinc = new Set(you)
        return distinc
      }




    },
  },
  getters: {
    posts (state) {
      
      return state.posts
      // return state.posts.sort((dataA, dataB) => {
      //   return dataA.createdAt > dataB.createdAt
      // })
      
    },
    Loading: (state) => { return state.loading },
    ChampsInCart (state) { return state.champsInCart},
    indexOfCart: (state) => (id) => {
      return state.champsInCart.indexOf(id)
    },
    Champions (state) { return state.champions},
    Lines(state) { return state.lines },
    Champ: (state) => (name) => {
      return state.champions.find(todo => todo.name === name)
    },
    ChampExists (state) {
      return that => state.champsInCart.includes(that)
    },
    items(state) { return state.items },
    FilterItems(state) {
      return group => state.items.filter(item => {
        return item.tags.includes(group)
      })
      // return item => state.items.filter(champ => item.includes(champ.tags))
    },
    ParseXmlDesc: (state) => state.items.map(id => {
          let desc = id.description
          let re = /<\/?[^>]+(>|$)/g
          let matches = []
          let cut = desc.replace(re, '|')

          let arr = cut.split('|')
          arr.forEach(elem => {
            let put = elem.split(',').filter(Boolean)
            if (put.length) {
              matches.push(put);
            }
          })
          return matches
    }),
    ItemsInHud: (state) => {state.itemsInHud},
    FilterChamps: (state) => {
      return item => state.champions.filter(champ => item.includes(champ.name))
    },
    User (state) {return state.user},
    Error (state) { return state.error },
    Profile (state) {  return state.profilePosts },
  }
})


