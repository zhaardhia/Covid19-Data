/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */
import axios from "axios";
class DataSource {
  static async searchGlobal() {
    try {
      const response = await axios.get("https://covid-19-rest-api.herokuapp.com/all");

      return await Promise.resolve(response.data);
    } catch (error) {
      return await Promise.reject(error);
    }
  }
  static async searchCountry(keyword) {
    try {
      const response = await axios.get(`https://covid-19-rest-api.herokuapp.com/countries/${keyword}`);
      return await Promise.resolve(response.data);
    } catch (error) {
      return await Promise.reject(error);
    }
  }
  static async searchCountryName() {
    try {
      const response = await axios.get("https://covid-19-rest-api.herokuapp.com/countries");
      return await Promise.resolve(response.data);
    } catch (error) {
      return await Promise.reject(error);
    }
  }

  static async searchProvince(keyword) {
    try {
      const response = await axios.get(`https://apicovid19indonesia-v2.vercel.app/api/indonesia/provinsi/more?name=${keyword}`);
      return await Promise.resolve(response.data);
    } catch (error) {
      return await Promise.reject(error);
    }
  }
  static async searchProvinceName() {
    try {
      const response = await axios.get("https://apicovid19indonesia-v2.vercel.app/api/indonesia/provinsi/");
      return await Promise.resolve(response.data);
    } catch (error) {
      return await Promise.reject(error);
    }
  }

  static async searchVax() {
    try {
      const response = await axios.get("https://vaksincovid19-api.vercel.app/api/vaksin");
      return await Promise.resolve(response.data);
    } catch (error) {
      return await Promise.reject(error);
    }
  }
}

export default DataSource;


