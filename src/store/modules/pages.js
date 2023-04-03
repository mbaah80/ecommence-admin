import axios from 'axios';
import config from '../../../config.json'
const ax = axios.create({
    baseURL: config.baseUrl,
});
const url = 'pages.json'
const menuUrl = 'menus.json'

const state = {
    pages: [],
    menus: []
}
const getters = {
    getPages(state) {
        return state.pages;
    },
    getMenus(state) {
        return state.menus;
    }
}
const actions = {
    getPages(context) {
        ax.get(url)
            .then(response => {
                context.commit('getProducts', response.data);
            })
            .catch(error => {
                console.log('error', error);
            })
    },
    getMenus(context) {
        ax.get(menuUrl)
            .then(response => {
                context.commit('getMenus', response.data);
            })
            .catch(error => {
                console.log('error', error);
            })
    }
}
const mutations = {
    getProducts(state, payload) {
        state.pages = payload.data;
    },
    getMenus(state, payload) {
        state.menus = payload.data;
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}