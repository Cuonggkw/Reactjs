import exios from "../axios";
const handleLoginAPI = (email, password) => {
  // Axios là HTTP Client giúp xây dựng các ứng dụng kết nối từ nhiều nguồn dữ liệu dễ dàng.
  return exios.post("/api/login", { email, password });
};

const getAllUsers = (inputId) => {
  return exios.get(`/api/get-all-users?id=${inputId}`);
};

const ceateNewUserSer = (data) => {
  return exios.post("/api/create-users", data);
};

const deleteUserSer = (usersId) => {
  return exios.delete("/api/delete-users", {
    data: {
      id: usersId,
    },
  });
  // return exios.delete("/api/delete-users", { id: usersId });
};

const editUserSer = (data) => {
  return exios.put("/api/edit-users", data);
};

export {
  handleLoginAPI,
  getAllUsers,
  ceateNewUserSer,
  deleteUserSer,
  editUserSer,
};

// axios => để request từ client lên server.
