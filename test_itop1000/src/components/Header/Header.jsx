import React from 'react';
import { useSelector } from 'react-redux';

import euro from '../../images/euro.png';
import dollar from '../../images/usa.png';
import uah from '../../images/uah.png';
import exchange from '../../images/exchange.png';

import './Header.css';

const Header = () => {

    const exchangeValue = useSelector(state => state.exchange.exchange);
    const euroToUah = exchangeValue.length > 0 ? exchangeValue.find(currency => currency.cc === 'EUR') : 'Loading...';
    const dollarToUah = exchangeValue.length > 0 ? exchangeValue.find(currency => currency.cc === 'USD') : 'Loading...';

    return (
        <>
            <div className="header">
                <div className='header__euro'>
                    <div className="header__euro-currency">
                        <img src={euro} alt="euro" className='header-image'></img>
                        <span>1 €</span>
                    </div>
                </div>
                <div className="header__uah">
                    <div className="header__uah-currency">
                        <img src={exchange} alt="exchange" className='header-exchange'></img>
                        <span>{euroToUah.rate} ₴</span>
                        <img src={uah} alt="exchange" className='header-image small'></img>
                        <span>{dollarToUah.rate} ₴</span>
                        <img src={exchange} alt="exchange" className='header-exchange'></img>
                    </div>
                </div>
                <div className='header__dollar'>
                    <div className="header__dollar-currency">
                        <span>1 $</span>
                        <img src={dollar} alt="dollar" className='header-image'></img>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header