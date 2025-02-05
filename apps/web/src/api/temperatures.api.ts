import { Temperature } from "@/interface/temperature";
import api from "@/lib/axios";

export async function getTempReports() {
  try {
    const { data } = await api.get("/temperatures");
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function getHighestTemp() {
  try {
    const { data } = await api.get("/temperatures/max");
    return data.data as Temperature;
  } catch (error) {
    console.error(error);
  }
}

export async function getLowestTemp() {
  try {
    const { data } = await api.get("/temperatures/min");
    return data.data as Temperature;
  } catch (error) {
    console.error(error);
  }
}

export async function getAvgTemp() {
  try {
    const { data } = await api.get("/temperatures/avg");
    return data.data;
  } catch (error) {
    console.error(error);
  }
}
