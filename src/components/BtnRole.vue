<template>
        <v-menu>
        <v-btn
            class="fixmenu"
            slot="activator"
            small
            flat
            color="primary"
        >
            {{button}}
        </v-btn>
        <v-list>
            <v-list-tile
            v-for="(line, i) in lines"
            :key="i"
            @click="passInfo(line.line, name)"
            v-model="button"
            >
            <v-list-tile-title>{{ line.line }}</v-list-tile-title>
            </v-list-tile>
        </v-list>
    </v-menu>
</template>
<script>
export default {
    props: ['name', 'see'],
    data () {
        return {
            dialog: false,
            button: ''
        }
    },
    created () {
        if (!this.see) {
            this.button = 'Evry'
        }else {
            this.button = this.see
        }
        
    },
    computed: {
        lines () {
        return this.$store.getters.Lines
      }
    },
    methods: {
        passInfo (line, name) {
            
          this.button = line 
          this.$emit('clicked', {line, name})
        //   console.log(this.name);
          
       },
    }
}
</script>
<style scoped>
.fixmenu {
  left: -5px;
  bottom: 0;
}
</style>

