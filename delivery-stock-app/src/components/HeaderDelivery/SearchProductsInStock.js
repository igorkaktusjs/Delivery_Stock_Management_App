import React, { useEffect, useState } from 'react'
import { useHttp } from '../hook/useHttp'

//redux
import { useDispatch, useSelector } from 'react-redux'
import { fetchFiltersStock, currentFilterStockTags } from '../store/allProductsStockSlice'

//style
import styled from 'styled-components' 
import Spinner from '../UI/spinner'

//bootstrap
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

const SearchProductsInStock = (props) => {

    const [radioValue, setRadioValue] = useState('1');

    const dispatch = useDispatch();
    const {request} = useHttp();

    const {filters, filtersLoadingStatus} = useSelector(state => state.filterStock);

    useEffect(() => {
        dispatch(fetchFiltersStock(request));
    }, []);

    if (filtersLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (filtersLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Error</h5>
    }

    const renderStockFilters = (tag) => {

        if (tag === '') {
            return <h5 className="text-center mt-5">not found</h5>
        }

        return tag.map(({id,name, type}) => {

                return <ToggleButton
                        id={`radio-${id}`}
                        type="radio"
                        variant="dark" 
                        size="sm"
                        key={id}
                        value={name}
                        checked={radioValue === name}
                        onChange={(e) => setRadioValue(e.currentTarget.value)}
                        onClick={() => dispatch(currentFilterStockTags(type))}
                        >
                        {name}
                        </ToggleButton>
                }
            )
    }
    
    const elements = renderStockFilters(filters);

    return (
        <Conteiner >
                <ButtonGroup aria-label="First group" className='search-stock'>
                    {elements}
                </ButtonGroup>
        </Conteiner>
    )
}

export default SearchProductsInStock;

const Conteiner = styled.div `



`;