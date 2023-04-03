import axios from "axios";
import config from '../../../config.json'
const ax = axios.create({
    baseURL: config.baseUrl,
});
const url = 'vendor.json';

const state = {
    vendorList: []
}
const getters = {
    getVendors(state) {
        return state.vendorList
    }
}
const actions = {
    getVendors(context) {
        ax.get(url)
            .then(response => {
                context.commit('getVendors', response.data);
            })
            .catch(error => {
                console.log('error', error);
            })
    }
}
const mutations = {
    getVendors(state, payload) {
        state.vendorList = payload.data
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}