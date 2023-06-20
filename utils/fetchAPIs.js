const axios = require("axios");
import { toast } from "react-toastify";

export const postAPI = (path, body, token) => {
  console.log(`${process.env.NEXT_PUBLIC_BACKEND_API}/${path}`);

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${process.env.NEXT_PUBLIC_BACKEND_API}/${path}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: JSON.stringify(body),
  };

  return axios(config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      toast.error("Something went wrong! Please contact to the administrator");
      console.log(error);
    });
};

export const getAPI = (path, token) => {
  let config = {
    method: "GET",
    maxBodyLength: Infinity,
    url: `${process.env.NEXT_PUBLIC_BACKEND_API}/${path}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  return axios(config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error.response.data.errors);
      toast.error(
        "Something went wrong! Please contact to the administrator",
        error.response.data.errors
      );
    });
};

export const putAPI = (path, body, token) => {
  let config = {
    method: "PUT",
    maxBodyLength: Infinity,
    url: `${process.env.NEXT_PUBLIC_BACKEND_API}/${path}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: JSON.stringify(body),
  };

  return axios(config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      toast.error("Something went wrong! Please contact to the administrator");
      console.log(error);
    });
};
