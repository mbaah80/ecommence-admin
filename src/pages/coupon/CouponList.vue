<template>
  <div>
    <div class="container-fluid">
      <div class="page-header">
        <Breadcrumbs main="Coupons" title="Coupon List" />
      </div>
    </div>
    <!-- Container-fluid starts-->
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header">
              <h5>Discount coupon detail</h5>
            </div>
            <div class="card-body">
              <div class="table-responsive datatable-vue">
                <table class="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">Title</th>
                      <th scope="col">Code</th>
                      <th scope="col">Discount</th>
                      <th scope="col">Status</th>
                      <th scope="col">Category</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="coupon in paginatedItems" :key="coupon.id" >
                      <td>{{ coupon.title }}</td>
                      <td>{{ coupon.code }}</td>
                      <td>{{ coupon.discount_type }}</td>
                      <td v-if="coupon.status === true">
                        <div class="badge badge-success">Active</div>
                      </td>
                      <td v-else>
                        <div class="badge badge-danger">Inactive</div>
                      </td>
                      <td>{{ coupon.category }}</td>
                      <td>
                        <a href="javascript:void(0)" @click="delcoupon(coupon.id)" class="btn btn-danger  ml-1">
                          <span :class="`addHandler${coupon.id}`"> <i class="fa fa-trash" aria-hidden="true"></i></span>
                          <div :class="`spinner-border spinner${coupon.id} ml-1`" role="status"></div>
                        </a>
                      </td>
                    </tr>
                    <tr v-if="items.length === 0">
                      <td colspan="7" class="text-center mt-5">No coupons Found</td>
                    </tr>
                  </tbody>
                </table>
                <b-pagination v-model="currentPage" :total-rows="rows" :per-page="perPage"
                  aria-controls="my-table" @input="updateTable"></b-pagination>
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
import firebase from 'firebase'
import $ from 'jquery';

export default {

  data() {
    return {
      items: [],
      perPage: 10, 
      rows: 0, 
      startIndex: 0, 
      endIndex: 10, 
      currentPage: 1
    };
  },
  mounted() {
    this.totalRows = this.items.length;
    this.getCoupons()
  },
  computed: {
  paginatedItems: function() {
    const start = (this.currentPage - 1) * this.perPage;
    const end = start + this.perPage;
    return this.items.slice(start, end);
  }
},
  methods: {
    getCoupons() {
      firebase.firestore().collection('coupons').get().then((snapshot) => {
        snapshot.forEach((doc) => {
          let coupons = doc.data()
          coupons.id = doc.id
          this.items.push(coupons)
          this.rows = this.items.length;
        })
      })
    },
    delcoupon(id) {
      $('.spinner' + id).show()
      $('.addHandler' + id).hide()
      firebase
        .firestore()
        .collection("coupons").doc(id).delete().then(() => {
          this.$toasted.show("Coupon successfully deleted!", {
            theme: "bubble",
            position: "top-right",
            type: "success",
            duration: 2000
          });
          this.items = this.items.filter((coupon) => {
            return coupon.id != id
          })
          this.rows = this.items.length;
          $('.spinner' + id).hide()
          $('.addHandler' + id).show()
        }).catch((error) => {
          $('.spinner' + id).hide()
          $('.addHandler' + id).show()
          this.$toasted.show("Error deleting Coupon!", {
            theme: "bubble",
            position: "top-right",
            type: "error",
            duration: 2000
          });
        });
    },
    updateTable() {
    this.startIndex = (this.currentPage - 1) * this.perPage;
    this.endIndex = this.startIndex + this.perPage;
  },
  }
};
</script>

<style lang="scss" scoped>
table.text-center * {
  text-align: center;
}

.spinner-border {
  width: 20px;
  height: 20px;
  object-fit: contain;
}

.spinner-border {
  display: none;
}

.pagination {
  display: flex;
  justify-content: center;
  float: right;
}

.page-item {
  margin: 0 5px;
}
</style>