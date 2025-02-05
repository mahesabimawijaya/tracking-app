import api from "@/lib/axios";

export async function getTraffics() {
  try {
    const { data } = await api.get("/locations");
    return data.data;
  } catch (error) {
    console.error(error);
  }
}
