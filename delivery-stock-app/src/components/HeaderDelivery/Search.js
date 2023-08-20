import React from 'react'
import SearchProducts from './SearchProduct';
import SearchProductsByTags from './SearchProductsByTags';
import SearchProductsInStock from './SearchProductsInStock';

//style
import styled from 'styled-components' 
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';

const Search = (props) => {
    
    return (
        <Conteiner className=''>
            <ButtonToolbar  className="m-3 laptop" aria-label="Toolbar with Button groups">
                <SearchProducts/>
                <SearchProductsInStock/>
                <SearchProductsByTags/>
            </ButtonToolbar>
        </Conteiner>
    )
}

export default Search;

const Conteiner = styled.div `

.laptop{
    display:flex;
    justify-content: space-between;

    div.row {
        margin-left: 0.1rem;
    }

    @media(max-width: 1124px) {    
    flex-direction: column;
    div{
        padding-top: 0.3rem;
        
    }
    div.row {
        width: 20%;
    }
    @media(max-width: 700px) {
        input{
            font-size: 10px;
        }
        label{
            font-size: 10px;
        }
    }
    @media(max-width: 548px) {
        input{
            font-size: 10px;
        }
        label{
            font-size: 8px;
        }
    }
    @media(max-width: 481px) {
        input{
            font-size: 7px;
        }
        label{
            font-size: 7px;
        }
    }
    @media(max-width: 400px) {
        input{
            font-size: 6px;
        }
        label{
            font-size: 6px;
        }
    }
    
} 
}
       
`;
