import Vue from 'vue';

Vue.mixin({
    data(){
        return {}
    },
    methods:{
        getApiUrl() {
            return this.$axios.defaults.baseURL.slice(0,-4)
        }
    },
    computed:{}
})