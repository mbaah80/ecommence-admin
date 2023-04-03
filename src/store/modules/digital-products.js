import axios from "axios";
import config from '../../../config.json'
const ax = axios.create({
    baseURL: config.baseUrl,
});

const state = {
    products: []
}
const getters = {
    getProducts: (state) => {
        return state.products;
    }
}
const actions = {
    getProducts: (context) => {
        const url = "digitalProduct.json";
        ax.get(url, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                context.commit('getProducts', response.data);
            })
            .catch(error => {
                console.log('error', error);
            })
    }

}
const mutations = {
    getProducts: (state, payload) => {
        state.products = payload.data;
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}