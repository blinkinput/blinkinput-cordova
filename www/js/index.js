/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        
        var resultDiv = document.getElementById('resultDiv');

        var successfulImageDiv = document.getElementById('successfulImageDiv');
        var successfulImage = document.getElementById('documentImage1');

        var documentImage1Div = document.getElementById('documentImage1Div');
        var documentImage1 = document.getElementById('documentImage1');

        var documentImage2Div = document.getElementById('documentImage2Div');
        var documentImage2 = document.getElementById('documentImage2');

        var fullFrameImageDiv = document.getElementById('fullFrameImageDiv');
        var fullFrameImage = document.getElementById('fullFrameImage');

        var faceImageDiv = document.getElementById('faceImageDiv');
        var faceImage = document.getElementById('faceImage');

        var clearResults = function() {
            resultDiv.innerHTML = "";
            successfulImageDiv.style.display = "none"
            documentImage1Div.style.display = "none"
            documentImage2Div.style.display = "none"
            faceImageDiv.style.display = "none"
            fullFrameImageDiv.style.display = "none"
        }
        clearResults();

        // to scan any machine readable travel document (passports, visa's and IDs with 
        // machine readable zone), use MrtdRecognizer
//        var mrtdRecognizer = new cordova.plugins.BlinkInput.MrtdRecognizer();
//        mrtdRecognizer.returnFullDocumentImage = true;
        // wrap recognizer with SuccessFrameGrabberRecognizer to obtain camera frame from the successful scan
//        var mrtdSuccessFrameGrabber = new cordova.plugins.BlinkInput.SuccessFrameGrabberRecognizer(mrtdRecognizer);

        // BlinkIdCombinedRecognizer automatically classifies different document types and scans the data from
        // the supported document
        var pdf417Recognizer = new cordova.plugins.BlinkInput.Pdf417Recognizer();

        // there are lots of Recognizer objects in BlinkID - check blinkIdScanner.js for full reference

        var barcodeOverlaySettings = new cordova.plugins.BlinkInput.BarcodeOverlaySettings();

        // create RecognizerCollection from any number of recognizers that should perform recognition
        var recognizerCollection = new cordova.plugins.BlinkInput.RecognizerCollection([pdf417Recognizer /*, mrtdSuccessFrameGrabber */]);

        // package name/bundleID com.microblink.blinkinput
        var licenseKeys = {
            android: 'sRwAAAAWY29tLm1pY3JvYmxpbmsuYmxpbmtpZJ9ew00uWSf86/uxZPDUA5Y7Oc3p1/52juQNMX4a9uDfl7RLEccLrXcY/Zrj+rc/SyYZ/Des28sW4gExbnaFe8Rh0gFnstoUgcjp86VwQU+fCNKS5LGpftSxwsKtT/Oii4misuR/9S6ZInJ1LtS+isF7lPJggms6y3aKcVICHIj8Dih0UetSfk58PPwn9+fa2OeJskBf1mwc8by81a/RUDliwa3COGQTcgNCgfETtJkc9XMMfY2WSBWO+FHvpFrbrQhZxonXwDqNnDCV1yUwLg==',
            ios: 'sRwAAAEZY29tLm1pY3JvYmxpbmsuYmxpbmtpbnB1dHVq5fFdatDkj+5NjxlcbVTCF8ByG+eZzf6bB/TjXxvqW86GpoqtAEJT9ydIgFzJnvOuZ4E8Q7pYWxLCH8zQUc3VTJ52chbbZk9L2SSxqUVYtg965MKoIeIqU71CGX3yZuYSJz6VrkFfdBldzSdmMO3xlrroxP5jLtxIHlXtXaTME44HbPyHKiTMGcvfWi0='
        };

        scanButton.addEventListener('click', function() {
            cordova.plugins.BlinkInput.scanWithCamera(
            
                // Register the callback handler
                function callback(cancelled) {

                    clearResults();

                    // handle cancelled scanning
                    if (cancelled) {
                        resultDiv.innerHTML = "Cancelled!";
                        return;
                    }
                    
                    // if not cancelled, every recognizer will have its result property updated

                    if (pdf417Recognizer.result.resultState == cordova.plugins.BlinkInput.RecognizerResultState.valid) {
                        var fieldDelim = "<br>";
                        var pdf417Result = pdf417Recognizer.result;

                        var resultString =
                            "Data: " + pdf417Result.stringData + fieldDelim;
                        // there are other fields to extract - check blinkIdScanner.js for full reference
                        resultDiv.innerHTML = resultString;
                    } else {
                        resultDiv.innerHTML = "Result is empty!";
                    }
                },
                
                // Register the error callback
                function errorHandler(err) {
                    alert('Error: ' + err);
                },
                barcodeOverlaySettings, recognizerCollection, licenseKeys
            );
        });

        var documentCaptureRecognizer = new cordova.plugins.BlinkInput.DocumentCaptureRecognizer();
        documentCaptureRecognizer.returnFullDocumentImage = true;
        var documentCaptureRecognizerWrapper = new cordova.plugins.BlinkInput.DocumentCaptureRecognizerWrapper(documentCaptureRecognizer);

        captureDocumentButton.addEventListener('click', function() {
            cordova.plugins.BlinkInput.captureDocument(

                // Register the callback handler
                function callback(cancelled) {

                    clearResults();

                    // handle cancelled scanning
                    if (cancelled) {
                        resultDiv.innerHTML = "Cancelled!";
                        return;
                    }

                    var capturedFullImage = documentCaptureRecognizerWrapper.capturedFullImage;
                    if (capturedFullImage) {
                        fullFrameImage.src = "data:image/jpg;base64, " + capturedFullImage;
                        fullFrameImageDiv.style.display = "initial";
                    }
                    if (documentCaptureRecognizer.result.resultState == cordova.plugins.BlinkInput.RecognizerResultState.valid) {
                        var resultDocumentFrontImage = documentCaptureRecognizer.result.fullDocumentImage;
                        if (resultDocumentFrontImage) {
                            documentImage1.src = "data:image/jpg;base64, " + resultDocumentFrontImage;
                            documentImage1Div.style.display = "initial";
                        }
                        resultDiv.innerHTML = "Document capture result";
                    } else {
                        resultDiv.innerHTML = "Result is empty!";
                    }
                },

                // Register the error callback
                function errorHandler(err) {
                    alert('Error: ' + err);
                },
                documentCaptureRecognizerWrapper, licenseKeys
            );
        });

        var fieldByFieldElement = new cordova.plugins.BlinkInput.FieldByFieldElement("Raw", new cordova.plugins.BlinkInput.RawParser(), "Raw Text", "Scan text");
        var fieldByFieldCollection = new cordova.plugins.BlinkInput.FieldByFieldCollection([fieldByFieldElement]);

        fieldByFieldButton.addEventListener('click', function() {
            cordova.plugins.BlinkInput.scanWithFieldByField(

                // Register the callback handler
                function callback(cancelled) {

                    clearResults();

                    // handle cancelled scanning
                    if (cancelled) {
                        resultDiv.innerHTML = "Cancelled!";
                        return;
                    }

                    for (var i = 0; i < fieldByFieldCollection.fieldByFieldElementArray.length; ++i ) {
                        var fieldDelim = "<br>";

                        var resultString =
                            "Identifier: " + fieldByFieldCollection.fieldByFieldElementArray[i].identifier + fieldDelim + "Value: " + fieldByFieldCollection.fieldByFieldElementArray[i].value;
                        // there are other fields to extract - check blinkIdScanner.js for full reference
                        resultDiv.innerHTML = resultString;
                    }
                },

                // Register the error callback
                function errorHandler(err) {
                    alert('Error: ' + err);
                },
                fieldByFieldCollection, licenseKeys
            );
        });

    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        console.log('Received Event: ' + id);
    }
};
