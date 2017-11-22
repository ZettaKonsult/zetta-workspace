const ReportStore = {
  data: {
    reports: [
      {
        id: '1',
        workerId: '1',
        date: 1511352724387,
        hours: 2,
        projectId: '1',
        driving: 4,
        extrawork:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id, suscipit.',
        extrahours: 1,
        submittedBy: '2'
      },
      {
        id: '2',
        workerId: '2',
        date: 1511352724387,
        hours: 2,
        projectId: '1',
        driving: 4,
        extrawork:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id, suscipit.',
        extrahours: 1,
        submittedBy: '1'
      }
    ]
  },
  methods: {
    addReport(report) {
      ReportStore.data.reports = [...ReportStore.data.reports, report]
    },
    getReport(id) {
      return ReportStore.data.reports.find(report => report.id === id)
    },
    getWorkerReports(id) {
      return ReportStore.data.reports.filter(report => report.workerId === id)
    },
    getReportSubmittedBy(id) {
      return ReportStore.data.reports.filter(
        report => report.submittedBy === id
      )
    },
    getAllEditableReports(id) {
      return [
        ...ReportStore.methods.getWorkerReports(id),
        ...ReportStore.methods.getReportSubmittedBy(id)
      ]
    }
  }
}

export default ReportStore
