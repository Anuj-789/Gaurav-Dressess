export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/upload`, {
    method: "POST",
    body: formData,
  });

  const data = await res.json();

  console.log("🔥 RAW RESPONSE:", data);

  return data.url;
};