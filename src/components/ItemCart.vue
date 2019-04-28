<template>
    <table>
        <tr>
        <td v-if="added[0]">
            <v-img
            class="ml-1"
            width="40"
            height="40"
            @click="drop(name, 0, added[0].stats)"
            :src="itemImage+added[0].image.full"
            ></v-img>
        </td>
        <td v-else></td>
        <td v-if="added[1]">
            <v-img
            class="ml-1"
            width="40"
            height="40"
            @click="drop(name, 1, added[1].stats)"
            :src="itemImage+added[1].image.full"
            ></v-img>
        </td>
        <td v-else></td>
        <td v-if="added[2]">
            <v-img
            class="ml-1"
            width="40"
            height="40"
            @click="drop(name, 2, added[2].stats)"
            :src="itemImage+added[2].image.full"
            ></v-img>
        </td>
        <td v-else></td>
        <td v-if="added[3]">
            <v-img
            class="ml-1"
            width="40"
            height="40"
            @click="drop(name, 3, added[3].stats)"
            :src="itemImage+added[3].image.full"
            ></v-img>
        </td>
        <td v-else></td>
        <td v-if="added[4]">
            <v-img
            class="ml-1"
            width="40"
            height="40"
            @click="drop(name, 4, added[4].stats)"
            :src="itemImage+added[4].image.full"
            ></v-img>
        </td>
        <td v-else></td>
        <td v-if="added[5]">
            <v-img
            class="ml-1"
            width="40"
            height="40"
            @click="drop(name, 5, added[5].stats)"
            :src="itemImage+added[5].image.full"
            ></v-img>
        </td>
        <td v-else></td>
        </tr>
    </table>
</template>

<script>
import ApiUrl from '../config/ApiUrl'
export default {
    props:['added', 'name'],
    data () {
        return {
            itemImage: ApiUrl.itemImage,
        }
    },

    methods: {
    drop (name, i, item) {
        // this.$store.commit('REMOVE_ITEM', {name: name, item: i})
        this.$emit('removeItem', name, i, item)
        },

    },
    computed: {
        
    }
}
</script>


<style scoped>
  td {
    background-color: black;
    width:50px;
    height: 50px;
    border: solid yellow 1px;
  }
</style>