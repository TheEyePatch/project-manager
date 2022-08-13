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

// Tasks
export const getIndexTasks = async () => axios.get('/api/v1/tasks');