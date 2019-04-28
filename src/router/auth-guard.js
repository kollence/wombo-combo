import store from "../store/store.js";
export default (to, from, next) => {
    if (store.getters.User) {
        next()
    }else {
        next('/champions')
        store.commit('ERROR', {message: 'You need to be sign up or loged in'})
    }
}