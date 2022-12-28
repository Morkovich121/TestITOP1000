import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';

import exchange from '../../images/exchange.png';

import './Main.css';

const Main = () => {

    const [firstCurrency, setFirstCurrency] = useState("");
    const [firstValue, setFirstValue] = useState("UAH");
    const [secondCurrency, setSecondCurrency] = useState("");
    const [secondValue, setSecondValue] = useState("UAH");

    const exchangeValue = useSelector(state => state.exchange.exchange);
    const euroToUah = exchangeValue.length > 0 ? exchangeValue.find(currency => currency.cc === 'EUR').rate : 'Loading...';
    const dollarToUah = exchangeValue.length > 0 ? exchangeValue.find(currency => currency.cc === 'USD').rate : 'Loading...';
    const euroToDollar = euroToUah === 'Loading...' || dollarToUah === 'Loading...' ? 'Loading...' : (euroToUah / dollarToUah).toFixed(4);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const exchangeArray = {
        "UAH": { "UAH": 1, "EUR": (1 / euroToUah).toFixed(4), "USD": (1 / dollarToUah).toFixed(4) },
        "USD": { "UAH": dollarToUah, "EUR": (1 / euroToDollar).toFixed(4), "USD": 1 },
        "EUR": { "UAH": euroToUah, "EUR": 1, "USD": euroToDollar },
    }

    const changeFirstCurrency = useCallback((e) => {
        setFirstCurrency(e.target.value);
    }, [])

    const changeFirstValue = useCallback((e) => {
        setFirstValue(e.target.value);
    }, [])

    const changeSecondCurrency = useCallback((e) => {
        setSecondCurrency(e.target.value);
    }, [])

    const changeSecondValue = useCallback((e) => {
        setSecondValue(e.target.value);
    }, [])

    const exchangeFirstCurrency = useCallback((e) => {
        changeFirstCurrency(e);
        setSecondCurrency(e.target.value ? e.target.value * exchangeArray[firstValue][secondValue] : secondCurrency);
    }, [changeFirstCurrency, exchangeArray, firstValue, secondCurrency, secondValue])

    const exchangeSecondCurrency = useCallback((e) => {
        changeSecondCurrency(e);
        setFirstCurrency(e.target.value ? e.target.value * exchangeArray[secondValue][firstValue] : firstCurrency);
    }, [changeSecondCurrency, exchangeArray, firstValue, firstCurrency, secondValue])

    const exchangeFirstValue = useCallback((e) => {
        changeSecondValue(e);
        setSecondCurrency(firstCurrency ? firstCurrency * exchangeArray[firstValue][e.target.value] : secondCurrency);
    }, [exchangeArray, firstCurrency, secondCurrency, firstValue, changeSecondValue]);

    const exchangeSecondValue = useCallback((e) => {
        changeFirstValue(e);
        setFirstCurrency(secondCurrency ? secondCurrency * exchangeArray[secondValue][e.target.value] : firstCurrency);
    }, [exchangeArray, firstCurrency, secondCurrency, secondValue, changeFirstValue]);

    return (
        <>
            <div className="main">
                <input type="number" className='main-input' placeholder='Вкажіть кількість' value={firstCurrency} onChange={exchangeFirstCurrency} />
                <select className='main-select' value={firstValue} onChange={exchangeSecondValue}>
                    <option>UAH</option>
                    <option>USD</option>
                    <option>EUR</option>
                </select>
                <img src={exchange} alt="exchange" className='main-image' />
                <select className='main-select' value={secondValue} onChange={exchangeFirstValue}>
                    <option>UAH</option>
                    <option>USD</option>
                    <option>EUR</option>
                </select>
                <input type="number" className='main-input' placeholder='Вкажіть кількість' value={secondCurrency} onChange={exchangeSecondCurrency} />

            </div>
        </>
    )
}

export default Main;