import { Temperature } from "@/interface/temperature";

export async function getTempReports() {
  try {
    const res = await fetch("http://localhost:8000/temperatures");
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function getHighestTemp() {
  try {
    const res = await fetch("http://localhost:8000/temperatures/max");
    const data = await res.json();
    return data.data as Temperature;
  } catch (error) {
    console.error(error);
  }
}

export async function getLowestTemp() {
  try {
    const res = await fetch("http://localhost:8000/temperatures/min");
    const data = await res.json();
    return data.data as Temperature;
  } catch (error) {
    console.error(error);
  }
}

export async function getAvgTemp() {
  try {
    const res = await fetch("http://localhost:8000/temperatures/avg");
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error(error);
  }
}
