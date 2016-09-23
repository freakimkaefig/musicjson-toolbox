'use strict';

var chai = require('chai');
var chaiStats = require('chai-stats');
var MusicJsonToolbox = require('../musicjson-toolbox');

chai.use(chaiStats);
var expect = chai.expect;

var a = [
  { value: 1, rest: false, duration: 4},
  { value: 3, rest: false, duration: 4},
  { value: 5, rest: true, duration: 2},
  { value: 6, rest: false, duration: 2}
];
var b = [
  { value: 1, rest: false, duration: 4},
  { value: 6, rest: false, duration: 4},
  { value: 5, rest: false, duration: 2},
  { value: 6, rest: false, duration: 1},
  { value: 6, rest: false, duration: 1}
];

describe('MusicJsonToolbox Functions for Mongeau-Sankoff-Measure', function() {

  describe('.weightInterval', function() {
    it('calculates interval weight when rest', function() {
      expect(MusicJsonToolbox.weightInterval(
        {value: 1, rest: false, duration: 4},
        {value: 1, rest: true, duration: 4},
        false
      )).to.equal(0.1);

      expect(MusicJsonToolbox.weightInterval(
        {value: 1, rest: false, duration: 4},
        {value: 1, rest: true, duration: 4},
        true
      )).to.equal(0.1);
    });

    it('calculates interval weight for pitch values in the tonic (deg(n))', function() {
      var adjusted = false;
      expect(MusicJsonToolbox.weightInterval(
        {value: 1, rest: false, duration: 4},
        {value: 1, rest: false, duration: 4},
        adjusted
      )).to.equal(0);
      expect(MusicJsonToolbox.weightInterval(
        {value: 1, rest: false, duration: 4},
        {value: 3, rest: false, duration: 4},
        adjusted
      )).to.equal(0.9);
      expect(MusicJsonToolbox.weightInterval(
        {value: 1, rest: false, duration: 4},
        {value: 5, rest: false, duration: 4},
        adjusted
      )).to.equal(0.2);
      expect(MusicJsonToolbox.weightInterval(
        {value: 1, rest: false, duration: 4},
        {value: 6, rest: false, duration: 4},
        adjusted
      )).to.equal(0.5);
      expect(MusicJsonToolbox.weightInterval(
        {value: 1, rest: false, duration: 4},
        {value: 8, rest: false, duration: 4},
        adjusted
      )).to.equal(0.1);
      expect(MusicJsonToolbox.weightInterval(
        {value: 1, rest: false, duration: 4},
        {value: 10, rest: false, duration: 4},
        adjusted
      )).to.equal(0.35);
      expect(MusicJsonToolbox.weightInterval(
        {value: 1, rest: false, duration: 4},
        {value: 12, rest: false, duration: 4},
        adjusted
      )).to.equal(0.8);

      expect(MusicJsonToolbox.weightInterval(
        {value: 54, rest: false, duration: 4},
        {value: 48, rest: false, duration: 4},
        adjusted
      )).to.equal(0.5);
      expect(MusicJsonToolbox.weightInterval(
        {value: 48, rest: false, duration: 4},
        {value: 54, rest: false, duration: 4},
        adjusted
      )).to.equal(0.5);
    });

    it('calculates interval weight for pitch values in the tonic (deg(n)) with adjusted parameters', function() {
      var adjusted = true;
      expect(MusicJsonToolbox.weightInterval(
        {value: 1, rest: false, duration: 4},
        {value: 1, rest: false, duration: 4},
        adjusted
      )).to.equal(0);
      expect(MusicJsonToolbox.weightInterval(
        {value: 1, rest: false, duration: 4},
        {value: 3, rest: false, duration: 4},
        adjusted
      )).to.equal(2);
      expect(MusicJsonToolbox.weightInterval(
        {value: 1, rest: false, duration: 4},
        {value: 5, rest: false, duration: 4},
        adjusted
      )).to.equal(4);
      expect(MusicJsonToolbox.weightInterval(
        {value: 1, rest: false, duration: 4},
        {value: 6, rest: false, duration: 4},
        adjusted
      )).to.equal(5);
      expect(MusicJsonToolbox.weightInterval(
        {value: 1, rest: false, duration: 4},
        {value: 8, rest: false, duration: 4},
        adjusted
      )).to.equal(7);
      expect(MusicJsonToolbox.weightInterval(
        {value: 1, rest: false, duration: 4},
        {value: 10, rest: false, duration: 4},
        adjusted
      )).to.equal(9);
      expect(MusicJsonToolbox.weightInterval(
        {value: 1, rest: false, duration: 4},
        {value: 12, rest: false, duration: 4},
        adjusted
      )).to.equal(11);
      expect(MusicJsonToolbox.weightInterval(
        {value: 54, rest: false, duration: 4},
        {value: 48, rest: false, duration: 4},
        adjusted
      )).to.equal(6);
      expect(MusicJsonToolbox.weightInterval(
        {value: 48, rest: false, duration: 4},
        {value: 54, rest: false, duration: 4},
        adjusted
      )).to.equal(6);
    });

    it('calculates interval weight for pitch values not in the tonic (ton(m))', function() {
      var adjusted = false;
      expect(MusicJsonToolbox.weightInterval(
        { value: 2, rest: false, duration: 4},
        { value: 2, rest: false, duration: 4},
        adjusted
      )).to.equal(0.6);
      expect(MusicJsonToolbox.weightInterval(
        { value: 2, rest: false, duration: 4},
        { value: 3, rest: false, duration: 4},
        adjusted
      )).to.equal(2.6);
      expect(MusicJsonToolbox.weightInterval(
        { value: 2, rest: false, duration: 4},
        { value: 4, rest: false, duration: 4},
        adjusted
      )).to.equal(2.3);
      expect(MusicJsonToolbox.weightInterval(
        { value: 2, rest: false, duration: 4},
        { value: 5, rest: false, duration: 4},
        adjusted
      )).to.equal(1);
      expect(MusicJsonToolbox.weightInterval(
        { value: 2, rest: false, duration: 4},
        { value: 6, rest: false, duration: 4},
        adjusted
      )).to.equal(1);
      expect(MusicJsonToolbox.weightInterval(
        { value: 2, rest: false, duration: 4},
        { value: 7, rest: false, duration: 4},
        adjusted
      )).to.equal(1.6);
      expect(MusicJsonToolbox.weightInterval(
        { value: 2, rest: false, duration: 4},
        { value: 8, rest: false, duration: 4},
        adjusted
      )).to.equal(1.8);
      expect(MusicJsonToolbox.weightInterval(
        { value: 2, rest: false, duration: 4},
        { value: 9, rest: false, duration: 4},
        adjusted
      )).to.equal(0.8);
      expect(MusicJsonToolbox.weightInterval(
        { value: 2, rest: false, duration: 4},
        { value: 10, rest: false, duration: 4},
        adjusted
      )).to.equal(1.3);
      expect(MusicJsonToolbox.weightInterval(
        { value: 2, rest: false, duration: 4},
        { value: 11, rest: false, duration: 4},
        adjusted
      )).to.equal(1.3);
      expect(MusicJsonToolbox.weightInterval(
        { value: 2, rest: false, duration: 4},
        { value: 12, rest: false, duration: 4},
        adjusted
      )).to.equal(2.2);
    });

    it('calculates interval weight for pitch values not in the tonic (ton(m)) with adjusted parameters', function() {
      var adjusted = true;
      expect(MusicJsonToolbox.weightInterval(
        { value: 2, rest: false, duration: 4},
        { value: 2, rest: false, duration: 4},
        adjusted
      )).to.equal(0);
      expect(MusicJsonToolbox.weightInterval(
        { value: 2, rest: false, duration: 4},
        { value: 3, rest: false, duration: 4},
        adjusted
      )).to.equal(1);
      expect(MusicJsonToolbox.weightInterval(
        { value: 2, rest: false, duration: 4},
        { value: 4, rest: false, duration: 4},
        adjusted
      )).to.equal(2);
      expect(MusicJsonToolbox.weightInterval(
        { value: 2, rest: false, duration: 4},
        { value: 5, rest: false, duration: 4},
        adjusted
      )).to.equal(3);
      expect(MusicJsonToolbox.weightInterval(
        { value: 2, rest: false, duration: 4},
        { value: 6, rest: false, duration: 4},
        adjusted
      )).to.equal(4);
      expect(MusicJsonToolbox.weightInterval(
        { value: 2, rest: false, duration: 4},
        { value: 7, rest: false, duration: 4},
        adjusted
      )).to.equal(5);
      expect(MusicJsonToolbox.weightInterval(
        { value: 2, rest: false, duration: 4},
        { value: 8, rest: false, duration: 4},
        adjusted
      )).to.equal(6);
      expect(MusicJsonToolbox.weightInterval(
        { value: 2, rest: false, duration: 4},
        { value: 9, rest: false, duration: 4},
        adjusted
      )).to.equal(7);
      expect(MusicJsonToolbox.weightInterval(
        { value: 2, rest: false, duration: 4},
        { value: 10, rest: false, duration: 4},
        adjusted
      )).to.equal(8);
      expect(MusicJsonToolbox.weightInterval(
        { value: 2, rest: false, duration: 4},
        { value: 11, rest: false, duration: 4},
        adjusted
      )).to.equal(9);
      expect(MusicJsonToolbox.weightInterval(
        { value: 2, rest: false, duration: 4},
        { value: 12, rest: false, duration: 4},
        adjusted
      )).to.equal(10);
    });
  });

  describe('.weightLength', function() {
    it('calculates weight for length', function() {
      expect(MusicJsonToolbox.weightLength(2, 1)).to.equal(1);
      expect(MusicJsonToolbox.weightLength(1, 3)).to.equal(2);
      expect(MusicJsonToolbox.weightLength(4, 1)).to.equal(3);
    });
  });

  describe('.weightSubstitution', function() {
    it('calculates weight for substitute operation', function() {
      expect(MusicJsonToolbox.weightSubstitution(a, b, 1, 2, false)).to.equal(0.5);
      expect(MusicJsonToolbox.weightSubstitution(a, b, 1, 3, false)).to.equal(0.8959999999999999);
    });
    it('calculates weight for substitute operation for adjusted parameters', function() {
      expect(MusicJsonToolbox.weightSubstitution(a, b, 1, 2, true)).to.equal(5);
      expect(MusicJsonToolbox.weightSubstitution(a, b, 1, 3, true)).to.equal(4.92);
    });
  });

  describe('.weightInsertion', function() {
    it('calculates weight for insert operation', function() {
      expect(MusicJsonToolbox.weightInsertion(b, 2, false)).to.equal(1.392);
      expect(MusicJsonToolbox.weightInsertion(b, 3, false)).to.equal(0.696);
    });
    it('calculates weight for insert operation for adjusted parameters', function() {
      expect(MusicJsonToolbox.weightInsertion(b, 2, true)).to.equal(4);
      expect(MusicJsonToolbox.weightInsertion(b, 3, true)).to.equal(2);
    });
  });

  describe('.weightDeletion', function() {
    it('calculates weight for delete operation', function() {
      expect(MusicJsonToolbox.weightDeletion(a, 1, false)).to.equal(1.392);
      expect(MusicJsonToolbox.weightDeletion(a, 3, false)).to.equal(0.696);
    });
    it('calculates weight for delete operation for adjusted parameters', function() {
      expect(MusicJsonToolbox.weightDeletion(a, 1, true)).to.equal(4);
      expect(MusicJsonToolbox.weightDeletion(a, 3, true)).to.equal(2);
    });
  });

  describe('.weightFragmentation', function() {
    it('calculates weight for fragment operation', function() {
      expect(MusicJsonToolbox.weightFragmentation([
        [0, 1.392, 2.784, 3.48, 3.828],
        [0.696, 0.896, 2.288, 2.984, 3.332],
        [1.392, 1.592, 2.592, 3.188, 3.536],
        [2.088, 1.596, 2.988, 2.592, 2.94],
        [2.784, 2.192, 3.584, 3.288, 3.636]
      ], [
        {value: 8, rest: false, duration: 2},
        {value: 10, rest: false, duration: 2},
        {value: 12, rest: false, duration: 2},
        {value: 1, rest: false, duration: 2}
      ], [
        {value: 12, rest: false, duration: 4},
        {value: 7, rest: false, duration: 4},
        {value: 12, rest: false, duration: 2},
        {value: 7, rest: false, duration: 1}
      ], 1, 4, 4, false)).to.almost.equal(5.932);
    });
    it('calculates weight for fragment operation for adjusted parameters', function() {
      expect(MusicJsonToolbox.weightFragmentation([
        [0, 1.392, 2.784, 3.48, 3.828],
        [0.696, 0.896, 2.288, 2.984, 3.332],
        [1.392, 1.592, 2.592, 3.188, 3.536],
        [2.088, 1.596, 2.988, 2.592, 2.94],
        [2.784, 2.192, 3.584, 3.288, 3.636]
      ], [
        { value: 8, rest: false, duration: 2 },
        { value: 10, rest: false, duration: 2 },
        { value: 12, rest: false, duration: 2 },
        { value: 1, rest: false, duration: 2 }
      ], [
        { value: 12, rest: false, duration: 4},
        { value: 7, rest: false, duration: 4},
        { value: 12, rest: false, duration: 2},
        { value: 7, rest: false, duration: 1}
      ], 1, 4, 4, true)).to.almost.equal(8.244);
    });
  });

  describe('.weightConsolidation', function() {
    it('calculates weight for consolidate operation', function() {
      expect(MusicJsonToolbox.weightConsolidation([
        [0, 1.392, 2.784, 3.48, 3.828],
        [0.696, 0.896, 2.288, 2.984, 3.332],
        [1.392, 1.592, 2.592, 3.188, 3.536],
        [2.088, 1.596, 2.988, 2.592, 2.94],
        [2.784, 2.192, 3.584, 3.288, 3.636]
      ], [
        {value: 8, rest: false, duration: 1},
        {value: 10, rest: false, duration: 2},
        {value: 12, rest: false, duration: 2},
        {value: 1, rest: false, duration: 4}
      ], [
        {value: 12, rest: false, duration: 4},
        {value: 7, rest: false, duration: 4},
        {value: 12, rest: false, duration: 2},
        {value: 7, rest: false, duration: 1}
      ], 4, 4, 4, false)).to.almost.equal(8.328);
    });
    it('calculates weight for consolidate operation for adjusted parameters', function() {
      expect(MusicJsonToolbox.weightConsolidation([
        [0, 1.392, 2.784, 3.48, 3.828],
        [0.696, 0.896, 2.288, 2.984, 3.332],
        [1.392, 1.592, 2.592, 3.188, 3.536],
        [2.088, 1.596, 2.988, 2.592, 2.94],
        [2.784, 2.192, 3.584, 3.288, 3.636]
      ], [
        { value: 8, rest: false, duration: 1 },
        { value: 10, rest: false, duration: 2 },
        { value: 12, rest: false, duration: 2 },
        { value: 1, rest: false, duration: 4 }
      ], [
        { value: 12, rest: false, duration: 4},
        { value: 7, rest: false, duration: 4},
        { value: 12, rest: false, duration: 2},
        { value: 7, rest: false, duration: 1}
      ], 4, 4, 4, true)).to.almost.equal(16.488);
    });
  });

  describe('.weightedEditDistance', function() {
    it('calculates weighted edit distance between two pitch & duration arrays', function() {
      var output;
      var adjusted = false;

      output = MusicJsonToolbox.weightedEditDistance(
        [
          {value: 1, rest: false, duration: 4},
          {value: 3, rest: false, duration: 4},
          {value: 5, rest: false, duration: 2},
          {value: 6, rest: false, duration: 2}
        ],
        [], adjusted);
      expect(output).to.almost.equal(0);

      output = MusicJsonToolbox.weightedEditDistance(
        [],
        [
          {value: 1, rest: false, duration: 4},
          {value: 3, rest: false, duration: 4},
          {value: 5, rest: false, duration: 2},
          {value: 6, rest: false, duration: 2}
        ], adjusted);
      expect(output).to.almost.equal(0);

      output = MusicJsonToolbox.weightedEditDistance(
        [
          {value: 1, rest: false, duration: 4},
          {value: 3, rest: false, duration: 4},
          {value: 5, rest: false, duration: 2},
          {value: 6, rest: false, duration: 2}
        ],
        [
          {value: 1, rest: false, duration: 4},
          {value: 3, rest: false, duration: 4},
          {value: 5, rest: false, duration: 2},
          {value: 6, rest: false, duration: 2}
        ], adjusted);
      expect(output).to.equal(1);

      output = MusicJsonToolbox.weightedEditDistance(
        [
          {value: 1, rest: false, duration: 4},
          {value: 3, rest: false, duration: 4},
          {value: 5, rest: false, duration: 2},
          {value: 6, rest: false, duration: 2}
        ],
        [
          {value: 1, rest: false, duration: 4},
          {value: 6, rest: false, duration: 4},
          {value: 5, rest: false, duration: 2},
          {value: 6, rest: false, duration: 2}
        ], adjusted);
      expect(output).to.almost.equal(0.9521072796);

      output = MusicJsonToolbox.weightedEditDistance(
        [
          {value: 1, rest: false, duration: 4},
          {value: 3, rest: false, duration: 4},
          {value: 5, rest: false, duration: 2},
          {value: 6, rest: false, duration: 2}
        ],
        [
          {value: 1, rest: false, duration: 4},
          {value: 6, rest: false, duration: 2},
          {value: 5, rest: false, duration: 2},
          {value: 6, rest: false, duration: 2}
        ], adjusted);
      expect(output).to.almost.equal(0.78544061302);

      output = MusicJsonToolbox.weightedEditDistance(
        [
          {value: 1, rest: false, duration: 4},
          {value: 3, rest: false, duration: 4},
          {value: 5, rest: false, duration: 2},
          {value: 6, rest: false, duration: 2}
        ],
        [
          {value: 1, rest: false, duration: 4},
          {value: 6, rest: false, duration: 2},
          {value: 5, rest: false, duration: 2},
          {value: 1, rest: false, duration: 4}
        ], adjusted);
      expect(output).to.almost.equal(0.5689655172);

      output = MusicJsonToolbox.weightedEditDistance(
        [
          {value: 1, rest: false, duration: 4},
          {value: 3, rest: false, duration: 4},
          {value: 5, rest: false, duration: 2},
          {value: 6, rest: false, duration: 2}
        ],
        [
          {value: 8, rest: false, duration: 2},
          {value: 10, rest: false, duration: 2},
          {value: 12, rest: false, duration: 4},
          {value: 1, rest: false, duration: 4}
        ], adjusted);
      expect(output).to.almost.equal(0.3912835249);
    });

    it('calculates weighted edit distance between two pitch & duration arrays with adjusted parameters', function() {
      var output;
      var adjusted = true;

      output = MusicJsonToolbox.weightedEditDistance(
        [
          {value: 1, rest: false, duration: 4},
          {value: 3, rest: false, duration: 4},
          {value: 5, rest: false, duration: 2},
          {value: 6, rest: false, duration: 2}
        ],
        [], adjusted);
      expect(output).to.almost.equal(0);

      output = MusicJsonToolbox.weightedEditDistance(
        [],
        [
          {value: 1, rest: false, duration: 4},
          {value: 3, rest: false, duration: 4},
          {value: 5, rest: false, duration: 2},
          {value: 6, rest: false, duration: 2}
        ], adjusted);
      expect(output).to.almost.equal(0);

      output = MusicJsonToolbox.weightedEditDistance(
        [
          {value: 1, rest: false, duration: 4},
          {value: 3, rest: false, duration: 4},
          {value: 5, rest: false, duration: 2},
          {value: 6, rest: false, duration: 2}
        ],
        [
          {value: 1, rest: false, duration: 4},
          {value: 3, rest: false, duration: 4},
          {value: 5, rest: false, duration: 2},
          {value: 6, rest: false, duration: 2}
        ], adjusted);
      expect(output).to.equal(1);

      output = MusicJsonToolbox.weightedEditDistance(
        [
          {value: 1, rest: false, duration: 4},
          {value: 3, rest: false, duration: 4},
          {value: 5, rest: false, duration: 2},
          {value: 6, rest: false, duration: 2}
        ],
        [
          {value: 1, rest: false, duration: 4},
          {value: 6, rest: false, duration: 4},
          {value: 5, rest: false, duration: 2},
          {value: 6, rest: false, duration: 2}
        ], adjusted);
      expect(output).to.almost.equal(0.75);

      output = MusicJsonToolbox.weightedEditDistance(
        [
          {value: 1, rest: false, duration: 4},
          {value: 3, rest: false, duration: 4},
          {value: 5, rest: false, duration: 2},
          {value: 6, rest: false, duration: 2}
        ],
        [
          {value: 1, rest: false, duration: 4},
          {value: 6, rest: false, duration: 2},
          {value: 5, rest: false, duration: 2},
          {value: 6, rest: false, duration: 2}
        ], adjusted);
      expect(output).to.almost.equal(0.6733333333);

      output = MusicJsonToolbox.weightedEditDistance(
        [
          {value: 1, rest: false, duration: 4},
          {value: 3, rest: false, duration: 4},
          {value: 5, rest: false, duration: 2},
          {value: 6, rest: false, duration: 2}
        ],
        [
          {value: 1, rest: false, duration: 4},
          {value: 6, rest: false, duration: 2},
          {value: 5, rest: false, duration: 2},
          {value: 1, rest: false, duration: 4}
        ], adjusted);
      expect(output).to.almost.equal(0.1800000000);

      output = MusicJsonToolbox.weightedEditDistance(
        [
          {value: 1, rest: false, duration: 4},
          {value: 3, rest: false, duration: 4},
          {value: 5, rest: false, duration: 2},
          {value: 6, rest: false, duration: 2}
        ],
        [
          {value: 8, rest: false, duration: 2},
          {value: 10, rest: false, duration: 2},
          {value: 12, rest: false, duration: 4},
          {value: 1, rest: false, duration: 4}
        ], adjusted);
      expect(output).to.almost.equal(0.1111111111);
    });
  });

});
