import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND,
    withCredentials: true,
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error) => {
    failedQueue.forEach(prom => prom.reject(error));
    failedQueue = [];
};

axiosInstance.interceptors.response.use(
    res => res,
    async err => {
        const originalRequest = err.config;

        if (
            err.response?.status === 401 &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true;

            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then(() => axiosInstance(originalRequest))
                    .catch(err => Promise.reject(err));
            }

            isRefreshing = true;

            try {
                await axiosInstance.post('/user/refreshtoken');
                failedQueue.forEach(({ resolve }) => resolve());
                failedQueue = [];

                return axiosInstance(originalRequest); // Retry original request
            } catch (refreshError) {
                processQueue(refreshError);
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(err);
    }
);

export default axiosInstance;

//=====================manual bearer token=======================
// const axiosInstance = axios.create({
//   baseURL: import.meta.env.VITE_BACKEND,
//   withCredentials: true
// });

// let isRefreshing = false;
// let failedQueue = [];

// const processQueue = (error, token = null) => {
//   failedQueue.forEach(prom => {
//     if (error) {
//       prom.reject(error);
//     } else {
//       prom.resolve(token);
//     }
//   });
//   failedQueue = [];
// };

// axiosInstance.interceptors.response.use(
//   res => res,
//   async err => {
//     const originalRequest = err.config;

//     if (
//       err.response?.status === 401 &&
//       !originalRequest._retry
//     ) {
//       originalRequest._retry = true;

//       if (isRefreshing) {
//         return new Promise(function (resolve, reject) {
//           failedQueue.push({ resolve, reject });
//         })
//           .then(token => {
//             // If you're setting headers manually
//             originalRequest.headers['Authorization'] = `Bearer ${token}`;
//             return axiosInstance(originalRequest);
//           })
//           .catch(error => Promise.reject(error));
//       }

//       isRefreshing = true;

//       try {
//         const response = await axiosInstance.get('/auth/refresh'); // Your refresh token endpoint
//         const newToken = response.data.token;

//         // Optionally store the new token if you're using headers
//         axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;

//         processQueue(null, newToken);
//         return axiosInstance(originalRequest);
//       } catch (err) {
//         processQueue(err, null);
//         return Promise.reject(err);
//       } finally {
//         isRefreshing = false;
//       }
//     }

//     return Promise.reject(err);
//   }
// );

// export default axiosInstance;
