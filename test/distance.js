var expect = require('chai').expect;
var fs = require('fs');
var MusicJsonToolbox = require('../index');

musicjson = require('./example.json');
search = require('./search.json');

describe('MusicJsonToolbox Distance Functions', function() {

  describe('MusicJsonToolbox.distancePitchNgrams', function() {
    it('calculates distance between ngrams of pitches', function() {
      var distancePitchNgrams = MusicJsonToolbox.distancePitchNgrams(musicjson, search);
      expect(distancePitchNgrams).to.deep.equal({
        cost: 0,
        highlight: [
          { measure: 2, note: 0 },
          { measure: 2, note: 1 },
          { measure: 2, note: 2 },
          { measure: 2, note: 3 }
        ]
      });
    });
  });

  describe('MusicJsonToolbox.distanceIntervalNgrams', function() {
    it('calculates distance between ngrams of intervals', function() {
      var distanceIntervalNgrams = MusicJsonToolbox.distanceIntervalNgrams(musicjson, search);
      expect(distanceIntervalNgrams).to.deep.equal({
        cost: 0,
        highlight: [
          { measure: 10, note: 1 },
          { measure: 10, note: 2 },
          { measure: 10, note: 3 }
        ]
      });
    });
  });

  describe('MusicJsonToolbox.distanceParsonsLevenshtein', function() {
    it('calculates levenshtein distance between parsons code strings', function() {
      var distanceParsonsLevenshtein = MusicJsonToolbox.distanceParsonsLevenshtein(musicjson, search);
      expect(distanceParsonsLevenshtein).to.be.equal(44);
    });
  });

  describe('MusicJsonToolbox.distanceParsonsNgramsLevenshtein', function() {
    it('calculates distance between ngrams of intervals', function() {
      var distanceParsonsNgramsLevenshtein = MusicJsonToolbox.distanceParsonsNgramsLevenshtein(musicjson, search);
      expect(distanceParsonsNgramsLevenshtein).to.deep.equal({
        cost: 1,
        highlight: [
          { measure: 10, note: 0 },
          { measure: 10, note: 1 },
          { measure: 10, note: 2 },
          { measure: 10, note: 3 }
        ]
      });
    });
  });

});