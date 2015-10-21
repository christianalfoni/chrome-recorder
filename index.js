// Muaz Khan     - www.MuazKhan.com
// MIT License   - www.webrtc-experiment.com/licence
// Documentation - github.com/streamproc/MediaStreamRecorder

// ______________________
// MediaStreamRecorder.js

var MultiStreamRecorder = require('./src/MultiStreamRecorder.js');

module.exports = function ChromeMediaRecorder (video) {

  var mediaStreamRecorder = null;
  var buffer = null;
  var currentStream = stream;
  var audio = null;
  var currentBlobs = {
    audio: null,
    video: null
  };
  var audioContext = null;

  function setBlobs (blobs) {

    var run = function () {
      audioContext = new AudioContext();

      currentBlobs = blobs;

      var fileReader = new FileReader();
      fileReader.onload = function () {
        buffer = this.result;
      };
      fileReader.readAsArrayBuffer(blobs.audio);
      video.src = window.URL.createObjectURL(blobs.video);
    };

    if (audioContext) {
      audioContext.close().then(run);
    } else {
      run();
    }
  }

  function stream (cb, stream) {

    mediaStreamRecorder = new MultiStreamRecorder(stream);
    mediaStreamRecorder.video = video;
    mediaStreamRecorder.audioChannels = 1;
    mediaStreamRecorder.ondataavailable = setBlobs;

    video.addEventListener('loadeddata', function startRecording () {
      mediaStreamRecorder.start(5 * 60 * 60 * 1000);
      video.removeEventListener('loadeddata', startRecording);
      cb && cb();
    });
    video.src = window.URL.createObjectURL(stream);
    video.play();
    currentStream = stream;
  }

  return {
    record: function record (cb) {
        (navigator.getUserMedia || navigator.webkitGetUserMedia).call(navigator, {
          video: true,
          audio: true
        }, stream.bind(null, cb), function (e) {
          console.log('FAILED', e);
        });
    },

    stop: function stop () {
      mediaStreamRecorder.stop();
      currentStream.getAudioTracks()[0].stop();
      currentStream.getVideoTracks()[0].stop();
    },

    pause: function pause() {
      video.pause();
      audio.stop();
    },

    play: function play (cb) {
      this.seek(0, true, cb);
    },

    seek: function seek (seek, startPlaying, cb) {

      var canplay = function () {
        audioContext.decodeAudioData(buffer, function (buffer) {
          audio = audioContext.createBufferSource();
          audio.buffer = buffer;
          audio.connect(audioContext.destination);
          var start = function () {
              if (startPlaying) {
                audio.start(0, seek / 1000);
              } else {
                video.pause();
              }
              video.removeEventListener('playing', start);
              cb && cb();
          }

          video.addEventListener('playing', start);
          video.currentTime = seek / 1000;
          video.play();

        });
        audioContext.onerror = function (e) {
          console.log('Error decoding audio', e);
        };
        video.removeEventListener('canplay', canplay);
      };

      video.addEventListener('canplay', canplay);
      video.src = video.src;

    },

    getBlobs: function getBlobs () {
      return currentBlobs;
    },

    setBlobs: setBlobs

  };
}
