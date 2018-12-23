<template>
  <div id="handle-report">
    <div class="report-list">
      <div class="report-item"
        v-for="report in reports"
        :key="report._id"
      >
        <report-item :report="report" />
      </div>
    </div>
  </div>
</template>

<script>
import ReportService from '../services/ReportService'
import ReportItem from './ReportItem'

export default {
  components: {
    ReportItem
  },
  data () {
    return {
      reports: null
    }
  },
  async created () {
    let reportsRes = await ReportService.getAllReports()
    this.reports = reportsRes.data.reports
  },
  methods: {
  }
}
</script>

<style>
#handle-report {
  width: 500px;
}
.report-item {
  border: solid rgba(90, 88, 88, 0.377) 1px;
}
</style>
