import axios from 'axios';
import config from '../../../config.json'
const ax = axios.create({
    baseURL: config.baseUrl,
});
const url = 'media.json';

const state = {
    mediaList: []
}
const getters = {
    getMedia(state) {
        return state.mediaList;
    }
}
const actions = {
    getMedia(context) {
        ax.get(url)
            .then(response => {
                context.commit('getMedia', response.data);
            })
            .catch(error => {
                console.log('error', error);
            })
    }
}
const mutations = {
    getMedia(state, payload) {
        state.mediaList = payload.data;
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}