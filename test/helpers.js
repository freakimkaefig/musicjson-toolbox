var expect = require('chai').expect;
var fs = require('fs');
var MusicJsonToolbox = require('../index');

var notes = require('./notes.json');
var intervals = require('./intervals.json');

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
        {"step": "C", "accidental": "flat", "octave": 4, "alter": -1},
        0,
        {"step": "F", "octave": 2, "alter": 0},
        true,
        false
      );
      expect(output).to.equal(-18);

      output = MusicJsonToolbox.pitchDifference(
        {"step": "C", "accidental": "flat", "octave": 4, "alter": -1},
        0,
        {"step": "F", "octave": 3, "alter": 0},
        false,
        false
      );
      expect(output).to.equal(-6);

      output = MusicJsonToolbox.pitchDifference(
        {"step": "C", "accidental": "flat", "octave": 4, "alter": -1},
        0,
        {"step": "F", "octave": 3, "alter": 0},
        true,
        true
      );
      expect(output).to.equal(6);
    });
  });

  describe('MusicJsonToolbox.durationDifference', function() {
    it('calculates difference between durations', function() {
      var output;

      output = MusicJsonToolbox.durationDifference(4, 2, false);
      expect(output).to.equal(-2);

      output = MusicJsonToolbox.durationDifference(4, 2, true);
      expect(output).to.equal(2);
    });
  });

  describe('MusicJsonToolbox.editDistance', function() {
    it('calculates edit distance between two strings', function() {
      var output;

      output = MusicJsonToolbox.editDistance('uudr', '');
      expect(output).to.equal(4);

      output = MusicJsonToolbox.editDistance('uudr', 'uudr');
      expect(output).to.equal(0);

      output = MusicJsonToolbox.editDistance('udru', 'uudr');
      expect(output).to.equal(2);

      output = MusicJsonToolbox.editDistance('rduu', 'uudr');
      expect(output).to.equal(4);
    });
  });

  describe('MusicJsonToolbox.uniques', function() {
    it('returns array of unique values', function() {
      var output = MusicJsonToolbox.uniques([1, 1, 2, 3, 3]);
      expect(output).to.deep.equal([1, 2, 3]);
    });
  });

});