<template>
    <v-card-actions >
        <span>Items:</span>
        <v-flex xs1 v-for="(hud, i) in inhud" :key="i">
        <div color="blue-grey" class="ma-1 pa-1">  
            <table>
            <tr> 
                <td>
                <v-img
                height="30"
                width="30"
                :src="'https://ddragon.leagueoflegends.com/cdn/8.24.1/img/item/'+hud.image.full"
                ></v-img>
                </td>
            </tr>
            </table>
        </div>
        
        </v-flex>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
    </v-card-actions>
</template>

<script>
export default {
    data () {
        return {
            dialog: false,
        }
    }
}
</script>
