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
  } catch{
    console.log(error)
  }
}

export const destroyUserSession = async (token) => {
  const response = await axios.delete(`/api/v1/sessions/${token}`);
  return response.data
}

// Tasks
export const getIndexTasks = async () => axios.get('/api/v1/tasks');