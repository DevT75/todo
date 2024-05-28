import axios from 'axios';
// import { URLSearchParams } from 'next/dist/compiled/@edge-runtime/primitives/url';

const API_URL = '/api';

const instance = axios.create({
  baseURL: API_URL,
});

const refreshToken = async () => {
  try {
    const refresh_token = sessionStorage.getItem('refresh_token');
    console.log(typeof(refresh_token))
    const response = await axios.post(`http://127.0.0.1:8000/users/refresh-token?token=${refresh_token}`, {});
    const { access_token, refresh_token: new_refresh_token } = response.data;
    sessionStorage.setItem('access_token', access_token);
    sessionStorage.setItem('refresh_token', new_refresh_token);
    return access_token;
  } catch (error) {
    console.error('Refresh token error:', error);
    throw error;
  }
};

instance.interceptors.request.use(async (config) => {
  const token = sessionStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const newToken = await refreshToken();
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + newToken;
      return instance(originalRequest);
    }
    return Promise.reject(error);
  }
);

export const register = async (username,email,password) => {
    try {
      const response = await axios.post(`${API_URL}/users/register`, {
        username: username,
        email: email,
        password: password
      }, {
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      console.log('Registration successful:', response.data);
    } catch (error) {
      console.error('Registration error:', error.response.data);
    }
  };

// export const login = async (userData) => {
//     const response = await axios.post(`${API_URL}/users/token`, userData);
//     return response.data;
// };

export const login = async (username, password) => {
  try{
    const response = await instance.post(`users/token`, new URLSearchParams({
      username,
      password
    }));
    const { access_token, refresh_token } = response.data;
    sessionStorage.setItem('access_token', access_token);
    sessionStorage.setItem('refresh_token', refresh_token);
    return response.data;
  }
  catch(error){
    console.error('Login error:', error);
    throw error;
  }
};

// export const login = async (username, password) => {
//   try {
//     const response = await instance.post(`users/token`, {
//       grant_type: "password",
//       username:username,
//       password:password
//     },
//     {
//       'Content-type': 'application/x-www-form-urlencoded'
//   });
//     const { access_token, refresh_token } = response.data;
//     sessionStorage.setItem('access_token', access_token);
//     sessionStorage.setItem('refresh_token', refresh_token);
//     return response.data;
//   } catch (error) {
//     console.error('Login error:', error);
//     throw error;
//   }
// };

// export const fetchTodos = async (token) => {
//     const response = await axios.get(`${API_URL}/todos`, {
//         headers: { Authorization: `Bearer ${token}` },
//     });
//     return response.data;
// };

// export const fetchTodos = async () => {
//   const token = sessionStorage.getItem('token');
//   if (!token) {
//     throw new Error('No token found');
//   }

//   try {
//     const response = await axios.get(`${API_URL}/todos`, {
//       headers: { Authorization: `Bearer ${token}`},
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching todos:', error);
//     throw error;
//   }
// };

export const fetchTodos = async () => {
  try {
    const response = await instance.get('/todos');
    return response.data;
  } catch (error) {
    console.error('Error fetching todos:', error);
    throw error;
  }
};


// export const createTodo = async (todoData) => {
//     const token = sessionStorage.getItem('token');
//     const response = await axios.post(`${API_URL}/todos`, todoData, {
//         headers: { Authorization: `Bearer ${token}` },
//     });
//     return { "Message" : "Done!!" };
// };

export const createTodo = async ({title, description}) => {
  try {
    const response = await instance.post('/todos', { title, description });
    return response.data;
  } catch (error) {
    console.error('Error creating todo:', error);
    throw error;
  }
};


export const updateTodo = async (id, todoData) => {
    const token = sessionStorage.getItem('access_token');
    const response = await axios.put(`${API_URL}/todos/${id}`, todoData, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

export const deleteTodo = async (id) => {
    const token = sessionStorage.getItem('access_token');
    const response = await instance.delete(`todos/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};
