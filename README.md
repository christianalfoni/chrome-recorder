# chrome-recorder
Lets you easily record audio and video in Chrome

This project is a refactored and wrapped version of the amazing work done on the [msr project])(https://github.com/streamproc/MediaStreamRecorder).

`npm install chrome-recorder`

### API

```js
import Recorder from 'chrome-recorder';

const video = document.querySelector('#video');
const recorder = new Recorder(video);

// Start recording
recorder.record();

// Stop recording
recorder.stop();

// Play recording
recorder.play();

// Seek
recorder.seek(ms);

// Pause recording
recorder.pause();

// Get recording blobs (audio and video)
recorder.getBlobs(); // {audio Blob, video: Blob}

// Set blobs
recorder.setBlobs({
  audio: Blob,
  video: Blob
})
```

### Test
1. `npm install`
2. `npm start`
3. *localhost:8080*
