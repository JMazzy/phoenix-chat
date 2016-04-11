import {Socket} from "phoenix"

// Create socket
let socket = new Socket("/socket", {params: {token: window.userToken}})

// Connect to socket
socket.connect()

// Now that you are connected, you can join channels with a topic:
let channel           = socket.channel("rooms:lobby", {})
let chatInput         = $("#chat-input")
let messagesContainer = $("#messages")

// This adds the message to the channel when you press enter
chatInput.on("keypress", event => {
  if ( event.keyCode === 13 ) {
    channel.push("new_msg", {body: chatInput.val()})
    chatInput.val("")
  }
})

// Function is executed when "new_msg" is received
channel.on("new_msg", payload => {
  var m = new Date();
  var dateString =  ('0' + m.getHours()).slice(-2) + ":" +
                    ('0' + m.getMinutes()).slice(-2) + ":" +
                    ('0' + m.getSeconds()).slice(-2);
  messagesContainer.append(`<hr><strong>Username</strong> ${dateString} <br> ${payload.body}`)
})

// Joins the channel
channel.join()
  .receive("ok", resp => { console.log("Joined successfully", resp) })
  .receive("error", resp => { console.log("Unable to join", resp) })

export default socket
