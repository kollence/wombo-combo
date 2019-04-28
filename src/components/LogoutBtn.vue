<template>
 
       
    <v-dialog
      v-model="dialog"
      width="700"
    >
      <v-btn
        slot="activator"
        flat
        class="menu-button"
        @click="setOff"
      >
      <v-icon left>fa-user-slash</v-icon>
        Logout
      </v-btn>

      <v-card class="deep-purple darken-1">
        

        <v-card-text>
          <p class="text-xs-center headlines mb-0">You Logged Out</p>
          
        </v-card-text>

      </v-card>
    </v-dialog>

</template>
<script>
export default {
    data () {
      return {
        dialog: false,
      }
    },
    created () {
      
    },
    computed: {
      
    },
    methods: {
      setOff () {
        setTimeout(function () { 
          this.dialog = false 
          this.$store.dispatch('Logout')
        }.bind(this), 2000)
        this.$router.push('/')
      }
    }
    
    
}
</script>
<style scoped>
.menu-button {
 padding-top: 12px;  
 padding-bottom: 12px;  
}
.headlines {
  font-family: "Coiny Regular Regular", Arial, sans-serif;
  color:#AA00FF;-webkit-text-stroke: 2px #00E676;
  font-size: 450%;
}
</style>