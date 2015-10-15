var utils = {
  mergeProps: function mergeProps(mergein, mergeto) {
      mergeto = utils.reformatProps(mergeto);
      for (var t in mergeto) {
          if (typeof mergeto[t] !== 'function') {
              mergein[t] = mergeto[t];
          }
      }
      return mergein;
  },

  reformatProps: function reformatProps(obj) {
      var output = {};
      for (var o in obj) {
          if (o.indexOf('-') != -1) {
              var splitted = o.split('-');
              var name = splitted[0] + splitted[1].split('')[0].toUpperCase() + splitted[1].substr(1);
              output[name] = obj[o];
          } else output[o] = obj[o];
      }
      return output;
  },

  bytesToSize: function bytesToSize(bytes) {
      var k = 1000;
      var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
      if (bytes === 0) {
          return '0 Bytes';
      }
      var i = parseInt(Math.floor(Math.log(bytes) / Math.log(k)), 10);
      return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
  }

};

module.exports = utils;
