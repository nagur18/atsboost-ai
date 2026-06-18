import axios from "axios";

export async function getRoadmap(
  skills: string[]
) {
  const response =
    await axios.post(
      "http://localhost:8000/roadmap",
      {
        skills,
      }
    );

  return response.data;
}