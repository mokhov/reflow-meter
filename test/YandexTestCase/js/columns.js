function _columns(a)
{
    document.write('<style type="text/css"> .column_ { position: fixed; ' +
            'z-index: 999; top: 0; display: block; height: 100%;' +
            'border-right: 1px dashed #4affff; }' +
            '* html .column_ {position: absolute; } </style>');

    for (var i = 0, l = a.length; i < l; i++)
        document.write('<span class="column_" style="left: ' + a[i] + '%"></span>');
}

_columns([2, 10, 18, 26, 34, 42, 50, 58, 66, 74, 82, 90, 98]);