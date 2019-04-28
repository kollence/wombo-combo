<template>
<v-flex>

      <v-card>
        <v-card-title>
          <span class="headline">Sign up</span>
        </v-card-title>
        <v-card-text>
            
          <v-container>
              <v-flex v-if="error">
            <Alert @dismissed="onDismissed" :text="error.message"></Alert>
            </v-flex>
            <v-layout>
              <form @submit="onSignup" onSubmit="return false;" style="width: 600px;">
                                
                                    <v-flex xs12>
                                        <v-text-field
                                        name="name"
                                        label="Name"
                                        id="name"
                                        v-model="name"
                                        type="text"
                                        required
                                        ></v-text-field>
                                    </v-flex>
                                                             
                                    <v-flex xs12>
                                        <v-text-field
                                        name="email"
                                        label="Mail"
                                        id="email"
                                        v-model="email"
                                        type="email"
                                        required
                                        ></v-text-field>
                                    </v-flex>
                                                             
                                    <v-flex xs12>
                                        <v-text-field
                                        name="password"
                                        label="Password"
                                        id="password"
                                        v-model="password"
                                        type="password"
                                        required
                                        ></v-text-field>
                                    </v-flex>
                                                             
                                    <v-flex xs12>
                                        <v-text-field
                                        name="confirmPassword"
                                        label="Confirm Password"
                                        id="confirmPassword"
                                        v-model="confirmPassword"
                                        type="password"
                                        :rules="[comparePasswords]"
                                        required

                                        ></v-text-field>
                                    </v-flex>
                                                             
                                    <v-card-actions>
                                        <v-btn 
                                            flat
                                            color="primary"
                                            type="submit" 
                                            :loading="loading"
                                            :disabled="loading">
                                            Sign up
                                            
                                        </v-btn>
                                    
                                    <v-btn 
                                            @click.stop="dialog = false"
                                            flat
                                            color="red"
                                            :loading="loading">
                                            Cancel
                                        </v-btn>
                                    </v-card-actions>
                                                         </form>
                      
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

</v-flex>
       
</template>
<script>

export default {
       data () {
        return {
            dialog: false,
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    },
    
    computed: {
        user () {
          return this.$store.getters.User
        },
        comparePasswords () {
            return this.password !== this.confirmPassword ? 'Passwords do not match' : true
        },
        error () {
            return this.$store.getters.Error
        },
        loading () {
            return this.$store.state.loading
        }
    },
    methods: {
        onSignup () {
            // VUEX
            this.$store.dispatch('SignUp', {name: this.name, email: this.email, password: this.password})  
            // this.$store.commit('SET_USER', {name: this.name})
            this.$router.push('/')
        },
        onDismissed () {
            console.log('Dismissed alert')
            this.$store.dispatch('clearError') 
            // this.name = ''
            // this.password = ''
            // this.email = ''
            // this.confirmPassword = ''
        }
    },
    //  beforeRouteLeave(to, from, next) { 
    //     this.$store.dispatch('clearError')
    //     next()
    //     },
   
}
</script>
<style scoped>
.menu-button {
  padding: 21px 0px 22px 0px;
}
</style>

