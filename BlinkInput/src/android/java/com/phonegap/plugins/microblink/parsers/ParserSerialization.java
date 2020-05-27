package com.phonegap.plugins.microblink.parsers;

import com.microblink.entities.parsers.Parser;

import org.json.JSONObject;

public interface ParserSerialization {
    Parser<?> createParser(JSONObject jsonObject);
    JSONObject serializeResult(Parser<?> parser);

    String getJsonName();
    Class<?> getParserClass();
}
