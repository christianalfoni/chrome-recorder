var ChromeMediaRecorder = require('./index.js');

document.querySelector('#play').addEventListener('click', play);
document.querySelector('#stop').addEventListener('click', stop);
document.querySelector('#record').addEventListener('click', record);
document.querySelector('#pause').addEventListener('click', pause);

var video = document.querySelector('#video');
var recorder = new ChromeMediaRecorder(video);

function play () {
  recorder.play();
}

function stop () {
  recorder.stop();
}

function record () {
  recorder.record();
}

function pause () {
  recorder.pause();
}
