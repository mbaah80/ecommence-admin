<template>
  <!-- Page Header Start-->
  <div :class="!sidebar ? 'page-main-header open' : 'page-main-header '">
    <div class="main-header-right row">
      <div class="main-header-left d-lg-none">
        <div class="logo-wrapper">
          <router-link to="/">
            <img
              class="blur-up lazyloaded"
              src="../../assets/images/dashboard/multikart-logo.png"
              alt=""
          /></router-link>
        </div>
      </div>
      <div class="mobile-sidebar">
        <div class="media-body text-right switch-sm">
          <label class="switch"
            ><a @click="toggle_sidebar"
              ><i id="sidebar-toggle"
                ><feather type="align-left"></feather></i></a
          ></label>
        </div>
      </div>
      <div class="nav-right col">
        <ul class="nav-menus" :class="headerMenu?'open':''">
          <li>
            <form class="form-inline search-form">
              <div class="form-group">
                 <!-- <i data-feather="search"> </i> -->
                 <i class="search-icon" data-feather="search" @click="toggle_search()" 
                ><feather type="search"></feather></i
            >
                <input
                  class="form-control-plaintext" :class="opensearch?'open':''"
                  type="search"
                  placeholder="Search.."
                /><span class="d-sm-none mobile-search" @click="toggle_search()">
                 
                </span>
              </div>
            </form>
          </li>
          <li>
            <a class="text-dark" href="#!" @click="toggle_fullscreen()"
              ><i data-feather="maximize-2"
                ><feather type="maximize-2"></feather></i
            ></a>
          </li>
          <li class="onhover-dropdown">
            <a class="txt-dark">
              <h6>{{ $i18n.locale | capitalize }}</h6></a
            >
            <ul class="language-dropdown onhover-show-div p-20">
              <li
                v-for="(l, index) in localeOptions"
                :key="index"
                @click="changeLocale(l)"
              >
                <a
                  ><i class="flag-icon flag-icon-is"
                    ><country-flag :country="l.icon" size="normal"
                  /></i>
                  {{ l.name }}</a
                >
              </li>
            </ul>
          </li>
          <li class="onhover-dropdown">
            <i data-feather="bell"><feather type="bell"></feather></i
            ><span class="badge badge-primary pull-right notification-badge"
              >3</span
            ><span class="dot"></span>
            <ul class="notification-dropdown onhover-show-div p-0">
              <li>
                Notification
                <span class="badge badge-primary pull-right">3</span>
              </li>
              <li>
                <div class="media">
                  <div class="media-body">
                    <h6 class="mt-0">
                      <span
                        ><i class="shopping-color" data-feather="shopping-bag"
                          ><feather type="shopping-bag"></feather></i></span
                      >Your order ready for Ship..!
                    </h6>
                    <p class="mb-0">
                      Lorem ipsum dolor sit amet, consectetuer.
                    </p>
                  </div>
                </div>
              </li>
              <li>
                <div class="media">
                  <div class="media-body">
                    <h6 class="mt-0 txt-success">
                      <span
                        ><i
                          class="download-color font-success"
                          data-feather="download"
                          ><feather type="download"></feather></i></span
                      >Download Complete
                    </h6>
                    <p class="mb-0">
                      Lorem ipsum dolor sit amet, consectetuer.
                    </p>
                  </div>
                </div>
              </li>
              <li>
                <div class="media">
                  <div class="media-body">
                    <h6 class="mt-0 txt-danger">
                      <span
                        ><i
                          class="alert-color font-danger"
                          data-feather="alert-circle"
                          ><feather type="alert-circle"></feather></i></span
                      >250 MB trash files
                    </h6>
                    <p class="mb-0">
                      Lorem ipsum dolor sit amet, consectetuer.
                    </p>
                  </div>
                </div>
              </li>
              <li class="txt-dark"><a href="#">All</a> notification</li>
            </ul>
          </li>
          <li>
            <a @click="openChatSidebar"
              ><i class="right_side_toggle" data-feather="message-square">
                <feather type="message-square"></feather
              ></i>
              <span class="dot"></span
            ></a>
            <chatBox></chatBox>
          </li>
          <li class="onhover-dropdown">
            <div class="media align-items-center">
              <img
                class="align-self-center pull-right img-50 rounded-circle blur-up lazyloaded"
                src="../../assets/images/dashboard/man.png"
                alt="header-user"
              />
              <div class="dotted-animation">
                <span class="animate-circle"></span
                ><span class="main-circle"></span>
              </div>
            </div>
            <ul
              class="profile-dropdown onhover-show-div p-20 profile-dropdown-hover"
            >
              <li>
                <a><feather type="user"></feather>Edit Profile</a>
              </li>
              <li>
                <a><feather type="mail"></feather>Inbox</a>
              </li>
              <li>
                <a><feather type="lock"></feather>Lock Screen</a>
              </li>
              <li>
                <a><feather type="settings"></feather>Settings</a>
              </li>
              <li>
                <a @click="logout"
                  ><feather type="log-out"></feather><span>Log out</span></a
                >
              </li>
            </ul>
          </li>
        </ul>
        <div class="d-lg-none mobile-toggle pull-right" @click="openHeader()">
          <feather type="more-horizontal"></feather>
        </div>
      </div>
    </div>
  </div>
  <!-- Page Header Ends -->
</template>

<script>
import firebase from "firebase";
import UserAuth from "../../auth/index.js";
import chatBox from "../../components/chatBox.vue";
import CountryFlag from "vue-country-flag";
import { localeOptions } from "../../constants/config";
import { mapActions } from "vuex";

export default {
  name: "Header",
  components: {
    chatBox,
    CountryFlag
  },
  created() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
    this.resized = this.sidebar_toggle_var;
  },
  data() {
    return {
      chatSidebar: false,
      headerMenu:false,
      opensearch: false,
      localeOptions:localeOptions,
      langIcon: localStorage.getItem("currentLanguageIcon") || "flag-icon-us"
    };
  },
  filters: {
    capitalize: function(value) {
      if (!value) {
        return "";
      }
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
  },
  watch: {
    "$i18n.locale"(to, from) {
      if (from !== to) {
        this.$router.go(this.$route.path);
      }
     
    }
  },
  computed: {
    sidebar() {
      return this.$store.state.menu.togglesidebar;
    }
  },
  methods: {
    ...mapActions(["setLang"]),
    toggle_sidebar() {
      this.$store.dispatch("menu/opensidebar");
    },
    openHeader() {
        this.headerMenu = !this.headerMenu
    },
    openChatSidebar() {
      this.$store.dispatch("menu/openChatSidebar", true);
    },
    toggle_search(){
      this.opensearch = !this.opensearch
    },
    toggle_fullscreen() {
      if (
        (document.fullScreenElement && document.fullScreenElement !== null) ||
        (!document.mozFullScreen && !document.webkitIsFullScreen)
      ) {
        if (document.documentElement.requestFullScreen) {
          document.documentElement.requestFullScreen();
        } else if (document.documentElement.mozRequestFullScreen) {
          document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullScreen) {
          document.documentElement.webkitRequestFullScreen(
            Element.ALLOW_KEYBOARD_INPUT
          );
        }
      } else {
        if (document.cancelFullScreen) {
          document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        }
      }
    },
    logout: function() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          UserAuth.Logout();
          this.$router.replace("/auth/login").catch(err => err);;
        });
    },
    changeLocale(locale) {
      this.setLang(locale);
    },
    handleResize() {
    this.width = window.innerWidth;
    }
  }
};
</script>
