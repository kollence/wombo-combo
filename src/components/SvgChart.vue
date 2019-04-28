<template>
<div>
    <svg xmlns="http://www.w3.org/2000/svg" width="180" height="23" class="chart">
        <g>
        <text  y="11" x="3" fill="white">{{name}}: {{val}}</text>
        <rect :width="withChart()" y="16" height="10" :fill="colored"></rect>
        </g>
    </svg>
    <v-divider light></v-divider>
</div>
    
</template>
<script>
export default {
    props: ['val', 'name', 'colored'],
    data () {
        return {
        }
    },
    methods: {
        withChart () {
            if (this.name == "Attack Speed") {
                return this.val * 50
            }
            if (this.name == "Attack Range" || this.name == "Movement") {
                return this.val / 10
            }
            if (this.name == "Cooldown") {
                return this.val * 2
            }
            if (this.name == "Mana" || this.name == "Health") {
                return this.val / 50
            }
            if  (this.name == "Critical") {
                return this.val * 1.5
            }
            if (this.name == "Mana Regen" || this.name == "Health Regen"){
                return this.val * 2
            }
            return this.val / 5
        },
    }
}
</script>

