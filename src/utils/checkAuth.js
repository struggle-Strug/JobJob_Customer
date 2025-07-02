import axios from "axios";

const checkAuth = () => {
  /*  Getting token value stored in localstorage, if token is not present we will open login page 
      for all internal dashboard routes  */
  const TOKEN = localStorage.getItem("token");
  const PUBLIC_ROUTES = [
    "/",
    "/members/sign_in",
    "/members/forgot-password",
    "/members/sign_up",
  ];
  
  const isPublicPage = PUBLIC_ROUTES.includes(window.location.pathname);

  axios.interceptors.request.use(
    function (config) {  
      // UPDATE: Add this code to show global loading indicator
      // document.body.classList.add("loading-indicator");
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    function (response) {
      // UPDATE: Add this code to hide global loading indicator
      // document.body.classList.remove("loading-indicator");
      return response;
    },
    function (error) {
      // document.body.classList.remove("loading-indicator");
      if (error.response?.status === 401) {
        delete axios.defaults.headers.common["Authorization"];
        window.location.href = "/";
        }
      return Promise.reject(error);
    }
  );

  if (!TOKEN && !isPublicPage) {
    return;
  } else {
    axios.defaults.headers.common["Authorization"] = `${TOKEN}`;

    return TOKEN;
  }
};

export default checkAuth;