const WorkerStore = {
  data: {
    workers: [
      {
        id: '1',
        name: 'Fredrik',
        pnr: '910504-0035',
        phone: '0709394595',
        show: true
      },
      {
        id: '2',
        name: 'Fredrik',
        pnr: '910504-0035',
        phone: '0709394595',
        show: true
      }
    ]
  },
  methods: {
    addWorker(worker) {
      WorkerStore.data.workers = [...WorkerStore.data.workers, worker]
    }
  }
}