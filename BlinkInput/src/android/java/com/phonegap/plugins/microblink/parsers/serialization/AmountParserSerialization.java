package com.phonegap.plugins.microblink.parsers.serialization;

import com.microblink.entities.parsers.Parser;
import com.phonegap.plugins.microblink.parsers.ParserSerialization;
import com.phonegap.plugins.microblink.SerializationUtils;

import org.json.JSONException;
import org.json.JSONObject;

public final class AmountParserSerialization implements ParserSerialization {

    @Override
    public Parser<?> createParser(JSONObject jsonObject) {
        com.microblink.entities.parsers.amount.AmountParser parser = new com.microblink.entities.parsers.amount.AmountParser();
        parser.setAllowMissingDecimals(jsonObject.optBoolean("allowMissingDecimals", false));
        parser.setAllowNegativeAmounts(jsonObject.optBoolean("allowNegativeAmounts", false));
        parser.setAllowSpaceSeparators(jsonObject.optBoolean("allowSpaceSeparators", false));
        parser.setArabicIndicMode(jsonObject.optBoolean("arabicIndicMode", false));
        return parser;
    }

    @Override
    public JSONObject serializeResult(Parser<?> parser) {
        com.microblink.entities.parsers.amount.AmountParser.Result result = ((com.microblink.entities.parsers.amount.AmountParser)parser).getResult();
        JSONObject jsonResult = new JSONObject();
        try {
            SerializationUtils.addCommonParserResultData(jsonResult, result);
            jsonResult.put("amount", result.getAmount());
        } catch (JSONException e) {
            // see https://developer.android.com/reference/org/json/JSONException
            throw new RuntimeException(e);
        }
        return jsonResult;
    }

    @Override
    public String getJsonName() {
        return "AmountParser";
    }

    @Override
    public Class<?> getParserClass() {
        return com.microblink.entities.parsers.amount.AmountParser.class;
    }
}