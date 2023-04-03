import axios from "axios";

import config from '../../../config.json'
const ax = axios.create({
    baseURL: config.baseUrl,
});
const url = "invoice.json";

const state = {
    invoice: []
}
const getters = {
    getInvoice(state) {
        return state.invoice;
    }
}
const actions = {
    getInvoice(context) {
        ax.get(url)
            .then(response => {
                context.commit('getInvoice', response.data)
            })
            .catch(error => {
                console.log('error', error);
            })
    }
}
const mutations = {
    getInvoice(state, payload) {
        state.invoice = payload.data;
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}