'use strict';

var expect = require('chai').expect;
var MusicJsonToolbox = require('../index');

describe('MusicJsonToolbox Helper Functions', function() {

  describe('MusicJsonToolbox.base12Pitch', function() {
    it('converts note object to base12Pitch', function() {
      var output;

      output = MusicJsonToolbox.base12Pitch('C', -1, 4, 0, true);
      expect(output).to.equal(50);

      output = MusicJsonToolbox.base12Pitch('D', 1, 4, 1, true);
      expect(output).to.equal(51);

      output = MusicJsonToolbox.base12Pitch('E', 0, 3, 0, false);
      expect(output).to.equal(5);
    });
  });

  describe('MusicJsonToolbox.pitchDifference', function() {
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

  describe('MusicJsonToolbox.durationDifference', function() {
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

  describe('MusicJsonToolbox.intervalWeight', function() {
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

  describe('MusicJsonToolbox.stringEditDistance', function() {
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

  describe('MusicJsonToolbox.arrayEditDistance', function() {
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

  describe('MusicJsonToolbox.arrayWeightedEditDistance', function() {
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

  describe('MusicJsonToolbox.uniques', function() {
    it('returns array of unique values', function() {
      var output = MusicJsonToolbox.uniques([1, 1, 2, 3, 3]);
      expect(output).to.deep.equal([1, 2, 3]);
    });
  });

});
