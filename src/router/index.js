import Vue from 'vue'
import VueRouter from 'vue-router'
import Body from '../components/Body.vue';
import dashboard from '../pages/dashboard.vue';
import category from '../pages/physical/category';
import AddProduct from '../pages/physical/AddProduct';
import SubCategory from '../pages/physical/SubCategory.vue';
import ProductList from '../pages/physical/ProductList.vue';
import ProductDetail from '../pages/physical/ProductDetail.vue';
import CategoryDigital from '../pages/digital/Category.vue';
import SubCategoryDigital from '../pages/digital/SubCategory.vue';
import ProductListDigital from '../pages/digital/ProductList.vue';
import AddProductDigital from '../pages/digital/AddProduct.vue';
import Order from '../pages/sales/order.vue';
import transactions from '../pages/sales/Transaction.vue';
import CouponList from '../pages/coupon/CouponList.vue';
import AddCoupon from '../pages/coupon/AddCoupon.vue';
import PageList from '../pages/page/PageList.vue';
import CreatePage from '../pages/page/create-page.vue';
import Media from '../pages/media.vue';
import MenuList from '../pages/menus/menu-list.vue';
import CreateMenu from '../pages/menus/create-menu.vue';
import UserList from '../pages/users/user-list.vue';
import CreateUser from '../pages/users/create-user.vue';
import VendorList from '../pages/vendors/vendor-list.vue';
import CreateVendor from '../pages/vendors/create-vendor.vue';
import LocalTranslation from '../pages/localization/translations.vue';
import CurrencyRates from '../pages/localization/currency-rates.vue'
import Taxes from '../pages/localization/taxes.vue';
import Reports from '../pages/reports.vue';
import Profile from '../pages/profiles/profile.vue';
import Invoice from '../pages/invoice.vue';
import Auth from '../pages/authentication/index.vue';
import firebase from 'firebase/app';
import Userauth from '../auth/index.js'

Vue.use(VueRouter)

const routes = [
    { path: '', redirect: { name: 'default' } },
    {
        path: '/dashboard',
        component: Body,
        children: [{
            path: 'default',
            name: 'default',
            component: dashboard,
            meta: {
                title: 'Multikart - Premium Admin Template',
            }
        }]
    },
    {
        path: '/physical',
        component: Body,
        children: [{
                path: 'category',
                name: 'category',
                component: category,
                meta: {
                    title: 'Category | Multikart - Premium Admin Template',
                }
            },
            {
                path: 'add-product',
                name: 'add-product',
                component: AddProduct,
                meta: {
                    title: 'Product | Multikart - Premium Admin Template',
                }
            },
            {
                path: 'sub-category',
                name: 'sub-category',
                component: SubCategory,
                meta: {
                    title: 'Sub Category | Multikart - Premium Admin Template',
                }
            },
            {
                path: 'product-list',
                name: 'product-list',
                component: ProductList,
                meta: {
                    title: 'Product List | Multikart - Premium Admin Template',
                }
            },
            {
                path: 'product-detail',
                name: 'product-detail',
                component: ProductDetail,
                meta: {
                    title: 'Product Detail | Multikart - Premium Admin Template',
                }
            },
        ]
    },
    {
        path: '/digital',
        component: Body,
        children: [{
                path: 'category',
                name: 'Category',
                component: CategoryDigital,
                meta: {
                    title: 'Category | Multikart - Premium Admin Template',
                }
            },
            {
                path: 'sub-category',
                name: 'sub-category',
                component: SubCategoryDigital,
                meta: {
                    title: 'Category | Multikart - Premium Admin Template',
                }
            },
            {
                path: 'product-list',
                name: 'product-list',
                component: ProductListDigital,
                meta: {
                    title: 'Product List | Multikart - Premium Admin Template',
                }
            },
            {
                path: 'add-product',
                name: 'add-product',
                component: AddProductDigital,
                meta: {
                    title: 'Add product | Multikart - Premium Admin Template',
                }
            },
        ]
    },
    {
        path: '/sales',
        component: Body,
        children: [{
                path: 'order',
                name: 'order',
                component: Order,
                meta: {
                    title: 'Order | Multikart - Premium Admin Template',
                }
            },
            {
                path: 'transactions',
                name: 'transactions',
                component: transactions,
                meta: {
                    title: 'Transactions | Multikart - Premium Admin Template',
                }
            },
        ]
    },
    {
        path: '/coupons',
        component: Body,
        children: [{
                path: 'coupon-list',
                name: 'coupon-list',
                component: CouponList,
                meta: {
                    title: 'Coupon | Multikart - Premium Admin Template',
                }

            },
            {
                path: 'add-coupon',
                name: 'add-coupon',
                component: AddCoupon,
                meta: {
                    title: 'Coupon | Multikart - Premium Admin Template',
                }

            },
        ]
    },
    {
        path: '/pages',
        component: Body,
        children: [{
                path: 'page-list',
                name: 'page-list',
                component: PageList,
                meta: {
                    title: 'Pages | Multikart - Premium Admin Template',
                }
            },
            {
                path: 'create-page',
                name: 'create-page',
                component: CreatePage,
                meta: {
                    title: 'Pages | Multikart - Premium Admin Template',
                }
            }
        ]
    },

    {
        path: '/menus',
        name: 'menus',
        component: Body,
        children: [{
                path: 'menu-list',
                name: 'menu-list',
                component: MenuList,
                meta: {
                    title: 'Menus | Multikart - Premium Admin Template',

                }
            },
            {
                path: 'create-menu',
                name: 'create-menu',
                component: CreateMenu,
                meta: {
                    title: 'Menus | Multikart - Premium Admin Template',

                }
            }
        ]
    },
    {
        path: '/users',
        name: 'users',
        component: Body,
        children: [{
                path: 'user-list',
                name: 'user-list',
                component: UserList,
                meta: {
                    title: 'User | Multikart - Premium Admin Template',

                }
            },
            {
                path: 'create-user',
                name: 'create-user',
                component: CreateUser,
                meta: {
                    title: 'User | Multikart - Premium Admin Template',

                }
            }
        ]
    },
    {
        path: '/vendors',
        name: 'vendors',
        component: Body,
        children: [{
                path: 'vendor-list',
                name: 'vendor-list',
                component: VendorList,
                meta: {
                    title: 'Vendor | Multikart - Premium Admin Template',

                }
            },
            {
                path: 'create-vendor',
                name: 'create-vendor',
                component: CreateVendor,
                meta: {
                    title: 'Vendor | Multikart - Premium Admin Template',

                }
            }
        ]
    },
    {
        path: '/localization',
        name: 'vendolocalizationrs',
        component: Body,
        children: [{
                path: 'translations',
                name: 'translations',
                component: LocalTranslation,
                meta: {
                    title: 'Localization | Multikart - Premium Admin Template',

                }
            },
            {
                path: 'currency-rates',
                name: 'currency-rates',
                component: CurrencyRates,
                meta: {
                    title: 'Localization | Multikart - Premium Admin Template',

                }
            },
            {
                path: 'taxes',
                name: 'taxes',
                component: Taxes,
                meta: {
                    title: 'Localization | Multikart - Premium Admin Template',

                }
            }
        ]
    },

    {
        path: '/settings',
        name: 'settings',
        component: Body,
        children: [{
            path: 'profile',
            name: 'profile',
            component: Profile,
            meta: {
                title: 'Profile | Multikart - Premium Admin Template',

            }
        }]
    },


    {
        path: '/auth/login',
        name: 'login',
        component: Auth,
        meta: {
            title: 'Login | Multikart - Premium Admin Template',

        }
    },
    {
        path: '/app',
        component: Body,
        children: [{
                path: 'media',
                name: 'media',
                component: Media,
                meta: {
                    title: 'Media | Multikart - Premium Admin Template',
                }
            },
            {
                path: 'reports',
                name: 'reports',
                component: Reports,
                meta: {
                    title: 'Reports | Multikart - Premium Admin Template',

                }
            },
            {
                path: 'invoice',
                name: 'invoice',
                component: Invoice,
                meta: {
                    title: 'Invoice | Multikart - Premium Admin Template',

                }
            },
        ],
    }
]


const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    firebase.auth().onAuthStateChanged(() => {
        if (to.meta.title)
            document.title = to.meta.title;
        const CurrentUser = firebase.auth().currentUser;
        const path = ['/auth/login', '/register'];
        if (path.includes(to.path) || to.path === "/callback" || CurrentUser || Userauth.isAuthenticatedUser()) {
            return next();
        }
        next('/auth/login')
    });
});

export default router