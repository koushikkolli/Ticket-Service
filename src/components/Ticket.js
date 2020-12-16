import React from "react"

const Ticket = (props)=>{
    const renderedList = props.agents.map((agent, index)=>{
        return <option key={index} value={agent.name}>{agent.name}</option> 
    })

    const onPrioritySelect=(event)=>{
        const updatedObject = {
            priority : event.target.value
        }
        props.onTicketUpdate(props.ticket._id, updatedObject)
    }

    const onAssignSelect=(event)=>{
        const updatedObject = {
            agent : event.target.value
        }
        props.onTicketUpdate(props.ticket._id, updatedObject)
    }

    const onStatusSelect=(event)=>{
        const updatedObject = {
            status : event.target.value
        }
        props.onTicketUpdate(props.ticket._id, updatedObject)
    }

    return(
        <li className="list-group-item">
            <table width="100%">
                <tbody>
                <tr>
                    <td width="40%"> 
                        <h3>{props.ticket.subject}</h3>
                        <p>{props.ticket.contact}</p>
                    </td>
                    <td style={{margin:"10px", padding:"20px"}}>
                        <div className="form-group">
                            <label htmlFor="ticketPriority">Priority</label>
                            <select onChange={(e)=>onPrioritySelect(e)} type="text" className="form-control" id="ticketPriority" value={props.ticket.priority}>
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                            </select>
                         </div>
                    </td>
                    <td style={{margin:"10px", padding:"20px"}}>
                        <div className="form-group">
                            <label htmlFor="ticketAssiged">Assign</label>
                            <select onChange={(e)=>onAssignSelect(e)} type="text" className="form-control" id="ticketAssiged" value={props.ticket.agent}>
                                <option value="">--Select agent--</option>
                                {renderedList}
                            </select>
                         </div>
                    </td>
                    <td style={{margin:"10px", padding:"20px"}}>
                    <div className="form-group">
                            <label htmlFor="ticketStatus">Status</label>
                            <select onChange={(e)=>onStatusSelect(e)} type="text" className="form-control" id="ticketStatus" value={props.ticket.status}>
                                <option value="Open">Open</option>
                                <option value="On going">On going</option>
                                <option value="Closed">Closed</option>
                            </select>
                         </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </li>
    )
}

export default Ticket