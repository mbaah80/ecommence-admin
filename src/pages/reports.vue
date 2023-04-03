<template>
  <div>
    <!-- Container-fluid starts-->
    <div class="container-fluid bulk-cate">
        <div class="page-header">
          <Breadcrumbs main="Reports" title="Reports" />
        </div>
      <div class="row">
        <salesSummary></salesSummary>
        <employee></employee>
        <transferReports></transferReports>
        <expenses></expenses>
        <salesPurchase></salesPurchase>
        <salesreturn></salesreturn>
      </div>
    </div>
  </div>
</template>

<script>
import salesSummary from "../components/reports/sales-summary.vue";
import employee from "../components/reports/employee.vue";
import transferReports from "../components/reports/transfer-report.vue";
import expenses from "../components/reports/expenses.vue";
import salesPurchase from "../components/reports/sales-purchase.vue";
import salesreturn from "../components/reports/sales-return.vue";

export default {
  components: {
    salesSummary,
    employee,
    transferReports,
    expenses,
    salesPurchase,
    salesreturn
  }
};
</script>