import axios from "axios";
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
    return error.response.data
  }
}

export const destroyUserSession = async (token) => {
  const response = await axios(
  {
    method: 'post',
    url: '/api/v1/sign_out/',
    headers: { 'Authorization':  token }
  });
  return response.data
}

export const getUserProfile = async (token) => {
  const response = await axios(
    {
      method: 'get',
      url: 'api/v1/profile',
      headers: { 'Authorization': token }
    }
  )

  return response.data
}

export const updateUserProfile = async ({params, token}) => {
  try {
    const response = await axios({
      method: 'patch',
      url: '/api/v1/user',
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json'
      },
      data: params,
    })

    return response.data
  } catch(error) {
    console.log(error)
  }
}

export const inviteProjectUser = async ({params, token}) => {
  const response = await axios({
    method: 'post',
    url: '/api/v1/invitations/project_invite',
    headers: {
      Authorization: token, // Not Yet Implemented
    },
    data: params
  })

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

export const postTask = async ({params, token}) => {
  try{
    const response = await axios({
      url: '/api/v1/tasks',
      method: 'post',
      headers: {
        Authorization: token,
      },
      data: params
    })

    return response.data
  } catch (error) {
    console.log(error)
  }
}

export const importTask = async ({params, token}) => {
  try {
    const response = await axios({
      url: '/api/v1/tasks/import_tasks',
      method: 'post',
      headers: {
        Authorization: token,
      },
      data: params
    })
    return response.data
  } catch (error) {
    console.log(error)
  }
}

export const getTask = async (params) => {
  try {
    const response = await axios.get(`/api/v1/tasks/${params.task_id}`, {params: params})
    return response.data
  } catch (error) {
    console.log(error)
  }
}

export const UpdateTask = async ({params, token}) => {
  try {
    const response = await axios({
      method: 'put',
      url: `/api/v1/tasks/${params.task_id}`,
      headers: {
        Authorization: token
      },
      data: params
    })
    return response.data
  } catch (error) {
    console.log(error)
  }
}
// Projects

export const getProjects = async ({params, token}) => {
  try {
    const response = await axios.get('/api/v1/projects',
    { params: params,
      headers: {
        'Authorization': token
      }
    });
    return response.data;
  } catch (error) {
    console.log(error)
  }
}

export const getProject = async ({project_id, token}) => {
  try {
    const response = await axios.get(`/api/v1/projects/${project_id}`, { headers: {
      'Authorization': token
    } });
    return response.data
  } catch (error) {
    console.log(error)
  }
}

export const postProject = async ({token, inputs}) => {
  const response = await axios({
    method: 'post',
    url: '/api/v1/projects',
    data: { project: inputs },
    headers: { 'Authorization': token }
  })

  return response.data
}

export const putProject = async ({params, token}) => {
  const response = await axios({
    method: 'put',
    url: `/api/v1/projects/${params.project_id}`,
    data: params,
    headers: {
      Authorization: token
    }
  })

  return response.data
}

export const deleteProject = async ({project_id, token}) => {
  try {
    // const response = await axios.post(`/api/v1/projects/delete`, params)
    const response = await axios({
      method: 'delete',
      url: `/api/v1/projects/${project_id}`,
      headers: {
        'Authorization': token
      }
    })
    return response.data
  } catch (error) {
    console.log(error)
    console.log(params)
  }
}

// Boards

export const getBoards = async ({token, params}) => {
  try {
    const response =  await axios.get('/api/v1/boards/', {
      headers: {
        Authorization: token,
      },
      params: params,
    });
    return response.data;
  } catch (error) {
    console.log(error)
  }
}

// MUST REQUIRE EXISTING PROJECT
export const postBoards = async ({params, token}) => {
  const response = await axios({
    method: 'post',
    url: '/api/v1/boards/',
    headers: {
      Authorization: token
    },
    data: params
  })
  return response.data
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

export const getBoard = async ({params, token}) => {
  try {
    const response = await axios.get(`/api/v1/boards/${params.board_id}`, {
      headers: {
        Authorization: token
      },
      params: params
    })
    return response.data
  } catch (error) {
    console.log(error)
  }
}

// User Data

export const getProjectMembers = async ({params, token}) => {
  const response = await axios.get('/api/v1/users', {
    headers: {
      Authorization: token
    },
    params: params
  })

  return response.data
}
