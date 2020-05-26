package com.phonegap.plugins.microblink.parsers.serialization;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.microblink.entities.parsers.Parser;
import com.phonegap.plugins.microblink.parsers.ParserSerialization;
import com.phonegap.plugins.microblink.SerializationUtils;

public final class RegexParserSerialization implements ParserSerialization {

    @Override
    public Parser<?> createParser(JSONObject jsonMap) {
        try {
            String regex = jsonMap.getString("regex");
            com.microblink.entities.parsers.regex.RegexParser parser = new com.microblink.entities.parsers.regex.RegexParser(regex);
            if (jsonMap.has("startWithWhitespace")) {
                parser.setStartWithWhitespace(jsonMap.getBoolean("startWithWhitespace"));
            }
            if (jsonMap.has("endWithWhitespace")) {
                parser.setEndWithWhitespace(jsonMap.getBoolean("endWithWhitespace"));
            }
            if (jsonMap.has("useSieve")) {
                parser.setUseSieve(jsonMap.getBoolean("useSieve"));
            }
            return parser;
        } catch(JSONException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public JSONObject serializeResult(Parser<?> parser) {
        try {
            com.microblink.entities.parsers.regex.RegexParser.Result result = ((com.microblink.entities.parsers.regex.RegexParser)parser).getResult();
            JSONObject jsonResult = new JSONObject();
            SerializationUtils.addCommonParserResultData(jsonResult, result);
            jsonResult.put("parsedString", result.getParsedString());
            return jsonResult;
        } catch(JSONException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public String getJsonName() {
        return "RegexParser";
    }

    @Override
    public Class<?> getParserClass() {
        return com.microblink.entities.parsers.regex.RegexParser.class;
    }

}
