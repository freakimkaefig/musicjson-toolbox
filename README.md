musicjson-toolbox
===========================================================================

[![Build Status](https://travis-ci.org/freakimkaefig/musicjson-toolbox.svg?branch=master)](https://travis-ci.org/freakimkaefig/musicjson-toolbox)
[![Test Coverage](https://codeclimate.com/github/freakimkaefig/musicjson-toolbox/badges/coverage.svg)](https://codeclimate.com/github/freakimkaefig/musicjson-toolbox/coverage)
[![Code Climate](https://codeclimate.com/github/freakimkaefig/musicjson-toolbox/badges/gpa.svg)](https://codeclimate.com/github/freakimkaefig/musicjson-toolbox)

The project is still under construction.

The plan is to create a node toolbox for comparing musicJSON objects.

Installation
---------------------------------------------------------------------------
The module is preferably installed as node package via npm:
```
$ npm install --save musicjson-toolbox
```

Or install via bower:
```
$ bower install --save musicjson-toolbox
```

Example
---------------------------------------------------------------------------

For usage in browser, have a look at [tools demo page](http://musicjson-toolbox.lukaslamm.com/) or
[similarity demo page](http://musicjson-similarity-demo.lukaslamm.com/).

For use as node module refer to the following:

```javascript
var MusicJsonToolbox = require('musicjson-toolbox');

var musicjson = {
  "attributes": {
    "divisions": 4,
    "clef": {"line": 2, "sign": "G"},
    "key": {"fifths": -1},
    "time": {"beats": "3", "beat-type": "4"}
  },
  measures: [
    {
      "attributes": {
        "repeat": {"left": false, "right": false}
      },
      "notes": [
        {
          "pitch": {
            "step": "C",
            "accidental": "flat",
            "octave": 4,
            "alter": -1
          },
          "rest": false,
          "duration": 2,
          "type": "eighth"
        },
        {
          "pitch": {
            "step": "F",
            "octave": 4,
            "alter": 0
          },
          "rest": false,
          "duration": 2,
          "type": "eighth"
        }
      ]
    }
  ]
}

var notes = MusicJsonToolbox.notes(musicjson, false, true); // outputs array of notes (cleared measure "lines")
var intervals = MusicJsonToolbox.intervals(notes); // outputs array of intervals
var parsons = MusicJsonToolbox.parsons(notes); // outputs array of parsons code
var ngrams = MusicJsonToolbox.ngrams(notes, 4); // generates ngrams of defined length from an array
```

API Documentation
---------------------------------------------------------------------------
For full API documentation have a look at [API.md](API.md).

License
---------------------------------------------------------------------------
Licensed under the MIT License. See [LICENSE](LICENSE) for further information.