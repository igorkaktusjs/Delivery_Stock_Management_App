import React, { useEffect, useState } from 'react'
import { useHttp } from '../hook/useHttp'

//redux
import { useDispatch, useSelector } from 'react-redux'
import { fetchFilters } from '../store/filterSlice'
import { filterTags } from '../store/stockSlice'

//style
import Spinner from '../UI/spinner';
import styled from 'styled-components'  

//bootstrap
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

    const SearchProductsByTags = () => {

        const [tagValue, setTagValue] = useState('1');

        const dispatch = useDispatch();
        const {request} = useHttp();

        const {filters, filtersLoadingStatus} = useSelector(state => state.filters);

        useEffect(() => {
            dispatch(fetchFilters(request));
        }, []);

        if (filtersLoadingStatus === "loading") {
            return <Spinner/>;
        } else if (filtersLoadingStatus === "error") {
            return <h5 className="text-center mt-5">Error</h5>
        }
    
        const renderFilters = (tag) => {
            if (tag === '') {
                return <h5 className="text-center mt-5">Not found</h5>
            }
    
            return tag.map(({id,name,type}) => {

                    return <ToggleButton
                            id={`radio-${id}`}
                            type="radio"
                            variant="success"
                            size="sm"
                            key={id}
                            value={name}
                            checked={tagValue === name}
                            onChange={(e) => setTagValue(e.currentTarget.value)}
                            onClick={() => dispatch(filterTags(type))}
                            >
                            {name}
                            </ToggleButton>
                    }
                )
        }
    
        const elements = renderFilters(filters);

    return (    
        <Conteiner >
            <ButtonGroup className="me-2 search-products-by-tag" aria-label="First group mg='20'">
                {elements}
            </ButtonGroup>
        </Conteiner>
    )
}

export default SearchProductsByTags;

const Conteiner = styled.div `
@media only screen and (min-width: 768px) and (max-width: 1120px)    {
    
    padding-top: 1rem;
    
    }
    
}

`;