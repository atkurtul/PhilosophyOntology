import axios from "axios";
import { BASE_URL, SAMPLE_ENDPOINT } from "./ApiConfig.js";

const queryDatabase = (data) => {
  return axios.post(BASE_URL + "/query/" + encodeURIComponent(data.queryString) , {});
};

const getClasses = () => {
  return axios.get(BASE_URL + "/get_classes", {});
};

const getIndivs = () => {
  return axios.get(BASE_URL + "/get_individuals", {});
};

const getRules = () => {
  return axios.get(BASE_URL + "/get_rules", {});
};

const createClassRequest = (data) => {
  return axios.post(
    BASE_URL + "/create_class/" + encodeURIComponent(data.superClass) + "/" + encodeURIComponent(data.name),
    {}
  );
};

const createIndivRequest = (data) => {
  return axios.post(
    BASE_URL + "/create_indiv/" +  encodeURIComponent(data.class) + "/" +  encodeURIComponent(data.name),
    {}
  );
};

const createRuleRequest = (data) => {
  return axios.post(BASE_URL + "/create_rule/" + encodeURIComponent(data), {});
};

export const OntoService = {
  queryDatabase,
  getClasses,
  getIndivs,
  getRules,
  createRuleRequest,
  createIndivRequest,
  createClassRequest,
};
