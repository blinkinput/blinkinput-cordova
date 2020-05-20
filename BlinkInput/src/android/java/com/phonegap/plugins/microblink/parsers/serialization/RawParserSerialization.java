package com.phonegap.plugins.microblink.parsers.serialization;

import com.microblink.entities.parsers.Parser;
import com.phonegap.plugins.microblink.parsers.ParserSerialization;
import com.phonegap.plugins.microblink.SerializationUtils;

import org.json.JSONException;
import org.json.JSONObject;

public final class RawParserSerialization implements ParserSerialization {

    @Override
    public Parser<?> createParser(JSONObject jsonObject) {
        com.microblink.entities.parsers.raw.RawParser parser = new com.microblink.entities.parsers.raw.RawParser();
        parser.setUseSieve(jsonObject.optBoolean("useSieve", false));
        return parser;
    }

    @Override
    public JSONObject serializeResult(Parser<?> parser) {
        com.microblink.entities.parsers.raw.RawParser.Result result = ((com.microblink.entities.parsers.raw.RawParser)parser).getResult();
        JSONObject jsonResult = new JSONObject();
        try {
            SerializationUtils.addCommonParserResultData(jsonResult, result);
            jsonResult.put("rawText", result.getRawText());
        } catch (JSONException e) {
            // see https://developer.android.com/reference/org/json/JSONException
            throw new RuntimeException(e);
        }
        return jsonResult;
    }

    @Override
    public String getJsonName() {
        return "RawParser";
    }

    @Override
    public Class<?> getParserClass() {
        return com.microblink.entities.parsers.raw.RawParser.class;
    }
}