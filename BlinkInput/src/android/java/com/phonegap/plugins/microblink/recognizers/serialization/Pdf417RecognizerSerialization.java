package com.phonegap.plugins.microblink.recognizers.serialization;

import com.microblink.entities.recognizers.Recognizer;
import com.phonegap.plugins.microblink.recognizers.RecognizerSerialization;
import com.phonegap.plugins.microblink.SerializationUtils;

import org.json.JSONException;
import org.json.JSONObject;

public final class Pdf417RecognizerSerialization implements RecognizerSerialization {

    @Override
    public Recognizer<?> createRecognizer(JSONObject jsonObject) {
        com.microblink.entities.recognizers.blinkbarcode.pdf417.Pdf417Recognizer recognizer = new com.microblink.entities.recognizers.blinkbarcode.pdf417.Pdf417Recognizer();
        recognizer.setNullQuietZoneAllowed(jsonObject.optBoolean("nullQuietZoneAllowed", false));
        recognizer.setScanInverse(jsonObject.optBoolean("scanInverse", false));
        recognizer.setScanUncertain(jsonObject.optBoolean("scanUncertain", true));
        return recognizer;
    }

    @Override
    public JSONObject serializeResult(Recognizer<?> recognizer) {
        com.microblink.entities.recognizers.blinkbarcode.pdf417.Pdf417Recognizer.Result result = ((com.microblink.entities.recognizers.blinkbarcode.pdf417.Pdf417Recognizer)recognizer).getResult();
        JSONObject jsonResult = new JSONObject();
        try {
            SerializationUtils.addCommonRecognizerResultData(jsonResult, result);
            jsonResult.put("barcodeType", SerializationUtils.serializeEnum(result.getBarcodeType()));
            jsonResult.put("rawData", SerializationUtils.encodeByteArrayToBase64(result.getRawData()));
            jsonResult.put("stringData", result.getStringData());
            jsonResult.put("uncertain", result.isUncertain());
        } catch (JSONException e) {
            // see https://developer.android.com/reference/org/json/JSONException
            throw new RuntimeException(e);
        }
        return jsonResult;
    }

    @Override
    public String getJsonName() {
        return "Pdf417Recognizer";
    }

    @Override
    public Class<?> getRecognizerClass() {
        return com.microblink.entities.recognizers.blinkbarcode.pdf417.Pdf417Recognizer.class;
    }
}