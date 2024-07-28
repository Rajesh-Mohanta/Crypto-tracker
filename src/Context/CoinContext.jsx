import { createContext, useEffect, useState } from "react";

// Create the context
export const CoinContext = createContext();

// Context provider component
const CoinContextProvider = (props) => {
  const [allCoin, setAllCoin] = useState([]);
  const [currency, setCurrency] = useState({ name: "usd", symbol: "$" });
  const [error, setError] = useState(null); // Optional: To handle errors

  // Function to fetch coin data
  const fetchAllCoin = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-5fni3FqYF7n7fo92K3wDtagz",
      },
    };

    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`,
        options
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setAllCoin(data);
    } catch (err) {
      setError(err.message); // Set the error state
      console.error(err);
    }
  };

  // Fetch data when currency changes
  useEffect(() => {
    fetchAllCoin();
  }, [currency]);

  // Context value object
  const contextValue = {
    allCoin,
    currency,
    setCurrency,
    error, // Optional: To expose error state
  };

  // Provide the context value to children components
  return (
    <CoinContext.Provider value={contextValue}>
      {props.children}
    </CoinContext.Provider>
  );
};

export default CoinContextProvider;
