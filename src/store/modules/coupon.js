import axios from "axios";

import config from '../../../config.json'
const ax = axios.create({
    baseURL: config.baseUrl,
});
const url = 'coupon.json';

const state = {
    couponList: []
}
const getters = {
    getCoupons(state) {
        return state.couponList;
    }
}
const actions = {
    getCoupons(context) {
        ax.get(url)
            .then(response => {
                context.commit('getCoupons', response.data);
            })
            .catch(error => {
                console.log('error', error);
            })
    }
}
const mutations = {
    getCoupons(state, payload) {
        state.couponList = payload.data;
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}