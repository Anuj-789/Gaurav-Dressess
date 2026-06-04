import api from "../api/axios";

// 🔥 Validate visitor from DB + sync localStorage
export const validateStoredVisitor = async () => {
  const visitorId = localStorage.getItem("visitorId");

  if (!visitorId) return false;

  try {
    const res = await api.get(`/customers/check/${visitorId}`);

    if (!res.data.exists) {
      localStorage.removeItem("visitorId");
      localStorage.removeItem("visitorName");
      return false;
    }

    return true;
  } catch (err) {
    console.log("Visitor validate error:", err);
    return false;
  }
};