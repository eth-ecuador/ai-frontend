import axios from 'axios';

// Assuming your API base URL is configured somewhere
const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:8000';

// Type for the Agent
export interface Agent {
  id: string;
  name: string;
  description: string;
  index_name: string;
  image_url?: string;
}

// Get a single agent by ID
export const getAgentById = async (agentId: string): Promise<Agent> => {
  try {
    const response = await axios.get<Agent>(`${API_BASE_URL}/agents/${agentId}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new Error(`Agent with ID ${agentId} not found`);
      }
      throw new Error(`Failed to fetch agent: ${error.message}`);
    }
    throw error;
  }
};

// Get all agents
export const getAgents = async (): Promise<Agent[]> => {
  try {
    const response = await axios.get<Agent[]>(`${API_BASE_URL}/agents`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Failed to fetch agents: ${error.message}`);
    }
    throw error;
  }
};