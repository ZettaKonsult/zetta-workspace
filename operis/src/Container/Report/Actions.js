import ReportStore from '../../Store/ReportStore'
import ProjectStore from '../../Store/ProjectStore'

export const updateProjects = newName => (state, props) => ({
  projects: ProjectStore.methods.addProject(newName)
})

export const updateForm = (id, value) => (state, props) => ({
  form: { ...state.form, [id]: value }
})

export const getReport = id => (state, props) => ({
  form: ReportStore.methods.getReport(id)
})

export const saveReport = report => ReportStore.methods.addReport(report)

export const getProjects = (state, props) => ({
  projects: ProjectStore.methods.getAllProjects()
})
