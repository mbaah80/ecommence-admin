<template>
  <div>
    <div class="container-fluid">
      <div class="page-header">
        <Breadcrumbs main="Invoice" title="Invoice" />
      </div>
    </div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header">
              <h5>Invoice List</h5>
            </div>
            <div class="card-body">
              <div class="table-responsive datatable-vue product-list">
                <div>
                  <b-modal id="modal-2" title="Confirmation" @ok="deleteRow(selectedSku)">
                    <p class="my-4">Are you sure!</p>
                  </b-modal>
                </div>
                <b-table
                  :select-mode="selectMode"
                  class="text-center"
                  show-empty
                  striped
                  hover
                  head-variant="light"
                  bordered
                  stacked="md"
                  :items="items"
                  :fields="tablefields"
                  :filter="filter"
                  :current-page="currentPage"
                  :per-page="perPage"
                  @filtered="onFiltered"
                  ref="selectableTable"
                  :selectable="true"
                  @row-selected="rowSelected"
                >
                  <template
                    v-for="(field, index) in tablefields"
                    :slot="field.key"
                    slot-scope="data"
                  >
                    <b-form-input
                      :key="index"
                      class="border-0 no-shadow p-1"
                      type="text"
                      v-model="data.item[key]"
                    ></b-form-input>
                  </template>
                  <template v-slot:cell()="{ value, item, field: { key } }">
                    <template v-if="edit != item.id">{{ value }}</template>
                    <b-form-input type="text" v-else v-model="item[key]" />
                  </template>
                  <template #cell(image)="field">
                    <img
                      height="50px"
                      :src="getImgUrl(field.item.image)"
                      width="50px"
                    />
                  </template>
                  <template v-slot:cell(actions)="{ item: { id } }">
                    <span
                      style="font-size: 20px; color: blue;"
                      v-if="edit != id && id !== null"
                      @click="onEdit(id)"
                    >
                      <feather
                        type="edit-2"
                        stroke="#3758FD"
                        stroke-width="1"
                        size="18px"
                        fill="#3758FD"
                        stroke-linejoin="round"
                      ></feather>
                    </span>
                    <span
                      v-if="edit != id"
                      v-b-modal.modal-2
                      @click="getIndex(id)"
                      style="font-size: 20px; color: #FA399F;"
                    >
                      <feather
                        type="trash"
                        stroke="#F72E9F"
                        size="18px"
                        fill="#F72E9F"
                      ></feather>
                    </span>
                    <feather
                      v-if="edit === id && id !== ''"
                      size="18px"
                      stroke="#39CCC6"
                      stroke-width="5"
                      type="check"
                      @click="onSave(id)"
                    ></feather>

                    <feather
                      stroke="#F7299D"
                      size="18px"
                      stroke-width="5"
                      v-if="edit === id && id !== ''"
                      type="x"
                      @click="doCancel(id)"
                    ></feather>
                    <feather
                      stroke="#F7299D"
                      size="18px"
                      stroke-width="5"
                      v-if="save && id == ''"
                      type="save"
                      @click="onSave(id)"
                    ></feather>
                  </template>
                  <template v-slot:head(actions)>
                    <feather
                      v-if="!add"
                      type="plus"
                      stroke="#4050F6"
                      stroke-width="6"
                      size="22px"
                      fill="#4050F6"
                      @click="addRecord()"
                    ></feather>
                    <feather
                      v-if="add"
                      type="search"
                      stroke-width="6"
                      size="22px"
                      @click="searchData()"
                    ></feather>
                  </template>
                </b-table>
                <b-col md="12" class="my-1 p-0 pagination-justify">
                  <b-pagination
                    v-model="currentPage"
                    :total-rows="totalRows"
                    :per-page="perPage"
                    aria-controls="my-table"
                    class="mt-4"
                    first-text="First"
                    prev-text="Prev"
                    next-text="Next"
                    last-text="Last"
                  >
                  </b-pagination>
                </b-col>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { json } from "d3";
export default {
  components: {},
  data() {
    return {
      add: false,
      save: false,
      edit: null,
      item: "",
      selectedSku : "",
      index: null,
      addNew: false,
      tablefields: [
        {
          key: "id",
          label: "No",
          sortable: true,
          editable: false,
          isDeleted: false
        },
        {
          key: "invoice",
          label: "Invoice",
          sortable: false,
          editable: true,
          isDeleted: false
        },
        { key: "date", label: "Date", sortable: true, editable: true },
        { key: "shipping", label: "Shipping", sortable: true, editable: true },
        { key: "amount", label: "Amount", sortable: true, editable: true },
        { key: "tax", label: "Tax", sortable: true, editable: true },
        { key: "total", label: "Total", sortable: true, editable: true },
        { key: "actions" }
      ],
      modes: ["multi", "single", "range"],
      filter: null,
      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      pageOptions: [5, 10, 15],
      selectMode: "single"
    };
  },
  mounted() {
    // Set the initial number of items
    this.totalRows = this.items.length;
  },
  created() {
    this.$store.dispatch("invoice/getInvoice");
  },
  computed: {
    ...mapGetters({
      items: "invoice/getInvoice"
    }),
    sortOptions() {
      // Create an options list from our fields
      return this.tablefields
        .filter(f => f.sortable)
        .map(f => {
          return { text: f.label, value: f.key };
        });
    },
    selectedRows() {
      return this.items.filter(item => item.delete);
    },
    // edit row
    editableFields() {
      return this.tablefields.filter(field => {
        return field.editable === true;
      });
    }
  },
  methods: {
    onEdit(id) {
      if (id !== "undefined") {
        this.edit = this.edit !== id ? id : null;
      }
    },
    getIndex(id) {
      this.selectedSku = id
    },
    onSave(id) {
      this.save = false;
      this.add = false;
      this.edit = 1000;
      //  this.edit = ''
    },
    doCancel(id) {
      this.edit = null;
      this.item = null;
    },
    deleteRow(id) {
      this.items.splice(this.items.findIndex(e => e.id === id),1);
    },
    rowSelected(item) {
      if (item[0]) {
        this.edit = this.edit !== item[0].id ? item[0].id : null;
      }
    },
    addRecord() {
      this.add = true;
      console.log("items", this.items[0]);
      this.items.unshift({
        id: "",
        invoice: "",
        date: "",
        shipping: "",
        amount: "",
        tax: "",
        total: "",
        actions: ""
      });
      this.edit = "";
      this.save = true;
    },
    searchData() {
      this.add = false;
      this.items.splice(0, 1);
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    }
    //b-table customize
  }
};
</script>