var expect = require('chai').expect;
var MusicJsonToolbox = require('../index');

var musicjson = require('./example.json');
var search = require('./search.json');

describe('MusicJsonToolbox Distance Functions', function() {

  describe('MusicJsonToolbox.distancePitchNgrams', function() {
    it('calculates distance between ngrams of pitches', function() {
      var distancePitchNgrams = MusicJsonToolbox.distancePitchNgrams(musicjson, search);
      expect(distancePitchNgrams).to.deep.equal({
        cost: 2.4,
        highlight: [
          { measure: 2, note: 0 },
          { measure: 2, note: 1 },
          { measure: 2, note: 2 },
          { measure: 2, note: 3 },
          { measure: 3, note: 0 }
        ]
      });
    });
  });

  describe('MusicJsonToolbox.distanceIntervalNgrams', function() {
    it('calculates distance between ngrams of intervals', function() {
      var distanceIntervalNgrams = MusicJsonToolbox.distanceIntervalNgrams(musicjson, search);
      expect(distanceIntervalNgrams).to.deep.equal({
        cost: 0.2,
        highlight: [
          { measure: 6, note: 3 },
          { measure: 6, note: 4 },
          { measure: 7, note: 0 },
          { measure: 7, note: 1 }
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
        cost: 2,
        highlight: [
          { measure: 0, note: 0 },
          { measure: 0, note: 1 },
          { measure: 1, note: 0 },
          { measure: 1, note: 1 },
          { measure: 1, note: 2 }
        ]
      });
    });
  });

});