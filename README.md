# musicjson-toolbox

[![Build Status](https://travis-ci.org/freakimkaefig/musicjson-toolbox.svg?branch=master)](https://travis-ci.org/freakimkaefig/musicjson-toolbox)
[![Coverage Status](https://coveralls.io/repos/github/freakimkaefig/musicjson-toolbox/badge.svg?branch=master)](https://coveralls.io/github/freakimkaefig/musicjson-toolbox?branch=master)

The project is still under construction.

The plan is to create a node toolbox for comparing musicJSON objects.

## Example
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

var notes = MusicJsonToolbox.notes(musicjson);
var ngrams = MusicJsonToolbox.ngrams(notes);
```

## API Documentation
For full API documentation have a look at [API.md](API.md).

## License
Licensed under the MIT License. See [LICENSE](LICENSE) for further information.