import React, { useState } from "react"
import { Grid, Paper, IconButton } from "@material-ui/core"
import Messages from "./Messages"
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import "./Chat.css"



const Chat = ({classList, closeMessage}) => {

   const data = [
        {
            message: "David how far na?",
            isMyMessage: true
        },
        {
            message: "I dey ohh, how you na?",
            isMyMessage: false
        },
        {
            message: "How mumsi?",
            isMyMessage: true
        },
        {
            message: "Mumsi is fine ohh",
            isMyMessage: false
        },
        {
            message: "E be like say you get problem for head ohh!! ahn ahn what the hell is wrong with you na? like i do not appreciate the fact that you come to my home and begin to tell me rubbish",
            isMyMessage: false
        },
        {
            message: "Guy take your time ohh, no allow me carry your matter ohh if not i go handcuff you make e no be like say i wan go get you or anything",
            isMyMessage: true
        },
        {
            message: "Buh lowkey we go dey alright na",
            isMyMessage: true
        },
        {
            message: "David how far na?",
            isMyMessage: true
        },
        {
            message: "I dey ohh, how you na?",
            isMyMessage: false
        },
        {
            message: "How mumsi?",
            isMyMessage: true
        },
        {
            message: "Mumsi is fine ohh",
            isMyMessage: false
        },
        {
            message: "E be like say you get problem for head ohh!! ahn ahn what the hell is wrong with you na? like i do not appreciate the fact that you come to my home and begin to tell me rubbish",
            isMyMessage: false
        },
        {
            message: "Guy take your time ohh, no allow me carry your matter ohh if not i go handcuff you make e no be like say i wan go get you or anything",
            isMyMessage: true
        },
        {
            message: "Buh lowkey we go dey alright na",
            isMyMessage: true
        }


    ]
    const [messages, setMessages] = useState(data);    
    // const [message, setMessage] = useState("");
    // const [isMyMessage, setIsMyMessage] = useState(true);
    return (
        <div className={"chat-container "+ classList}>
            
            <Paper >
                <Grid container style={{alignItems: "center"}} variant="fullWidth">
                    <Grid item xs={2}
                        style={{paddingLeft: "7px"}}
                     >
                        
                        <IconButton edge="start" onClick={closeMessage} color="inherit" aria-label="back button">
                            <KeyboardBackspaceIcon />
                        </IconButton>
                    </Grid>
                    <Grid item xs={10}
                        style={{paddingLeft: "9px"}}
                     >
                        <h3>Messages</h3>
                    </Grid>
                </Grid>
                    
                    
                </Paper>
            <Grid
                container
                direction="column"
            >
                <Messages messages={messages} />
                
            </Grid>
        </div>

    )
} 

export default Chat;