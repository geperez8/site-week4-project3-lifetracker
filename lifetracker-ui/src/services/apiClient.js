import axios from "axios";

class ApiClient {
  constructor(remoteHostUrl) {
    this.remoteHostUrl = remoteHostUrl;
    this.token = null;
    this.tokenName = "LifetrackerToken";
  }

  setToken(token) {
    this.token = token;
    localStorage.setItem(this.tokenName, token);
  }

  async request({ endpoint, method = "GET", data = {} }) {
    const url = `${this.remoteHostUrl}/${endpoint}`;

    const headers = {
      "Content-Type": "application/json",
    };

    if (this.token) {
      headers["Authorization"] = `Bearer ${this.token}`;
    }

    try {
      const res = await axios({ url, method, data, headers });
      return { data: res.data, error: null };
    } catch (error) {
      console.error({ errorResponse: error.response });

      const message = error?.response?.data?.error?.message;

      return { data: null, error: message || String(error) };
    }
  }

  async loginUser(credentials) {
    return await this.request({
      endpoint: "auth/login",
      method: "POST",
      data: credentials,
    });
  }

  async registerUser(credentials) {
    return await this.request({
      endpoint: "auth/register",
      method: "POST",
      data: credentials,
    });
  }

  fetchUserFromToken = async () => {
    return await this.request({ endpoint: "auth/me", method: "GET" });
  };

  postNutrition = async (nutritionInfo) => {
    return await this.request({
      endpoint: "nutrition",
      method: "POST",
      data: nutritionInfo,
    });
  };

  fetchUserNutrition = async (id) => {
    return await this.request({
      endpoint: `nutrition/${id}`,
      method: "GET"
    });
  };
}

export default new ApiClient("http://localhost:3001");
