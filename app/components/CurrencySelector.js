import { useCart } from "../context/Context";

const CurrencySelector = () => {
  const { currency, switchCurrency }  = useCart();

  const handleCurrencyChange = (event) => {
    switchCurrency(event.target.value);
  };

  return (
    <div className="relative">
      <select
        value={currency}
        onChange={handleCurrencyChange}
        className="bg-primary focus:outline-none border-b p-2 text-black font-montserratMedium"
      >
        <option value="AED">AED</option>
        <option value="SAR">SAR</option>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="GBP">GBP</option>
        <option value="PKR">PKR</option>
      </select>
    </div>
  );
};

export default CurrencySelector;
