import axios from "axios";

export const getIndexTasks = async () => axios.get('/api/v1/tasks');