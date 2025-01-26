import { useState, useEffect } from "react";
import { useCart } from "../context/Context";
import { convertCurrency } from "../../utils/currencyConversion";

const PriceDisplay = ({ amount, toCurrency }) => {
  const { exchangeRates } = useCart();
  const [convertedPrice, setConvertedPrice] = useState(null);

  useEffect(() => {
    const convert = () => {
      if (exchangeRates && typeof amount === "number") {
        const result = convertCurrency(
          amount,
          "AED",
          toCurrency,
          exchangeRates
        );
        setConvertedPrice(result);
      } else {
        setConvertedPrice(amount);
      }
    };
    convert();
  }, [amount, "AED", toCurrency, exchangeRates]);

  const formatAmount = (amount, currency) => {
    if (typeof amount !== "number") {
      return amount;
    }

    const formattedAmount = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);

    return formattedAmount;
  };

  return (
    <div>
      <p className="text-[#1e4846] font-montserratSemiBold">
        {formatAmount(convertedPrice, toCurrency)}
      </p>
    </div>
  );
};

export default PriceDisplay;
