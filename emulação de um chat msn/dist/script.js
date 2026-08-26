var discussion = [
  {
    name:"Gabe",
    text:"Opa, tudo certo?",
    delay: 3500,
    offsetDelay: 250,
    isWizz: false,
  },

  {
    name:"Gabe",
    text:"Esse aqui é meu portfólio virtual",
    delay: 1000,
    offsetDelay: 250,
    isWizz: false,
  },
  {
    name:"Gabe",
    text:"Se quiser ver as informações que procura só clicar nos icones!!",
    delay: 2500,
    offsetDelay: 250,
    isWizz: false,
  }
];


var audioElement = document.createElement('audio');
var audioWizz = document.createElement('audio');
document.createElement('audioElement');
document.createElement('audioWizz');
audioElement.setAttribute('src', 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/238916/msnsound.mp3');
audioWizz.setAttribute('src', 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/238916/nudge%20(online-audio-converter.com).mp3');


var isAudioActivated = true;

audioElement.addEventListener('ended', function() {
  this.pause();
}, false);

audioWizz.addEventListener('ended', function() {
  this.pause();
}, false);

var randomIntFromInterval = function(min,max) { return Math.floor(Math.random(23)*(max-min+1)+min); }

var chatContainer = $('.chat-container');
var height = 0;
var totalHeight = 10000;
var totalDelay = 0;
var className = "";

discussion.map(function(object, i) {
  totalDelay += object.delay;
  window.setTimeout(function() {
    
    if (object.isWizz) {
      if (isAudioActivated)
        audioWizz.play();
      $(".chat").addClass("wizz");
      window.setTimeout(function(){
      $(".chat").removeClass("wizz");
      }, 500);
    }
    else {
      if(object.name == "Marthy") {
        className = "one";
      }
      else
        className = "two";
      $("#discussion").append("<li class=" + className + "><label>"+ object.name +" :</label><label>"+ object.text +"</label></li>");
    if(object.name == "Marthy") {
      $(".is-writting").text(object.name + " is typing...");
    }
    else
      $(".is-writting").text("Last message recieved at " + moment(new Date()).format("h:mm a") + " on " + moment(new Date()).format("MMM Do YYYY"));
    if(object.name == "Marthy" && isAudioActivated)
      audioElement.play();
    if(isAudioActivated && object.isWizz) {
    }
    chatContainer.scrollTop(chatContainer[0].scrollHeight);
    }
      
  }, totalDelay);
});