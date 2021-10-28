module.exports = () => {
    const getParse = (str) => {
        let params = {};
        str.split('&').map( kv => {
            kv = kv.split('=');
            params[kv[0]] = kv[1];
        });
        return params;
    }

    return {
        getParse: getParse,
        postParse: getParse
    }
}