<template>
  <div>
    <div class="container-fluid">
      <div class="page-header">
        <Breadcrumbs main="Sales" title="Transactions" />
      </div>
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header">
              <h5>Transaction Detail</h5>
            </div>
            <div class="card-body">
              <div class="table-responsive datatable-vue">
                <b-table
                  show-empty
                  stacked="md"
                  striped
                  hover
                  head-variant="light"
                  bordered
                  :items="transactions"
                  :fields="tablefields"
                  :filter="filter"
                  :current-page="currentPage"
                  :per-page="perPage"
                  @filtered="onFiltered"
                >
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
import firebase from 'firebase'

export default {
  data() {
    return {
      transactions:[],
      tablefields: [
        { key: "orderId", label: "Order Id", sortable: true },
        { key: "transactionId", label: "Transaction Id", sortable: true },
        { key: "date", label: "Date", sortable: true },
        { key: "paymentMethod", label: "Payment Method", sortable: true },
        { key: "DeliveryStatus", label: "Delivery Status", sortable: true },
        { key: "price", label: "Amount", sortable: true }
      ],

      filter: null,
      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      pageOptions: [5, 10, 15]
    };
  },

   mounted() {
    // Set the initial number of items
    this.totalRows = this.transactions.length;
  },
  methods: {
    getTransactions(){
      firebase
        .firestore()
        .collection("transactions")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.transactions.push(doc.data());
          });
        });
    }
  }
};
</script>

<style>

</style>