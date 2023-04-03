import axios from 'axios';
import config from '../../../config.json'
const ax = axios.create({
    baseURL: config.baseUrl,
});
const translationUrl = 'translations.json';
const currencyUrl = 'currency.json';
const taxUrl = 'taxes.json';

const state = {
    trnslations: [],
    currency: [],
    taxes: []
}
const getters = {
    getTranslation(state) {
        return state.trnslations;
    },
    getCurrency(state) {
        return state.currency;
    },
    getTaxes(state) {
        return state.taxes;
    }
}
const actions = {
    getTranslation(context) {
        ax.get(translationUrl)
            .then(response => {
                context.commit('getTransaction', response.data)
            })
            .catch(error => {
                console.log('error', error);
            })
    },
    getCurrency(context) {
        ax.get(currencyUrl)
            .then(response => {
                context.commit('getCurrency', response.data);
            })
            .catch(error => {
                console.log(error);
            })
    },
    getTaxes(context) {
        ax.get(taxUrl)
            .then(response => {
                context.commit('getTaxes', response.data);
            })
            .catch(error => {
                console.log(error);
            })
    }
}
const mutations = {
    getTransaction(state, payload) {
        state.trnslations = payload.data;
    },
    getCurrency(state, payload) {
        state.currency = payload.data;
    },
    getTaxes(state, payload) {
        state.taxes = payload.data;
    }
}
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}