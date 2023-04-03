<template>
  <div>
    <div class="container-fluid">
      <div class="page-header">
        <Breadcrumbs main="Sales" title="Orders" />
      </div>
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header">
              <h5>Manage order</h5>
            </div>

            <div class="card-body">
              <b-row>
                <b-col xl="3" lg="4" md="6">
                  <b-form-group
                    label-cols="3"
                    label="show"
                    class="datatable-select"
                  >
                    <b-form-select
                      v-model="perPage"
                      :options="pageOptions"
                    ></b-form-select>
                  </b-form-group>
                </b-col>
                <b-col class="offset-xl-6 offset-lg-2 search-rs" xl="3" lg="5" md="6">
                  <b-form-group
                    label-cols="3"
                    label="search:"
                    class="datatable-select"
                  >
                    <b-form-input
                      type="text"
                      v-model="filter"
                      placeholder="Search"
                    ></b-form-input>
                  </b-form-group>
                </b-col>
              </b-row>
              <div class="table-responsive datatable-vue text-center">
                <b-table
                  show-empty
                  striped
                  hover
                  head-variant="light"
                  bordered
                  stacked="md"
                  :items="orders"
                  :fields="tablefields"
                  :filter="filter"
                  :current-page="currentPage"
                  :per-page="perPage"
                  @filtered="onFiltered"
                >
                  <template #cell(images)="field" class="d-flex">
                    <img
                      height="50px"
                      :src="getImgUrl(field.item.images)"
                      width="50px"
                    />
                  </template>
                  <template #cell(paymentStatus)="field">
                    <div
                      v-if="field.item.paymentStatus == 'Cash On Delivered'"
                      class="badge badge-glow badge-secondary"
                    >
                      {{ field.item.paymentStatus }}
                    </div>
                    <div
                      v-if="field.item.paymentStatus == 'Payment Failed'"
                      class="badge badge-glow badge-danger"
                    >
                      {{ field.item.paymentStatus }}
                    </div>
                    <div
                      v-if="field.item.paymentStatus == 'Paid'"
                      class="badge badge-glow badge-success"
                    >
                      {{ field.item.paymentStatus }}
                    </div>
                    <div
                      v-if="
                        field.item.paymentStatus == 'Awaiting Authentication'
                      "
                      class="badge badge-glow badge-warning"
                    >
                      {{ field.item.paymentStatus }}
                    </div>
                  </template>
                  <template #cell(orderStatus)="field">
                    <div
                      v-if="field.item.orderStatus == 'Shipped'"
                      class="badge badge-glow badge-primary"
                    >
                      {{ field.item.orderStatus }}
                    </div>
                    <div
                      v-if="field.item.orderStatus == 'Cancelled'"
                      class="badge badge-glow badge-danger"
                    >
                      {{ field.item.orderStatus }}
                    </div>
                    <div
                      v-if="field.item.orderStatus == 'Processing'"
                      class="badge badge-glow badge-warning"
                    >
                      {{ field.item.orderStatus }}
                    </div>
                    <div
                      v-if="field.item.orderStatus == 'Delivered'"
                      class="badge badge-glow badge-success"
                    >
                      {{ field.item.orderStatus }}
                    </div>
                  </template>
                </b-table>
              </div>
              <b-col md="12" class="my-1 p-0 pagination-justify">
                <b-pagination
                  v-model="currentPage"
                  :total-rows="totalRows"
                  :per-page="perPage"
                  aria-controls="my-table"
                  class="mt-4"
                ></b-pagination>
              </b-col>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase';

export default {
  data() {
    return {
      value: "",
      orders:[],
      tablefields: [
        { key: "orderId", label: "Order Id", sortable: true },
        { key: "images", label: "Product", sortable: false },
        { key: "paymentStatus", label: "Payment status", sortable: true },
        { key: "paymentMethod", label: "Payment Method", sortable: true },
        { key: "orderStatus", label: "Order status", sortable: true },
        { key: "date", label: "Date", sortable: true },
        { key: "total", label: "Total", sortable: true }
      ],

      filter: null,
      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      pageOptions: [10, 25, 50, 100]
    };
  },
  mounted() {
    // Set the initial number of items
    this.totalRows = this.orders.length;
    this.getOrders();
  },
  methods: {
    getOrders(){
      firebase
        .firestore()
        collection("orders").get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.orders.push(doc.data());
          });
        });
      }
  }
};
</script>

<style>

</style>