import axios from "axios";

export default axios.create({
  baseUrl: "https://61fd008cf62e220017ce428c.mockapi.io/TMT/:endpoint"
});
