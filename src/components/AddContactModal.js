import React, {useState} from "react"
import nodeConnect from "../apis/nodeConnect"

const AddContactModal = (props)=>{
    const [email, setEmail] = useState("")
    const [fullName, setFullName] = useState("")
    const [alert, setAlert] = useState({
        class:"d-none alert alert-success alert-dismissible fade show",
        status:"Success",
        message:"Contact Added"
    })

    const onEmailChange = (event)=>{
        setEmail(event.target.value)
    }

    const onFullNameChange = (event)=>{
        setFullName(event.target.value)
    }
    const setDefault =()=>{
        setEmail("")
        setFullName("")
        setAlert({
            class:"d-none alert alert-danger alert-dismissible fade show",
            status:"Error",
            message:"Not able to add"
        })
    }

    const onContactCreate = async(event)=>{
        event.preventDefault()
        const returnObject = {
            email: email,
            name: fullName,
        }
        console.log(returnObject)
        try{
            const response = await nodeConnect.post("/add-contact", returnObject)
            if (response.status === 200){
                props.onContactAdd()
                setAlert({
                    class:"alert alert-success alert-dismissible fade show",
                    status:"Success",
                    message:"Contact added"
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
        <div className="modal fade" id="addContactModal" tabIndex="-1" role="dialog" aria-labelledby="addContactModalTitle" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="addContactModalLongTitle">Add Contact</h5>
                <button onClick={()=> setDefault()} type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="modal-body">
            <form onSubmit={(e)=>onContactCreate(e)}>
                <div className="form-group">
                    <label htmlFor="contactEmail">Email</label>
                    <input type="email" onChange={(e)=>onEmailChange(e)} value={email} className="form-control" id="contactEmail" aria-describedby="emailHelp" placeholder="Enter email" required />
                </div>
                <div className="form-group">
                    <label htmlFor="contactFullName">Full Name</label>
                    <input onChange={(e)=>onFullNameChange(e)} value={fullName} type="text" className="form-control" id="contactFullName" placeholder="Full Name" required />
                </div>
                <div className="form-group d-flex justify-content-end">
                <div className={alert.class} style={{margin:"5px"}} role="alert">
                        <div><strong>{alert.status}!</strong>{alert.message}</div>
                    </div>
                    <button onClick={()=> setDefault()}  type="button" className="btn btn-secondary" data-dismiss="modal" style={{margin:"5px"}}>Close</button>
                    <button type="submit" className="btn btn-primary" style={{margin:"5px"}}>Add</button>
                </div>
                </form>
            </div>
            </div>
        </div>
        </div>
    )
}

export default AddContactModal