package com.phonegap.plugins.microblink.parsers.serialization;

import com.microblink.entities.parsers.Parser;
import com.phonegap.plugins.microblink.parsers.ParserSerialization;
import com.phonegap.plugins.microblink.SerializationUtils;

import org.json.JSONException;
import org.json.JSONObject;

public final class TopUpParserSerialization implements ParserSerialization {

    @Override
    public Parser<?> createParser(JSONObject jsonObject) {
        com.microblink.entities.parsers.topup.TopUpParser parser = new com.microblink.entities.parsers.topup.TopUpParser();
        parser.setAllowNoPrefix(jsonObject.optBoolean("allowNoPrefix", false));
        parser.setReturnCodeWithoutPrefix(jsonObject.optBoolean("returnCodeWithoutPrefix", false));
        return parser;
    }

    @Override
    public JSONObject serializeResult(Parser<?> parser) {
        com.microblink.entities.parsers.topup.TopUpParser.Result result = ((com.microblink.entities.parsers.topup.TopUpParser)parser).getResult();
        JSONObject jsonResult = new JSONObject();
        try {
            SerializationUtils.addCommonParserResultData(jsonResult, result);
            jsonResult.put("topUp", result.getTopUp());
        } catch (JSONException e) {
            // see https://developer.android.com/reference/org/json/JSONException
            throw new RuntimeException(e);
        }
        return jsonResult;
    }

    @Override
    public String getJsonName() {
        return "TopUpParser";
    }

    @Override
    public Class<?> getParserClass() {
        return com.microblink.entities.parsers.topup.TopUpParser.class;
    }
}