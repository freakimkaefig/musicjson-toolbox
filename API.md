<a name="module_MusicJsonToolbox"></a>

## MusicJsonToolbox
The MusicJsonToolbox class implements static functions to operate with musicjson objects.


* [MusicJsonToolbox](#module_MusicJsonToolbox)
    * [.notes(obj, repeat, rests)](#module_MusicJsonToolbox.notes) ⇒ <code>Array</code>
    * [.intervals(notes, keyAdjust)](#module_MusicJsonToolbox.intervals) ⇒ <code>Array</code>
    * [.parsons(notes)](#module_MusicJsonToolbox.parsons) ⇒ <code>Array</code>
    * [.ngrams(array, length)](#module_MusicJsonToolbox.ngrams) ⇒ <code>Array</code>
    * [.pitchValues(notes, keyAdjust)](#module_MusicJsonToolbox.pitchValues) ⇒ <code>Array</code>
    * [.pitchDurationValues(notes, keyAdjust, divisions, beatType)](#module_MusicJsonToolbox.pitchDurationValues) ⇒ <code>Array</code>
    * [.highlightMapping(array)](#module_MusicJsonToolbox.highlightMapping) ⇒ <code>Array</code>
    * [.base12Pitch(step, keyAdjust, octave, alter, withOctave)](#module_MusicJsonToolbox.base12Pitch) ⇒ <code>number</code>
    * [.interval2AbcStep(interval, base)](#module_MusicJsonToolbox.interval2AbcStep) ⇒ <code>string</code>
    * [.pitchDifference(pitch1, keyAdjust, pitch2, withOctave, absolute)](#module_MusicJsonToolbox.pitchDifference) ⇒ <code>number</code>
    * [.durationDifference(duration1, duration2, absolute)](#module_MusicJsonToolbox.durationDifference) ⇒ <code>number</code>
    * [.uniques(array)](#module_MusicJsonToolbox.uniques) ⇒ <code>Array</code>
    * [.editDistance(a, b, compare, weight)](#module_MusicJsonToolbox.editDistance) ⇒ <code>number</code>
    * [.stringEditDistance(a, b)](#module_MusicJsonToolbox.stringEditDistance) ⇒ <code>number</code>
    * [.arrayEditDistance(a, b)](#module_MusicJsonToolbox.arrayEditDistance) ⇒ <code>number</code>
    * [.weightedEditDistance(a, b)](#module_MusicJsonToolbox.weightedEditDistance) ⇒ <code>number</code>
    * [.weightSubstitution(a, b, i, j)](#module_MusicJsonToolbox.weightSubstitution) ⇒ <code>number</code>
    * [.weightInsertion(b, j)](#module_MusicJsonToolbox.weightInsertion) ⇒ <code>number</code>
    * [.weightDeletion(a, i)](#module_MusicJsonToolbox.weightDeletion) ⇒ <code>number</code>
    * [.weightFragmentation(matrix, a, b, i, j, f)](#module_MusicJsonToolbox.weightFragmentation) ⇒ <code>number</code>
    * [.weightConsolidation(matrix, a, b, i, j, c)](#module_MusicJsonToolbox.weightConsolidation) ⇒ <code>number</code>
    * [.weightInterval(a, b)](#module_MusicJsonToolbox.weightInterval) ⇒ <code>number</code>
    * [.weightLength(a, b)](#module_MusicJsonToolbox.weightLength) ⇒ <code>number</code>
    * [.distanceParsons(object, search)](#module_MusicJsonToolbox.distanceParsons) ⇒ <code>number</code>
    * [.distancePitch(object, search)](#module_MusicJsonToolbox.distancePitch) ⇒ <code>number</code>
    * [.distanceIntervals(object, search)](#module_MusicJsonToolbox.distanceIntervals) ⇒ <code>number</code>
    * [.distancePitchDuration(object, search)](#module_MusicJsonToolbox.distancePitchDuration) ⇒ <code>number</code>
    * [.distanceParsonsNgrams(object, search)](#module_MusicJsonToolbox.distanceParsonsNgrams) ⇒ <code>Array</code>
    * [.distancePitchNgrams(object, search)](#module_MusicJsonToolbox.distancePitchNgrams) ⇒ <code>Array</code>
    * [.distanceIntervalsNgrams(object, search)](#module_MusicJsonToolbox.distanceIntervalsNgrams) ⇒ <code>Array</code>
    * [.distancePitchDurationNgrams(object, search)](#module_MusicJsonToolbox.distancePitchDurationNgrams) ⇒ <code>Array</code>

<a name="module_MusicJsonToolbox.notes"></a>

### MusicJsonToolbox.notes(obj, repeat, rests) ⇒ <code>Array</code>
Returns an array of all notes.Removes rests.Example:[ {pitch: {step, octave, alter, accidental}, rest: false, duration, type}, { ... }, ... ]

**Kind**: static method of <code>[MusicJsonToolbox](#module_MusicJsonToolbox)</code>  
**Returns**: <code>Array</code> - An array containing all notes of the given object  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>object</code> | The musicjson object |
| repeat | <code>boolean</code> | If set to true, repeated measures are also repeated in notes output |
| rests | <code>boolean</code> | If set to true, the resulting notes include rests |

<a name="module_MusicJsonToolbox.intervals"></a>

### MusicJsonToolbox.intervals(notes, keyAdjust) ⇒ <code>Array</code>
Returns an array of intervals from an array of notesExample:[ {0}, {2}, {-2}, {5}, ... ]

**Kind**: static method of <code>[MusicJsonToolbox](#module_MusicJsonToolbox)</code>  
**Returns**: <code>Array</code> - An array of notes as contour  

| Param | Type | Description |
| --- | --- | --- |
| notes | <code>Array</code> | Array of notes for which the contour should be created |
| keyAdjust | <code>number</code> | The position in circle of fifths of the searched notes |

<a name="module_MusicJsonToolbox.parsons"></a>

### MusicJsonToolbox.parsons(notes) ⇒ <code>Array</code>
Generate array of parson code from notes

**Kind**: static method of <code>[MusicJsonToolbox](#module_MusicJsonToolbox)</code>  
**Returns**: <code>Array</code> - An array of notes as parsons code  

| Param | Type | Description |
| --- | --- | --- |
| notes | <code>Array</code> | Array of notes for which the contour should be created |

<a name="module_MusicJsonToolbox.ngrams"></a>

### MusicJsonToolbox.ngrams(array, length) ⇒ <code>Array</code>
Generates array of ngrams in specified length (based on [https://gist.github.com/eranbetzalel/9f16b1216931e20775ad](https://gist.github.com/eranbetzalel/9f16b1216931e20775ad)).

**Kind**: static method of <code>[MusicJsonToolbox](#module_MusicJsonToolbox)</code>  
**Returns**: <code>Array</code> - An Array of ngrams with the given length  

| Param | Type | Description |
| --- | --- | --- |
| array | <code>Array</code> | An array of notes (returned by function 'notes') |
| length | <code>number</code> | The length of n |

<a name="module_MusicJsonToolbox.pitchValues"></a>

### MusicJsonToolbox.pitchValues(notes, keyAdjust) ⇒ <code>Array</code>
Get array of base 12 pitch values from array of notes

**Kind**: static method of <code>[MusicJsonToolbox](#module_MusicJsonToolbox)</code>  
**Returns**: <code>Array</code> - - The array of base 12 pitch values  

| Param | Type | Description |
| --- | --- | --- |
| notes | <code>Array</code> | The array of notes |
| keyAdjust | <code>number</code> | Adjusting of key by circle of fifths |

<a name="module_MusicJsonToolbox.pitchDurationValues"></a>

### MusicJsonToolbox.pitchDurationValues(notes, keyAdjust, divisions, beatType) ⇒ <code>Array</code>
Generates an array of pitch and duration values for the Mongeau & Sankoff version of melodic edit distanceSee Mongeau, M., & Sankoff, D. (1990). Comparison of musical sequences. Computers and the Humanities, 24(3), 161–175. http://doi.org/10.1007/BF00117340

**Kind**: static method of <code>[MusicJsonToolbox](#module_MusicJsonToolbox)</code>  
**Returns**: <code>Array</code> - - The correctly mapped array with pitch and duration values  

| Param | Type | Description |
| --- | --- | --- |
| notes | <code>Array</code> | Array of notes (e.g. returned by  MusicJsonToolbox.notes) |
| keyAdjust | <code>number</code> | Adjusting of key by circle of fifths |
| divisions | <code>number</code> | The divisions of the document |
| beatType | <code>number</code> | The documents beat type |

<a name="module_MusicJsonToolbox.highlightMapping"></a>

### MusicJsonToolbox.highlightMapping(array) ⇒ <code>Array</code>
Array mapping for note highlighting

**Kind**: static method of <code>[MusicJsonToolbox](#module_MusicJsonToolbox)</code>  
**Returns**: <code>Array</code> - - The mapped array  

| Param | Type | Description |
| --- | --- | --- |
| array | <code>Array</code> | The array that should be mapped for highlighting |

<a name="module_MusicJsonToolbox.base12Pitch"></a>

### MusicJsonToolbox.base12Pitch(step, keyAdjust, octave, alter, withOctave) ⇒ <code>number</code>
Calculates the base 12 represented pitch

**Kind**: static method of <code>[MusicJsonToolbox](#module_MusicJsonToolbox)</code>  
**Returns**: <code>number</code> - The base12 pitch number  

| Param | Type | Description |
| --- | --- | --- |
| step | <code>string</code> | The step (c, d, e, f, g, a, b) |
| keyAdjust | <code>number</code> | Key position in circle of fifths; if set, the pitch gets transposed to C major |
| octave | <code>number</code> | The octave |
| alter | <code>number</code> | The value for alter (either from accidental or key) |
| withOctave | <code>boolean</code> | When set, the octave is taken into account, otherwise function return relative value (from 1 to 12) |

<a name="module_MusicJsonToolbox.interval2AbcStep"></a>

### MusicJsonToolbox.interval2AbcStep(interval, base) ⇒ <code>string</code>
Returns abc note from interval value

**Kind**: static method of <code>[MusicJsonToolbox](#module_MusicJsonToolbox)</code>  
**Returns**: <code>string</code> - - The abc note  

| Param | Type | Description |
| --- | --- | --- |
| interval | <code>number</code> | The interval value |
| base | <code>number</code> | The base 12 pitch the interval should be added |

<a name="module_MusicJsonToolbox.pitchDifference"></a>

### MusicJsonToolbox.pitchDifference(pitch1, keyAdjust, pitch2, withOctave, absolute) ⇒ <code>number</code>
Calculates difference between two pitches

**Kind**: static method of <code>[MusicJsonToolbox](#module_MusicJsonToolbox)</code>  
**Returns**: <code>number</code> - The difference between two pitches  

| Param | Type | Description |
| --- | --- | --- |
| pitch1 | <code>object</code> | The first pitch to compare |
| keyAdjust | <code>number</code> | The position in circle of fifths of the searched notes |
| pitch2 | <code>object</code> | The second pitch to compare |
| withOctave | <code>boolean</code> | When set, the octave is taken into account, otherwise function return relative value (from 1 to 12) |
| absolute | <code>boolean</code> | When set, the absolute difference is returned as Math.abs(Pitch 2 - Pitch 1) |

<a name="module_MusicJsonToolbox.durationDifference"></a>

### MusicJsonToolbox.durationDifference(duration1, duration2, absolute) ⇒ <code>number</code>
Calculates difference between two durations

**Kind**: static method of <code>[MusicJsonToolbox](#module_MusicJsonToolbox)</code>  
**Returns**: <code>number</code> - The difference between two durations  

| Param | Type | Description |
| --- | --- | --- |
| duration1 | <code>number</code> | The first duration to compare |
| duration2 | <code>number</code> | The second duration to compare |
| absolute | <code>boolean</code> | When set, the absolute difference is returned as Math.abs(Duration 2 - Duration 1) |

<a name="module_MusicJsonToolbox.uniques"></a>

### MusicJsonToolbox.uniques(array) ⇒ <code>Array</code>
Returns only unique array values

**Kind**: static method of <code>[MusicJsonToolbox](#module_MusicJsonToolbox)</code>  
**Returns**: <code>Array</code> - Array with only unique values  

| Param | Type | Description |
| --- | --- | --- |
| array | <code>Array</code> | The array with possible duplicate values |

<a name="module_MusicJsonToolbox.editDistance"></a>

### MusicJsonToolbox.editDistance(a, b, compare, weight) ⇒ <code>number</code>
Edit-Distance implmentation from [https://gist.github.com/andrei-m/982927](https://gist.github.com/andrei-m/982927)Copyright (c) 2011 Andrei MackenziePermission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

**Kind**: static method of <code>[MusicJsonToolbox](#module_MusicJsonToolbox)</code>  
**Returns**: <code>number</code> - The calculated edit distance  

| Param | Type | Description |
| --- | --- | --- |
| a | <code>string</code> &#124; <code>Array</code> | The first string (document) |
| b | <code>string</code> &#124; <code>Array</code> | The second string (query) |
| compare | <code>boolean</code> | The compare function which returns boolean value between two items |
| weight | <code>number</code> | The weight function which returns numeric for weighting operations |

<a name="module_MusicJsonToolbox.stringEditDistance"></a>

### MusicJsonToolbox.stringEditDistance(a, b) ⇒ <code>number</code>
Calculate edit distance for strings

**Kind**: static method of <code>[MusicJsonToolbox](#module_MusicJsonToolbox)</code>  
**Returns**: <code>number</code> - The calculated edit distance  

| Param | Type | Description |
| --- | --- | --- |
| a | <code>string</code> | The first string (document) |
| b | <code>string</code> | The second string (query) |

<a name="module_MusicJsonToolbox.arrayEditDistance"></a>

### MusicJsonToolbox.arrayEditDistance(a, b) ⇒ <code>number</code>
Calculate edit distance for arrays

**Kind**: static method of <code>[MusicJsonToolbox](#module_MusicJsonToolbox)</code>  
**Returns**: <code>number</code> - The calculated edit distance  

| Param | Type | Description |
| --- | --- | --- |
| a | <code>Array</code> | The first interval array (document) |
| b | <code>Array</code> | The second interval array (query) |

<a name="module_MusicJsonToolbox.weightedEditDistance"></a>

### MusicJsonToolbox.weightedEditDistance(a, b) ⇒ <code>number</code>
Calculate weighted edit distance for arraysThe function implements improved weighting for interval differences based on consonance / dissonanceConcepts are taken from Mongeau, M., & Sankoff, D. (1990). Comparison of musical sequences. Computers and the Humanities, 24(3), 161–175. http://doi.org/10.1007/BF00117340

**Kind**: static method of <code>[MusicJsonToolbox](#module_MusicJsonToolbox)</code>  
**Returns**: <code>number</code> - The calculated edit distance  

| Param | Type | Description |
| --- | --- | --- |
| a | <code>Array</code> | The first notes array (document), format: output of MusicJsonToolbox.pitchDurationValues |
| b | <code>Array</code> | The second notes array (query), format: output of MusicJsonToolbox.pitchDurationValues |

<a name="module_MusicJsonToolbox.weightSubstitution"></a>

### MusicJsonToolbox.weightSubstitution(a, b, i, j) ⇒ <code>number</code>
Calculates weight for substitution of two notes

**Kind**: static method of <code>[MusicJsonToolbox](#module_MusicJsonToolbox)</code>  
**Returns**: <code>number</code> - Resulting weight  

| Param | Type | Description |
| --- | --- | --- |
| a | <code>Array</code> | First array of notes (document) |
| b | <code>Array</code> | Second array of notes (search) |
| i | <code>number</code> | Position to compare in a (1-based) |
| j | <code>number</code> | Position to compare in a (1-based) |

<a name="module_MusicJsonToolbox.weightInsertion"></a>

### MusicJsonToolbox.weightInsertion(b, j) ⇒ <code>number</code>
Calculates weight for insertion of a note

**Kind**: static method of <code>[MusicJsonToolbox](#module_MusicJsonToolbox)</code>  
**Returns**: <code>number</code> - Resulting weight  

| Param | Type | Description |
| --- | --- | --- |
| b | <code>Array</code> | The array where the note should be inserted from |
| j | <code>number</code> | The position of the note that should be inserted |

<a name="module_MusicJsonToolbox.weightDeletion"></a>

### MusicJsonToolbox.weightDeletion(a, i) ⇒ <code>number</code>
Calculates weight for insertion of a note

**Kind**: static method of <code>[MusicJsonToolbox](#module_MusicJsonToolbox)</code>  
**Returns**: <code>number</code> - Resulting weight  

| Param | Type | Description |
| --- | --- | --- |
| a | <code>Array</code> | The array where the note should be deleted from |
| i | <code>number</code> | The position of the note that should be deleted |

<a name="module_MusicJsonToolbox.weightFragmentation"></a>

### MusicJsonToolbox.weightFragmentation(matrix, a, b, i, j, f) ⇒ <code>number</code>
Calculates weight for fragmentation of one note in to several others

**Kind**: static method of <code>[MusicJsonToolbox](#module_MusicJsonToolbox)</code>  
**Returns**: <code>number</code> - The resulting weight  

| Param | Type | Description |
| --- | --- | --- |
| matrix | <code>Array</code> | The current calculated matrix |
| a | <code>Array</code> | First array of notes (document) |
| b | <code>Array</code> | Second array of notes (search) |
| i | <code>number</code> | Current position in a |
| j | <code>number</code> | Current position in b |
| f | <code>number</code> | Constant parameter F (calculated by length of notes in both arrays) |

<a name="module_MusicJsonToolbox.weightConsolidation"></a>

### MusicJsonToolbox.weightConsolidation(matrix, a, b, i, j, c) ⇒ <code>number</code>
Calculates weight for fragmentation of one several notes to one

**Kind**: static method of <code>[MusicJsonToolbox](#module_MusicJsonToolbox)</code>  
**Returns**: <code>number</code> - The resulting weight  

| Param | Type | Description |
| --- | --- | --- |
| matrix | <code>Array</code> | The current calculated matrix |
| a | <code>Array</code> | First array of notes (document) |
| b | <code>Array</code> | Second array of notes (search) |
| i | <code>number</code> | Current position in a |
| j | <code>number</code> | Current position in b |
| c | <code>number</code> | Constant parameter C (calculated by length of notes in both arrays) |

<a name="module_MusicJsonToolbox.weightInterval"></a>

### MusicJsonToolbox.weightInterval(a, b) ⇒ <code>number</code>
Calculates weight for difference of pitch values

**Kind**: static method of <code>[MusicJsonToolbox](#module_MusicJsonToolbox)</code>  
**Returns**: <code>number</code> - The resulting weight  

| Param | Type | Description |
| --- | --- | --- |
| a | <code>object</code> | First note object (from document) |
| b | <code>object</code> | Second note object (from search) |

<a name="module_MusicJsonToolbox.weightLength"></a>

### MusicJsonToolbox.weightLength(a, b) ⇒ <code>number</code>
Calculates weight for difference of length

**Kind**: static method of <code>[MusicJsonToolbox](#module_MusicJsonToolbox)</code>  
**Returns**: <code>number</code> - The resulting weight  

| Param | Type | Description |
| --- | --- | --- |
| a | <code>number</code> | The first notes length |
| b | <code>number</code> | The second notes length |

<a name="module_MusicJsonToolbox.distanceParsons"></a>

### MusicJsonToolbox.distanceParsons(object, search) ⇒ <code>number</code>
Returns minimum edit distance between searched notes and the given document.Calculation based on parsons code strings

**Kind**: static method of <code>[MusicJsonToolbox](#module_MusicJsonToolbox)</code>  
**Returns**: <code>number</code> - The edit distance between parsons codes  

| Param | Type | Description |
| --- | --- | --- |
| object | <code>object</code> | A musicjson object to search in |
| search | <code>string</code> | A string in parsons code (e.g. '*udu') |

<a name="module_MusicJsonToolbox.distancePitch"></a>

### MusicJsonToolbox.distancePitch(object, search) ⇒ <code>number</code>
Returns minimum edit distance between searched notes and the given document.Calculation based on pitch values

**Kind**: static method of <code>[MusicJsonToolbox](#module_MusicJsonToolbox)</code>  
**Returns**: <code>number</code> - The edit distance between intervals  

| Param | Type | Description |
| --- | --- | --- |
| object | <code>object</code> | The document |
| search | <code>Array</code> | An array of pitch values (e.g. [1, 6, 1, 6]) |

<a name="module_MusicJsonToolbox.distanceIntervals"></a>

### MusicJsonToolbox.distanceIntervals(object, search) ⇒ <code>number</code>
Returns minimum edit distance between searched notes and the given document.Calculation based on intervals

**Kind**: static method of <code>[MusicJsonToolbox](#module_MusicJsonToolbox)</code>  
**Returns**: <code>number</code> - The edit distance between intervals  

| Param | Type | Description |
| --- | --- | --- |
| object | <code>object</code> | The musicjson document |
| search | <code>Array</code> | An array of intervals (e.g. [0, 5, -5, 5]) |

<a name="module_MusicJsonToolbox.distancePitchDuration"></a>

### MusicJsonToolbox.distancePitchDuration(object, search) ⇒ <code>number</code>
Returns minimum edit-distance between searched notes and the given document.Calculation is based on pitch and duration values.

**Kind**: static method of <code>[MusicJsonToolbox](#module_MusicJsonToolbox)</code>  
**Returns**: <code>number</code> - The edit distance between pitch & duration values  

| Param | Type | Description |
| --- | --- | --- |
| object | <code>object</code> | The musicjson document |
| search | <code>Array</code> | An array of pitch and duration values (e.g. [{value: 9, rest: false, duration: 4}, {value: 4, rest: false, duration: 4}, {value: 6, rest: false, duration: 2}] |

<a name="module_MusicJsonToolbox.distanceParsonsNgrams"></a>

### MusicJsonToolbox.distanceParsonsNgrams(object, search) ⇒ <code>Array</code>
Returns minimum edit distance between searched notes and the corresponding ngrams.Notes are represented in parsons code.

**Kind**: static method of <code>[MusicJsonToolbox](#module_MusicJsonToolbox)</code>  
**Returns**: <code>Array</code> - The cost for each ngram  

| Param | Type | Description |
| --- | --- | --- |
| object | <code>object</code> | A musicjson object to search in |
| search | <code>string</code> | A string in parsons code (e.g. '*udu') |

<a name="module_MusicJsonToolbox.distancePitchNgrams"></a>

### MusicJsonToolbox.distancePitchNgrams(object, search) ⇒ <code>Array</code>
Returns the minimum edit-distance between the searched notes and corresponding ngrams.Notes are represented with pitch and duration

**Kind**: static method of <code>[MusicJsonToolbox](#module_MusicJsonToolbox)</code>  
**Returns**: <code>Array</code> - The cost for each ngram  

| Param | Type | Description |
| --- | --- | --- |
| object | <code>object</code> | A musicjson object to search in |
| search | <code>Array</code> | An array of pitch values (e.g. [1, 6, 1, 6]) |

<a name="module_MusicJsonToolbox.distanceIntervalsNgrams"></a>

### MusicJsonToolbox.distanceIntervalsNgrams(object, search) ⇒ <code>Array</code>
Returns the minimum distance between the searched notes and the corresponding ngrams.Notes are represented as intervals.

**Kind**: static method of <code>[MusicJsonToolbox](#module_MusicJsonToolbox)</code>  
**Returns**: <code>Array</code> - The cost for each ngram  

| Param | Type | Description |
| --- | --- | --- |
| object | <code>object</code> | A musicjson object to search in |
| search | <code>Array</code> | An array of intervals (e.g. [0, 5, -5, 5]) |

<a name="module_MusicJsonToolbox.distancePitchDurationNgrams"></a>

### MusicJsonToolbox.distancePitchDurationNgrams(object, search) ⇒ <code>Array</code>
Returns the minimum distance between the searched notes and the corresponding ngrams.Notes are represented as pitch and duration values.

**Kind**: static method of <code>[MusicJsonToolbox](#module_MusicJsonToolbox)</code>  
**Returns**: <code>Array</code> - The cost for each ngram  

| Param | Type | Description |
| --- | --- | --- |
| object | <code>object</code> | A musicjson object to search in |
| search | <code>Array</code> | An array of intervals (e.g. [0, 5, -5, 5]) |

