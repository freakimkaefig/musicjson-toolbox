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
        {value: 1, rest: true, duration: 4}
      )).to.equal(0.1);
    });

    it('calculates interval weight for pitch values in the tonic (deg(n))', function() {
      expect(MusicJsonToolbox.weightInterval(
        {value: 1, rest: false, duration: 4},
        {value: 1, rest: false, duration: 4}
      )).to.equal(0);
      expect(MusicJsonToolbox.weightInterval(
        {value: 1, rest: false, duration: 4},
        {value: 3, rest: false, duration: 4}
      )).to.equal(0.9);
      expect(MusicJsonToolbox.weightInterval(
        {value: 1, rest: false, duration: 4},
        {value: 5, rest: false, duration: 4}
      )).to.equal(0.2);
      expect(MusicJsonToolbox.weightInterval(
        {value: 1, rest: false, duration: 4},
        {value: 6, rest: false, duration: 4}
      )).to.equal(0.5);
      expect(MusicJsonToolbox.weightInterval(
        {value: 1, rest: false, duration: 4},
        {value: 8, rest: false, duration: 4}
      )).to.equal(0.1);
      expect(MusicJsonToolbox.weightInterval(
        {value: 1, rest: false, duration: 4},
        {value: 10, rest: false, duration: 4}
      )).to.equal(0.35);
      expect(MusicJsonToolbox.weightInterval(
        {value: 1, rest: false, duration: 4},
        {value: 12, rest: false, duration: 4}
      )).to.equal(0.8);

      expect(MusicJsonToolbox.weightInterval(
        {value: 54, rest: false, duration: 4},
        {value: 48, rest: false, duration: 4}
      )).to.equal(0.5);
      expect(MusicJsonToolbox.weightInterval(
        {value: 48, rest: false, duration: 4},
        {value: 54, rest: false, duration: 4}
      )).to.equal(0.5);
    });

    it('calculates interval weight for pitch values not in the tonic (ton(m))', function() {
      expect(MusicJsonToolbox.weightInterval(
        { value: 2, rest: false, duration: 4},
        { value: 2, rest: false, duration: 4}
      )).to.equal(0.6);
      expect(MusicJsonToolbox.weightInterval(
        { value: 2, rest: false, duration: 4},
        { value: 3, rest: false, duration: 4}
      )).to.equal(2.6);
      expect(MusicJsonToolbox.weightInterval(
        { value: 2, rest: false, duration: 4},
        { value: 4, rest: false, duration: 4}
      )).to.equal(2.3);
      expect(MusicJsonToolbox.weightInterval(
        { value: 2, rest: false, duration: 4},
        { value: 5, rest: false, duration: 4}
      )).to.equal(1);
      expect(MusicJsonToolbox.weightInterval(
        { value: 2, rest: false, duration: 4},
        { value: 6, rest: false, duration: 4}
      )).to.equal(1);
      expect(MusicJsonToolbox.weightInterval(
        { value: 2, rest: false, duration: 4},
        { value: 7, rest: false, duration: 4}
      )).to.equal(1.6);
      expect(MusicJsonToolbox.weightInterval(
        { value: 2, rest: false, duration: 4},
        { value: 8, rest: false, duration: 4}
      )).to.equal(1.8);
      expect(MusicJsonToolbox.weightInterval(
        { value: 2, rest: false, duration: 4},
        { value: 9, rest: false, duration: 4}
      )).to.equal(0.8);
      expect(MusicJsonToolbox.weightInterval(
        { value: 2, rest: false, duration: 4},
        { value: 10, rest: false, duration: 4}
      )).to.equal(1.3);
      expect(MusicJsonToolbox.weightInterval(
        { value: 2, rest: false, duration: 4},
        { value: 11, rest: false, duration: 4}
      )).to.equal(1.3);
      expect(MusicJsonToolbox.weightInterval(
        { value: 2, rest: false, duration: 4},
        { value: 12, rest: false, duration: 4}
      )).to.equal(2.2);
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
      expect(MusicJsonToolbox.weightSubstitution(a, b, 1, 2)).to.equal(0.5);
      expect(MusicJsonToolbox.weightSubstitution(a, b, 1, 3)).to.equal(0.8959999999999999);
    });
  });

  describe('.weightInsertion', function() {
    it('calculates weight for insert operation', function() {
      expect(MusicJsonToolbox.weightInsertion(b, 2)).to.equal(1.392);
      expect(MusicJsonToolbox.weightInsertion(b, 3)).to.equal(0.696);
    });
  });

  describe('.weightDeletion', function() {
    it('calculates weight for delete operation', function() {
      expect(MusicJsonToolbox.weightDeletion(a, 1)).to.equal(1.392);
      expect(MusicJsonToolbox.weightDeletion(a, 3)).to.equal(0.696);
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
        { value: 8, rest: false, duration: 2 },
        { value: 10, rest: false, duration: 2 },
        { value: 12, rest: false, duration: 2 },
        { value: 1, rest: false, duration: 2 }
      ], [
        { value: 12, rest: false, duration: 4},
        { value: 7, rest: false, duration: 4},
        { value: 12, rest: false, duration: 2},
        { value: 7, rest: false, duration: 1}
      ], 1, 4, 4)).to.almost.equal(5.932);
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
        { value: 8, rest: false, duration: 1 },
        { value: 10, rest: false, duration: 2 },
        { value: 12, rest: false, duration: 2 },
        { value: 1, rest: false, duration: 4 }
      ], [
        { value: 12, rest: false, duration: 4},
        { value: 7, rest: false, duration: 4},
        { value: 12, rest: false, duration: 2},
        { value: 7, rest: false, duration: 1}
      ], 4, 4, 4)).to.almost.equal(8.328);
    });
  });

  describe('.weightedEditDistance', function() {
    it('calculates weighted edit distance between two pitch & duration arrays', function() {
      var output;

      output = MusicJsonToolbox.weightedEditDistance(
        [
          {value: 1, rest: false, duration: 4},
          {value: 3, rest: false, duration: 4},
          {value: 5, rest: false, duration: 2},
          {value: 6, rest: false, duration: 2}
        ],
        []);
      expect(output).to.almost.equal(4.176);

      output = MusicJsonToolbox.weightedEditDistance(
        [],
        [
          {value: 1, rest: false, duration: 4},
          {value: 3, rest: false, duration: 4},
          {value: 5, rest: false, duration: 2},
          {value: 6, rest: false, duration: 2}
        ]);
      expect(output).to.almost.equal(4.176);

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
        ]);
      expect(output).to.equal(0);

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
        ]);
      expect(output).to.equal(0.2);

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
        ]);
      expect(output).to.equal(0.8959999999999999);

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
        ]);
      expect(output).to.almost.equal(1.8);

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
        ]);
      expect(output).to.almost.equal(2.542);
    });
  });

});
