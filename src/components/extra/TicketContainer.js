import React from 'react';
import './TicketContainer.css';
import Ticket from './Ticket';
const TicketContainer = ({ticketList}) => {
  return (
    <div className={"ticket_container_outer"}>
      {
        ticketList && ticketList.length > 0 ?
        <>
          <div>
          <h2 className={"ticket_headerStyle"}>Ticket History</h2>
          </div>
          <div className={"ticket_container"} >
            {ticketList.map((data, index)=>{
              return <Ticket key={`TD${data}_${index}`} ticketData={data}/>
            })}
          </div>
        </>
        : <></>
      }
    </div>
  )
}

export default TicketContainer
