import React, { useState, useEffect} from "react"
import AddContactModal from "./AddContactModal"
import AddTicketModal from "./AddTicketModal"
import AddAgentModal from "./AddAgentModal"
import TicketList from "./TicketList"
import nodeConnect from "../apis/nodeConnect"


const App = ()=>{
    const [tickets, setTickets] = useState([])
    const [agents, setAgents] = useState([])
    const [contacts, setContacts] = useState([])

    const fetchTickets = async()=>{
        try{

            const response = await nodeConnect.get("/get-tickets")
            setTickets(response.data.data)

        }
        catch(err){

        }
    }

    const fetchContacts = async()=>{
        try{
            const response = await nodeConnect.get("/get-contacts")
            setContacts(response.data.data)

        }
        catch(err){
            
        }

    }

    const fetchAgents = async()=>{
        try{
            const response = await nodeConnect.get("/get-agents")
            setAgents(response.data.data)
        }
        catch(err){
            
        }

    }

    useEffect(()=>{
        fetchTickets()
        fetchContacts()
        fetchAgents()
    }, [])

    const onTicketUpdate = async(id, updatedObject)=>{
        try{
            await nodeConnect.put(`/update-ticket/${id}`, updatedObject)
            fetchTickets()

        }
        catch(err){
            
        }
    }

    const onTicketAdd = ()=>{
        fetchTickets()
    }

    const onContactAdd = ()=>{
        fetchContacts()
    }
    const onAgentAdd = ()=>{
        fetchAgents()
    }

    return (
        <div className="container">
            <AddContactModal onContactAdd={onContactAdd}/>
            <AddTicketModal contacts={contacts} onTicketAdd={onTicketAdd}/>
            <AddAgentModal onAgentAdd={onAgentAdd}/>
            <div className="d-flex justify-content-center">
                <button type="button" className="btn btn-primary" style={{margin:"20px"}} data-toggle="modal" data-target="#addTicketModal">Add Ticket</button>
                <button type="button" className="btn btn-primary" style={{margin:"20px"}} data-toggle="modal" data-target="#addContactModal">Add Contact</button>
                <button type="button" className="btn btn-primary" style={{margin:"20px"}} data-toggle="modal" data-target="#addAgentModal">Add Agent</button>
            </div>
            <TicketList tickets={tickets} agents={agents} onTicketUpdate={onTicketUpdate}/>
        </div>
    )
    
    
}

export default App