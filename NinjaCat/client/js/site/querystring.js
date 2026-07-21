function getQuerystringValues() {

    var hash = location.search.substr(1),
        values = {},
        pairs, pair, i, len, value;

    if(hash !== undefined){
        pairs = hash.split('&');
        for(i = 0, len = pairs.length; i < len; i++){
            pair = pairs[i].split('=');

            // handle case where value is not provided
            value = pair[1];
            if (value === undefined) {
                value = true;
            }

            values[pair[0]] = decodeURIComponent(value);
        }
    }

    return values;
}

app.getQuerystringValues = getQuerystringValues;