'use strict';

var chai = require('chai');
var chaiStats = require('chai-stats');
var MusicJsonToolbox = require('../musicjson-toolbox');

chai.use(chaiStats);
var expect = chai.expect;

var musicjson = require('./example.json');
var searchPitch = [1, 6, 1, 6];
var searchParsons = '*udu';
var searchIntervals = ['*', 5, -5, 5];
var searchPitchDuration = [
  {value: 12, rest: false, duration: 4},
  {value: 7, rest: false, duration: 4},
  {value: 12, rest: false, duration: 2},
  {value: 7, rest: false, duration: 1}
];

describe('MusicJsonToolbox Distance Functions', function() {

  describe('.distanceParsons', function() {
    it('calculates edit-distance between parsons code strings', function() {
      var distanceParsons = MusicJsonToolbox.distanceParsons(musicjson, searchParsons);
      expect(distanceParsons).to.almost.equal(0.3333333);
    });
  });

  describe('.distancePitch', function() {
    it('calculates edit-distance between pitch values', function() {
      var distancePitch = MusicJsonToolbox.distancePitch(musicjson, searchPitch);
      expect(distancePitch).to.almost.equal(0.0833333);
    });
  });

  describe('.distanceIntervals', function() {
    it('calculates edit-distance between interval values', function() {
      var distancePitch = MusicJsonToolbox.distanceIntervals(musicjson, searchIntervals);
      expect(distancePitch).to.almost.equal(0.3333333);
    });
  });

  describe('.distancePitchDuration', function() {
    it('calculates weighted edit-distance between pitch & duration values', function() {
      var distancePitchDuration = MusicJsonToolbox.distancePitchDuration(musicjson, searchPitchDuration);
      expect(distancePitchDuration).to.almost.equal(0.21408045977);
    });
  });

  describe('.distanceParsonsNgrams', function() {
    it('calculates edit-distance between ngrams of parsons code strings', function() {
      var distanceParsonsNgrams = MusicJsonToolbox.distanceParsonsNgrams(musicjson, searchParsons);
      var result = require('./distance_parsons_ngrams.json');
      expect(distanceParsonsNgrams).to.deep.equal(result);
    });
  });

  describe('.distancePitchNgrams', function() {
    it('calculates edit-distance between ngrams of pitch values', function() {
      var distancePitchNgrams = MusicJsonToolbox.distancePitchNgrams(musicjson, searchPitch);
      var result = require('./distance_pitch_ngrams.json');
      expect(distancePitchNgrams).to.deep.equal(result);
    });
  });

  describe('.distanceIntervalsNgrams', function() {
    it('calculates edit-distance between ngrams of intervals', function() {
      var distanceIntervalsNgrams = MusicJsonToolbox.distanceIntervalsNgrams(musicjson, searchIntervals);
      var result = require('./distance_intervals_ngrams.json');
      expect(distanceIntervalsNgrams).to.deep.equal(result);
    });
  });

  describe('.distancePitchDurationNgrams', function() {
    it('calculates weighted edit-distance between pitch & duration values', function() {
      var distancePitchDurationNgrams = MusicJsonToolbox.distancePitchDurationNgrams(musicjson, searchPitchDuration);
      var result = require('./distance_pitch_duration_ngrams.json');
      expect(distancePitchDurationNgrams.length).to.be.equal(result.length);
      for (var i = 0; i < distancePitchDurationNgrams.length; i++) {
        expect(distancePitchDurationNgrams[i].distance).to.almost.equal(result[i].distance);
        expect(distancePitchDurationNgrams[i].measure).to.be.equal(result[i].measure);
        expect(distancePitchDurationNgrams[i].note).to.be.equal(result[i].note);
      }
    });
  });

});
