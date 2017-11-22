const ProjectStore = {
  data: {
    projects: [
      {
        id: '1',
        name: 'Kungsgatan',
        city: 'Hörby'
      },
      {
        id: '2',
        name: 'Ekerödsrasten',
        city: 'Hörby'
      }
    ]
  },
  methods: {
    addProject(project) {
      return (ProjectStore.data.projects = [
        ...ProjectStore.data.projects,
        {
          id: Math.floor(Math.random() * 10000),
          name: project,
          city: 'something'
        }
      ])
    },
    getProject(id) {
      return ProjectStore.data.projects.find(project => project.id === id)
    },
    getAllProjects() {
      return ProjectStore.data.projects
    }
  }
}

export default ProjectStore
