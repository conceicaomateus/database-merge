import { Recommendation } from "../types/recommendation";

export const loadRecommendations = async () => {
  const response = await fetch("http://localhost:3000/recommendations");
  const recommendations = await response.json();
  return recommendations.data.items as Recommendation[];
};
