(function() {
  'use strict';

  /**
   * The MusicJsonToolbox class implements static functions to operate with musicjson objects.
   * @exports MusicJsonToolbox
   */
  var MusicJsonToolbox = {

    /**
     * Pitch values for steps in base 12 system
     * <pre><code>
     * C  |    | D |    | E  | F  |    | G |    | A  |    | B
     * B# | C# |   | D# |    | E# | F# |   | G# |    | A# |
     *    | Db |   | Eb | Fb |    | Gb |   | Ab |    | Bb | Cb
     * 1  | 2  | 3 | 4  | 5  | 6  | 7  | 8 | 9  | 10 | 11 | 12
     * </code></pre>
     *
     * @constant
     * @type {object}
     */
    base12: {
      'C': 1,
      'D': 3,
      'E': 5,
      'F': 6,
      'G': 8,
      'A': 10,
      'B': 12
    },

    /**
     * Inverted {@link base12}
     *
     * @constant
     * @type {object}
     */
    base12Inverted: {
      1: 'C',
      3: 'D',
      5: 'E',
      6: 'F',
      8: 'G',
      10: 'A',
      12: 'B'
    },

    /**
     * Degrees by number of semitones (for major scale)
     *
     * @constant
     * @type {object}
     */
    degreesFromSemitones: {
      1: 1,
      3: 2,
      5: 3,
      6: 4,
      8: 5,
      10: 6,
      12: 7
    },

    /**
     * Weights for deg(n)-function of Mongeau-Sankoff-Measure.
     * n = number of degrees
     *
     * @constant
     * @type {object}
     */
    deg: {
      0: 0,
      1: 0.9,
      2: 0.2,
      3: 0.5,
      4: 0.1,
      5: 0.35,
      6: 0.8
    },

    /**
     * Weights for ton(m)-function of Mongeau-Sankoff-Measure.
     * m = number of semitones
     *
     * @constant
     * @type {object}
     */
    ton: {
      0: 0.6,
      1: 2.6,
      2: 2.3,
      3: 1,
      4: 1,
      5: 1.6,
      6: 1.8,
      7: 0.8,
      8: 1.3,
      9: 1.3,
      10: 2.2,
      11: 2.5
    },

    /**
     * Parameter k of Mongeau-Sankoff-Measure.
     * Represents the relative contribution of w_length and w_interval
     *
     * Can be set runtime via:
     * <pre><code>
     *   MusicJsonToolbox.globalK = 0.456;
     * </pre></code>
     *
     * @constant
     * @type {number}
     */
    globalK: 0.348,

    /**
     * Parameter k1 of adjusted Mongeau-Sankoff-Measure according to Gomez, Abad-Mota & Ruckhaus, 2007.
     * {@link http://www.music-ir.org/mirex/abstracts/2007/QBSH_SMS_gomez.pdf}
     * Used when calculating weight for substitution.
     *
     * Can be set runtime via:
     * <pre><code>
     *   MusicJsonToolbox.globalK1 = 0.5;
     * </pre></code>
     *
     * @constant
     * @type {number}
     */
    globalK1: 0.46,

    /**
     * Parameter k2 of adjusted Mongeau-Sankoff-Measure according to Gomez, Abad-Mota & Ruckhaus, 2007.
     * {@link http://www.music-ir.org/mirex/abstracts/2007/QBSH_SMS_gomez.pdf}
     *
     * Can be set at runtime via:
     * <pre><code>
     *   MusicJsonToolbox.globalK3 = 0.5;
     * </pre></code>
     *
     * @constant
     * @type {number}
     */
    globalK2: 0.22,

    /**
     * Parameter k3 of adjusted Mongeau-Sankoff-Measure according to Gomez, Abad-Mota & Ruckhaus, 2007.
     * {@link http://www.music-ir.org/mirex/abstracts/2007/QBSH_SMS_gomez.pdf}
     * Used when calculating weight for insertion and deletion.
     *
     * Can be set at runtime via:
     * <pre><code>
     *   MusicJsonToolbox.globalK3 = 0.5;
     * </pre></code>
     *
     * @constant
     * @type {number}
     */
    globalK3: 1,

    /**
     * Holds abc steps for conversion from base12 pitch values (including octaves).
     *
     * @constant
     * @type {Array}
     */
    abcStep: [
      'C,,,', '^C,,,', 'D,,,', '^D,,,', 'E,,,', 'F,,,', '^F,,,', 'G,,,', '^G,,,', 'A,,,', '^A,,,', 'B,,,', // 1
      'C,,', '^C,,', 'D,,', '^D,,', 'E,,', 'F,,', '^F,,', 'G,,', '^G,,', 'A,,', '^A,,', 'B,,', // 2
      'C,', '^C,', 'D,', '^D,', 'E,', 'F,', '^F,', 'G,', '^G,', 'A,', '^A,', 'B,', // 3
      'C', '^C', 'D', '^D', 'E', 'F', '^F', 'G', '^G', 'A', '^A', 'B', // 4
      'c', '^c', 'd', '^d', 'e', 'f', '^f', 'g', '^g', 'a', '^a', 'b', // 5
      'c\'', '^c\'', 'd\'', '^d\'', 'e\'', 'f\'', '^f\'', 'g\'', '^g\'', 'a\'', '^a\'', 'b\'', // 6
      'c\'\'', '^c\'\'', 'd\'\'', '^d\'\'', 'e\'\'', 'f\'\'', '^f\'\'', 'g\'\'', '^g\'\'', 'a\'\'', '^a\'\'', 'b\'\'', // 7
      'c\'\'\'', '^c\'\'\'', 'd\'\'\'', '^d\'\'\'', 'e\'\'\'', 'f\'\'\'', '^f\'\'\'', 'g\'\'\'', '^g\'\'\'', 'a\'\'\'', '^a\'\'\'', 'b\'\'\'' // 8
    ],

    /**
     * Holds abc accidental symbols for conversion from music json.
     *
     * @constant
     * @type {object}
     */
    abcAccidental: {
      'flat-flat': '__',
      'flat': '_',
      'natural': '=',
      'sharp': '^',
      'sharp-sharp': '^^',
      'undefined': '',
      '': ''
    },

    /**
     * Returns an array of all notes.
     * Removes rests.
     *
     * Example:
     * [ {pitch: {step, octave, alter, accidental}, rest: false, duration, type}, { ... }, ... ]
     *
     * @param {object} obj - The musicjson object
     * @param {boolean} repeat - If set to true, repeated measures are also repeated in notes output
     * @param {boolean} rests - If set to true, the resulting notes include rests
     * @returns {Array} An array containing all notes of the given object
     */
    notes: function(obj, repeat, rests) {
      var tempNotes = [];
      var repeatStart = -1;

      // loop over measures
      var absoluteNoteCounter = 0;
      for (var i = 0; i < obj.measures.length; i++) {

        // add note and measure number for identification
        for (var j = 0; j < obj.measures[i].notes.length; j++) {
          obj.measures[i].notes[j].measureNumber = i;
          obj.measures[i].notes[j].noteNumber = j;
          obj.measures[i].notes[j].noteNumberAbsolute = absoluteNoteCounter;
          absoluteNoteCounter++;
        }

        // store repeat start point
        if (repeat && obj.measures[i].attributes.repeat.left) {
          repeatStart = i;
        }

        // add notes of measure
        tempNotes = tempNotes.concat(obj.measures[i].notes);

        // add repeating notes if activated
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

      // remove rests when set
      if (rests === false) {
        for (var k = 0; k < tempNotes.length; k++) {
          if ((tempNotes[k].rest === true || tempNotes[k].rest === 'true')) {
            tempNotes.splice(k, 1);
          }
        }
      }

      return tempNotes;
    },

    /**
     * Returns an array of intervals from an array of notes
     *
     * Example:
     * [ {0}, {2}, {-2}, {5}, ... ]
     * @param {Array} notes - Array of notes for which the contour should be created
     * @returns {Array} An array of notes as contour
     */
    intervals: function(notes) {
      var tempIntervals = [];

      // add initial interval '*'
      tempIntervals.push({
        value: '*',
        duration: '*',
        measureNumber: 0,
        noteNumber: 0,
        noteNumberAbsolute: 0
      });

      for (var i = 1; i < notes.length; i++) {
        // calculate differences in pitch and duration
        var pitchDiff = this.pitchDifference(notes[i-1].pitch, 0, notes[i].pitch, true, false);
        var durationDiff = this.durationDifference(notes[i-1].duration, notes[i].duration, false);

        // add interval to array
        var tempNote = {
          value: pitchDiff,
          duration: durationDiff,
          measureNumber: notes[i].measureNumber,
          noteNumber: notes[i].noteNumber,
          noteNumberAbsolute: notes[i].noteNumberAbsolute
        };
        tempIntervals.push(tempNote);
      }

      return tempIntervals;
    },

    /**
     * Generate array of parson code from notes
     *
     * @param {Array} notes - Array of notes for which the contour should be created
     * @returns {Array} An array of notes as parsons code
     */
    parsons: function(notes) {
      var tempParsons = [];

      // add initial parsons item '*'
      tempParsons.push({
        value: '*',
        measureNumber: 0,
        noteNumber: 0,
        noteNumberAbsolute: 0
      });

      for (var i = 1; i < notes.length; i++) {
        var parson;
        // calculate difference in pitch
        var pitchDiff = this.pitchDifference(notes[i-1].pitch, 0, notes[i].pitch, true, false);

        // set parsons code according to pitch difference
        if (pitchDiff > 0) {
          parson = 'u';
        } else if (pitchDiff < 0) {
          parson = 'd';
        } else {
          parson = 'r';
        }

        // add parsons code item to array
        tempParsons.push({
          value: parson,
          measureNumber: notes[i].measureNumber,
          noteNumber: notes[i].noteNumber,
          noteNumberAbsolute: notes[i].noteNumberAbsolute
        });
      }

      return tempParsons;
    },

    /**
     * Generates array of ngrams in specified length (based on {@link https://gist.github.com/eranbetzalel/9f16b1216931e20775ad}).
     *
     * @param {Array} array - An array of notes (returned by function 'notes')
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
     * Get array of base 12 pitch values from array of notes
     *
     * @param {Array} notes - The array of notes
     * @param  {number} keyAdjust - Adjusting of key by circle of fifths
     * @returns {Array} The array of base 12 pitch values
     */
    pitchValues: function(notes, keyAdjust) {
      return notes.map(function(item) {
        // calculate base 12 pitch values
        return this.base12Pitch(
          item.pitch.step,
          keyAdjust,
          item.pitch.octave,
          item.pitch.alter,
          false
        );
      }.bind(this));
    },

    /**
     * Generates an array of pitch and duration values for the Mongeau & Sankoff version of melodic edit distance
     * See Mongeau, M., & Sankoff, D. (1990). Comparison of musical sequences. Computers and the Humanities, 24(3), 161–175. http://doi.org/10.1007/BF00117340
     *
     * @param {Array} notes - Array of notes (e.g. returned by  MusicJsonToolbox.notes)
     * @param {number} keyAdjust - Adjusting of key by circle of fifths
     * @param {number} divisions - The divisions of the document
     * @param {number} beatType - The documents beat type
     * @returns {Array} The correctly mapped array with pitch and duration values
     */
    pitchDurationValues: function(notes, keyAdjust, divisions, beatType) {
      return notes.map(function(item) {
        // calculate base 12 pitch value
        var base12Pitch = this.base12Pitch(
          item.pitch.step,
          keyAdjust,
          item.pitch.octave,
          item.pitch.alter,
          false
        );
        return {
          value: base12Pitch,
          rest: item.rest,
          duration: (item.duration / divisions / beatType) * 16   // normalize duration
        };
      }.bind(this));
    },

    /**
     * Adjust tempo in array of notes
     *
     * @param {Array} notes - The array of notes where tempo should be adjusted
     * @param {number} adjust - Function that returns new duration (e.g. `function(duration) { return duration * 2; }` )
     * @returns {Array} The resulting array with adjusted tempo
     */
    tempoAdjust: function(notes, adjust) {
      var adjustedNotes = [];
      for (var i = 0; i < notes.length; i++) {
        var tempNote = notes[i];
        // calculate adjust function for every note
        tempNote.duration = adjust(tempNote.duration);
        adjustedNotes.push(tempNote);
      }
      return adjustedNotes;
    },

    /**
     * Returns array of item values
     *
     * @param {Array} array - The array that should be mapped
     * @returns {Array} The mapped array
     */
    valueMapping: function(array) {
      return array.map(function(item) {
        return item.value;
      });
    },

    /**
     * Array mapping for note highlighting
     *
     * @param {Array} array - The array that should be mapped for highlighting
     * @returns {Array} The mapped array
     */
    highlightMapping: function(array) {
      return array.map(function(item) {
        return {
          measure: item.measureNumber,
          note: item.noteNumber,
          noteAbsolute: item.noteNumberAbsolute
        };
      });
    },

    /**
     * Calculates the base 12 represented pitch
     *
     * @param {string} step - The step (c, d, e, f, g, a, b)
     * @param {number} keyAdjust - Key position in circle of fifths; if set, the pitch gets transposed to C major
     * @param {number} octave - The octave
     * @param {number} alter - The value for alter (either from accidental or key)
     * @param {boolean} withOctave - When set, the octave is taken into account, otherwise function return relative value (from 1 to 12)
     * @returns {number} The base12 pitch number
     */
    base12Pitch: function(step, keyAdjust, octave, alter, withOctave) {
      // lookup semitones in c major scale
      var ret = this.base12[step];

      // optionally add alter value (from key or accidental)
      if (alter) {
        ret += alter;
      }

      // transposition to c major
      if (keyAdjust < 0) {
        // reduce pitch to keep octave level
        ret -= Math.round(Math.abs(keyAdjust) / 2) * 12;
        while (keyAdjust < 0) {
          // add fifth (moving in circle of fifth clockwise)
          ret += 7;
          keyAdjust++;
        }
      } else {
        // increase pitch to keep octave level
        ret += Math.round(Math.abs(keyAdjust) / 2) * 12;
        while (keyAdjust > 0) {
          // subtract fifth (moving in circle of fifth contraclockwise)
          ret -= 7;
          keyAdjust--;
        }
      }

      // set base 12 value of '0' to '12'
      if (ret === 0) {
        ret = 12;
        octave--;
      }

      // add octave if activated
      if (withOctave) {
        ret += (octave * 12);
      } else {
        // reset to relative base 12 value
        while (ret > 12) {
          ret -= 12;
        }
        while (ret < 0) {
          ret += 12;
        }
      }

      return ret;
    },

    /**
     * Returns abc note from interval value
     *
     * @param {number} interval - The interval value
     * @param {number} base - The base 12 pitch the interval should be added
     * @returns {string} The abc note
     */
    interval2AbcStep: function(interval, base) {
      return this.abcStep[base + interval - 13];
    },

    /**
     * Return abc note from json note object
     *
     * @param {object} item - The item which should be converted to abc
     * @param {object|null} prevItem - The previous item or null
     * @returns {string} The abc note
     */
    pitchDuration2AbcStep: function(item, prevItem) {
      var accidental = this.abcAccidental[item.pitch.accidental];
      var pitch = this.abcStep[this.base12Pitch(item.pitch.step, 0, item.pitch.octave, 0, true) - 13];
      var duration = item.duration;
      if (prevItem !== null) {
        if (prevItem.dot) {
          duration = duration * 2;
        }
      }
      var dotted = '';
      if (item.dot) {
        duration = duration / 1.5;
        dotted = '>';
      }

      if (item.rest) {
        return 'z' + duration + dotted;
      } else {
        return accidental + pitch + duration + dotted;
      }
    },

    /**
     * Calculates difference between two pitches
     *
     * @param {object} pitch1 - The first pitch to compare
     * @param {number} keyAdjust - The position in circle of fifths of the searched notes
     * @param {object} pitch2 - The second pitch to compare
     * @param {boolean} withOctave - When set, the octave is taken into account, otherwise function return relative value (from 1 to 12)
     * @param {boolean} absolute - When set, the absolute difference is returned as Math.abs(Pitch 2 - Pitch 1)
     * @returns {number} The difference between two pitches
     */
    pitchDifference: function(pitch1, keyAdjust, pitch2, withOctave, absolute) {
      if (typeof withOctave === 'undefined') {
        withOctave = false;
      }
      if (typeof absolute === 'undefined') {
        absolute = false;
      }

      var ret = this.base12Pitch(pitch2.step, keyAdjust, parseInt(pitch2.octave), parseInt(pitch2.alter), withOctave) - this.base12Pitch(pitch1.step, keyAdjust, parseInt(pitch1.octave), parseInt(pitch1.alter), withOctave);
      if (absolute) {
        ret = Math.abs(ret);
      }

      return ret;
    },

    /**
     * Calculates difference between two durations
     *
     * @param {number} duration1 - The first duration to compare
     * @param {number} duration2 - The second duration to compare
     * @param {boolean} absolute - When set, the absolute difference is returned as Math.abs(Duration 2 - Duration 1)
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
     * Returns only unique array values
     *
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
     * Edit-Distance implmentation from {@link https://gist.github.com/andrei-m/982927}
     *
     * Copyright (c) 2011 Andrei Mackenzie
     * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
     * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
     * THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
     *
     * @param {string|Array} a - The first string (document)
     * @param {string|Array} b - The second string (query)
     * @param {boolean} compare - The compare function which returns boolean value between two items
     * @param {number} weight - The weight function which returns numeric for weighting operations
     * @returns {number} The calculated edit distance
     */
    editDistance: function(a, b, compare, weight) {
      if (a.length === 0) {
        return 0;
      }
      if (b.length === 0) {
        return 0;
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
          if (compare(i, j)) {
            matrix[i][j] = matrix[i-1][j-1];
          } else {
            matrix[i][j] = Math.min(
              matrix[i-1][j-1] + weight(i, j), // substitution
              matrix[i][j-1] + weight(i, j), // insertion
              matrix[i-1][j] + weight(i, j)  // deletion
            );
          }
        }
      }

      var max = Math.max(matrix[b.length][0], matrix[0][a.length]);
      return 1 - matrix[b.length][a.length] / max;
    },

    /**
     * Calculate edit distance for strings
     *
     * @param {string} a - The first string (document)
     * @param {string} b - The second string (query)
     * @returns {number} The calculated edit distance
     */
    stringEditDistance: function(a, b) {
      return this.editDistance(a, b,
        function(i, j) {
          return b.charAt(i-1) === a.charAt(j-1);
        },
        function() {
          return 1;
        }
      );
    },

    /**
     * Calculate edit distance for arrays
     *
     * @param {Array} a - The first interval array (document)
     * @param {Array} b - The second interval array (query)
     * @returns {number} The calculated edit distance
     */
    arrayEditDistance: function(a, b) {
      return this.editDistance(a, b,
        function(i, j) {
          return b[i-1] === a[j-1];
        },
        function() {
          return 1;
        }
      );
    },

    /**
     * Calculate weighted edit distance for arrays
     * The function implements improved weighting for interval differences based on consonance / dissonance
     *
     * Concepts are taken from Mongeau, M., & Sankoff, D. (1990). Comparison of musical sequences. Computers and the Humanities, 24(3), 161–175. http://doi.org/10.1007/BF00117340
     *
     * @param {Array} a - The first notes array (document), format: output of MusicJsonToolbox.pitchDurationValues
     * @param {Array} b - The second notes array (query), format: output of MusicJsonToolbox.pitchDurationValues
     * @param {boolean} adjusted - Use adjusted weighting function
     * @returns {number} The calculated edit distance
     */
    weightedEditDistance: function(a, b, adjusted) {
      if (a.length === 0) {
        return 0;
      }
      if (b.length === 0) {
        return 0;
      }

      var matrix = [];

      // increment along the first column of each row
      var i;
      for (i = 0; i <= a.length; i++) {
        // console.log(i, a[i+1].duration);
        if (i > 0) {
          matrix[i] = [parseFloat(matrix[i-1]) + this.weightDeletion(a, i, adjusted)];
        } else {
          matrix[i] = [i];
        }

      }

      // increment each column in the first row
      var j;
      for (j = 0; j <= b.length; j++) {
        if (j > 0) {
          matrix[0][j] = parseFloat(matrix[0][j-1]) + this.weightInsertion(b, j, adjusted);
        } else {
          matrix[0][j] = j;
        }
      }

      // Calculate constant F
      var maxDurationA = 0;
      var minDurationB = Infinity;
      for (i = 0; i < a.length; i++) {
        if (maxDurationA < a[i].duration) {
          maxDurationA = a[i].duration;
        }
      }
      for (j = 0; j < b.length; j++) {
        if (minDurationB > b[j].duration) {
          minDurationB = b[j].duration;
        }
      }
      var f = maxDurationA / minDurationB;

      // Calculate constant C
      var maxDurationB = 0;
      var minDurationA = Infinity;
      for (j = 0; j < b.length; j++) {
        if (maxDurationB < b[j].duration) {
          maxDurationB = b[j].duration;
        }
      }
      for (i = 0; i < a.length; i++) {
        if (minDurationA > a[i].duration) {
          minDurationA = a[i].duration;
        }
      }
      var c = maxDurationB / minDurationA;

      // Fill in the rest of the matrix
      for (i = 1; i <= a.length; i++) {
        for (j = 1; j <= b.length; j++) {
          if (a[i-1].value === b[j-1].value && a[i-1].rest === b[j-1].rest && a[i-1].duration === b[j-1].duration) {
            // Set weight to zero if note is the same
            matrix[i][j] = matrix[i-1][j-1];
          } else {

            var substitution = matrix[i-1][j-1] + this.weightSubstitution(a, b, i, j, adjusted);
            var insertion = matrix[i][j-1] + this.weightInsertion(b, j, adjusted);
            var deletion = matrix[i-1][j] + this.weightDeletion(a, i, adjusted);
            var fragmentation = this.weightFragmentation(matrix, a, b, i, j, f, adjusted);
            var consolidation = this.weightConsolidation(matrix, a, b, i, j, c, adjusted);
            var minWeight = Math.min(
              substitution,
              insertion,
              deletion,
              fragmentation,
              consolidation
            );

            matrix[i][j] = minWeight;
          }
        }
      }

      var max = -Infinity;
      for (i = 0; i < matrix.length; i++) {
        var rowMax = Math.max.apply(null, matrix[i]);
        if (rowMax > max) {
          max = rowMax;
        }
      }
      return 1 - (matrix[a.length][b.length] / max);
    },

    /**
     * Calculates weight for substitution of two notes
     *
     * @param {Array} a - First array of notes (document)
     * @param {Array} b - Second array of notes (search)
     * @param {number} i - Position to compare in a (1-based)
     * @param {number} j - Position to compare in a (1-based)
     * @param {boolean} adjusted - Use adjusted weighting function
     * @returns {number} Resulting weight
     */
    weightSubstitution: function(a, b, i, j, adjusted) {
      var weightInterval = this.weightInterval(a[i-1], b[j-1], adjusted);
      var weightLength = this.weightLength(a[i-1].duration, b[j-1].duration);
      var localK = adjusted ? this.globalK1 : this.globalK;
      var weight = weightInterval + (localK * weightLength);


      return weight;
    },

    /**
     * Calculates weight for insertion of a note
     *
     * @param {Array} b - The array where the note should be inserted from
     * @param {number} j - The position of the note that should be inserted
     * @param {boolean} adjusted - Use adjusted weighting function
     * @returns {number} Resulting weight
     */
    weightInsertion: function(b, j, adjusted) {
      var localK = adjusted ? this.globalK3 : this.globalK;
      return (localK * parseFloat(b[j-1].duration));
    },

    /**
     * Calculates weight for insertion of a note
     *
     * @param {Array} a - The array where the note should be deleted from
     * @param {number} i - The position of the note that should be deleted
     * @param {boolean} adjusted - Use adjusted weighting function
     * @returns {number} Resulting weight
     */
    weightDeletion: function(a, i, adjusted) {
      var localK = adjusted ? this.globalK3 : this.globalK;
      return (localK * a[i-1].duration);
    },

    /**
     * Calculates weight for fragmentation of one note in to several others
     *
     * @param {Array} matrix - The current calculated matrix
     * @param {Array} a - First array of notes (document)
     * @param {Array} b - Second array of notes (search)
     * @param {number} i - Current position in a
     * @param {number} j - Current position in b
     * @param {number} f - Constant parameter F (calculated by length of notes in both arrays)
     * @param {boolean} adjusted - Use adjusted weighting function
     * @returns {number} The resulting weight
     */
    weightFragmentation: function(matrix, a, b, i, j, f, adjusted) {
      var x, k;
      var min = 2;
      var max = Math.min(j-1, f);
      var minWeight = Infinity;
      var localK = adjusted ? this.globalK1 : this.globalK;
      for (x = min; x <= max; x++) {
        k = x;

        var weight = matrix[i-1][j-k];
        var durations = 0;
        while (k > 0) {
          var weightInterval = this.weightInterval(a[i-1], b[j-k], adjusted);
          weight += weightInterval;
          durations += b[j-k].duration;
          k--;
        }
        var weightLength = this.weightLength(a[i-1].duration, durations);
        weight += (localK * weightLength);

        if (minWeight > weight) {
          minWeight = weight;
        }
      }

      return minWeight;
    },

    /**
     * Calculates weight for fragmentation of one several notes to one
     *
     * @param {Array} matrix - The current calculated matrix
     * @param {Array} a - First array of notes (document)
     * @param {Array} b - Second array of notes (search)
     * @param {number} i - Current position in a
     * @param {number} j - Current position in b
     * @param {number} c - Constant parameter C (calculated by length of notes in both arrays)
     * @param {boolean} adjusted - Use adjusted weighting function
     * @returns {number} The resulting weight
     */
    weightConsolidation: function(matrix, a, b, i, j, c, adjusted) {
      var x, k;
      var min = 2;
      var max = Math.min(i-1, c);
      var minWeight = Infinity;
      var localK = adjusted ? this.globalK1 : this.globalK;
      for (x = min; x <= max; x++) {
        k = x;

        var weight = matrix[i-k][j-1];
        var durations = 0;
        while (k > 0) {
          var weightInterval = this.weightInterval(a[i-k], b[j-1], adjusted);
          weight += weightInterval;
          durations += a[i-k].duration;
          k--;
        }
        var weightLength = this.weightLength(durations, b[j-1].duration);
        weight += (localK * weightLength);

        if (minWeight > weight) {
          minWeight = weight;
        }
      }

      return minWeight;
    },

    /**
     * Calculates weight for difference of pitch values
     *
     * @param {object} a - First note object (from document)
     * @param {object} b - Second note object (from search)
     * @param {boolean} adjusted - Use adjusted weighting function
     * @returns {number} The resulting weight
     */
    weightInterval: function(a, b, adjusted) {
      if ((a.rest === 'true' || a.rest === true) || (b.rest === 'true' || b.rest === true)) {
        return 0.1;
      }

      var baseA = a.value % 12;
      if (baseA === 0) {
        baseA = 12;
      }
      var baseB = b.value % 12;
      if (baseB === 0) {
        baseB = 12;
      }

      /**
       * Adjusted weight interval according to Gomez, Abad-Mota & Ruckhaus, 2007.
       * {@link http://www.music-ir.org/mirex/abstracts/2007/QBSH_SMS_gomez.pdf}
       */
      if (adjusted) {
        return Math.abs(baseB - baseA);
      }

      if (typeof this.base12Inverted[baseA] !== 'undefined' && typeof this.base12Inverted[baseB] !== 'undefined') {
        // use deg(n(m))
        var degreeA = this.degreesFromSemitones[baseA];
        var degreeB = this.degreesFromSemitones[baseB];
        return this.deg[Math.abs(degreeA - degreeB)];
      } else {
        // use ton(m)
        return this.ton[Math.abs(baseA - baseB)];
      }
    },

    /**
     * Calculates weight for difference of length
     *
     * @param {number} a - The first notes length
     * @param {number} b - The second notes length
     * @returns {number} The resulting weight
     */
    weightLength: function(a, b) {
      return Math.abs(a - b);
    },

    /**
     * Returns the fine score for similarity between searched notes and the given document.
     * Calculation based on parsons code strings
     *
     * @param {object} object - A musicjson object to search in
     * @param {string} search - A string in parsons code (e.g. '*udu')
     * @returns {number} The fine score for similarity between parsons codes (0-1)
     */
    distanceParsons: function(object, search) {
      return this.stringEditDistance(
        this.valueMapping(
          this.parsons(this.notes(object, false, false))
        ).join(''),
        search
      );
    },

    /**
     * Returns the fine score for similarity between two document.
     * Calculation based on parsons code strings
     *
     * @param {object} object1 - The first musicjson object
     * @param {object} object2 - The second musicjson object
     * @returns {number} The fine score for similarity between parsons codes (0-1)
     */
    parsonSimilarity: function(object1, object2) {
      return this.distanceParsons(
        object1,
        this.valueMapping(this.parsons(this.notes(object2, false, false))).join('')
      );
    },

    /**
     * Returns the fine score for similarity between searched notes and the given document.
     * Calculation based on pitch values
     *
     * @param {object} object - The document
     * @param {Array} search - An array of pitch values (e.g. [1, 6, 1, 6])
     * @returns {number} The fine score for similarity between pitch values (0-1)
     */
    distancePitch: function(object, search) {
      return this.arrayEditDistance(
        this.pitchValues(
          this.notes(object, false, false),
          parseInt(object.attributes.key.fifths)
        ),
        search
      );
    },

    /**
     * Returns the fine score for similarity between two document.
     * Calculation based on pitch values
     *
     * @param {object} object1 - The first musicjson object
     * @param {object} object2 - The second musicjson object
     * @returns {number} The fine score for similarity between pitch values (0-1)
     */
    pitchSimilarity: function(object1, object2) {
      return this.distancePitch(
        object1,
        this.pitchValues(this.notes(object2, false, false), parseInt(object2.attributes.key.fifths))
      );
    },

    /**
     * Returns the fine score for similarity between searched notes and the given document.
     * Calculation based on intervals
     *
     * @param {object} object - The musicjson document
     * @param {Array} search - An array of intervals (e.g. [0, 5, -5, 5])
     * @returns {number} The fine score for similarity between intervals (0-1)
     */
    distanceIntervals: function(object, search) {
      return this.arrayEditDistance(
        this.valueMapping(this.intervals(this.notes(object, false, false))),
        search
      );
    },

    /**
     * Returns the fine score for similarity between two document.
     * Calculation based on intervals
     *
     * @param {object} object1 - The first musicjson object
     * @param {object} object2 - The second musicjson object
     * @returns {number} The fine score for similarity between intervals (0-1)
     */
    intervalSimilarity: function(object1, object2) {
      return this.distanceIntervals(
        object1,
        this.valueMapping(this.intervals(this.notes(object2, false, false)))
      );
    },

    /**
     * Returns fine score for similarity between searched notes and the given document.
     * Calculation is based on pitch and duration values.
     *
     * @param {object} object - The musicjson document
     * @param {Array} search - An array of notes (duration with divisions 16, e.g. eighth=8, quarter=16)
     * @param {boolean} adjusted - Use adjusted weighting function
     * @returns {number} The fine score for similarity between pitch & duration values (0-1)
     */
    distancePitchDuration: function(object, search, adjusted) {
      return this.weightedEditDistance(
        this.pitchDurationValues(
          this.notes(object, false, true),
          parseInt(object.attributes.key.fifths),
          parseInt(object.attributes.divisions),
          parseInt(object.attributes.time['beat-type'])
        ), search, adjusted);
    },

    /**
     * Returns the fine score for similarity between two document.
     * Calculation based on pitch and duration values
     *
     * @param {object} object1 - The first musicjson object
     * @param {object} object2 - The second musicjson object
     * @param {boolean} adjusted - Use adjusted weighting function
     * @returns {number} The fine score for similarity between pitch and duration values (0-1)
     */
    pitchDurationSimilarity: function(object1, object2, adjusted) {
      return this.distancePitchDuration(
        object1,
        this.pitchDurationValues(
          this.notes(object2, false, true),
          parseInt(object2.attributes.key.fifths),
          parseInt(object2.attributes.divisions),
          parseInt(object2.attributes.time['beat-type'])
        ),
        adjusted
      );
    },

    /**
     * Returns the fine score for similarity between searched notes and the corresponding ngrams.
     * Notes are represented in parsons code.
     *
     * @param {object} object - A musicjson object to search in
     * @param {string} search - A string in parsons code (e.g. '*udu')
     * @returns {Array} The fine score for similarity for each ngram (0-1)
     */
    parsonsNgramSimilarity: function(object, search) {
      var ngrams = this.ngrams(this.parsons(this.notes(object, false, false)), search.length);
      var similarities = [];

      for (var i = 0; i < ngrams.length; i++) {

        for (var j = 0; j < ngrams[i].length; j++) {
          if (j === 0) {
            // Reset first value of ngram
            ngrams[i][j].value = '*';
          }
        }

        similarities.push({
          similarity: this.stringEditDistance(
            this.valueMapping(ngrams[i]).join(''),
            search
          ),
          highlight: this.highlightMapping(ngrams[i])
        });
      }

      return similarities;
    },

    /**
     * Returns the fine score for similarity between the searched notes and corresponding ngrams.
     * Notes are represented with pitch and duration
     *
     * @param {object} object - A musicjson object to search in
     * @param {Array} search - An array of pitch values (e.g. [1, 6, 1, 6])
     * @returns {Array} The fine score for similarity for each ngram (0-1)
     */
    pitchNgramSimilarity: function(object, search) {
      var keyAdjust = parseInt(object.attributes.key.fifths);
      var ngrams = this.ngrams(this.notes(object, false, false), search.length);
      var similarities = [];

      for (var i = 0; i < ngrams.length; i++) {
        similarities.push({
          similarity: this.arrayEditDistance(this.pitchValues(ngrams[i], keyAdjust), search),
          highlight: this.highlightMapping(ngrams[i])
        });
      }

      return similarities;
    },

    /**
     * Returns the fine score for similarity between the searched notes and the corresponding ngrams.
     * Notes are represented as intervals.
     *
     * @param {object} object - A musicjson object to search in
     * @param {Array} search - An array of intervals (e.g. [0, 5, -5, 5])
     * @returns {Array} The fine score for similarity for each ngram (0-1)
     */
    intervalNgramSimilarity: function(object, search) {
      var ngrams = this.ngrams(this.intervals(this.notes(object, false, false)), search.length);
      var similarities = [];

      for (var i = 0; i < ngrams.length; i++) {
        for (var j = 0; j < ngrams[i].length; j++) {
          if (j === 0) {
            // Reset first value of ngram
            ngrams[i][j].value = '*';
          }
        }

        similarities.push({
          similarity: this.arrayEditDistance(
            this.valueMapping(ngrams[i]),
            search
          ),
          highlight: this.highlightMapping(ngrams[i])
        });
      }

      return similarities;
    },

    /**
     * Returns the fine score for similarity between the searched notes and the corresponding ngrams.
     * Notes are represented as pitch and duration values.
     *
     * @param {object} object - A musicjson object to search in
     * @param {Array} search - An array of notes ((duration with divisions 16, e.g. eighth=8, quarter=16)
     * @param {boolean} adjusted - Use adjusted weighting function
     * @returns {Array} The fine score for similarity for each ngram (0-1)
     */
    pitchDurationNgramSimilarity: function(object, search, adjusted) {
      var divisions = parseInt(object.attributes.divisions);
      var beatType = parseInt(object.attributes.time['beat-type']);
      var keyAdjust = parseInt(object.attributes.key.fifths);
      var notes = this.notes(object, false, true);
      var ngrams = this.ngrams(notes, search.length);
      ngrams = ngrams.concat(this.ngrams(notes, Math.floor(search.length * 1.5)));
      ngrams = ngrams.concat(this.ngrams(notes, search.length * 2));
      var similarities = [];

      for (var i = 0; i < ngrams.length; i++) {

        similarities.push({
          similarity: this.weightedEditDistance(
            this.pitchDurationValues(
              ngrams[i],
              keyAdjust,
              divisions,
              beatType
            ), search, adjusted),
          highlight: this.highlightMapping(ngrams[i])
        });
      }

      return similarities;
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
