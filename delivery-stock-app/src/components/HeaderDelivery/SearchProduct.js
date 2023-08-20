import React from 'react'

//redux
import { useSelector, useDispatch } from 'react-redux';
import { searchProduct} from '../store/stockSlice'

//style
import styled from 'styled-components' 
import Form from 'react-bootstrap/Form';

const SearchProducts = (props) => {

    const dispatch = useDispatch();

    const input = useSelector(state => state.stock.searchProduct)

    const InputHandler = (e) => {
        dispatch(searchProduct(e.target.value.toLowerCase()))};
    
    return (
    <Conteiner className='row'>
        <Form.Control 
        size="sm" 
        type="text" 
        placeholder="Search"
        onChange={InputHandler}
        value={input}
        />
    </Conteiner>
    )
}

export default SearchProducts;

const Conteiner = styled.div ``;