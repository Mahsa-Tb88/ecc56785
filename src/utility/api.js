import axios from "axios";
axios.defaults.baseURL = "https://aircall-backend.onrender.com";

export async function getAllCalls() {
  try {
    const { data } = await axios.get("/activities");
    return data;
  } catch (err) {
    return { success: false, message: err.data };
  }
}

export async function getDetailCall(id) {
  try {
    const { data } = await axios.get(`/activities/${id}`);

    return data;
  } catch (err) {
    return { success: false, message: err.data };
  }
}
export async function updateArchiveCall(id, is_archived) {
  try {
    const { data } = await axios.patch(`/activities/${id}`, { is_archived });
    return data;
  } catch (err) {
    return { success: false, message: err.data };
  }
}

export async function unArchiveAllCalls() {
  try {
    const { data } = await axios.patch(`/reset`);
    return data;
  } catch (err) {
    return { success: false, message: err.data };
  }
}
