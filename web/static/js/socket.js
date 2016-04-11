import {Socket} from "phoenix"

// Create socket
let socket = new Socket("/socket", {params: {token: window.userToken}})

// Connect to socket
socket.connect()

// Now that you are connected, you can join channels with a topic:
let channel           = socket.channel("rooms:lobby", {})
let chatInput         = $("#chat-input")
let messagesContainer = $("#messages")
let username = $("#name").text()

// This adds the message to the channel when you press enter
chatInput.on("keypress", event => {
  if ( event.keyCode === 13 ) {
    channel.push("new_msg", {body: chatInput.val()})
    chatInput.val("")
  }
})

// Function is executed when "new_msg" is received
channel.on("new_msg", payload => {
  var date = new Date();
  var dateString =  ('0' + date.getHours()).slice(-2) + ":" +
                    ('0' + date.getMinutes()).slice(-2) + ":" +
                    ('0' + date.getSeconds()).slice(-2);
  messagesContainer.append(`<hr><strong>${username}</strong> ${dateString} <br> ${payload.body}`)
})

// Joins the channel
channel.join()
  .receive("ok", resp => { console.log("Joined successfully", resp) })
  .receive("error", resp => { console.log("Unable to join", resp) })

export default socket
