package com.phonegap.plugins.microblink.recognizers.serialization;

import com.microblink.entities.recognizers.Recognizer;
import com.phonegap.plugins.microblink.recognizers.RecognizerSerialization;
import com.phonegap.plugins.microblink.SerializationUtils;

import org.json.JSONException;
import org.json.JSONObject;

public final class BarcodeRecognizerSerialization implements RecognizerSerialization {

    @Override
    public Recognizer<?> createRecognizer(JSONObject jsonObject) {
        com.microblink.entities.recognizers.blinkbarcode.barcode.BarcodeRecognizer recognizer = new com.microblink.entities.recognizers.blinkbarcode.barcode.BarcodeRecognizer();
        recognizer.setAutoScaleDetection(jsonObject.optBoolean("autoScaleDetection", true));
        recognizer.setNullQuietZoneAllowed(jsonObject.optBoolean("nullQuietZoneAllowed", false));
        recognizer.setReadCode39AsExtendedData(jsonObject.optBoolean("readCode39AsExtendedData", false));
        recognizer.setScanAztecCode(jsonObject.optBoolean("scanAztecCode", false));
        recognizer.setScanCode128(jsonObject.optBoolean("scanCode128", false));
        recognizer.setScanCode39(jsonObject.optBoolean("scanCode39", false));
        recognizer.setScanDataMatrix(jsonObject.optBoolean("scanDataMatrix", false));
        recognizer.setScanEan13(jsonObject.optBoolean("scanEan13", false));
        recognizer.setScanEan8(jsonObject.optBoolean("scanEan8", false));
        recognizer.setScanInverse(jsonObject.optBoolean("scanInverse", false));
        recognizer.setScanItf(jsonObject.optBoolean("scanItf", false));
        recognizer.setScanPdf417(jsonObject.optBoolean("scanPdf417", false));
        recognizer.setScanQrCode(jsonObject.optBoolean("scanQrCode", false));
        recognizer.setScanUncertain(jsonObject.optBoolean("scanUncertain", true));
        recognizer.setScanUpca(jsonObject.optBoolean("scanUpca", false));
        recognizer.setScanUpce(jsonObject.optBoolean("scanUpce", false));
        recognizer.setSlowerThoroughScan(jsonObject.optBoolean("slowerThoroughScan", true));
        return recognizer;
    }

    @Override
    public JSONObject serializeResult(Recognizer<?> recognizer) {
        com.microblink.entities.recognizers.blinkbarcode.barcode.BarcodeRecognizer.Result result = ((com.microblink.entities.recognizers.blinkbarcode.barcode.BarcodeRecognizer)recognizer).getResult();
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
        return "BarcodeRecognizer";
    }

    @Override
    public Class<?> getRecognizerClass() {
        return com.microblink.entities.recognizers.blinkbarcode.barcode.BarcodeRecognizer.class;
    }
}