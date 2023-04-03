import axios from "axios";
import products from '../../../public/product.json'

import config from '../../../config.json'
const ax = axios.create({
    baseURL: config.baseUrl,
});
const url = 'product.json';

const state = {
    products: products.data,
    subCategoryProduct: [],
    productList: [],
    currency: {
        curr: 'usd',
        symbol: '$'
    },
    loadingStatus: false
}
const getters = {
    getProducts: (state) => {
        return state.products;
    },
    getSubCategoryProduct: (state) => {
        return state.subCategoryProduct;
    },
    getProductList: (state) => {
        return state.productList;
    },
    getProductById: (state) => {
        return id => state.products.find((product) => {
            return product.sku === +id
        })
    },
    loadingStatus: (state) => {
        return state.loadingStatus;
    },
    changeCurrency: (state) => {
        if (state.currency.curr === 'eur') {
            state.currency.curr = 0.90
            return state.currency
        } else if (state.currency.curr === 'inr') {
            state.currency.curr = 70.93
            return state.currency
        } else if (state.currency.curr === 'gbp') {
            state.currency.curr = 0.78
            return state.currency
        } else if (state.currency.curr === 'usd') {
            state.currency.curr = 1
            return state.currency
        }
    },
}
const actions = {
    getProducts: (context) => {
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
    },
    getSubCategoryProduct: (context) => {
        context.commit('loadingStatus', true);
        const url = 'product.json';
        ax.get(url, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                context.commit('getSubCategoryProduct', response.data);
                context.commit('loadingStatus', true);

            })
            .catch(error => {
                console.log('error', error);
            })
    },
    getProductList: (context) => {
        const url = 'product.json';
        ax.get(url, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                context.commit('getProductList', response.data);
            })
            .catch(error => {
                console.log('error', error);
            })
    },
    changeCurrency: (context, payload) => {
        context.commit('changeCurrency', payload)
    },
}
const mutations = {
    loadingStatus: (state, payload) => {
        state.loadingStatus = payload;
    },
    getProducts: (state, payload) => {
        state.products = payload.data;
    },
    getSubCategoryProduct: (state, payload) => {
        state.subCategoryProduct = payload.data;
    },
    getProductList: (state, payload) => {
        state.productList = payload.data;
    },
    changeCurrency: (state, payload) => {
        state.currency = payload
    },
}
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}