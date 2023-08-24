import React, {useState} from 'react'
import NotFoundModal from '../UI/NotFoundModal';
import Spinner from '../UI/spinner';

//style
import styled from 'styled-components' 
import Button from 'react-bootstrap/Button';
import { BsFillArrowLeftSquareFill, BsFillArrowRightSquareFill } from 'react-icons/bs'

//redux
import { useSelector, useDispatch } from 'react-redux';
import {
    onlineAll,
    deliveryAll,
    fetchStock,
    currentUpdateData,
    onlineItemTrigger,
    deliveryItemTrigger
  } from '../store/stockSlice'

import {
    useGetAllStockQuery,
    useTriggerItemDeliveryMutation,
    useTriggerItemOnlineMutation,
    useTriggerAllOnlineMutation,
    useTriggerStockOnlineMutation
    } from '../store/ApiSlice';

const StockManagement = (props) => {

  const [updateAllDate, setUpdateAllDate] = useState([])

  const { data, searchProduct, currentFilterTag, currentData,stockOnline, stockDelivery} = useSelector(state => state.stock);
  const { filtersStock } = useSelector(state => state.filterStock);

  
  const {
    data: getAllStock,
    isLoading,
    isError,
}  = useGetAllStockQuery();

 const [triggerItemDelivery]  = useTriggerItemDeliveryMutation();
 const [triggerItemOnline]  = useTriggerItemOnlineMutation();
 const [triggerAllOnline] = useTriggerAllOnlineMutation();
 const [triggerStockOnline] = useTriggerStockOnlineMutation();

  const dispatch = useDispatch();

    const DeliveryAllTrigger = () => {
      dispatch(deliveryAll());
    }

      if(isLoading){
        return <Spinner/>
      }else if(isError) {
        return <h5>Error</h5>
      }
      let searchData = '';
      searchData = getAllStock.filter(item => item.name.toLowerCase().includes(searchProduct));
  
      
      let filterTagData = '';
      if (currentFilterTag === 'All'){
         filterTagData = searchData;
      } else {
        filterTagData = searchData.filter(item => item.type === currentFilterTag)      
      }

      let filterStockData = '';
      if(filtersStock === 'All') {
        filterStockData = filterTagData;
      } else {
        filterStockData = filterTagData.filter(item => item.online === filtersStock || item.delivery === filtersStock )
      } 
      console.log(filterStockData);

     const chendgeAllOnline = () => {
       let updateData = [];
      filterStockData.map(item => {
        updateData =  item.online ===!item.online
        return updateData;
      
       })
       console.log(updateData);
       setUpdateAllDate(updateData);
       triggerStockOnline(!stockOnline);
       console.log(stockOnline);
      
      }
       
       
     
        


      // useEffect(()=>{
      //   dispatch(currentUpdateData(filterStockData));
      // },[searchProduct, currentFilterTag, filtersStock])

        
      let products = '';

      if(currentData.length === 0 || isLoading ) {
        return <NotFoundModal/>
      } else {
        products = filterStockData.map(item => (
          <tr key={item.id}>
              <th scope="row">{item.name}</th>
              <td>{item.type}</td>
              <td className='tags'>{item.tags.map((tag,i) => (<p key={tag[i]}>{tag}</p>))}</td>
              <td><Button
                  onClick={() => triggerItemOnline({id: item.id, online: !item.online })} 
                  className={item.online ? 'green btn btn-success' : 'red btn btn-success'}>
                  {item.online ? 'On' : 'Off'}
                  </Button></td>
              <td><Button
                  onClick={() => triggerItemDelivery({id: item.id, delivery: !item.delivery})}
                  className={item.delivery ? 'green btn btn-success' : 'red btn btn-success'}>
                  {item.delivery ? 'On' : 'Off'}
                  </Button></td>
          </tr>
      ));

      }
  
    let renderData = '';
    
      renderData = <div className='title-stock'>
      <table>
        <thead>
            <tr>
            <th scope="col">Name</th>
            <th scope="col">Type</th>
            <th scope="col">Tags</th>
            <th scope="col">Online<p> 
                <Button
                className={stockOnline ? 'green btn btn-success' : 'red btn btn-success'}
                onClick={chendgeAllOnline}>
                {stockOnline ? 'All on' : 'All off'}
                </Button> 
                </p>
                </th>
            <th scope="col">Delivery<p> 
                <Button
                className={stockDelivery ? 'green btn btn-success' : 'red btn btn-success'}
                onClick={DeliveryAllTrigger}>
                {stockDelivery ? 'All on ' : 'All off'}
                </Button> 
                </p>
                </th>
            </tr>
        </thead>
        <tbody>
          {products}
        </tbody>
        <tfoot>
                <tr>
                <td colSpan="3"><BsFillArrowLeftSquareFill/></td>
                <td colSpan="0"><BsFillArrowRightSquareFill/></td>
                </tr>
            </tfoot>
        </table>
    </div>

      return (
        <Conteiner>
          {renderData}
        </Conteiner>
    )
  }  


export default StockManagement;

const Conteiner = styled.div `


    .title-stock{
        background: rgb(244, 242, 245, 0.9);
        margin: 1rem;
    }
    
    caption{
        color: #000000;
        font-size: 1.3rem;
        padding: 1rem
    }

    table{
        table-layout: fixed;
        width: 100%;
        border-collapse: collapse;
    }

      thead th:nth-child(1) {
        width: 30%;
      }
      
      thead th:nth-child(2) {
        width: 10%;
      }
      
      thead th:nth-child(3) {
        width: 30%;
      }
      
      thead th:nth-child(4) {
        width: 15%;
      }

      thead th:nth-child(5) {
        width: 15%;
      }
      
      th, td {
        padding: 1.3rem;
        text-align: center;
        color: #000000;
        border-bottom: 1px solid gray;
      }

      thead, tfoot {
        color: #000000;
        text-shadow: 1px 1px 1px black;
      }

      tbody tr:nth-child(odd) {
        background-color: rgba(242, 241, 241);
      }
      
      tbody tr:nth-child(even) {
        background-color: rgba(224, 220, 220, 0.3);
      }

      button{
          padding: 0.5rem 2rem;
          border: none;
          cursor: pointer;
          color: #fff;
      }

      p button{
          margin-top: 1rem;
      }

      .red{
        background-color: red;
      }

      .green{
        background-color: green;
      }

      .not-found{
        height: 80vh;
        padding: 15rem;
      }
      
      @media(max-width: 1005px) {
        font-size: 14px;
        button{
          font-size: 12px;
          padding: 0.6rem 1.7rem;
        }
      }

      @media(max-width: 700px){
        font-size: 12px;
        button{
          font-size: 10px;
          padding: 0.4rem 1.4rem;
        }
        th{
          padding: 0.3rem;
        }
      }

      @media(max-width: 590px){
        font-size: 10px;
      button{
        font-size: 8px;
        padding: 0.3rem 1.3rem;
      }
      th, td{
        padding: 0.1rem;
        }
      }

      @media(max-width: 400px){
        font-size: 9px;
      
      button{
        font-size: 6px;
        padding: 0.2rem 1.1rem;
      }
      th, td{
        padding: 0.1rem;
      }
      }
      
`;