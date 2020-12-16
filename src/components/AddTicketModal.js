import React, {useState} from "react"
import nodeConnect from "../apis/nodeConnect"

const AddTicketModal = (props)=>{
    const [contact, setContact] = useState("")
    const [subject, setSubject] = useState("")
    const [priority, setPriority] = useState("")
    const [alert, setAlert] = useState({
        class:"d-none alert alert-success alert-dismissible fade show",
        status:"Success",
        message:"Ticket Added"
    })
    const renderedList = props.contacts.map((contact, index) =>{
        return <option key={index} value={contact.email}>{contact.email}</option> 
    })

    const onContactChange = (event)=>{
        setContact(event.target.value)
    }

    const onSubjectChange = (event)=>{
        setSubject(event.target.value)
    }

    const onPriorityChange = (event)=>{
        setPriority(event.target.value)
    }
    const setDefault =()=>{
        setContact("")
        setSubject("")
        setPriority("")
        setAlert({
            class:"d-none alert alert-danger alert-dismissible fade show",
            status:"Error",
            message:"Not able to add"
        })
    }

    const onTicketCreate = async(event)=>{
        event.preventDefault()
        const returnObject = {
            contact: contact,
            subject: subject,
            priority: priority,
            agent: "",
            status: "Open"
        }
        try{
            const response = await nodeConnect.post("/add-ticket", returnObject)
            if (response.status === 200){
                props.onTicketAdd()
                setAlert({
                    class:"alert alert-success alert-dismissible fade show",
                    status:"Success",
                    message:"Ticket added"
                })
            }
            else{
                setAlert({
                    class:"alert alert-danger alert-dismissible fade show",
                    status:"Error",
                    message:"Not able to add"
                })
            }
        }
        catch(err){
            setAlert({
                    class:"alert alert-danger alert-dismissible fade show",
                    status:"Error",
                    message:"Not able to add"
                })
        }
        

    }
    return(
        <div className="modal fade" id="addTicketModal" tabIndex="-1" role="dialog" aria-labelledby="addTicketModalTitle" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="addTicketModalLongTitle">Add Ticket</h5>
                <button onClick={()=> setDefault()} type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="modal-body">
            <form onSubmit={(e)=>onTicketCreate(e)}>
                <div className="form-group">
                    <label htmlFor="ticketEmail">Contact</label>
                    <select onChange={(e)=>onContactChange(e)} type="text" className="form-control" id="ticketEmail" value={contact} required>
                        <option value="">--Select Contact--</option>
                        {renderedList}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="ticketSubject">Subject</label>
                    <input onChange={(e)=>onSubjectChange(e)} type="text" className="form-control" id="ticketSubject" placeholder="Subject" value={subject} required />
                </div>
                <div className="form-group">
                    <label htmlFor="ticketPriority">Priority</label>
                    <select onChange={(e)=>onPriorityChange(e)} type="text" className="form-control" id="ticketPriority" value={priority} required>
                        <option value="">--Select Priority--</option>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                </div>
                <div className="form-group d-flex justify-content-end">
                    <div className={alert.class} style={{margin:"5px"}} role="alert">
                        <div><strong>{alert.status}!</strong>{alert.message}</div>
                    </div>
                    <button onClick={()=> setDefault()} type="button" className="btn btn-secondary" data-dismiss="modal" style={{margin:"5px"}}>Close</button>
                    <button type="submit" className="btn btn-primary" style={{margin:"5px"}}>Add</button>
                </div>
                </form>
            </div>
            </div>
        </div>
        </div>
    )
}

export default AddTicketModal