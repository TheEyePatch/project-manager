import axios from "axios";

// User Registrations and Sessions
export const postUserRegistration = async () => axios.post('/api/v1/registrations')

// Tasks
export const getIndexTasks = async () => axios.get('/api/v1/tasks');