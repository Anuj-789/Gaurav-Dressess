export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch("http://localhost:5000/api/upload", {
    method: "POST",
    body: formData,
  });

  const data = await res.json();

  console.log("🔥 RAW RESPONSE:", data);

  return data.url;
};