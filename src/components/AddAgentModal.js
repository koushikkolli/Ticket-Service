import React, { useState } from "react"
import nodeConnect from "../apis/nodeConnect"

const AddAgentModal = (props)=>{
    const [email, setEmail] = useState("")
    const [title, setTitle] = useState("")
    const [fullName, setFullName] = useState("")
    const [alert, setAlert] = useState({
        class:"d-none alert alert-success alert-dismissible fade show",
        status:"Success",
        message:"Agent Added"
    })

    const onEmailChange = (event)=>{
        setEmail(event.target.value)
    }

    const onTitleChange = (event)=>{
        setTitle(event.target.value)
    }

    const onFullNameChange = (event)=>{
        setFullName(event.target.value)
    }
    const setDefault =()=>{
        setEmail("")
        setTitle("")
        setFullName("")
        setAlert({
            class:"d-none alert alert-danger alert-dismissible fade show",
            status:"Error",
            message:"Not able to add"
        })
    }

    const onAgentCreate = async(event)=>{
        event.preventDefault()
        const returnObject = {
            email: email,
            title: title,
            name: fullName,
        }
        console.log(returnObject)
        try{
            const response = await nodeConnect.post("/add-agent", returnObject)
            if (response.status === 200){
                props.onAgentAdd()
                setAlert({
                    class:"alert alert-success alert-dismissible fade show",
                    status:"Success",
                    message:"Agent added"
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
        <div className="modal fade" id="addAgentModal" tabIndex="-1" role="dialog" aria-labelledby="addAgentModalTitle" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="addAgentModalLongTitle">Add Agent</h5>
                <button onClick={()=> setDefault()} type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="modal-body">
            <form onSubmit={(e)=>onAgentCreate(e)}>
                <div className="form-group">
                    <label htmlFor="agentEmail">Email</label>
                    <input onChange={(e)=>onEmailChange(e)} value={email} type="email" className="form-control" id="agentEmail" aria-describedby="emailHelp" placeholder="Enter email" required />
                </div>
                <div className="form-group">
                    <label htmlFor="agentTile">Title</label>
                    <input onChange={(e)=>onTitleChange(e)} value={title} type="text" className="form-control" id="agentTitle" placeholder="Title" required />
                </div>
                <div className="form-group">
                    <label htmlFor="agentFullName">Full Name</label>
                    <input onChange={(e)=>onFullNameChange(e)} value={fullName} type="text" className="form-control" id="agentFullName" placeholder="Full Name" required />
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

export default AddAgentModal