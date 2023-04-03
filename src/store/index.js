import Vue from 'vue'
import Vuex from 'vuex'
import employee from './modules/employee.js'
import menu from './modules/menu.js'
import order from './modules/order.js'
import product from './modules/product.js'
import digitalProducts from './modules/digital-products.js';
import coupon from './modules/coupon.js';
import pages from './modules/pages.js'
import media from './modules/media.js'
import user from './modules/user.js'
import vendor from './modules/vendor.js'
import localization from './modules/localization.js'
import invoice from './modules/invoice.js'
import { authentication } from './modules/authentication.js'
import reports from '../reports.js';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {},
    mutations: {
        changeLang(state, payload) {
            localStorage.setItem('currentLanguage', payload.id)
            localStorage.setItem('currentLanguageIcon', payload.icon)
            window.location.reload();
        }
    },
    actions: {
        setLang({ commit }, payload) {
            commit('changeLang', payload)
        }
    },
    modules: {
        menu,
        product,
        order,
        employee,
        digitalProducts,
        coupon,
        pages,
        media,
        user,
        vendor,
        localization,
        invoice,
        authentication,
        reports
    }
})