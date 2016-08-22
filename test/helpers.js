'use strict';

var expect = require('chai').expect;
var MusicJsonToolbox = require('../musicjson-toolbox');

describe('MusicJsonToolbox Helper Functions', function() {

  describe('.pitchValues', function() {
    it('correctly maps pitch values from array of notes', function() {
      var output;
      output = MusicJsonToolbox.pitchValues([
        {
          pitch: {
            step: 'C',
            octave: 4,
            alter: 0
          },
          rest: false,
          duration: 2,
          type: 'eighth',
          measureNumber: 0,
          noteNumber: 0
        },
        {
          pitch: {
            step: 'D',
            octave: 5,
            alter: 0
          },
          rest: false,
          duration: 4,
          type: 'quarter',
          measureNumber: 0,
          noteNumber: 1
        }
      ], 1);
      expect(output).to.deep.equal([6, 8]);
    });
  });

  describe('.pitchDurationValues', function() {
    it('correctly maps interval and duration values from array of intervals', function() {
      var output;
      output = MusicJsonToolbox.pitchDurationValues([
        {
          pitch: {
            step: 'C',
            octave: 4,
            alter: 0
          },
          rest: false,
          duration: 4,
          type: 'eighth'
        },
        {
          pitch: {
            step: 'D',
            octave: 4,
            alter: 0
          },
          rest: false,
          duration: 4,
          type: 'eighth'
        },
        {
          pitch: {
            step: 'E',
            octave: 4,
            alter: 0
          },
          rest: false,
          duration: 2,
          type: 'eighth'
        },
        {
          pitch: {
            step: 'F',
            octave: 4,
            alter: 1
          },
          rest: false,
          duration: 2,
          type: 'eighth'
        }
      ], 1, 4, 4);
      expect(output).to.deep.equal([
        { value: 6, rest: false, duration: 4},
        { value: 8, rest: false, duration: 4},
        { value: 10, rest: false, duration: 2},
        { value: 12, rest: false, duration: 2}
      ]);
    });
  });

  describe('.tempoAdjust', function() {
    it('correctly adjusts tempo', function() {
      expect(MusicJsonToolbox.tempoAdjust([
        {
          pitch: {
            step: 'C',
            octave: 4,
            alter: 0
          },
          rest: false,
          duration: 2,
          type: 'eighth',
          measureNumber: 0,
          noteNumber: 0
        },
        {
          pitch: {
            step: 'D',
            octave: 5,
            alter: 0
          },
          rest: false,
          duration: 4,
          type: 'quarter',
          measureNumber: 0,
          noteNumber: 1
        }
      ], function(duration) {
        return duration * 4;
      })).to.deep.equal([
        {
          pitch: {
            step: 'C',
            octave: 4,
            alter: 0
          },
          rest: false,
          duration: 8,
          type: 'eighth',
          measureNumber: 0,
          noteNumber: 0
        },
        {
          pitch: {
            step: 'D',
            octave: 5,
            alter: 0
          },
          rest: false,
          duration: 16,
          type: 'quarter',
          measureNumber: 0,
          noteNumber: 1
        }
      ]);
    });
  });

  describe('.valueMapping', function() {
    it('correctly maps array values', function() {
      expect(MusicJsonToolbox.valueMapping([
        {value: 1, measureNumber: 0},
        {value: 2, measureNumber: 0},
        {value: 3, measureNumber: 0},
        {value: 4, measureNumber: 0},
        {value: 5, measureNumber: 0}
      ])).to.deep.equal([1, 2, 3, 4, 5]);

      expect(MusicJsonToolbox.valueMapping([
        {value: '*', measureNumber: 0},
        {value: 'u', measureNumber: 0},
        {value: 'd', measureNumber: 0},
        {value: 'r', measureNumber: 0}
      ])).to.deep.equal(['*', 'u', 'd', 'r']);
    });
  });

  describe('.highlightMapping', function() {
    it('correctly maps highlighting measures', function() {
      var output;
      output = MusicJsonToolbox.highlightMapping([
        {
          measureNumber: 0,
          noteNumber: 0,
          noteNumberAbsolute: 0
        },
        {
          measureNumber: 0,
          noteNumber: 1,
          noteNumberAbsolute: 1
        }
      ]);
      expect(output).to.deep.equal([
        {
          measure: 0,
          note: 0,
          noteAbsolute: 0
        },
        {
          measure: 0,
          note: 1,
          noteAbsolute: 1
        }
      ]);
    });
  });

  describe('.base12Pitch', function() {
    it('converts note object to base12Pitch', function() {
      var output;

      output = MusicJsonToolbox.base12Pitch('C', -1, 4, 0, true);
      expect(output).to.equal(44);

      output = MusicJsonToolbox.base12Pitch('D', 1, 4, 1, true);
      expect(output).to.equal(57);

      output = MusicJsonToolbox.base12Pitch('E', 0, 3, 0, false);
      expect(output).to.equal(5);

      output = MusicJsonToolbox.base12Pitch('B', 1, 4, 0, false);
      expect(output).to.equal(5);
    });
  });

  describe('.interval2AbcStep', function() {
    it('converts interval to abc note string', function() {
      var output;

      output = MusicJsonToolbox.interval2AbcStep(0, 49);
      expect(output).to.equal('C');

      output = MusicJsonToolbox.interval2AbcStep(1, 49);
      expect(output).to.equal('^C');
      output = MusicJsonToolbox.interval2AbcStep(2, 49);
      expect(output).to.equal('D');
      output = MusicJsonToolbox.interval2AbcStep(3, 49);
      expect(output).to.equal('^D');
      output = MusicJsonToolbox.interval2AbcStep(4, 49);
      expect(output).to.equal('E');
      output = MusicJsonToolbox.interval2AbcStep(5, 49);
      expect(output).to.equal('F');

      output = MusicJsonToolbox.interval2AbcStep(-1, 49);
      expect(output).to.equal('B,');
      output = MusicJsonToolbox.interval2AbcStep(-2, 49);
      expect(output).to.equal('^A,');
      output = MusicJsonToolbox.interval2AbcStep(-3, 49);
      expect(output).to.equal('A,');
      output = MusicJsonToolbox.interval2AbcStep(-4, 49);
      expect(output).to.equal('^G,');
      output = MusicJsonToolbox.interval2AbcStep(-5, 49);
      expect(output).to.equal('G,');
    });
  });

  describe('.pitchDuration2AbcStep', function() {
    it('converts note item to abc note string', function() {
      var notes = [
        {pitch: {step: 'C', octave: 4, alter: 0}, rest: false, duration: 8,type: 'eighth'},
        {pitch: {step: 'D', octave: 4, alter: 0}, rest: false, duration: 8,type: 'eighth'},
        {pitch: {step: 'E', octave: 4, alter: 0}, rest: false, duration: 8,type: 'eighth'},
        {pitch: {step: 'F', octave: 4, alter: 0}, rest: false, duration: 8,type: 'eighth'},
        {pitch: {step: 'G', octave: 4, alter: 0}, rest: false, duration: 8,type: 'eighth'},
        {pitch: {step: 'C', octave: 5, alter: 0}, rest: true, duration: 8,type: 'eighth'},
        {pitch: {step: 'C', octave: 4, alter: 1, accidental: 'sharp'}, rest: false,duration: 16, type: 'quarter'},
        {pitch: {step: 'D', octave: 4, alter: 0, accidental: 'natural'}, rest: false,duration: 16, type: 'quarter'},
        {pitch: {step: 'B', octave: 4, alter: -1, accidental: 'flat'}, rest: false,duration: 16, type: 'quarter'},
        {pitch: {step: 'E', octave: 4, alter: 0}, rest: false, duration: 16, type: 'quarter'},
        {pitch: {step: 'A', octave: 5, alter: 0}, rest: false, duration: 16, type: 'quarter'},
        {pitch: {step: 'E', octave: 4, alter: 0}, rest: false, duration: 12, type: 'eighth', dot: true},
        {pitch: {step: 'A', octave: 5, alter: 0}, rest: false, duration: 8, type: 'eighth'}
      ];
      var results = [
        'C8',
        'D8',
        'E8',
        'F8',
        'G8',
        'z8',
        '^C16',
        '=D16',
        '_B16',
        'E16',
        'a16',
        'E8>',
        'a16'
      ];
      for (var i = 0; i < notes.length; i++) {
        var prevItem = null;
        if (i > 0) {
          prevItem = notes[i-1];
        }
        expect(MusicJsonToolbox.pitchDuration2AbcStep(notes[i], prevItem)).to.equal(results[i]);
      }
    });
  });

  describe('.pitchDifference', function() {
    it('calculates difference between pitch objects', function() {
      var output;

      output = MusicJsonToolbox.pitchDifference(
        {'step': 'C', 'accidental': 'flat', 'octave': 4, 'alter': -1},
        0,
        {'step': 'F', 'octave': 2, 'alter': 0},
        true,
        false
      );
      expect(output).to.equal(-18);

      output = MusicJsonToolbox.pitchDifference(
        {'step': 'C', 'accidental': 'flat', 'octave': 4, 'alter': -1},
        0,
        {'step': 'F', 'octave': 3, 'alter': 0},
        false,
        false
      );
      expect(output).to.equal(-6);

      output = MusicJsonToolbox.pitchDifference(
        {'step': 'C', 'accidental': 'flat', 'octave': 4, 'alter': -1},
        0,
        {'step': 'F', 'octave': 3, 'alter': 0}
      );
      expect(output).to.equal(-6);

      output = MusicJsonToolbox.pitchDifference(
        {'step': 'C', 'accidental': 'flat', 'octave': 4, 'alter': -1},
        0,
        {'step': 'F', 'octave': 3, 'alter': 0},
        true,
        true
      );
      expect(output).to.equal(6);
    });
  });

  describe('.durationDifference', function() {
    it('calculates difference between durations', function() {
      var output;

      output = MusicJsonToolbox.durationDifference(4, 2);
      expect(output).to.equal(-2);

      output = MusicJsonToolbox.durationDifference(4, 2, false);
      expect(output).to.equal(-2);

      output = MusicJsonToolbox.durationDifference(4, 2, true);
      expect(output).to.equal(2);
    });
  });

  describe('.stringEditDistance', function() {
    it('calculates edit distance between two strings', function() {
      var output;

      output = MusicJsonToolbox.stringEditDistance('uudr', '');
      expect(output).to.equal(0);

      output = MusicJsonToolbox.stringEditDistance('', 'uudr');
      expect(output).to.equal(0);

      output = MusicJsonToolbox.stringEditDistance('uudr', 'uudr');
      expect(output).to.equal(1);

      output = MusicJsonToolbox.stringEditDistance('udru', 'uudr');
      expect(output).to.equal(0.5);

      output = MusicJsonToolbox.stringEditDistance('rduu', 'uudr');
      expect(output).to.equal(0);
    });
  });

  describe('.arrayEditDistance', function() {
    it('calculates edit distance between two pitch arrays', function() {
      var output;

      output = MusicJsonToolbox.arrayEditDistance([1, 2, 3, 4], []);
      expect(output).to.equal(0);

      output = MusicJsonToolbox.arrayEditDistance([], [1, 2, 3, 4]);
      expect(output).to.equal(0);

      output = MusicJsonToolbox.arrayEditDistance([1, 2, 3, 4], [1, 2, 3, 4]);
      expect(output).to.equal(1);

      output = MusicJsonToolbox.arrayEditDistance([1, 2, 3, 4], [1, 2, 5, 6]);
      expect(output).to.equal(0.5);

      output = MusicJsonToolbox.arrayEditDistance([1, 2, 3, 4], [5, 6, 7, 8]);
      expect(output).to.equal(0);
    });

    it('calculates edit distance between two interval arrays', function() {
      var output;

      output = MusicJsonToolbox.arrayEditDistance([0, 2, -2, 2], []);
      expect(output).to.equal(0);

      output = MusicJsonToolbox.arrayEditDistance([], [0, 2, -2, 2]);
      expect(output).to.equal(0);

      output = MusicJsonToolbox.arrayEditDistance([0, 2, -2, 2], [0, 2, -2, 2]);
      expect(output).to.equal(1);

      output = MusicJsonToolbox.arrayEditDistance([0, 2, -2, 2], [0, 2, -2, 4]);
      expect(output).to.equal(0.75);

      output = MusicJsonToolbox.arrayEditDistance([0, 2, -2, 2], [0, 4, -6, 3]);
      expect(output).to.equal(0.25);
    });
  });

  describe('.uniques', function() {
    it('returns array of unique values', function() {
      var output = MusicJsonToolbox.uniques([1, 1, 2, 3, 3]);
      expect(output).to.deep.equal([1, 2, 3]);
    });
  });

});
