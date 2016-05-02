(function() {
  'use strict';

  // C  |    | D |    | E  | F  |    | G |    | A  |    | B
  // B# | C# |   | D# |    | E# | F# |   | G# |    | A# |
  //    | Db |   | Eb | Fb |    | Gb |   | Ab |    | Bb | Cb
  // 1  | 2  | 3 | 4  | 5  | 6  | 7  | 8 | 9  | 10 | 11 | 12
  var base12 = {
    "C": 1,
    "D": 3,
    "E": 5,
    "F": 6,
    "G": 8,
    "A": 10,
    "B": 12
  };

  /**
   * The MusicJsonToolbox class implements static functions to operate with musicjson objects.
   * @exports MusicJsonToolbox
   */
  var MusicJsonToolbox = {

    /**
     * Returns an array of all notes (transposed to C major).
     *
     * Example:
     * [ {object}, {object}, ... ]
     *
     * @param {object} obj - The musicjson object
     * @returns {Array} An array containing all notes of the given object
     */
    notes: function(obj) {
      var tempNotes = [];
      var repeatStart = -1;

      for (var i = 0; i < obj.measures.length; i++) {

        for (var j = 0; j < obj.measures[i].notes.length; j++) {
          obj.measures[i].notes[j].measureNumber = i;
          obj.measures[i].notes[j].noteNumber = j;
        }

        if (obj.measures[i].attributes.repeat.left) {
          repeatStart = i;
        }

        tempNotes = tempNotes.concat(obj.measures[i].notes);

        if (obj.measures[i].attributes.repeat.right) {
          if (repeatStart !== -1) {
            while (repeatStart <= i) {
              tempNotes = tempNotes.concat(obj.measures[repeatStart].notes);
              repeatStart++;
            }
          }
          repeatStart = -1;
        }
      }

      return tempNotes;
    },

    /**
     * Returns an array of notes as intervals
     *
     * Example:
     * [ {0}, {2}, {-2}, {5}, ... ]
     * @param {Array} notes - Array of notes for which the contour should be created
     * @param {number} keyAdjust - The position in circle of fifths of the searched notes
     * @returns {Array} An array of notes as contour
     */
    intervals: function(notes, keyAdjust) {
      var tempIntervals = [];

      tempIntervals.push({
        value: 0,
        noteNumber: 0,
        measureNumber: 0
      });

      for (var i = 1; i < notes.length; i++) {
        var pitchDiff = 0;
        if (notes[i].rest) {
          pitchDiff = 0; // TODO: maybe weight rests different than zero
        } else {
          pitchDiff = this.pitchDifference(notes[i-1].pitch, keyAdjust, notes[i].pitch, true, false);
        }
        var tempNote = {
          value: pitchDiff,
          noteNumber: notes[i].noteNumber,
          measureNumber: notes[i].measureNumber
        };
        tempIntervals.push(tempNote);
      }

      return tempIntervals;
    },

    // TODO: Method to generate contour (in Parsons code)

    /**
     * Generates array of ngrams in specified length (based on {@link https://gist.github.com/eranbetzalel/9f16b1216931e20775ad}).
     * @param {Array} array - An array of notes (returned by function "notes")
     * @param {number} length - The length of n
     * @returns {Array} An Array of ngrams with the given length
     */
    ngrams: function(array, length) {
      var nGramsArray = [];

      for (var i = 0; i < array.length - (length - 1); i++) {
        var subNgramsArray = [];

        for (var j = 0; j < length; j++) {
          subNgramsArray.push(array[i + j]);
        }

        nGramsArray.push(subNgramsArray);
      }

      return nGramsArray;
    },

    /**
     * Calculates the base 12 represented pitch
     * @param {string} step - The step (c, d, e, f, g, a, b)
     * @param {number} keyAdjust - The position in circle of fifths of the searched notes
     * @param {number} octave - The octave
     * @param {number} alter - The value for alter (either from accidental or key)
     * @param {bool} withOctave - When set, the octave is taken into account, otherwise function return relative value (from 1 to 12)
     * @returns {number} The base12 pitch number
     */
    base12Pitch: function(step, keyAdjust, octave, alter, withOctave) {
      var ret = base12[step];
      if (alter) {
        ret += alter;
      }
      ret -= keyAdjust;
      if (ret === 0) {
        ret = 12;
        octave--;
      }
      if (withOctave) {
        ret += (octave * 12);
      }


      return ret;
    },

    /**
     * Calculates difference between two pitches
     * @param {object} pitch1 - The first pitch to compare
     * @param {number} keyAdjust - The position in circle of fifths of the searched notes
     * @param {object} pitch2 - The second pitch to compare
     * @param {bool} withOctave - When set, the octave is taken into account, otherwise function return relative value (from 1 to 12)
     * @param {bool} absolute - When set, the absolute difference is returned ( | Pitch 2 - Pitch 1 | )
     * @returns {number} The difference between two pitches
     */
    pitchDifference: function(pitch1, keyAdjust, pitch2, withOctave, absolute) {
      if (typeof withOctave === 'undefined') withOctave = false;
      if (typeof absolute === 'undefined') absolute = false;

      var ret = this.base12Pitch(pitch2.step, keyAdjust, pitch2.octave, pitch2.alter, withOctave) - this.base12Pitch(pitch1.step, keyAdjust, pitch1.octave, pitch1.alter, withOctave);
      if (absolute) {
        ret = Math.abs(ret);
      }

      return ret;
    },

    /**
     * Calculates difference between two durations
     * @param {number} duration1 - The first duration to compare
     * @param {number} duration2 - The second duration to compare
     * @param {bool} absolute - When set, the absolute difference is returned ( | Duration 2 - Duration 1 | )
     * @returns {number} The difference between two durations
     */
    durationDifference: function(duration1, duration2, absolute) {
      if (typeof absolute === 'undefined') absolute = false;

      var ret = duration2 - duration1;
      if (absolute) {
        ret = Math.abs(ret);
      }

      return ret;
    },

    /**
     * Returns only unique array values
     * @param {Array} array - The array with possible duplicate values
     * @returns {Array} Array with only unique values
     */
    uniques: function(array) {
      var a = [];
      for (var i=0, l=array.length; i<l; i++)
        if (a.indexOf(array[i]) === -1 && array[i] !== '')
          a.push(array[i]);
      return a;
    },

    /**
     * Returns the minimum pseudo-edit-distance between the searched notes and corresponding ngrams.
     * Notes are represented with pitch and duration
     *
     * @param {object} object - A musicjson object to search in
     * @param {Array} search - An array of notes that should be searched
     * @returns {object} The first finding with minimum cost
     */
    distanceNgramsRawPitch: function(object, search) {
      var keyAdjust = object.attributes.key.fifths;
      var ngrams = this.ngrams(this.notes(object), search.length);
      var costs = [];

      for (var i = 0; i < ngrams.length; i++) {
        var tempCost = 0;
        var tempMeasures = [];

        for (var j = 0; j < ngrams[i].length; j++) {
          if (ngrams[i][j].rest || search[j].rest) {
            tempCost = tempCost + this.durationDifference(ngrams[i][j].duration, search[j].duration);
            if (ngrams[i][j].rest && search[j].rest) {
              // both notes are rests --> do nothing
            } else {
              // if one note isn't a rest add maximum pitch value
              tempCost += 12;
            }
          } else {
            tempCost = tempCost + this.pitchDifference(ngrams[i][j].pitch, keyAdjust, search[j].pitch, false, true) + this.durationDifference(ngrams[i][j].duration, search[j].duration);
          }
          // TODO: Adjust weighting
          // eg: C D C D vs. G A G A = 7        same structure: up(2) > down(2) > up(2)
          //     C D C D vs. G A C A = 5.25     different structure: up(2) > down(2 vs 9) > up(2 vs 9)

          // Add measure number and note number to finding
          tempMeasures.push({
            measure: ngrams[i][j].measureNumber,
            note: ngrams[i][j].noteNumber
          });
        }

        costs.push({
          cost: tempCost / search.length,
          highlight: this.uniques(tempMeasures).sort()
        });
      }

      return costs.sort(function(a, b) {
        return a.cost - b.cost;
      }).shift();
    },

    // TODO: improve from pseudo-edit-distance to real edit-distance
    //       maybe comparing strings of base12 pitches
    //       eg: 5 4 12 9 11
    //           | |  | |  |
    //           0 0  2 1  0
    //           | |  | |  |
    //           5 4 10 8 11

    /**
     * Returns the minimum distance between the searched notes and the corresponding ngrams.
     * Notes are represented as contour of pitches.
     *
     * @param {object} object - A musicjson object to search in
     * @param {Array} search - An array of notes that should be searched
     * @returns {object} The first finding with minimum cost
     */
    distanceIntervalPitch: function(object, search) {
      var keyAdjust = object.attributes.key.fifths;
      var ngrams = this.ngrams(this.intervals(this.notes(object), keyAdjust), search.length);
      var searchIntervals = this.intervals(search, 0);
      var costs = [];

      for (var i = 0; i < ngrams.length; i++) {
        var tempCost = 0;
        var tempMeasures = [];

        for (var j = 1; j < ngrams[i].length; j++) {
          tempCost = tempCost + Math.abs(ngrams[i][j].value - searchIntervals[j].value);

          // subtract octaves for relative results
          while (tempCost > 12) {
            tempCost -= 12;
          }

          tempMeasures.push({
            measure: ngrams[i][j].measureNumber,
            note: ngrams[i][j].noteNumber
          });
        }

        costs.push({
          cost: tempCost / search.length,
          highlight: this.uniques(tempMeasures).sort()
        });
      }

      return costs.sort(function(a, b) {
        return a.cost - b.cost;
      }).shift();
    }

    // TODO: Distance calculation based on intervals
  };


  // =============================
  // ========== EXPORTS ==========
  // =============================
  // amd
  if (typeof define !== "undefined" && define !== null && define.amd) {
    define(function() {
      return MusicJsonToolbox;
    });
  }
  // commonjs
  else if (typeof module !== "undefined" && module !== null) {
    module.exports = MusicJsonToolbox;
  }
  // web worker
  else if (typeof self !== "undefined" && typeof self.postMessage === 'function' && typeof self.importScripts === 'function') {
    self.MusicJsonToolbox = MusicJsonToolbox;
  }
  // browser main thread
  else if (typeof window !== "undefined" && window !== null) {
    window.MusicJsonToolbox = MusicJsonToolbox;
  }
}());
