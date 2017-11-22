export const updateProjects = (newName) => (state, props) => ({
  projectOptions: [...state.projectOptions, newName]
})

export const updateForm = (id, value) => (state, props) => ({
  form: {...state.form, [id]: value}
})