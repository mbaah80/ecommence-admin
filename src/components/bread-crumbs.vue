<template>
  <div>
    <div class="row">
          <div class="col-lg-6">
            <div class="page-header-left">
              <h3>
                {{ $t(title) }}
              </h3>
            </div>
          </div>
          <div class="col-lg-6">
            <ol class="breadcrumb pull-right">
              <li class="breadcrumb-item">
                <router-link :to="{ path: '/dashboard/default' }"
                  ><feather type="home"></feather
                ></router-link>
              </li>
              <li class="breadcrumb-item" v-if="main">{{ $t(main) }}</li>
              <li class="breadcrumb-item active" v-if="title">{{ $t(title) }}</li>
            </ol>
          </div>
        </div>
  </div>
</template>
<script>
//import Bookmark from "./bookmark";
export default {
  props: {
    title: {
      default: "home"
    },
    main: {
      default: ""
    }
  },
  components: {
    //Bookmark
  }
};
</script>
