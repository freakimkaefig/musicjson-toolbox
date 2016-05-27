(function() {
  'use strict';

  /**
   * Pitch values for steps in base 12 system
   * C  |    | D |    | E  | F  |    | G |    | A  |    | B
   * B# | C# |   | D# |    | E# | F# |   | G# |    | A# |
   *    | Db |   | Eb | Fb |    | Gb |   | Ab |    | Bb | Cb
   * 1  | 2  | 3 | 4  | 5  | 6  | 7  | 8 | 9  | 10 | 11 | 12
   *
   * @constant
   * @type {object}
   * @default
   */
  var base12 = {
    'C': 1,
    'D': 3,
    'E': 5,
    'F': 6,
    'G': 8,
    'A': 10,
    'B': 12
  };

  /**
   * Cost weighting factors for consonant/dissonant intervals
   *
   * @constant
   * @type {Array}
   * @default
   */
  var intervalFactor = [
    1,  // 0  =   unison          (perfect consonant)
    3,  // 1  =   minor second    (dissonant)
    3,  // 2  =   major second    (dissonant)
    2,  // 3  =   minor third     (imperfect consonant)
    2,  // 4  =   major third     (imperfect consonant)
    1,  // 5  =   perfect fourth  (perfect consonant)
    3,  // 6  =   minor fifth     (dissonant)
    1,  // 7  =   perfect fourth  (perfect consonant)
    2,  // 8  =   minor sixth     (imperfect consonant)
    2,  // 9  =   major sixth     (imperfect consonant)
    3,  // 10 =   minor seventh   (dissonant)
    3,  // 11 =   major seventh   (dissonant)
    1   // 12 =   octave          (perfect consonant)
  ];

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
     * @param {boolean} repeat - If set to true, repeated measures are also repeated in notes output
     * @returns {Array} An array containing all notes of the given object
     */
    notes: function(obj, repeat) {
      var tempNotes = [];
      var repeatStart = -1;

      for (var i = 0; i < obj.measures.length; i++) {

        for (var j = 0; j < obj.measures[i].notes.length; j++) {
          obj.measures[i].notes[j].measureNumber = i;
          obj.measures[i].notes[j].noteNumber = j;
        }

        if (repeat && obj.measures[i].attributes.repeat.left) {
          repeatStart = i;
        }

        tempNotes = tempNotes.concat(obj.measures[i].notes);

        if (repeat && obj.measures[i].attributes.repeat.right) {
          /* istanbul ignore else  */
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
          // TODO: maybe weight rests different than zero
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

    /**
     * Generate array of parson code from notes
     * @param {Array} notes - Array of notes for which the contour should be created
     * @returns {Array} An array of notes as parsons code
     */
    parsons: function(notes) {
      var tempParsons = [];

      tempParsons.push({
        value: '*',
        noteNumber: 0,
        measureNumber: 0
      });

      for (var i = 1; i < notes.length; i++) {
        var parson;
        if (notes[i].rest) {
          parson = 'r';
        } else {
          var pitchDiff = this.pitchDifference(notes[i-1].pitch, 0, notes[i].pitch, true, false);
          /* istanbul ignore else  */
          if (pitchDiff === 0) {
            parson = 'r';
          } else if (pitchDiff > 0) {
            parson = 'u';
          } else if (pitchDiff < 0) {
            parson = 'd';
          }
        }
        tempParsons.push({
          value: parson,
          noteNumber: notes[i].noteNumber,
          measureNumber: notes[i].measureNumber
        });
      }

      return tempParsons;
    },

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
     * @param {boolean} withOctave - When set, the octave is taken into account, otherwise function return relative value (from 1 to 12)
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
     * @param {boolean} withOctave - When set, the octave is taken into account, otherwise function return relative value (from 1 to 12)
     * @param {boolean} absolute - When set, the absolute difference is returned ( | Pitch 2 - Pitch 1 | )
     * @returns {number} The difference between two pitches
     */
    pitchDifference: function(pitch1, keyAdjust, pitch2, withOctave, absolute) {
      if (typeof withOctave === 'undefined') {
        withOctave = false;
      }
      if (typeof absolute === 'undefined') {
        absolute = false;
      }

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
     * @param {boolean} absolute - When set, the absolute difference is returned ( | Duration 2 - Duration 1 | )
     * @returns {number} The difference between two durations
     */
    durationDifference: function(duration1, duration2, absolute) {
      if (typeof absolute === 'undefined') {
        absolute = false;
      }

      var ret = duration2 - duration1;
      if (absolute) {
        ret = Math.abs(ret);
      }

      return ret;
    },

    /**
     * Calculates weighting value for edit-distance substitution
     * Calculation is based on consonant or dissonant values
     *
     * @param {number} a - The first interval
     * @param {number} b - The second interval
     * @returns {number} Consonant/Dissonant based weighting value
     */
    intervalWeight: function(a, b) {
      var x = Math.abs(b - a);
      while (x > 12) {
        x -= 12;
      }

      return x * intervalFactor[x];
    },

    /**
     * Edit-Distance for parsons strings from {@link https://gist.github.com/andrei-m/982927}
     *
     * Copyright (c) 2011 Andrei Mackenzie
     * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
     * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
     *
     * @param {string} a - The first string (document)
     * @param {string} b - The second string (query)
     * @returns {number} The calculated edit distance
     */
    stringEditDistance: function(a, b) {
      if (a.length === 0) {
        return b.length;
      }
      if (b.length === 0) {
        return a.length;
      }

      var matrix = [];

      // increment along the first column of each row
      var i;
      for (i = 0; i <= b.length; i++) {
        matrix[i] = [i];
      }

      // increment each column in the first row
      var j;
      for (j = 0; j <= a.length; j++) {
        matrix[0][j] = j;
      }

      // Fill in the rest of the matrix
      for (i = 1; i <= b.length; i++) {
        for (j = 1; j <= a.length; j++) {
          if (b.charAt(i-1) === a.charAt(j-1)) {
            matrix[i][j] = matrix[i-1][j-1];
          } else {
            matrix[i][j] = Math.min( // TODO: reconsider weighting
              matrix[i-1][j-1] + 1, // substitution
              Math.min(
                matrix[i][j-1] + 1, // insertion
                matrix[i-1][j] + 1  // deletion
              )
            );
          }
        }
      }

      // for (i = 0; i <= b.length; i++) {
      //   console.log(matrix[i].join(' | '));
      // }

      return matrix[b.length][a.length];
    },

    /**
     * Edit-Distance for pitch arrays adapted from {@link https://gist.github.com/andrei-m/982927}
     *
     * Copyright (c) 2011 Andrei Mackenzie
     * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
     * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
     *
     * The function implements improved weighting for interval differences based on consonance / dissonance
     *
     * @param {Array} a - The first interval array (document)
     * @param {Array} b - The second interval array (query)
     * @returns {number} The calculated edit distance
     */
    pitchEditDistance: function(a, b) {
      if (a.length === 0) {
        return b.length;
      }
      if (b.length === 0) {
        return a.length;
      }

      var matrix = [];

      // increment along the first column of each row
      var i;
      for (i = 0; i <= b.length; i++) {
        matrix[i] = [i * 12];
      }

      // increment each column in the first row
      var j;
      for (j = 0; j <= a.length; j++) {
        matrix[0][j] = j * 12;
      }

      for (i = 1; i <= b.length; i++) {
        for (j = 1; j <= a.length; j++) {
          if (b[i-1] === a[j-1]) {
            matrix[i][j] = matrix[i-1][j-1];
          } else {
            matrix[i][j] = Math.min(
              matrix[i-1][j-1] + this.intervalWeight(a[j-1], b[i-1]), // substitution
              Math.min(
                matrix[i][j-1] + 12, // insertion
                matrix[i-1][j] + 12  // deletion
              )
            );
          }
        }
      }

      return matrix[b.length-1][a.length-1];
    },

    /**
     * Edit-Distance for interval arrays adapted from {@link https://gist.github.com/andrei-m/982927}
     *
     * Copyright (c) 2011 Andrei Mackenzie
     * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
     * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
     *
     * The function implements improved weighting for interval differences based on consonance / dissonance
     *
     * @param {Array} a - The first interval array (document)
     * @param {Array} b - The second interval array (query)
     * @returns {number} The calculated edit distance
     */
    intervalEditDistance: function(a, b) {
      if (a.length === 0) {
        return b.length;
      }
      if (b.length === 0) {
        return a.length;
      }

      var matrix = [];

      // increment along the first column of each row
      var i;
      for (i = 0; i <= b.length; i++) {
        matrix[i] = [i * 12];
      }

      // increment each column in the first row
      var j;
      for (j = 0; j <= a.length; j++) {
        matrix[0][j] = j * 12;
      }

      // Fill in the rest of the matrix
      // console.log('=======================================================');
      // console.log(a.join(', '), ' | ', a.length);
      // console.log(b.join(', '), ' | ', b.length);
      for (i = 1; i <= b.length; i++) {
        for (j = 1; j <= a.length; j++) {
          // console.log('--------------------------------------------');
          // console.log('i, j', i, j);
          if (b[i-1] === a[j-1]) {
            // console.log('cost is zero');
            matrix[i][j] = matrix[i-1][j-1];
          } else {
            // console.log('calculate cost:');
            // console.log('    char(a):', a[j-1]);
            // console.log('    char(b):', b[i-1]);
            // console.log('         -> substitution:');
            // console.log('             interval(a[j-1], b[i-1]):', this.intervalWeight(a[j-1], b[i-1]));
            // console.log('');
            // console.log('         -> insertion (matrix[i][j-1]):');
            // console.log('             val(a[j-1]): 12');
            // console.log('');
            // console.log('         -> deletion:');
            // console.log('             val(b[i-1]): 12');
            // console.log('');
            matrix[i][j] = Math.min(
              matrix[i-1][j-1] + this.intervalWeight(a[j-1], b[i-1]), // substitution
              Math.min(
                matrix[i][j-1] + 12, // insertion
                matrix[i-1][j] + 12  // deletion
              )
            );
          }
          // console.log('');
        }
      }

      // for (i = 0; i <= b.length; i++) {
      //   console.log(matrix[i].join(' | '));
      // }

      return matrix[b.length-1][a.length-1];
    },

    /**
     * Returns only unique array values
     * @param {Array} array - The array with possible duplicate values
     * @returns {Array} Array with only unique values
     */
    uniques: function(array) {
      var a = [];
      for (var i=0, l=array.length; i<l; i++) {
        if (a.indexOf(array[i]) === -1 && array[i] !== '') {
          a.push(array[i]);
        }
      }

      return a;
    },

    /**
     * Returns minimum edit distance between searched notes and the given document.
     * Calculation based on parsons code strings
     *
     * @param {object} object - A musicjson object to search in
     * @param {Array} search - An array of notes that should be searched
     * @returns {Number} The edit distance between parsons codes
     */
    distanceParsons: function(object, search) {
      var parsons = this.parsons(this.notes(object, false));
      var searchParsons = this.parsons(search);
      return this.stringEditDistance(
        parsons.map(function(item) {
          return item.value;
        }).join(''),
        searchParsons.map(function(item) {
          return item.value;
        }).join('')
      );
    },

    /**
     * Returns minimum edit distance between searched notes and the given document.
     * Calculation based on pitch values
     *
     * @param {object} object - The document
     * @param {Array} search - An array of notes
     * @returns {number} The edit distance between intervals
     */
    distancePitch: function(object, search) {
      var keyAdjust = object.attributes.key.fifths;
      var notes = this.notes(object, false);
      return this.pitchEditDistance(
        notes.map(function(item) {
          return this.base12Pitch(
            item.pitch.step,
            keyAdjust,
            item.pitch.octave,
            item.pitch.alter,
            false
          );
        }.bind(this)),
        search.map(function(item) {
          return this.base12Pitch(
            item.pitch.step,
            0,
            item.pitch.octave,
            item.pitch.alter,
            false
          );
        }.bind(this))
      );
    },

    /**
     * Returns minimum edit distance between searched notes and the given document.
     * Calculation based on intervals
     *
     * @param {object} object - The document
     * @param {Array} search - An array of notes
     * @returns {number} The edit distance between intervals
     */
    distanceIntervals: function(object, search) {
      var keyAdjust = object.attributes.key.fifths;
      var intervals = this.intervals(this.notes(object, false), keyAdjust);
      var searchIntervals = this.intervals(search, 0);
      return this.intervalEditDistance(
        intervals.map(function(item) {
          return item.value;
        }),
        searchIntervals.map(function(item) {
          return item.value;
        })
      );
    },

    // TODO: distanceIntervalsDurations
    // Edit-Distance which considers intervals and note durations
    // See Mongeau, M., & Sankoff, D. (1990). Comparison of musical sequences. Computers and the Humanities, 24(3), 161–175. http://doi.org/10.1007/BF00117340

    /**
     * Returns minimum edit distance between searched notes and the corresponding ngrams.
     * Notes are represented in parsons code.
     *
     * @param {object} object - A musicjson object to search in
     * @param {Array} search - An array of notes that should be searched
     * @returns {object} The first finding with minimum cost
     */
    distanceParsonsNgrams: function(object, search) {
      var ngrams = this.ngrams(this.parsons(this.notes(object, false)), search.length);
      var searchParsons = this.parsons(search);
      var costs = [];

      for (var i = 0; i < ngrams.length; i++) {

        for (var j = 0; j < ngrams[i].length; j++) {
          if (j === 0) {
            // Reset first value of ngram
            ngrams[i][j].value = '*';
          }
        }

        costs.push({
          cost: this.stringEditDistance(
            ngrams[i].map(function(item) {
              return item.value;
            }).join(''),
            searchParsons.map(function(item) {
              return item.value;
            }).join('')
          ),
          highlight: ngrams[i].map(function(item) {
            return {
              measure: item.measureNumber,
              note: item.noteNumber
            };
          })
        });
      }

      return costs/*.sort(function(a, b) {
        return a.cost - b.cost;
      }).shift()*/;
    },

    /**
     * Returns the minimum edit-distance between the searched notes and corresponding ngrams.
     * Notes are represented with pitch and duration
     *
     * @param {object} object - A musicjson object to search in
     * @param {Array} search - An array of notes that should be searched
     * @returns {object} The first finding with minimum cost
     */
    distancePitchNgrams: function(object, search) {
      var keyAdjust = object.attributes.key.fifths;
      var ngrams = this.ngrams(this.notes(object, false), search.length);
      var costs = [];

      for (var i = 0; i < ngrams.length; i++) {
        costs.push({
          cost: this.pitchEditDistance(
            ngrams[i].map(function(item) {
              return this.base12Pitch(
                item.pitch.step,
                keyAdjust,
                item.pitch.octave,
                item.pitch.alter,
                false
              );
            }.bind(this)),
            search.map(function(item) {
              return this.base12Pitch(
                item.pitch.step,
                0,
                item.pitch.octave,
                item.pitch.alter,
                false
              );
            }.bind(this))
          ),
          highlight: ngrams[i].map(function(item) {
            return {
              measure: item.measureNumber,
              note: item.noteNumber
            };
          })
        });
      }

      return costs/*.sort(function(a, b) {
        return a.cost - b.cost;
      }).shift()*/;
    },

    /**
     * Returns the minimum distance between the searched notes and the corresponding ngrams.
     * Notes are represented as intervals.
     *
     * @param {object} object - A musicjson object to search in
     * @param {Array} search - An array of notes that should be searched
     * @returns {object} The first finding with minimum cost
     */
    distanceIntervalsNgrams: function(object, search) {
      var keyAdjust = object.attributes.key.fifths;
      var ngrams = this.ngrams(this.intervals(this.notes(object, false), keyAdjust), search.length);
      var searchIntervals = this.intervals(search, 0);
      var costs = [];

      for (var i = 0; i < ngrams.length; i++) {
        for (var j = 0; j < ngrams[i].length; j++) {
          if (j === 0) {
            // Reset first value of ngram
            ngrams[i][j].value = 0;
          }
        }

        costs.push({
          cost: this.intervalEditDistance(
            ngrams[i].map(function(item) {
              return item.value;
            }),
            searchIntervals.map(function(item) {
              return item.value;
            })
          ),
          highlight: ngrams[i].map(function(item) {
            return {
              measure: item.measureNumber,
              note: item.noteNumber
            };
          })
        });
      }

      return costs/*.sort(function(a, b) {
        return a.cost - b.cost;
      })shift()*/;
    }
  };


  // =============================
  // ========== EXPORTS ==========
  // =============================
  // amd
  /* istanbul ignore next */
  if (typeof define !== 'undefined' && define !== null && define.amd) {
    define(function () {
      return MusicJsonToolbox;
    });
  } else if (typeof module !== 'undefined' && module !== null) { // commonjs
    module.exports = MusicJsonToolbox;
  } else if (typeof self !== 'undefined' && typeof self.postMessage === 'function' && typeof self.importScripts === 'function') { // web worker
    self.MusicJsonToolbox = MusicJsonToolbox;
  } else if (typeof window !== 'undefined' && window !== null) { // browser main thread
    window.MusicJsonToolbox = MusicJsonToolbox;
  }
}());
