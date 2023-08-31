import React from 'react';

//redux
import { useSelector } from 'react-redux';

//style
import './NotFoundModal.css'
import styled from 'styled-components' 
import {CSSTransition, TransitionGroup} from 'react-transition-group';


const NotFoundModal = () => {

  const {searchProduct, currentData} = useSelector(state => state.stock);

  let modalTrigger  = '';

  if(currentData.length !== 0  ){
    modalTrigger = 
    <CSSTransition in={true} timeout={300} classNames="item-not-found" >
        <div className='not-found-modal text-center'> 
      <h3>Not Found</h3>
      <h4 className='text-danger'>{searchProduct}</h4>
      <h5>Try again</h5>
    </div>
    </CSSTransition> 
  
}

  return (
    <TransitionGroup>
      <Conteiner>
        {modalTrigger}
      </Conteiner>
    </TransitionGroup>
  )
}

export default NotFoundModal;

const Conteiner = styled.div `
.not-found-modal{
  padding: 36vh;
}
`