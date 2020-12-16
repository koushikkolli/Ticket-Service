import React from "react"
import Ticket from "./Ticket"

const TicketList = (props)=>{
   const renderedList = props.tickets.map((ticket, index)=>{
       return <Ticket key={index} ticket={ticket} agents={props.agents} onTicketUpdate={props.onTicketUpdate} />
   })
   if(renderedList.length > 0){
    return(
            <div>
                <h2>Tickets</h2>
                <ul className="list-group list-group-flush">{renderedList}</ul>
            </div>
        )
   }
   else{
    return(
        <div>
            <ul className="list-group list-group-flush">{renderedList}</ul>
        </div>
    ) 
   }
}

export default TicketList