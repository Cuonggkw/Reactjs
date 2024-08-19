import axios from "axios";
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
};

const getAllCodeService = (inputType) => {
  return exios.get(`/api/allcode?type=${inputType}`);
};

const editUserSer = (data) => {
  return exios.put("/api/edit-users", data);
};

// const getTopDoctorHomeService = (limit) => {
//   // return axios.get(`/api/topdoctor-home?limit=${limit}`);
//   return exios.get(`/api/topdoctor-home?limit=${limit}`, function (req, res) {
//     res.sendFile(__dirname + "/bin/index.html"); // change the path to your index.html
//   });
// };
const getTopDoctorHomeService = (limit) => {
  return exios.get(`/api/topdoctor-home?limit=${limit}`);
};

const getAllDoctors = () => {
  return exios.get(`/api/get-all-doctor`);
};

const saveDetailDoctorService = (data) => {
  return exios.post("/api/save-infor-doctor", data);
};

const getDetailInforDoctor = (id) => {
  return exios.get(`/api/get-detail-doctor-by-id?id=${id}`);
};

const saveBulkCreateSchedule = (data) => {
  return exios.post("/api/bulk-create-schedule", data);
};

const getScheduleDoctorByDate = (doctorId, date) => {
  return exios.get(
    `/api/get-schedule-bydate?doctorId=${doctorId}&date=${date}`
  );
};

const getExtraInforDoctorById = (doctorId) => {
  return exios.get(`/api/get-extra-doctor-infor-by-id?doctorId=${doctorId}`);
};

const getProfileDoctorById = (doctorId) => {
  return exios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`);
};

export {
  handleLoginAPI,
  getAllUsers,
  ceateNewUserSer,
  deleteUserSer,
  getAllCodeService,
  editUserSer,
  getTopDoctorHomeService,
  getAllDoctors,
  saveDetailDoctorService,
  getDetailInforDoctor,
  saveBulkCreateSchedule,
  getScheduleDoctorByDate,
  getExtraInforDoctorById,
  getProfileDoctorById,
};

// axios => để request từ client lên server.
