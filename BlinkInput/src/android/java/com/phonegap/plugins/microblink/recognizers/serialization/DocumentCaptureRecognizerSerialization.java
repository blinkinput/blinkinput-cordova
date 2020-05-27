package com.phonegap.plugins.microblink.recognizers.serialization;

import com.microblink.entities.recognizers.Recognizer;
import com.phonegap.plugins.microblink.recognizers.RecognizerSerialization;
import com.phonegap.plugins.microblink.SerializationUtils;

import org.json.JSONException;
import org.json.JSONObject;

public final class DocumentCaptureRecognizerSerialization implements RecognizerSerialization {

    @Override
    public Recognizer<?> createRecognizer(JSONObject jsonObject) {
        com.microblink.entities.recognizers.blinkinput.documentcapture.DocumentCaptureRecognizer recognizer = new com.microblink.entities.recognizers.blinkinput.documentcapture.DocumentCaptureRecognizer();
        recognizer.setFullDocumentImageExtensionFactors(SerializationUtils.deserializeExtensionFactors(jsonObject.optJSONObject("fullDocumentImageExtensionFactors")));
        recognizer.setMinDocumentScale((float)jsonObject.optDouble("minDocumentScale", 0.5));
        recognizer.setNumStableDetectionsThreshold(jsonObject.optInt("numStableDetectionsThreshold", 2));
        recognizer.setReturnFullDocumentImage(jsonObject.optBoolean("returnFullDocumentImage", false));
        return recognizer;
    }

    @Override
    public JSONObject serializeResult(Recognizer<?> recognizer) {
        com.microblink.entities.recognizers.blinkinput.documentcapture.DocumentCaptureRecognizer.Result result = ((com.microblink.entities.recognizers.blinkinput.documentcapture.DocumentCaptureRecognizer)recognizer).getResult();
        JSONObject jsonResult = new JSONObject();
        try {
            SerializationUtils.addCommonRecognizerResultData(jsonResult, result);
            jsonResult.put("detectionLocation", SerializationUtils.serializeQuad(result.getDetectionLocation()));
            jsonResult.put("fullDocumentImage", SerializationUtils.encodeImageBase64(result.getFullDocumentImage()));
        } catch (JSONException e) {
            // see https://developer.android.com/reference/org/json/JSONException
            throw new RuntimeException(e);
        }
        return jsonResult;
    }

    @Override
    public String getJsonName() {
        return "DocumentCaptureRecognizer";
    }

    @Override
    public Class<?> getRecognizerClass() {
        return com.microblink.entities.recognizers.blinkinput.documentcapture.DocumentCaptureRecognizer.class;
    }
}