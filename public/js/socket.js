(function(){
  var IceCandidate = window.mozRTCIceCandidate || window.RTCIceCandidate;
  var SessionDescription = window.mozRTCSessionDescription || window.RTCSessionDescription;
  var socket = io.connect('', {port: 3000});

  state.sendMessage = function sendMessage(message){
    socket.emit('message', message);
  }

  socket.on('message', function (message){
    if (message.type === 'offer') {
      state.pc.setRemoteDescription(new SessionDescription(message));
      state.createAnswer();
    } 
    else if (message.type === 'answer') {
      state.pc.setRemoteDescription(new SessionDescription(message));
    } 
    else if (message.type === 'candidate') {
      var candidate = new IceCandidate({sdpMLineIndex: message.label, candidate: message.candidate});
      state.pc.addIceCandidate(candidate);
    }
  });

}())