/**
 * offset-sourcemap-lines:
 *   offset each generated lines in SourceMap
 * 
 * https://github.com/twada/offset-sourcemap-lines
 *
 * Copyright (c) 2016 Takuto Wada
 * Licensed under the MIT license.
 *   https://twada.mit-license.org/
 */
'use strict';

var sourceMap = require('source-map');

module.exports = function offsetLines (incomingSourceMap, lineOffset) {
    var consumer = new sourceMap.SourceMapConsumer(incomingSourceMap);
    var generator = new sourceMap.SourceMapGenerator({
        file: incomingSourceMap.file,
        sourceRoot: incomingSourceMap.sourceRoot
    });
    consumer.eachMapping(function (m) {
        // skip invalid (not-connected) mapping
        // refs: https://github.com/mozilla/source-map/blob/182f4459415de309667845af2b05716fcf9c59ad/lib/source-map-generator.js#L268-L275
        if (typeof m.originalLine === 'number' && 0 < m.originalLine &&
            typeof m.originalColumn === 'number' && 0 <= m.originalColumn &&
            m.source) {
            generator.addMapping({
                source: m.source,
                name: m.name,
                original: { line: m.originalLine, column: m.originalColumn },
                generated: { line: m.generatedLine + lineOffset, column: m.generatedColumn }
            });
        }
    });
    var outgoingSourceMap = JSON.parse(generator.toString());
    if (typeof incomingSourceMap.sourcesContent !== undefined) {
        outgoingSourceMap.sourcesContent = incomingSourceMap.sourcesContent;
    }
    return outgoingSourceMap;
};
