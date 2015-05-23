var state = { // global var
  inCall: false,
  pc: null,  // PeerConnection
  stream: null,
  createAnswer: null,
  sendMessage: null
};

(function(){

  var PeerConnection = window.mozRTCPeerConnection || window.webkitRTCPeerConnection;

  var callButton = document.getElementById("callButton");
  var localVideo = document.getElementById("localVideo");
  var remoteVideo = document.getElementById("remoteVideo");
  var getUserMedia = navigator.getUserMedia || navigator.mozGetUserMedia || navigator.webkitGetUserMedia;

  // Step 1. getUserMedia
  getUserMedia.call(navigator,
    { audio: true, video: true }, 
    gotStream, 
    function(error) { console.log(error) }
  );  

  function gotStream(stream) {
    callButton.style.display = 'inline-block';
    callButton.style.color = 'green';
    localVideo.src = URL.createObjectURL(stream);

    state.pc = new PeerConnection(null);
    state.pc.addStream(stream);
    state.pc.onicecandidate = gotIceCandidate;
    state.pc.onaddstream = gotRemoteStream;
  }

  function gotIceCandidate(event){
    if (event.candidate) {
      state.sendMessage({
        type: 'candidate',
        label: event.candidate.sdpMLineIndex,
        id: event.candidate.sdpMid,
        candidate: event.candidate.candidate
      });
    }
  }

  function gotRemoteStream(event){
    remoteVideo.src = URL.createObjectURL(event.stream);
    callButton.style.color = 'red';
  }

  callButton.addEventListener('click', manageCall);
  
  function manageCall() {
    if (state.inCall) {
      closeCall();
      state.inCall = false;
    } else {
      createOffer();
      state.inCall = true;
    }  
  }

  // Step 2. createOffer
  function createOffer() {
    state.pc.createOffer(
      gotLocalDescription, 
      function(error) { console.log(error) }, 
      { 'mandatory': { 'OfferToReceiveAudio': true, 'OfferToReceiveVideo': true } }
    );
  }

  // Step 3. createAnswer
  state.createAnswer = function createAnswer() {
    state.pc.createAnswer(
      gotLocalDescription,
      function(error) { console.log(error) }, 
      { 'mandatory': { 'OfferToReceiveAudio': true, 'OfferToReceiveVideo': true } }
    );
  }

  function gotLocalDescription(description){
    state.pc.setLocalDescription(description);
    state.sendMessage(description);
  }

  function closeCall(){
    remoteVideo.pause();
    state.pc.close();
    callButton.style.color = '';
    console.log('call ended');
  }

}())