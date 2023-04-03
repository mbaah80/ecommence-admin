<template>
  <div>
    <div class="container-fluid">
      <div class="page-header">
        <Breadcrumbs main="Coupons" title="Create Coupon" />
      </div>
    </div>
    <!-- Container-fluid starts-->
    <div class="container-fluid">
      <div class="row">
        <div class="col">
          <div class="card tab2-card">
        <div class="card-header">
          <h5>Discount Coupon Details</h5>
        </div>
        <div class="card-body">
          <b-tabs content-class="mt-3 mb-0 nav nav-tabs tab-coupon">
            <div class="tab-content">
              <b-tab title="General" active>
                <div
                  class="tab-pane fade active show"
                  aria-labelledby="general-tab"
                >
                  <form class="needs-validation" novalidate="">
                    <h4>General</h4>
                    <div class="row">
                      <div class="col-lg-12">
                        <div class="form-group row">
                          <label
                            for="validationCustom0"
                            class="col-xl-3 col-md-4"
                            ><span>*</span> Coupan Title</label
                          >
                          <input
                            class="form-control col-md-7"
                            id="validationCustom0"
                            type="text"
                            required=""
                            v-model="couponData.title"
                          />
                        </div>
                        <div class="form-group row">
                          <label
                            for="validationCustom1"
                            class="col-xl-3 col-md-4"
                            ><span>*</span>Coupan Code</label
                          >
                          <input
                            class="form-control col-md-7"
                            id="validationCustom1"
                            type="text"
                            required=""
                            v-model="couponData.code"
                          />
                          <div class="valid-feedback">
                            Please Provide a Valid Coupon Code.
                          </div>
                        </div>
                        <div class="form-group row">
                          <label class="col-xl-3 col-md-4">Start Date</label>
                          <input
                            class="datepicker-here form-control digits col-md-7"
                            type="date"
                            data-language="en"
                            v-model="couponData.start_date"
                          />
                        </div>
                        <div class="form-group row">
                          <label class="col-xl-3 col-md-4">End Date</label>
                          <input
                            class="datepicker-here form-control digits col-md-7"
                            type="date"
                            data-language="en"
                            v-model="couponData.end_date"
                          />
                        </div>
                        <div class="form-group row">
                          <label class="col-xl-3 col-md-4">Free Shipping</label>
                          <div class="checkbox checkbox-primary col-md-7">
                            <input
                              id="checkbox-primary-1"
                              type="checkbox"
                              data-original-title=""
                              title=""
                              v-model="couponData.free_shipping"
                            />
                            <label for="checkbox-primary-1"
                              >Allow Free Shipping</label
                            >
                          </div>
                        </div>
                        <div class="form-group row">
                          <label class="col-xl-3 col-md-4">Quantity</label>
                          <input
                            class="form-control col-md-7"
                            type="number"
                            required=""
                            v-model="couponData.quantity"
                          />
                        </div>
                        <div class="form-group row">
                          <label class="col-xl-3 col-md-4">Discount Type</label>
                          <select class="custom-select col-md-7" required="" v-model="couponData.discount_type">
                            <option value="">--Select--</option>
                            <option value="%">Percent</option>
                            <option value="flat">Fixed</option>
                          </select>
                        </div>
                        <div class="form-group row">
                          <label class="col-xl-3 col-md-4">Status</label>
                          <label class="d-block" for="chk-ani">
                                <input
                                  class="checkbox_animated"
                                  id="chk-ani"
                                  type="checkbox"
                                  v-model="couponData.status"
                                />
                                Enable the Coupon
                          </label>
                        </div>
                      </div>
                    </div>
                  </form>
                </div></b-tab
              >
              <b-tab title="Restriction">
                <form class="needs-validation" novalidate="">
                  <h4>Restriction</h4>
                  <div class="form-group row">
                    <label for="validationCustom3" class="col-xl-3 col-md-4"
                      >Products</label
                    >
                    <input
                      class="form-control col-md-7"
                      id="validationCustom3"
                      type="text"
                      required=""
                      v-model="couponData.products"
                    />
                    <div class="valid-feedback">
                      Please Provide a Product Name.
                    </div>
                  </div>
                  <div class="form-group row">
                    <label class="col-xl-3 col-md-4">Category</label>
                    <select class="custom-select col-md-7" required="" v-model="couponData.category">
                      <option value="">--Select--</option>
                      <option value="Bags">Bags</option>
                      <option value="Accessories">Accessories</option>
                      <option value="Clothes">Clothes</option>
                    </select>
                  </div>
                  <div class="form-group row">
                    <label for="validationCustom4" class="col-xl-3 col-md-4"
                      >Minimum Spend</label
                    >
                    <input
                      class="form-control col-md-7"
                      id="validationCustom4"
                      type="number"
                      v-model="couponData.minimum_spend"
                    />
                  </div>
                  <div class="form-group row">
                    <label for="validationCustom5" class="col-xl-3 col-md-4"
                      >Maximum Spend</label
                    >
                    <input
                      class="form-control col-md-7"
                      id="validationCustom5"
                      type="number"
                      v-model="couponData.maximum_spend"
                    />
                  </div>
                </form>
              </b-tab>
              <b-tab title="Usage">
                <form class="needs-validation" novalidate="">
                  <h4>Usage Limits</h4>
                  <div class="form-group row">
                    <label for="validationCustom6" class="col-xl-3 col-md-4"
                      >Per Limit</label
                    >
                    <input
                      class="form-control col-md-7"
                      id="validationCustom6"
                      type="number"
                      v-model="couponData.per_limit"
                    />
                  </div>
                  <div class="form-group row">
                    <label for="validationCustom7" class="col-xl-3 col-md-4"
                      >Per Customer</label
                    >
                    <input
                      class="form-control col-md-7"
                      id="validationCustom7"
                      type="number"
                      v-model="couponData.per_customer"
                    />
                  </div></form
              ></b-tab>
            </div>
          </b-tabs>
          <div class="pull-right">
            <button type="button" class="btn btn-primary flex items-center" @click="createCoupon" >
               <span class="addHandler" v-if="isNotCreatingCoupon"> Add</span>
                <div class="spinner-border spinner ml-1" v-if="isCreatingCoupon" role="status"></div>
            </button>
          </div>
        </div>
      </div>
        </div>
      </div>
    </div>
    <!-- Container-fluid Ends-->
  </div>
</template>

<script>
import firebase from 'firebase';
export default {
  data() {
    return {
      isCreatingCoupon: false,
      isNotCreatingCoupon: true,
      couponData:{
        title:'',
        code:'',
        start_date:'',
        end_date:'',
        free_shipping:'',
        quantity:'',
        discount_type:'',
        status:'',
        products:'',
        category:'',
        minimum_spend:'',
        maximum_spend:'',
        per_limit:'',
        per_customer:'',
        userId: localStorage.getItem('user')
      }
    }
  },
  methods: {
    createCoupon() {
     this.isCreatingCoupon = true
     this.isNotCreatingCoupon = false
      firebase
        .firestore()
        .collection('coupons')
        .add(this.couponData)
        .then(() => {
          this.$toasted.show("Coupon created successfully", {
               theme: "bubble",
               position: "top-right",
               type: "success",
               duration: 2000
        });
          this.$router.push('/coupons/coupon-list');
          this.isCreatingCoupon = false
          this.isNotCreatingCoupon = true
        }).catch(()=>{
          this.isCreatingCoupon = false
          this.isNotCreatingCoupon = true
          this.$toasted.show("opps something is wrong", {
               theme: "bubble",
               position: "top-right",
               type: "error",
               duration: 2000
        });
        })
    }
  }
};
</script>

<style scoped>
.spinner{
  width: 20px;
  height: 20px;
  object-fit: contain;
 }
</style>