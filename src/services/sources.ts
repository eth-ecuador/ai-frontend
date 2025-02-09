import axios from "axios";

interface URLSourceFormData {
  url: string;
  agentId: string;
}

const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:8000';

export const postDocument = async (data: URLSourceFormData) => {
  const trimmedUrl = data.url.trim();
  const agentId = data.agentId;

  if (!trimmedUrl) {
    throw new Error("Please enter a valid URL");
  }

  try {
    new URL(trimmedUrl);
  } catch {
    throw new Error("Please enter a valid URL");
  }

  try {
    const response = await axios.post(
      `/stores/urls`,
      {
        urls: [trimmedUrl],
        user_id: agentId,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log(response.data);

    return { response: response.data };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to upload source"
      );
    }
    throw new Error("Failed to upload source");
  }
};

export interface Source {
  id: string;
  url: string;
  source: string;
  type: string;
}

export const getSourcesByAgentId = async (agentId: string): Promise<Source[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/stores/docs?agent_id=${agentId}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Failed to fetch sources: ${error.message}`);
    }
    throw error;
  }
};
