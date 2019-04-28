<template>
<v-flex>
    
   <v-dialog v-model="dialog" max-width="600px">
      <v-btn slot="activator" class="menu-button" flat >
        <v-icon left>fa-user-plus</v-icon>
        Sign Up
        </v-btn>
      <v-card class="deep-purple darken-1 mb-0">
        <!-- <v-card-title class=""> -->
          <p class="headlines text-md-center mb-0 pb-0">Sign Up</p>
          
        <!-- </v-card-title> -->
        <v-card-text>
            
          <v-container class="mt-0 pt-0"> 
              <p class="caption text-md-center body-1">Make Posts And Give Something To The World</p>
              <v-flex v-if="error">
            <Alert @dismissed="onDismissed" :text="error.message"></Alert>
            </v-flex>
            <v-layout>
              <v-form @submit="onSignup" 
                onSubmit="return false;" 
                style="width: 600px;"
                ref="form"
                v-model="valid"
                lazy-validation>
                                
                                    <v-flex xs12>
                                        <v-text-field
                                        name="name"
                                        :counter="15"
                                        label="Name"
                                        :rules="nameRules"
                                        v-model="name"
                                        type="text"
                                        required
                                        ></v-text-field>
                                    </v-flex>
                                                             
                                    <v-flex xs12>
                                        <v-text-field
                                        name="email"
                                        :counter="40"
                                        :rules="emailRules"
                                        label="Mail"
                                        v-model="email"
                                        type="email"
                                        required
                                        ></v-text-field>
                                    </v-flex>
                                                             
                                    <v-flex xs12>
                                        <v-text-field
                                        :rules="passRules"
                                        :counter="35"
                                        name="password"
                                        label="Password"
                                        v-model="password"
                                        type="password"
                                        required
                                        ></v-text-field>
                                    </v-flex>
                                                             
                                    <v-flex xs12>
                                        <v-text-field
                                        name="confirmPassword"
                                        label="Confirm Password"
                                        v-model="confirmPassword"
                                        type="password"
                                        :rules="[comparePasswords]"
                                        required

                                        ></v-text-field>
                                    </v-flex>
                                                             
                                    <v-card-actions>
                                        <v-btn 
                                        
                                            flat
                                            :disabled="!valid"
                                            color="primary"
                                            type="submit" 
                                            :loading="loading"
                                            >
                                            Sign up
                                            
                                        </v-btn>
                                    
                                    <v-btn 
                                            @click.stop="dialog = false"
                                            flat
                                            color="#FF1744"
                                            :loading="loading">
                                            Cancel
                                        </v-btn>
                                        <v-spacer></v-spacer>
                                        <v-btn color="orange" flat small @click="reset">Clear</v-btn>
                                    </v-card-actions>
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
            valid: true,
            dialog: false,
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            nameRules: [
                v => !!v || 'Name is required',
                v => (v && v.length <= 15) || 'Name must be less than 15 characters'
            ],
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+/.test(v) || 'E-mail must be valid'
            ],
            passRules: [
                v => (v && v.length <= 35) || 'Too Long To Remember'
            ]
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
    watch: {
        
        user (value) {
            if (value !== null && value !== undefined) {
                this.$router.push('/')
                // this.$store.commit('SET_USER', null)
            }
        }
    },
    methods: {
        reset () {
        this.$refs.form.reset() 
      },
        onSignup () {
             if (this.$refs.form.validate()) {
          this.snackbar = true
          this.$store.dispatch('SignUp', {name: this.name.trim().toUpperCase(), email: this.email.trim(), password: this.password})
        }else {
                this.$store.commit('ERROR', {message: 'Your entries are not valid !'})
        }
        // console.log(this.name, this.email,this.password)
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

