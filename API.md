<a name="module_MusicJsonToolbox"></a>

## MusicJsonToolbox
The MusicJsonToolbox class implements static functions to operate with musicjson objects.


* [MusicJsonToolbox](#module_MusicJsonToolbox)
    * [.notes(obj)](#module_MusicJsonToolbox.notes)
    * [.ngrams(array, length)](#module_MusicJsonToolbox.ngrams)

<a name="module_MusicJsonToolbox.notes"></a>

### MusicJsonToolbox.notes(obj)
Returns an array of all notes (transposed to C major).Example:[ {object}, {object}, ... ]

**Kind**: static method of <code>[MusicJsonToolbox](#module_MusicJsonToolbox)</code>  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>object</code> | The musicjson object |

<a name="module_MusicJsonToolbox.ngrams"></a>

### MusicJsonToolbox.ngrams(array, length)
Generates array of ngrams in specified length (based on [https://gist.github.com/eranbetzalel/9f16b1216931e20775ad](https://gist.github.com/eranbetzalel/9f16b1216931e20775ad)).

**Kind**: static method of <code>[MusicJsonToolbox](#module_MusicJsonToolbox)</code>  

| Param | Type | Description |
| --- | --- | --- |
| array | <code>Array</code> | An array of notes (returned by function "notes") |
| length | <code>Number</code> | The length of n |

