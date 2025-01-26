// utils/fetchECBExchangeRates.js
export const fetchECBExchangeRates = async () => {
    // const url = `https://api.exchangeratesapi.io/latest?access_key=2aa410b8f85b13d75b647057b4dc7b75`;
    const url = `https://api.exchangeratesapi.io/latest?access_key=a3975b7755902fa05ce70ed4c9454574`;
  
    try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Failed to fetch ECB exchange rates:', error.message);
        return null;
      }
    };