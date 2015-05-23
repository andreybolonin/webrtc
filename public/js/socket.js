var socket = io.connect('', {port: 3000});

function sendMessage(message){
  socket.emit('message', message);
}

socket.on('message', function (message){
  if (message.type === 'offer') {
    pc.setRemoteDescription(new SessionDescription(message));
    createAnswer();
  } 
  else if (message.type === 'answer') {
    pc.setRemoteDescription(new SessionDescription(message));
  } 
  else if (message.type === 'candidate') {
    var candidate = new IceCandidate({sdpMLineIndex: message.label, candidate: message.candidate});
    pc.addIceCandidate(candidate);
  }
});
