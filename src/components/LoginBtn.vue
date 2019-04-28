<template>
        <v-flex>
     
   <v-dialog v-model="dialog" max-width="600px">
      <v-btn slot="activator" class="menu-button" flat >
          <v-icon left>fa-user-check</v-icon>
      Login
      </v-btn>
      <v-card class="deep-purple darken-1 mb-0">
        <!-- <v-card-title class=""> -->
          <p class="headlines text-md-center mb-0">Log In</p>
        <v-card-title class="pa-0">
            <v-flex v-if="error">
            <Alert @dismissed="onDismissed" :text="error.message"></Alert>
            </v-flex>
          <span class="headline">{{$store.state.user}}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-layout>
              <v-form 
              @submit.prevent="onLogin"
               style="width: 600px;"
               ref="form"
               >                          
                                    <v-flex xs12>
                                        <v-text-field
                                        :rules="emailRules"
                                        name="email"
                                        label="Mail"
                                        v-model="email"
                                        type="email"
                                        required
                                        ></v-text-field>
                                    </v-flex>
                                                             
                                    <v-flex xs12>
                                        <v-text-field
                                        name="password"
                                        label="Password"
                                        v-model="password"
                                        type="password"
                                        required
                                        ></v-text-field>
                                    </v-flex>
                                     
                                                             
                                    <v-flex xs12>
                                        <v-btn 
                                            flat
                                            color="primary"
                                            type="submit" 
                                            :loading="loading"
                                            :disabled="loading">
                                            Login
                                        </v-btn>
                                         <v-btn 
                                            @click.stop="dialog = false"
                                            flat
                                            color="red"
                                            :loading="loading">
                                            Cancel
                                        </v-btn>
                                    </v-flex>
                                                         </v-form>
                      
            </v-layout>
          </v-container>
          <!-- <small>*indicates required field</small> -->
        </v-card-text>
        <!-- <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
        </v-card-actions> -->
      </v-card>
    </v-dialog>
</v-flex>
</template>
<script>
export default {
    data () {
        return {
            dialog: false,
                password: '', 
                email: '',
                emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+/.test(v) || 'E-mail must be valid'
            ],
               
        }
    },
    computed: {
        user () {
          return this.$store.getters.User
        },
        loading () {
            return this.$store.state.loading
        },
        error () {
            return this.$store.getters.Error
        },
    },
    watch: {
        user (value) {
            if (value !== null && value !== undefined) {
                this.$router.push('/')
            }
        }
    },
    methods: {
      onLogin ()  {
             if (this.$refs.form.validate()) {
          this.snackbar = true
          this.$store.dispatch('Login', {email: this.email, password: this.password})
        }else {
                this.$store.commit('ERROR', {message: 'Your entries are not valid !'})
        }
        
      },
      cancel () {
          this.dialog = false
      },
       onDismissed () {
            console.log('Dismissed alert')
            this.$store.dispatch('clearError') 
            this.$refs.form.reset()
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

