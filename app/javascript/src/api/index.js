import axios from "axios";

// User Registrations and Sessions
export const postUserRegistration = async (params) => { 
  try {
    const response = await axios.post('/api/v1/registrations', params);
    return response.data

  } catch (error) {
    console.log(error)
    alert(error)
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

export const postTask = async (params) => {
  const response = await axios.post('/api/v1/tasks', params)
}

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
    const response = await axios.post('/api/v1/projects', { token: token, project: inputs})
    return response.data
  } catch (error) {
    console.log(error)
    console.log(params)
  }
}

export const putProject = async (params) => {
  const project_id = params.project_id
  try {
    const response = await axios.put(`/api/v1/projects/${project_id}`, params)
    return response.data
  } catch (error) {
    console.log(error)
    console.log(params)
  }
}

export const deleteProject = async (params) => {
  try {
    const response = await axios.post(`/api/v1/projects/delete`, params)
    return response.data
  } catch (error) {
    console.log(error)
    console.log(params)
  }
}

// Boards

export const getBoards = async (params) => {
  try {
    const response =  await axios.get('/api/v1/boards/', { params: params });
    return response.data;
  } catch (error) {
    console.log(error)
  }
}

// MUST REQUIRE EXISTING PROJECT
export const postBoards = async (params) => {
  try {
    const response = await axios.post('/api/v1/boards/', { params: params })
  } catch (error) {
    alert(error)
  }
}

export const postMultipleBoards = async (params) => {
  try {
    const response = await axios.post(`api/v1/boards/${params.project_id}/create_multiple_boards`, params )
    return response.data;
  } catch (error) {
    alert(error)
  }
}
