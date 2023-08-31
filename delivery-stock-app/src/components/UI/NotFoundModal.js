import React from 'react';

//redux
import { useSelector } from 'react-redux';

//style
import styled from 'styled-components' 

const NotFoundModal = () => {

  const {searchProduct, currentData} = useSelector(state => state.stock);

  let modalTrigger  = '';

  if(currentData.length !== 0  ){
    modalTrigger =  
    <div className='not-found-modal text-center'> 
      <h3>Not Found</h3>
      <h4 className='text-danger'>{searchProduct}</h4>
      <h5>Try again</h5>
    </div>
}

  return (
    <Conteiner>
      {modalTrigger}
    </Conteiner>
  )
}

export default NotFoundModal;

const Conteiner = styled.div `
.not-found-modal{
  padding: 36vh;
}
`