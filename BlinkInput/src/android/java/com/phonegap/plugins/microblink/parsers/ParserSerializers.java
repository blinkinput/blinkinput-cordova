package com.phonegap.plugins.microblink.parsers;

import android.content.Context;
import com.microblink.entities.parsers.Parser;
import com.microblink.entities.parsers.config.fieldbyfield.FieldByFieldBundle;
import com.microblink.entities.parsers.config.fieldbyfield.FieldByFieldElement;

import com.phonegap.plugins.microblink.parsers.serialization.*;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;

public enum ParserSerializers {
    INSTANCE;

    private HashMap<String, ParserSerialization> mByJSONName = new HashMap<>();
    private HashMap<Class<?>, ParserSerialization> mByClass = new HashMap<>();

    private void registerMapping( ParserSerialization parserSerialization ) {
        mByJSONName.put(parserSerialization.getJsonName(), parserSerialization);
        mByClass.put(parserSerialization.getParserClass(), parserSerialization);
    }

    ParserSerializers() {
        registerMapping(new AmountParserSerialization());
        registerMapping(new DateParserSerialization());
        registerMapping(new EmailParserSerialization());
        registerMapping(new IbanParserSerialization());
        registerMapping(new LicensePlatesParserSerialization());
        registerMapping(new RawParserSerialization());
        registerMapping(new TopUpParserSerialization());
        registerMapping(new VinParserSerialization());
    }

    public ParserSerialization getParserSerialization(JSONObject jsonObject) throws JSONException {
        return mByJSONName.get(jsonObject.getString("parserType"));
    }

    public ParserSerialization getParserSerialization(Parser<?> parser) {
        return mByClass.get(parser.getClass());
    }

     public JSONArray serializeFieldByFieldResults(Context context, FieldByFieldElement[] elements) throws JSONException {
        JSONArray jsonArray = new JSONArray();

        for (FieldByFieldElement elem : elements) {
            JSONObject jsonMap = new JSONObject();
            String key = elem.getTitle(context);
            String stringValue = elem.getParser().getResult().toString();
            jsonMap.put("identifier", key);
            jsonMap.put("value", stringValue);
            jsonArray.put(jsonMap);
        }

        return jsonArray;
    }

    public FieldByFieldBundle deserializeFieldByFieldCollection(JSONObject jsonMap) throws JSONException  {
        JSONArray elementArray = jsonMap.getJSONArray("fieldByFieldElementArray");
        int numElements = elementArray.length();
        FieldByFieldElement[] elements = new FieldByFieldElement[numElements];
        for (int i = 0; i < numElements; ++i) {
            JSONObject elementMap = elementArray.getJSONObject(i);
            Parser<?> parser = getParserSerialization(elementMap.getJSONObject("parser")).createParser(elementMap.getJSONObject("parser"));
            String title = elementMap.getString("localizedTitle");
            String text = elementMap.getString("localizedTooltip");
            elements[ i ] = new FieldByFieldElement(title, text, parser);
        }

        return new FieldByFieldBundle(elements);
    }

}