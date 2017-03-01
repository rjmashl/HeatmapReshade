## Heatmap Reshade

Heatmap Reshade is a JavaScript library aimed at making outlying values in an HTML table more
readily discernible. The approach involves color-coding data values above and below a reference
or threshold value (e.g., the mean) and changing the color intensity through an "enhancement"
parameter such that values close to the reference are tinted lighter. In other words, data
values differing the most from the reference in left and right intervals are rendered the most
intensely colored.

The current implementation involves JQuery, slider bars, HTML custom data attributes, and CSS
and uses a red-green color palette. The demo table is generated using a JavaScript function,
but same can of course be achieved using a backend script. Various other aspects are also
tunable and generalizable.
