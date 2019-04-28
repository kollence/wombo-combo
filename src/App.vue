<template>
  <v-app id="inspire" dark :style="styl">
    <v-navigation-drawer
      temporary
      v-model="drawer"
      clipped
      fixed
      app
      class="justfont"
    >
      <v-list>
        <v-list-tile 
        style="cursor: pointer" 
        v-for="item in menuItems" 
        :key="item.title"
        :to="item.link">
          <v-list-tile-action>
            <v-icon :class="[item.icon]">{{item.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{item.title}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-if="!userIsAuth">
          <v-list-tile-content>
            <SignUpBtn></SignUpBtn>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-if="!userIsAuth">
          <v-list-tile-content>
            <LoginBtn></LoginBtn>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-if="userIsAuth">
          <v-list-tile-content>
            <LogoutBtn></LogoutBtn>
          </v-list-tile-content>
        </v-list-tile>
          
        
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app fixed clipped-left dense color="purple darken-4"  class="justfont">
      <v-toolbar-side-icon class="hidden-sm-and-up" @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-img :src="require('@/assets/icon.png')" max-width="30"></v-img>
        <v-toolbar-title>
          <v-btn color="purple darken-4" class="ml-0 pl-0" flat to="/"><span class="mylogo">Wombo Combo</span></v-btn>
        </v-toolbar-title>
        
        <v-spacer></v-spacer>
      <!-- <v-spacer></v-spacer> -->
      <v-toolbar-items  class="hidden-sm-and-down">
        <v-btn 
        flat 
        v-for="item in menuItems" 
        :key="item.title"
        :to="item.link">
          <v-icon left>{{item.icon}}</v-icon>
          {{item.title}}
        </v-btn>
 
        <!-- <v-btn
        to="/own"
        ><v-icon class="far fa-helmet-battle">far fa-helmet-battle</v-icon>Test</v-btn> -->
      
      <SignUpBtn v-if="!userIsAuth"></SignUpBtn>
      <LoginBtn v-if="!userIsAuth"></LoginBtn>
      
      <LogoutBtn v-else></LogoutBtn>

      </v-toolbar-items>
      
    </v-toolbar>
    <v-content>
      <!-- <v-container> -->
        <router-view></router-view>
      <!-- </v-container> -->
    </v-content>
    <v-footer app fixed>
      <span>&copy; 2019</span>
    </v-footer>

  </v-app>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import SignUpBtn from './components/SignUpBtn'
import LoginBtn from './components/LoginBtn'
import LogoutBtn from './components/LogoutBtn'
export default {
  name: 'App',
  components: {
    SignUpBtn,
    LoginBtn,
    LogoutBtn
  },
  data () {
    return {
      // name: this.user.name,
      haveuser: false,
      dialog: false,
      styl: {
        'background-image': 'linear-gradient(65deg, #4A148C, #6200EA)',
        // 'background-repeat': 'no-repeat',
  // 'background-attachment': 'fixed',
  'background-position': 'center'
        // 'background': 'linear-gradient(#004D40, #263238)'
      },
      drawer: false
    }
  },
  created () {
    this.LoadPosts()
    this.ListOfItems()
    this.LoadChamps()
    this.ProfilePosts()
  },
  methods: {
    ...mapActions(['LoadPosts','LoadChamps','ProfilePosts','ListOfItems'])
  },
  computed: {
    ...mapState(['user']),
    menuItems () {
      let menuItems = [
      {icon: 'fa-scroll', title: 'Posts', link: '/'},
      {icon: 'fa-grip-vertical', title: 'Champions', link: '/champions'},
      // {icon: 'fa-hammer', title: 'Sign Up', link: '/sign-up'},
      // {icon: 'fa-dice-five', title: 'Pick '+ this.countCart, link: '/five'},
      ]
      if (this.userIsAuth) {
        menuItems = [
          {icon: 'fa-scroll', title: 'Posts', link: '/'},
          {icon: 'fa-grip-vertical', title: 'Champions', link: '/champions'},
          {icon: 'fa-hammer', title: 'Create', link: '/form'},
          {icon: 'fa-brain', title: this.countCart, link: '/five'},
          {icon: 'fa-user', title: this.user.name, link: '/profile'},
        ]
      }
      return menuItems
    },
    userIsAuth () {
      return this.$store.getters.User !== null && this.$store.getters.User !== undefined
    },
    countCart () {
      return this.$store.state.champsInCart ? this.$store.state.champsInCart.length : 0
    }
  }
}
</script>
<style>
/* @import url(https://www.1001fonts.com/coiny-regular-font.html); */
@font-face {
font-family: "Coiny Regular Regular";
src: url("./font/coiny-regular.regular.ttf");
}
.headlines {
  font-family: "Coiny Regular Regular", Arial, sans-serif;
  color:#AA00FF;-webkit-text-stroke: 2px #00E676;
  font-size: 450%;
}
.mylogo {
    font-family: "Coiny Regular Regular", Arial, sans-serif;
  color: #00ffcc;
  font-size: 30px;
}
.justfont {
 font-family: "Coiny Regular Regular", Arial, sans-serif;
}
</style>

