import axios from "axios";
import { UpdateTaskForm } from "../components";
axios.defaults.baseURL = '/'

// User Registrations and Sessions
export const postUserRegistration = async (params) => {
  try {
    const response = await axios.post('/api/v1/sign_up', params);
    return response.data
  } catch (error) {
    return(error.response.data)
  }
}

export const createUserSession = async (params) => {
  try {
    const response = await axios.post('/api/v1/sign_in', params);
    return response.data
  } catch (error){
    console.log(error)
  }
}

export const destroyUserSession = async (token) => {
  const response = await axios.delete(`/api/v1/sign_out/${token}`);
  return response.data
}

// Tasks
export const getIndexTasks = async (params) => {
  try {
    const response = await axios.get('/api/v1/tasks', {params: params})
    return response.data
  } catch (error) {
    console.log(error)
  }
};

export const postTask = async (params) => {
  try{
    const response = await axios.post('/api/v1/tasks', params)
    return response.data
  } catch (error) {
    console.log(error)
  }
}

export const importTask = async (params) => {
  try {
    const response = await axios.post('/api/v1/tasks/import_tasks', params)
    return response.data
  } catch (error) {
    console.log(error)
  }
}

export const getTask = async (params) => {
  try {
    const response = await axios.get(`/api/v1/tasks/${params.id}`, {params: params})
    return response.data
  } catch (error) {
    console.log(error)
  }
}

export const UpdateTask = async (params) => {
  try {
    const response = await axios.put(`/api/v1/tasks/${params.task_id}`, params)
    return response.data
  } catch (error) {
    console.log(error)
  }
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

export const getProject = async (params) => {
  try {
    const response = await axios.get(`api/v1/projects/${params.project_id}`, { params: params });
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
    const response = await axios.post('/api/v1/boards/', params)
    return response.data
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

export const updateBoard = async (params) => {
  try {
    const response = await axios.put(`http://localhost:3000/api/v1/boards/${params.board_id}`, params)
    return response.data
  } catch (error) {
    console.log(error)
    alert(error)
  }
}

export const getBoard = async (params) => {
  try {
    const response = await axios.get(`/api/v1/boards/${params.board_id}`, { params: params })
    return response.data
  } catch (error) {
    console.log(error)
  }
}
