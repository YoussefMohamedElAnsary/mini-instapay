import axios from "axios";

const Transactionapi = axios.create({
  baseURL: "api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default Transactionapi;
