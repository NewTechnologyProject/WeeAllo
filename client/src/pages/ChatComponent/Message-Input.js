import React, { PureComponent, useEffect } from 'react'
import PropTypes from 'prop-types'
import InputBase from "@material-ui/core/InputBase"
import { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";


import * as actions from "src/actions/create-new-message.action"


/**
 *  New Message Input
 */
export const MessageInput = () => {
    // static propTypes = {
    //     onType: PropTypes.func.isRequired,
    //     onNewMessage: PropTypes.func.isRequired,
    // }

    // state  = {
    //     message: '',
    // }

    const [message, setMessage] = useState('');
    //const [messageText, setMessageText] = useState(null)
    console.log(message);
    const user = useSelector(state => state.customer.userAuth);
    // setMessageText = messageText => {
    //     this.setState(
    //         { message: messageText },
    //         () => this.props.onType(this.state.message),
    //     )
    // }

    // handleMessageChangeEvent = event => {
    //     this.setMessageText(event.target.value)
    // }

    // handleMessageSendEvent = event => {
    //     event.preventDefault()

    //     this.props.onNewMessage(this.state.message)
    //     this.setMessageText('')
    // }

    const dispatch = useDispatch();
    // useEffect(() => {

    // },[
    //     message
    // ])

    const handleMessageKeyPressEvent = (event) => {
        if (event.key === 'Enter') {
            ///this.handleMessageSendEvent(event)
            //window.alert(message);
            const messageText = {
                status: "seen",
                content: message,
                file: null,
                roomChatId: 1,
                userId: user
            }
            console.log(messageText);
            dispatch(actions.addMessage(messageText))
        }
        //setMessage('');
    }


    return (
        <InputBase
            placeholder="Nhập tin nhắn của bạn"
            inputProps={{ "aria-label": "search google maps" }}
            fullWidth
            autoFocus={true}
            //value={this.state.message}
            onChange={(e) => { setMessage(e.target.value) }}
            //onChange={this.handleMessageChangeEvent}
            onKeyPress={(e) => handleMessageKeyPressEvent(e)}
        />
    )

}
