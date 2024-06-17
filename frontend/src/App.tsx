import { useEffect, useState } from "react";
import { loadRecommendations } from "./services/load-recommendations";
import { Recommendation } from "./types/recommendation";
import { money } from "./masks/money";

export function App() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRecommendations()
      .then((recommendations) => {
        setRecommendations(recommendations);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center text-white">Carregando...</div>;
  }

  return (
    <div className="relative overflow-x-auto p-2">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mt-2">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Nome do amigo
            </th>
            <th scope="col" className="px-6 py-3">
              Nome do cliente
            </th>
            <th scope="col" className="px-6 py-3">
              Compra do cliente
            </th>
            <th scope="col" className="px-6 py-3">
              Valor da compra
            </th>
          </tr>
        </thead>
        <tbody>
          {recommendations.map((recommendation, index) => (
            <tr
              key={index}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {recommendation.friendName}
              </th>
              <td className="px-6 py-4">{recommendation.name}</td>
              <td className="px-6 py-4 whitespace-pre-line">
                {recommendation.products?.map((p) => p + "\n")}
              </td>
              <td className="px-6 py-4 whitespace-pre-line">
                {recommendation.values?.map((v) => money(v) + "\n")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
