import actionTypes from "./actionTypes";
import {
  getAllCodeService,
  ceateNewUserSer,
  getAllUsers,
  deleteUserSer,
  editUserSer,
  getTopDoctorHomeService,
  getAllDoctors,
  saveDetailDoctorService,
} from "../../services/userService";
import { toast } from "react-toastify";

export const fetchGenderStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.FETCH_GENDER_START });
      let res = await getAllCodeService("GENDER");
      if (res && res.errCode === 0) {
        dispatch(fetchGenderSuccess(res.data));
      } else {
        dispatch(fetchGenderFaided());
      }
    } catch (e) {
      dispatch(fetchGenderFaided());
      console.log("fetchGenderStart", e);
    }
  };
};

export const fetchGenderSuccess = (genderData) => ({
  type: actionTypes.FETCH_GENDER_SUCCESS,
  data: genderData,
});

export const fetchGenderFaided = () => ({
  type: actionTypes.FETCH_GENDER_FAILDED,
});

// POSITION
export const fetchPositionStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: actionTypes.FETCH_POSITION_START,
      });
      let res = await getAllCodeService("POSITION");
      if (res && res.errCode === 0) {
        dispatch(fetchPositionSuccess(res.data));
      } else {
        dispatch(fetchPositionFaided());
      }
    } catch (e) {
      dispatch(fetchPositionFaided());
      console.log("fetchGenderStart", e);
    }
  };
};

export const fetchPositionSuccess = (positionData) => ({
  type: actionTypes.FETCH_POSITION_SUCCESS,
  data: positionData,
});

export const fetchPositionFaided = () => ({
  type: actionTypes.FETCH_POSITION_FAILDED,
});

// ROLE
export const fetchRoleStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: actionTypes.FETCH_ROLE_START,
      });
      let res = await getAllCodeService("ROLE");
      if (res && res.errCode === 0) {
        dispatch(fetchRoleSuccess(res.data));
      } else {
        dispatch(fetchRoleFaided());
      }
    } catch (e) {
      dispatch(fetchRoleFaided());
      console.log("fetchGenderStart", e);
    }
  };
};

export const fetchRoleSuccess = (roleData) => ({
  type: actionTypes.FETCH_ROLE_SUCCESS,
  data: roleData,
});

export const fetchRoleFaided = () => ({
  type: actionTypes.FETCH_ROLE_FAILDED,
});

// CREATE
export const createNewUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await ceateNewUserSer(data);
      console.log("Hoi dan it check creat:", res);
      if (res && res.errCode === 0) {
        toast.success("👻 Create a new user success!");
        dispatch(saveUserSuccess());
        dispatch(fetchAllUsersStart());
      } else {
        dispatch(saveUserFailed());
      }
    } catch (e) {
      dispatch(saveUserFailed());
      console.log("saveUserFailed", e);
    }
  };
};

export const saveUserSuccess = () => ({ type: "CREATE_USER_SUCCESS" });
export const saveUserFailed = () => ({ type: "CREATE_USER_FAILDED" });

// EDIT
export const editAUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await editUserSer(data);
      console.log("Hoi dan it check edit:", res);
      if (res && res.errCode === 0) {
        toast.success("📩 Update a new user success!");
        dispatch(editUserSuccess());
        dispatch(fetchAllUsersStart());
      } else {
        dispatch(editUserFailed());
      }
    } catch (e) {
      toast.error("⛔ Update a new user error!");
      dispatch(editUserFailed());
      console.log("editUserFailed", e);
    }
  };
};

export const editUserSuccess = () => ({
  type: actionTypes.EDIT_USER_SUCCESS,
});
export const editUserFailed = () => ({
  type: actionTypes.EDIT_USER_FAILDED,
});

// DELETE
export const deleteAUser = (userId) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteUserSer(userId);
      // console.log("Hoi dan it check creat:", res);
      if (res && res.errCode === 0) {
        toast.success("👻 Delete a new user success!");
        dispatch(deleteUserSuccess());
        dispatch(fetchAllUsersStart());
      } else {
        toast.error("⛔ Delete a new user error!");
        dispatch(deleteUserFailed());
      }
    } catch (e) {
      toast.error("⛔ Delete a new user error!");
      dispatch(deleteUserFailed());
      console.log("saveUserFailed", e);
    }
  };
};

export const deleteUserSuccess = () => ({
  type: actionTypes.DELETE_USER_SUCCESS,
});
export const deleteUserFailed = () => ({
  type: actionTypes.DELETE_USER_FAILDED,
});

// ALL USER
export const fetchAllUsersStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllUsers("ALL");
      if (res && res.errCode === 1) {
        dispatch(fetchAllUserSuccess(res.users.reverse()));
      } else {
        dispatch(fetchAllUserFaided());
      }
    } catch (e) {
      dispatch(fetchAllUserFaided());
      console.log("fetchAllUserFaided", e);
    }
  };
};

export const fetchAllUserSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_USER_SUCCESS,
  users: data,
});
export const fetchAllUserFaided = () => ({
  type: actionTypes.FETCH_ALL_USER_FAILDED,
});
// start - doing - end

export const fetchTopDoctor = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getTopDoctorHomeService("");
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
          data: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_TOP_DOCTOR_FAILDED,
        });
      }
      // console.log("check res:", res);
    } catch (e) {
      console.log("FETCH_TOP_DOCTOR_FAILDED", e);
      dispatch({
        type: actionTypes.FETCH_TOP_DOCTOR_FAILDED,
      });
    }
  };
};

export const fetchAllDoctors = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllDoctors();
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALL_DOCTOR_SUCCESS,
          dataDoctors: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_ALL_DOCTOR_FAILDED,
        });
      }
      // console.log("check res:", res);
    } catch (e) {
      console.log("FETCH_TOP_DOCTOR_FAILDED", e);
      dispatch({
        type: actionTypes.FETCH_ALL_DOCTOR_FAILDED,
      });
    }
  };
};

export const saveDetailDoctor = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await saveDetailDoctorService(data);
      if (res && res.errCode === 0) {
        toast.success("👻 Save infor Detail Doctor success!");
        dispatch({
          type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
        });
      } else {
        toast.error("⛔ Save infor Detail Doctor error!");
        dispatch({
          type: actionTypes.SAVE_DETAIL_DOCTOR_FAILDED,
        });
      }
    } catch (e) {
      toast.error("⛔ Save infor Detail Doctor error!");
      console.log("SAVE_DETAIL_DOCTOR_FAILDED", e);
      dispatch({
        type: actionTypes.SAVE_DETAIL_DOCTOR_FAILDED,
      });
    }
  };
};
