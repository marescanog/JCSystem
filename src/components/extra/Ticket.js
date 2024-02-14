import React from 'react';
import './Ticket.css';

const Ticket = ({ticketData}) => {

  return (
    <div className={"card"}>
      <div className={"ticket_header"}>
        <div><p>TICKET NO: {ticketData?.ticketID}</p></div>
        <div className={'date_container'}><p>TIME: {ticketData?.dateTime}</p></div>
      </div>
      <div className={"ticket_main_section"}>
        <div>
          <p>Picked Numbers:</p>
        </div>
        <div>
          <ul className='no-bullets'>
            {
              ticketData.selectedNums.map((num, index)=>{
                return <li key={`${ticketData?.ticketID}-${index}`}>{num}</li>
              })
            }
          </ul>
        </div>
      </div>
      <div className={"ticket_footer"}>
        <div><p>Total Cashout</p></div>
        <div><p>{ticketData?.totalCashout}</p></div>
      </div>
    </div>
  )
}

export default Ticket
