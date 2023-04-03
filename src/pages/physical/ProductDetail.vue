<template>
  <div>
    <div class="container-fluid">
      <div class="page-header">
        <Breadcrumbs main="Physical" title="Product Detail" />
      </div>
      <div class="card">
        <div class="row product-page-main card-body">
          <div class="col-xl-4">
            <div class="product-slider owl-carousel owl-theme" id="sync1">
              <VueSlickCarousel
                v-bind="settings"
                ref="c1"
                :asNavFor="$refs.c2"
                :focusOnSelect="true"
              >
                <div
                  class="item"
                  v-for="(item, index) in getDetail.images"
                  :key="index"
                >
                  <img
                    :src="getImgUrl(item.src)"
                    alt=""
                    class="blur-up lazyloaded"
                  />
                </div>
              </VueSlickCarousel>
            </div>
            <br />
            <div class="owl-carousel owl-theme" id="sync2">
              <VueSlickCarousel
                ref="c2"
                :asNavFor="$refs.c1"
                v-bind="settings1"
                :slidesToShow="3"
                :focusOnSelect="true"
                :infinite="true"
              >
                <div
                  class="item"
                  v-for="(item, index) in getDetail.images"
                  :key="index"
                >
                  <img
                    :src="getImgUrl(item.src)"
                    alt=""
                    class="blur-up lazyloaded"
                  />
                </div>
              </VueSlickCarousel>
            </div>
          </div>
          <div class="col-xl-8">
            <div class="product-page-details product-right mb-0">
              <h2>{{ getDetail.name }}</h2>

              <StarRating
                :show-rating="false"
                :star-size="22"
                :rounded-corners="false"
                :glow="1"
                :rating="2"
                :disabled="true"
              ></StarRating>
              <hr />
              <h6 class="product-title">product details</h6>
              <p>
                {{ getDetail.description }}
              </p>
              <div class="product-price digits mt-2" v-if="getDetail.sale">
                <h3>
                  {{ getDetail.price }}
                  <del>{{ curr.symbol }}{{ getDetail.salePrice }}</del>
                </h3>
              </div>
              <ul class="color-variant">
                <li
                  :class="{ active: activeColor == variant }"
                  :style="{ 'background-color': variant }"
                  v-for="(variant, variantIndex) in Color(getDetail.variants)"
                  :key="variantIndex"
                >
                  <!-- <a
                    :class="[variant]"
                    @click="
                      sizeVariant(
                        getDetail.variants[variantIndex].image_id,
                        variantIndex,
                        variant
                      )
                    "
                  ></a> -->
                </li>
              </ul>
              <hr />
              <h6 class="product-title size-text">
                select size
                <span class="pull-right"
                  ><a href="javascript:void(0)" v-b-modal.modal-1
                    >size chart</a
                  ></span
                >
              </h6>
              <div
                class="modal fade"
                id="sizemodal"
                tabindex="-1"
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog modal-dialog-centered" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title">
                        Sheer Straight Kurta
                      </h5>
                      <button
                        type="button"
                        class="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body">
                      <img
                        src="../../assets/images/size-chart.jpg"
                        alt=""
                        class="img-fluid blur-up lazyloaded"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="size-box">
                <ul>
                  <li v-for="(size, index) in size" :key="index"
                    class="product-title"
                    :class="{ active: selectedSize == size }"
                  >
                    <a
                      href="javascript:void(0)"
                      @click="changeSizeVariant(size)"
                      >{{ size }}</a
                    >
                  </li>
                </ul>
              </div>
              <div class="add-product-form">
                <h6 class="product-title">quantity</h6>
                <fieldset class="qty-box mt-2 ml-0">
                  <div class="input-group">
                    <b-input-group-prepend>
                      <b-btn variant="primary" @click="decrement">-</b-btn>
                    </b-input-group-prepend>
                    <b-input
                      type="text"
                      name="quantity"
                      class="form-control input-number"
                      v-model="counter"
                    />
                    <b-input-group-append>
                      <b-btn variant="primary" @click="counter++">+</b-btn>
                    </b-input-group-append>
                  </div>
                </fieldset>
              </div>
              <hr />
              <h6 class="product-title">Sales Ends In</h6>
              <Timer :date="currentDate()" />
              <div class="m-t-15">
                <button class="btn btn-primary m-r-10" type="button">
                  Add To Cart
                </button>
                <button class="btn btn-secondary" type="button">
                  Buy Now
                </button>
                <b-modal
                  id="modal-1"
                  size="md"
                  class="modal-dialog modal-dialog-centered"
                  role="document"
                  centered
                  hide-footer
                >
                  <template v-slot:modal-title>{{ getDetail.title }}</template>
                  <img
                    src="../../assets/images/size-chart.jpg"
                    alt="size-chart"
                    class="img-fluid"
                  />
                </b-modal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";
import Timer from "../../components/widgets/Timer.vue";
import { mapState, mapGetters } from "vuex";

export default {
  components: {
    VueSlickCarousel,
    Timer
  },
  data() {
    return {
      size: ["S", "M", "L", "XL"],
      selectedSize: "",
      activeColor: "",
      swiperOptions: {
        pagination: {
          el: ".swiper-pagination"
        }
      },
      counter: 1,
      settings: {
        dots: false,
        fade: true,
        autoplay: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1
      },
      settings1: {
        autoplay: false,
        edgeFriction: 0.35,
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 0
      }
    };
  },
  computed: {
    ...mapState({
      currency: state => state.product.currency
    }),
    ...mapGetters({
      curr: 'product/changeCurrency'
    }),
    getDetail: function () {
      return this.$store.getters['product/getProductById'](1)
      
    }
  },
  mounted() {
    this.uniqColor = this.getDetail.variants[0].color
    this.sizeVariant(this.getDetail.variants[0].image_id)
    // Active default color
    this.activeColor = this.uniqColor
    this.changeSizeVariant(this.getDetail.variants[0].size)
  },
  methods: {
    currentDate() {
      const current = new Date();
      const date = `${current.getMonth()+1} ${current.getDate()+ 10}  ${current.getFullYear()} `;
      return date;
    },
    priceCurrency: function () {
      this.$store.dispatch('product/changeCurrency')
    },
    // Display Unique Color
    Color(variants) {
      const uniqColor = []
      for (let i = 0; i < Object.keys(variants).length; i++) {
        if (uniqColor.indexOf(variants[i].color) === -1) {
          uniqColor.push(variants[i].color)
        }
      }
      return uniqColor
    },
    // Item Count
    increment() {
      this.counter++
    },
    decrement() {
      if (this.counter > 1) this.counter--
    },
    // Change size variant
    changeSizeVariant(variant) {
      this.selectedSize = variant
    },
    getImgUrl(path) {
      return require('@/assets/images/' + path)
    },
    sizeVariant(id, slideId, color) {
      this.size = []
      this.activeColor = color
      this.getDetail.variants.filter((item) => {
        if (id === item.image_id) {
          this.size.push(item.size)
        }
      })
    }
  }
};
</script>
