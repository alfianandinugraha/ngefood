import axios from "axios";

const clientMeal = () => {
  const instance = axios.create({
    baseURL: "https://www.themealdb.com/api/json/v1/1/",
  });
  return instance;
};

export default clientMeal;
