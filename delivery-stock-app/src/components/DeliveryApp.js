import React, { useState } from 'react'


import HeaderDelivery from './HeaderDelivery/HeaderDelivery'
import StockManagement from './PageDelivery/StockManagement'
import Search from './HeaderDelivery/Search'


import styled from 'styled-components' 

const DeliveryApp = () => {

    const [input, SetInput] = useState('');

    return (
            <Conteiner>
                <HeaderDelivery/>
                <Search/>
                <StockManagement
                input={input}
                SetInput={SetInput}
                />
            </Conteiner>
    )
}

export default DeliveryApp;

const Conteiner = styled.div`
    background: rgb(199, 199, 199); 
`;