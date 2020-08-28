import React from "react";
import {Paper} from "@material-ui/core"
import "./Messages.css"


export default ({messages}) => {
    let i= 0
       
    return (
        <div className="my-messages">
                {
                    messages.map(message => 
                        message.isMyMessage ?     
                            <Paper key={i++} className="my-message" >{message.message}</Paper>
                      :
                            <Paper key={i++} className="other-message" >{message.message}</Paper>
                    )
                }   
        </div> 
    )
}