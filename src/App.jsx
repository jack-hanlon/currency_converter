import './App.css';
import CurrencyInput from "./CurrencyInput";
import {useState, useEffect} from "react";
import axios from "axios";

function App() {

  const [amount1, setAmount1] = useState(1);
  const [amount2, setAmount2] = useState(1);
  const [currency1, setCurrency1] = useState('USD');
  const [currency2, setCurrency2] = useState('EUR');
  const [rates, setRates] = useState([]);
  const API_KEY = import.meta.env.VITE_SOME_KEY
  
  useEffect(() => {
    axios.get(`https://api.apilayer.com/fixer/latest?base=USD&apikey=${API_KEY}`)
      .then(response => {
        setRates(response.data.rates);
      })
      .catch(error => {
        console.error("Error fetching rates:", error);
      });
  }, []);

  useEffect(() => {
    if (!!rates) {
      function init() {
        hdlAmount1Change(1);
      }
      init();
    }
  }, [rates]);



  function format(number) {
    return number.toFixed(2);
  }

  function hdlAmount1Change(amount1) {
    setAmount2(format(amount1 * rates[currency2] / rates[currency1]));
    setAmount1(amount1);
  }

  function hdlCurrency1Change(currency1) {
    setAmount2(format(amount1 * rates[currency2] / rates[currency1]));
    setCurrency1(currency1);
  }

  function hdlAmount2Change(amount2) {
    setAmount1(format(amount2 * rates[currency1] / rates[currency2]));
    setAmount2(amount2);
  }

  function hdlCurrency2Change(currency2) {
    setAmount1(format(amount2 * rates[currency1] / rates[currency2]));
    setCurrency2(currency2);
  }


  return (
    <>
      <div className="container">
  <div className="card">
    <header className="card__header">
    <h2>Currency Converter</h2>
      <CurrencyInput
        onAmountChange={hdlAmount1Change}
        onCurrencyChange={hdlCurrency1Change}
        currencies={Object.keys(rates)}
        amount={amount1}
        currency={currency1} />
      <CurrencyInput
        onAmountChange={hdlAmount2Change}
        onCurrencyChange={hdlCurrency2Change}
        currencies={Object.keys(rates)}
        amount={amount2}
        currency={currency2} />
      <h4>Current rate: {rates[currency2]}</h4>
    </header>
  </div>
</div>
      
    </>
  );
}

export default App;