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

  describe('.parsonsNgramSimilarity', function() {
    it('calculates edit-distance between ngrams of parsons code strings', function() {
      var parsonsNgramSimilarity = MusicJsonToolbox.parsonsNgramSimilarity(musicjson, searchParsons);
      var result = require('./distance_parsons_ngrams.json');
      expect(parsonsNgramSimilarity).to.deep.equal(result);
    });
  });

  describe('.pitchNgramSimilarity', function() {
    it('calculates edit-distance between ngrams of pitch values', function() {
      var pitchNgramSimilarity = MusicJsonToolbox.pitchNgramSimilarity(musicjson, searchPitch);
      var result = require('./distance_pitch_ngrams.json');
      expect(pitchNgramSimilarity).to.deep.equal(result);
    });
  });

  describe('.intervalNgramSimilarity', function() {
    it('calculates edit-distance between ngrams of intervals', function() {
      var intervalNgramSimilarity = MusicJsonToolbox.intervalNgramSimilarity(musicjson, searchIntervals);
      var result = require('./distance_intervals_ngrams.json');
      expect(intervalNgramSimilarity).to.deep.equal(result);
    });
  });

  describe('.pitchDurationNgramSimilarity', function() {
    it('calculates weighted edit-distance between pitch & duration values', function() {
      var pitchDurationNgramSimilarity = MusicJsonToolbox.pitchDurationNgramSimilarity(musicjson, searchPitchDuration);
      var result = require('./distance_pitch_duration_ngrams.json');
      expect(pitchDurationNgramSimilarity.length).to.be.equal(result.length);
      for (var i = 0; i < pitchDurationNgramSimilarity.length; i++) {
        expect(pitchDurationNgramSimilarity[i].similarity).to.almost.equal(result[i].similarity);
        expect(pitchDurationNgramSimilarity[i].measure).to.be.equal(result[i].measure);
        expect(pitchDurationNgramSimilarity[i].note).to.be.equal(result[i].note);
      }
    });
  });

});
