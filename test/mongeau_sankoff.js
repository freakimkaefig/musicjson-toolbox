'use strict';

var expect = require('chai').expect;
var MusicJsonToolbox = require('../index');

var a = [
  { value: 1, rest: false, duration: 4},
  { value: 3, rest: false, duration: 4},
  { value: 5, rest: false, duration: 2},
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
    it('calculates weight for intervals', function() {
      // deg
      expect(MusicJsonToolbox.weightInterval(1, 1)).to.equal(0);
      expect(MusicJsonToolbox.weightInterval(1, 3)).to.equal(0.9);
      expect(MusicJsonToolbox.weightInterval(1, 5)).to.equal(0.2);
      expect(MusicJsonToolbox.weightInterval(1, 6)).to.equal(0.5);
      expect(MusicJsonToolbox.weightInterval(1, 8)).to.equal(0.1);
      expect(MusicJsonToolbox.weightInterval(1, 10)).to.equal(0.35);
      expect(MusicJsonToolbox.weightInterval(1, 12)).to.equal(0.8);

      expect(MusicJsonToolbox.weightInterval(54, 48)).to.equal(0.5);
      expect(MusicJsonToolbox.weightInterval(48, 54)).to.equal(0.5);

      // ton
      expect(MusicJsonToolbox.weightInterval(2, 2)).to.equal(0.6);
      expect(MusicJsonToolbox.weightInterval(2, 3)).to.equal(2.6);
      expect(MusicJsonToolbox.weightInterval(2, 4)).to.equal(2.3);
      expect(MusicJsonToolbox.weightInterval(2, 5)).to.equal(1);
      expect(MusicJsonToolbox.weightInterval(2, 6)).to.equal(1);
      expect(MusicJsonToolbox.weightInterval(2, 7)).to.equal(1.6);
      expect(MusicJsonToolbox.weightInterval(2, 8)).to.equal(1.8);
      expect(MusicJsonToolbox.weightInterval(2, 9)).to.equal(0.8);
      expect(MusicJsonToolbox.weightInterval(2, 10)).to.equal(1.3);
      expect(MusicJsonToolbox.weightInterval(2, 11)).to.equal(1.3);
      expect(MusicJsonToolbox.weightInterval(2, 12)).to.equal(2.2);
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

  // describe('.weightFragmentation', function() {
  //   it('calculates weight for fragment operation', function() {
  //
  //   });
  // });
  //
  // describe('.weightConsolidation', function() {
  //   it('calculates weight for consolidate operation', function() {
  //
  //   });
  // });

  // describe('.weightedEditDistance', function() {
  //   it('calculates weighted edit distance between two pitch & duration arrays', function() {
  //     var output;
  //
  //     output = MusicJsonToolbox.weightedEditDistance(
  //       [
  //         {value: 1, duration: 4},
  //         {value: 3, duration: 4},
  //         {value: 5, duration: 2},
  //         {value: 6, duration: 2}
  //       ],
  //       []);
  //     expect(output).to.equal(4);
  //
  //     output = MusicJsonToolbox.weightedEditDistance(
  //       [],
  //       [
  //         {value: 1, duration: 4},
  //         {value: 3, duration: 4},
  //         {value: 5, duration: 2},
  //         {value: 6, duration: 2}
  //       ]);
  //     expect(output).to.equal(4);
  //
  //     output = MusicJsonToolbox.weightedEditDistance(
  //       [
  //         {value: 1, duration: 4},
  //         {value: 3, duration: 4},
  //         {value: 5, duration: 2},
  //         {value: 6, duration: 2}
  //       ],
  //       [
  //         {value: 1, duration: 4},
  //         {value: 3, duration: 4},
  //         {value: 5, duration: 2},
  //         {value: 6, duration: 2}
  //       ]);
  //     expect(output).to.equal(0);
  //
  //     output = MusicJsonToolbox.weightedEditDistance(
  //       [
  //         {value: 1, duration: 4},
  //         {value: 3, duration: 4},
  //         {value: 5, duration: 2},
  //         {value: 6, duration: 2}
  //       ],
  //       [
  //         {value: 1, duration: 4},
  //         {value: 6, duration: 4},
  //         {value: 5, duration: 2},
  //         {value: 6, duration: 2}
  //       ]);
  //     expect(output).to.equal(0.2);
  //
  //     output = MusicJsonToolbox.weightedEditDistance(
  //       [
  //         {value: 1, duration: 4},
  //         {value: 3, duration: 4},
  //         {value: 5, duration: 2},
  //         {value: 6, duration: 2}
  //       ],
  //       [
  //         {value: 1, duration: 4},
  //         {value: 6, duration: 2},
  //         {value: 5, duration: 2},
  //         {value: 6, duration: 2}
  //       ]);
  //     expect(output).to.equal(0.8959999999999999);
  //
  //     output = MusicJsonToolbox.weightedEditDistance(
  //       [
  //         {value: 1, duration: 4},
  //         {value: 3, duration: 4},
  //         {value: 5, duration: 2},
  //         {value: 6, duration: 2}
  //       ],
  //       [
  //         {value: 1, duration: 4},
  //         {value: 6, duration: 2},
  //         {value: 5, duration: 2},
  //         {value: 1, duration: 4}
  //       ]);
  //     expect(output).to.equal(9);
  //
  //     output = MusicJsonToolbox.weightedEditDistance(
  //       [
  //         {value: 1, duration: 4},
  //         {value: 3, duration: 4},
  //         {value: 5, duration: 2},
  //         {value: 6, duration: 2}
  //       ],
  //       [
  //         {value: 8, duration: 2},
  //         {value: 10, duration: 2},
  //         {value: 12, duration: 4},
  //         {value: 1, duration: 4}
  //       ]);
  //     expect(output).to.equal(15);
  //   });
  // });

});
