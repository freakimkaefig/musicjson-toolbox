'use strict';

var expect = require('chai').expect;
var MusicJsonToolbox = require('../index');

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

  describe('.intervalDurationValues', function() {
    it('correctly maps interval and duration values from array of intervals', function() {
      var output;
      output = MusicJsonToolbox.intervalDurationValues([
        {
          value: '*',
          duration: '*',
          noteNumber: 0,
          measureNumber: 0
        },
        {
          value: 2,
          duration: 0,
          noteNumber: 1,
          measureNumber: 0
        }
      ]);
      expect(output).to.deep.equal([
        {
          value: '*',
          duration: '*'
        },
        {
          value: 2,
          duration: 0
        }
      ]);
    });
  });

  describe('.highlightMapping', function() {
    it('correctly maps highlighting measures', function() {
      var output;
      output = MusicJsonToolbox.highlightMapping([
        {
          measureNumber: 0,
          noteNumber: 0
        },
        {
          measureNumber: 0,
          noteNumber: 1
        }
      ]);
      expect(output).to.deep.equal([
        {
          measure: 0,
          note: 0
        },
        {
          measure: 0,
          note: 1
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

  describe('.intervalWeight', function() {
    it('calculates interval weight for edit-distance', function() {
      var output;

      output = MusicJsonToolbox.intervalWeight(2, 1);
      expect(output).to.equal(1);

      output = MusicJsonToolbox.intervalWeight(3, 1);
      expect(output).to.equal(1);

      output = MusicJsonToolbox.intervalWeight(4, 1);
      expect(output).to.equal(0.75);

      output = MusicJsonToolbox.intervalWeight(5, 1);
      expect(output).to.equal(0.75);

      output = MusicJsonToolbox.intervalWeight(6, 1);
      expect(output).to.equal(0.5);

      output = MusicJsonToolbox.intervalWeight(7, 1);
      expect(output).to.equal(1);

      output = MusicJsonToolbox.intervalWeight(8, 1);
      expect(output).to.equal(0.5);

      output = MusicJsonToolbox.intervalWeight(9, 1);
      expect(output).to.equal(0.75);

      output = MusicJsonToolbox.intervalWeight(10, 1);
      expect(output).to.equal(0.75);

      output = MusicJsonToolbox.intervalWeight(11, 1);
      expect(output).to.equal(1);

      output = MusicJsonToolbox.intervalWeight(12, 1);
      expect(output).to.equal(1);

      output = MusicJsonToolbox.intervalWeight(12, 0);
      expect(output).to.equal(0.5);

      output = MusicJsonToolbox.intervalWeight(12, -2);
      expect(output).to.equal(1);
    });
  });

  describe('.stringEditDistance', function() {
    it('calculates edit distance between two strings', function() {
      var output;

      output = MusicJsonToolbox.stringEditDistance('uudr', '');
      expect(output).to.equal(4);

      output = MusicJsonToolbox.stringEditDistance('', 'uudr');
      expect(output).to.equal(4);

      output = MusicJsonToolbox.stringEditDistance('uudr', 'uudr');
      expect(output).to.equal(0);

      output = MusicJsonToolbox.stringEditDistance('udru', 'uudr');
      expect(output).to.equal(2);

      output = MusicJsonToolbox.stringEditDistance('rduu', 'uudr');
      expect(output).to.equal(4);
    });
  });

  describe('.arrayEditDistance', function() {
    it('calculates edit distance between two pitch arrays', function() {
      var output;

      output = MusicJsonToolbox.arrayEditDistance([1, 2, 3, 4], []);
      expect(output).to.equal(4);

      output = MusicJsonToolbox.arrayEditDistance([], [1, 2, 3, 4]);
      expect(output).to.equal(4);

      output = MusicJsonToolbox.arrayEditDistance([1, 2, 3, 4], [1, 2, 3, 4]);
      expect(output).to.equal(0);

      output = MusicJsonToolbox.arrayEditDistance([1, 2, 3, 4], [1, 2, 5, 6]);
      expect(output).to.equal(2);

      output = MusicJsonToolbox.arrayEditDistance([1, 2, 3, 4], [5, 6, 7, 8]);
      expect(output).to.equal(4);
    });

    it('calculates edit distance between two interval arrays', function() {
      var output;

      output = MusicJsonToolbox.arrayEditDistance([0, 2, -2, 2], []);
      expect(output).to.equal(4);

      output = MusicJsonToolbox.arrayEditDistance([], [0, 2, -2, 2]);
      expect(output).to.equal(4);

      output = MusicJsonToolbox.arrayEditDistance([0, 2, -2, 2], [0, 2, -2, 2]);
      expect(output).to.equal(0);

      output = MusicJsonToolbox.arrayEditDistance([0, 2, -2, 2], [0, 2, -2, 4]);
      expect(output).to.equal(1);

      output = MusicJsonToolbox.arrayEditDistance([0, 2, -2, 2], [0, 4, -6, 3]);
      expect(output).to.equal(3);
    });
  });

  describe('.arrayWeightedEditDistance', function() {
    it('calculates weighted edit distance between two pitch arrays', function() {
      var output;

      output = MusicJsonToolbox.arrayWeightedEditDistance([0, 2, -2, 2], []);
      expect(output).to.equal(4);

      output = MusicJsonToolbox.arrayWeightedEditDistance([], [0, 2, -2, 2]);
      expect(output).to.equal(4);

      output = MusicJsonToolbox.arrayWeightedEditDistance([0, 2, -2, 2], [0, 2, -2, 2]);
      expect(output).to.equal(0);

      output = MusicJsonToolbox.arrayWeightedEditDistance([0, 2, -2, 2], [0, 2, -2, 4]);
      expect(output).to.equal(1);

      output = MusicJsonToolbox.arrayWeightedEditDistance([0, 2, -2, 2], [0, 2, -2, 5]);
      expect(output).to.equal(0.75);

      output = MusicJsonToolbox.arrayWeightedEditDistance([0, 2, -2, 2], [0, 2, -2, 7]);
      expect(output).to.equal(0.5);

      output = MusicJsonToolbox.arrayWeightedEditDistance([0, 2, -2, 2], [0, 4, -6, 3]);
      expect(output).to.equal(2.75);
    });
  });

  describe('.uniques', function() {
    it('returns array of unique values', function() {
      var output = MusicJsonToolbox.uniques([1, 1, 2, 3, 3]);
      expect(output).to.deep.equal([1, 2, 3]);
    });
  });

});
