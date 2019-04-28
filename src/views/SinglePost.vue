<template>
    <v-content>
        <v-container>
            <Post :post="post"></Post>
        </v-container>
    </v-content>
</template>
<script>
import Post from '../components/Post'

export default {
    components: {
        Post
    },
    props: ['post']
}
</script>
