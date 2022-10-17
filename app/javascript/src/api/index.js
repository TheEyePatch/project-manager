import axios from "axios";

// User Registrations and Sessions
export const postUserRegistration = async (params) => { 
  try {
    const response = await axios.post('/api/v1/registrations', params);
    return response.data

  } catch (error) {
    console.log(error)
  }
}

export const createUserSession = async (params) => {
  try {
    const response = await axios.post('/api/v1/sessions', params);
    return response.data
  } catch (error){
    console.log(error)
  }
}

export const destroyUserSession = async (token) => {
  const response = await axios.delete(`/api/v1/sessions/${token}`);
  return response.data
}

// Tasks
export const getIndexTasks = async () => axios.get('/api/v1/tasks');


// Projects

export const getProjects = async (params) => {
  try {
    const response = await axios.get('/api/v1/projects', { params: params});
    return response.data;
  } catch (error) {
    console.log(error)
  }
}

export const getProject = async ({ project_id }) => {
  try {
    const response = await axios.get(`api/v1/projects/${project_id}`);
    return response.data
  } catch (error) {
    console.log(error)
  }
}

export const postProject = async ({token, inputs}) => {
  
  try {
    const response = await axios.post('api/v1/projects', { token: token, project: inputs})
    return response.data
  } catch (error) {
    console.log(error)
    console.log(params)
  }
}