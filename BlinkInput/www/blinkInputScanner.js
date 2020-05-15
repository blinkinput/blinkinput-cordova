/**
 * cordova is available under *either* the terms of the modified BSD license *or* the
 * MIT License (2008). See http://opensource.org/licenses/alphabetical for full text.
 *
 * Copyright (c) Matt Kane 2010
 * Copyright (c) 2011, IBM Corporation
 */


var exec = require("cordova/exec");

/**
 * Constructor.
 *
 * @returns {BlinkInput}
 */
function BlinkInput() {

};

/**
 * successCallback: callback that will be invoked on successful scan
 * errorCallback: callback that will be invoked on error
 * overlaySettings: settings for desired camera overlay
 * recognizerCollection: {RecognizerCollection} containing recognizers to use for scanning
 * licenses: object containing:
 *               - base64 license keys for iOS and Android
 *               - optioanl parameter 'licensee' when license for multiple apps is used
 *               - optional flag 'showTimeLimitedLicenseKeyWarning' which indicates
 *                  whether warning for time limited license key will be shown, in format
 *  {
 *      ios: 'base64iOSLicense',
 *      android: 'base64AndroidLicense',
 *      licensee: String,
 *      showTimeLimitedLicenseKeyWarning: Boolean
 *  }
 */
BlinkInput.prototype.scanWithCamera = function (successCallback, errorCallback, overlaySettings, recognizerCollection, licenses) {
    if (errorCallback == null) {
        errorCallback = function () {
        };
    }

    if (typeof errorCallback != "function") {
        console.log("BlinkInputScanner.scanWithCamera failure: failure parameter not a function");
        throw new Error("BlinkInputScanner.scanWithCamera failure: failure parameter not a function");
        return;
    }

    if (typeof successCallback != "function") {
        console.log("BlinkInputScanner.scanWithCamera failure: success callback parameter must be a function");
        throw new Error("BlinkInputScanner.scanWithCamera failure: success callback parameter must be a function");
        return;
    }

    // first invalidate old results
    for (var i = 0; i < recognizerCollection.recognizerArray[i].length; ++i ) {
        recognizerCollection.recognizerArray[i].result = null;
    }

    exec(
        function internalCallback(scanningResult) { 
            var cancelled = scanningResult.cancelled;

            if (cancelled) {
                successCallback(true);
            } else {
                var results = scanningResult.resultList;
                if (results.length != recognizerCollection.recognizerArray.length) {
                    console.log("INTERNAL ERROR: native plugin returned wrong number of results!");
                    throw new Error("INTERNAL ERROR: native plugin returned wrong number of results!");
                    errorCallback(new Error("INTERNAL ERROR: native plugin returned wrong number of results!"));
                } else {
                    for (var i = 0; i < results.length; ++i) {
                        // native plugin must ensure types match
                        recognizerCollection.recognizerArray[i].result = recognizerCollection.recognizerArray[i].createResultFromNative(results[i]);
                    }
                    successCallback(false);
                }
            }    
        },
        errorCallback, 'BlinkInputScanner', 'scanWithCamera', [overlaySettings, recognizerCollection, licenses]);
};
/**
 * successCallback: callback that will be invoked on successful scan
 * errorCallback: callback that will be invoked on error
 * documentCaptureRecognizerWrapper: {DocumentCaptureRecognizerWrapper} wrapper arround DocumentCaptureRecognizer which also
 *                                   holds the capturedFullImage
 * licenses: object containing:
 *               - base64 license keys for iOS and Android
 *               - optioanl parameter 'licensee' when license for multiple apps is used
 *               - optional flag 'showTimeLimitedLicenseKeyWarning' which indicates
 *                  whether warning for time limited license key will be shown, in format
 *  {
 *      ios: 'base64iOSLicense',
 *      android: 'base64AndroidLicense',
 *      licensee: String,
 *      showTimeLimitedLicenseKeyWarning: Boolean
 *  }
 */
BlinkInput.prototype.captureDocument = function (successCallback, errorCallback, documentCaptureRecognizerWrapper, licenses) {
    if (errorCallback == null) {
        errorCallback = function () {
        };
    }

    if (typeof errorCallback != "function") {
        console.log("BlinkInputScanner.captureDocument failure: failure parameter not a function");
        throw new Error("BlinkInputScanner.captureDocument failure: failure parameter not a function");
        return;
    }

    if (typeof successCallback != "function") {
        console.log("BlinkInputScanner.captureDocument failure: success callback parameter must be a function");
        throw new Error("BlinkInputScanner.captureDocument failure: success callback parameter must be a function");
        return;
    }

    if (!(documentCaptureRecognizerWrapper instanceof DocumentCaptureRecognizerWrapper)) {
        console.log("BlinkInputScanner.captureDocument failure: documentCaptureRecognizerWrapper parameter must be instance of DocumentCaptureRecognizerWrapper");
        throw new Error("BlinkInputScanner.captureDocument failure: documentCaptureRecognizerWrapper parameter must be instance of DocumentCaptureRecognizerWrapper");
        return;
    }

    // first invalidate old results
    documentCaptureRecognizerWrapper.documentCaptureRecognizer.result = null;
    documentCaptureRecognizerWrapper.capturedFullImage = null;

    exec(
        function internalCallback(scanningResult) {
            var cancelled = scanningResult.cancelled;

            if (cancelled) {
                successCallback(true);
            } else {
                var results = scanningResult.resultList;
                if (results.length != 1) {
                    console.log("INTERNAL ERROR: native plugin returned wrong number of results!");
                    throw new Error("INTERNAL ERROR: native plugin returned wrong number of results!");
                    errorCallback(new Error("INTERNAL ERROR: native plugin returned wrong number of results!"));
                } else {
                    documentCaptureRecognizerWrapper.documentCaptureRecognizer.result
                        = documentCaptureRecognizerWrapper.documentCaptureRecognizer.createResultFromNative(results[0]);
                    documentCaptureRecognizerWrapper.capturedFullImage = scanningResult.capturedFullImage;
                    successCallback(false);
                }
            }
        },
        errorCallback, 'BlinkInputScanner', 'captureDocument', [documentCaptureRecognizerWrapper, licenses]);
};


/**
 * successCallback: callback that will be invoked on successful scan
 * errorCallback: callback that will be invoked on error
 * overlaySettings: settings for desired camera overlay
 * fieldByFieldCollection: {FieldByFieldCollection} containing field by field elements for BlinkInput 
 * licenses: object containing:
 *               - base64 license keys for iOS and Android
 *               - optioanl parameter 'licensee' when license for multiple apps is used
 *               - optional flag 'showTimeLimitedLicenseKeyWarning' which indicates
 *                  whether warning for time limited license key will be shown, in format
 *  {
 *      ios: 'base64iOSLicense',
 *      android: 'base64AndroidLicense',
 *      licensee: String,
 *      showTimeLimitedLicenseKeyWarning: Boolean
 *  }
 */
BlinkInput.prototype.scanWithFieldByField = function (successCallback, errorCallback, fieldByFieldCollection, licenses) {
    if (errorCallback == null) {
        errorCallback = function () {
        };
    }

    if (typeof errorCallback != "function") {
        console.log("BlinkInputScanner.scanWithCamera failure: failure parameter not a function");
        throw new Error("BlinkInputScanner.scanWithCamera failure: failure parameter not a function");
        return;
    }

    if (typeof successCallback != "function") {
        console.log("BlinkInputScanner.scanWithCamera failure: success callback parameter must be a function");
        throw new Error("BlinkInputScanner.scanWithCamera failure: success callback parameter must be a function");
        return;
    }

    // first invalidate old results
    for (var i = 0; i < fieldByFieldCollection.fieldByFieldElementArray[i].length; ++i ) {
        fieldByFieldCollection.fieldByFieldElementArray[i].identifier = null;
        fieldByFieldCollection.fieldByFieldElementArray[i].value = null;
        fieldByFieldCollection.fieldByFieldElementArray[i].parser = null;
    }

    exec(
        function internalCallback(scanningResult) { 
            var cancelled = scanningResult.cancelled;

            if (cancelled) {
                successCallback(true);
            } else {
                var results = scanningResult.resultList;
                if (results.length != fieldByFieldCollection.fieldByFieldElementArray.length) {
                    console.log("INTERNAL ERROR: native plugin returned wrong number of results!");
                    throw new Error("INTERNAL ERROR: native plugin returned wrong number of results!");
                    errorCallback(new Error("INTERNAL ERROR: native plugin returned wrong number of results!"));
                } else {
                    for (var i = 0; i < results.length; ++i) {
                        // native plugin must ensure types match
                        fieldByFieldCollection.fieldByFieldElementArray[i].identifier = results[i].identifier;
                        fieldByFieldCollection.fieldByFieldElementArray[i].value = results[i].value;
                    }
                    successCallback(false);
                }
            }    
        },
        errorCallback, 'BlinkInputScanner', 'scanWithFieldByField', [fieldByFieldCollection, licenses]);
};


/**
 * Base class for all parsers.
 * Parser is object that performs specific parsing
 * and updates its result with data extracted from the image.
 */
function Parser(parserType) {
    /** Type of recognizer */
    this.parserType = parserType;
    /** Recognizer's result */
    this.result = null;
    /** Defines/returns whether the parser configured with this parser settings object will be required or optional. */
    this.required = true;
}

/**
 * Possible states of the Parser's result
 */
var ParserResultState = Object.freeze(
    {
        /** Parser result is empty */
        empty : 1,
        /** Parser result contains some values, but is incomplete or it contains all values, but some are not uncertain */
        uncertain : 2,
        /** Parser resul contains all required values */
        valid : 3
    }
);

/**
 * Possible states of the Recognizer's result
 */
BlinkInput.prototype.ParserResultState = ParserResultState;

/**
 * Base class for all parser's result objects.
 * Parser result cparser result from image.
 */
function ParserResult(resultState) {
    /** State of the result. It is always one of the values represented by BlinkInputScanner.ParserResultState enum */
    this.resultState = resultState;
}

/**
 * Options used for OCR process. These options enable you to customize how some OCR parsers work.
 * For example, you can set character whitelists, character height, supported fonts etc.
 */
function BaseOcrEngineOptions() {
    /** Maximal chars expected on the image. Setting this value can speed up the OCR processing because all images with more chars than specified will be ignored */
    this.maxCharsExpected = 3000;
    /** Specifies if the additional image processing which drops the background colors should be performed. Use this if you have black text on color backgrounds. */
    this.colorDropoutEnabled = false;
}

BlinkInput.prototype.BaseOcrEngineOptions = BaseOcrEngineOptions;


/**
 * Result object for AmountParser.
 */
function AmountParserResult(nativeResult) {
    ParserResult.call(this, nativeResult.resultState);
    
    /** 
     * Returns the recognized amount number or empty string if recognition failed. 
     */
    this.amount = nativeResult.amount;
    
}

AmountParserResult.prototype = new ParserResult(ParserResultState.empty);

BlinkInput.prototype.AmountParserResult = AmountParserResult;

/**
 * AmountParser is used for extracting amount from OCR result
 */
function AmountParser() {
    Parser.call(this, 'AmountParser');
    
    /** 
     * Indicates whether amounts without decimal are accepted as valid. For example 1.465 is
     * accepted as valid amount, but 1465 is not, unless this is set to true.
     * Setting this to {@code true} can yield to more false positives
     * because any set of consequent digits can represent valid amount.
     * 
     *  
     */
    this.allowMissingDecimals = false;
    
    /** 
     * Indicates whether negative values are accepted as valid amounts.
     * Setting this to true can yield to more false positives.
     * 
     *  
     */
    this.allowNegativeAmounts = false;
    
    /** 
     * Indicates whether amounts with space separators between groups of digits(thousands) are allowed.
     * 
     *  
     */
    this.allowSpaceSeparators = false;
    
    /** 
     * Indicates whether Arabic-Indic mode is enabled. In Arabic-Indic mode parser can recognize
     * only amounts which consist of Arabic-Indic digits and decimal separator.
     * 
     *  
     */
    this.arabicIndicMode = false;
    
    this.createResultFromNative = function (nativeResult) { return new AmountParserResult(nativeResult); }

}

AmountParser.prototype = new Parser('AmountParser');

BlinkInput.prototype.AmountParser = AmountParser;

/**
 * Result object for DateParser.
 */
function DateParserResult(nativeResult) {
    ParserResult.call(this, nativeResult.resultState);
    
    /** 
     * Extracted date. 
     */
    this.date = nativeResult.date != null ? new Date(nativeResult.date) : null;
    
}

DateParserResult.prototype = new ParserResult(ParserResultState.empty);

BlinkInput.prototype.DateParserResult = DateParserResult;

/**
 * Available date formats for date parser. To activate parsing of dates with month names in
 * English, use formats which contain MONTH, e.g. DateFormatDDMONTHYYYY.
 * Month names in uppercase and short month names are supported (for example March and Mar).
 * typedef NS_ENUM(NSUInteger, DateFormat) {
 *     DateFormatDDMMYYYY = 0,
 *     DateFormatDDMMYY,
 *     DateFormatMMDDYYYY,
 *     DateFormatMMDDYY,
 *     DateFormatYYYYMMDD,
 *     DateFormatYYMMDD,
 *     DateFormatDDMONTHYYYY,
 *     DateFormatDDMONTHYY,
 *     DateFormatMONTHDDYYYY,
 *     DateFormatMONTHDDYY,
 *     DateFormatYYYYMONTHDD,
 *     DateFormatYYMONTHDD
 * };
 * 
 * typedef NSArray<NSNumber
 * > DateFormatArray;
 * typedef NSArray<NSString
 * > DateSeparatorCharsArray;
 * 
 * NS_ASSUME_falseNNULL_BEGIN
 * 
 * DateParser that can extract date from OCR result.
 */
function DateParser() {
    Parser.call(this, 'DateParser');
    
    this.createResultFromNative = function (nativeResult) { return new DateParserResult(nativeResult); }

}

DateParser.prototype = new Parser('DateParser');

BlinkInput.prototype.DateParser = DateParser;

/**
 * Result object for EmailParser.
 */
function EmailParserResult(nativeResult) {
    ParserResult.call(this, nativeResult.resultState);
    
    /** 
     * Returns the recognized email or empty string if recognition failed. 
     */
    this.email = nativeResult.email;
    
}

EmailParserResult.prototype = new ParserResult(ParserResultState.empty);

BlinkInput.prototype.EmailParserResult = EmailParserResult;

/**
 * EmailParser is used for parsing emails
 */
function EmailParser() {
    Parser.call(this, 'EmailParser');
    
    this.createResultFromNative = function (nativeResult) { return new EmailParserResult(nativeResult); }

}

EmailParser.prototype = new Parser('EmailParser');

BlinkInput.prototype.EmailParser = EmailParser;

/**
 * Result object for IbanParser.
 */
function IbanParserResult(nativeResult) {
    ParserResult.call(this, nativeResult.resultState);
    
    /** 
     * Returns the rparsed IBAN or empty string if recognition failed. 
     */
    this.iban = nativeResult.iban;
    
}

IbanParserResult.prototype = new ParserResult(ParserResultState.empty);

BlinkInput.prototype.IbanParserResult = IbanParserResult;

/**
 * AmountParser that can extract IBAN (International Bank Account Number) from OCR result.
 */
function IbanParser() {
    Parser.call(this, 'IbanParser');
    
    /** 
     * Should prefix (country code) always be returned.
     * 
     *  
     */
    this.alwaysReturnPrefix = false;
    
    this.createResultFromNative = function (nativeResult) { return new IbanParserResult(nativeResult); }

}

IbanParser.prototype = new Parser('IbanParser');

BlinkInput.prototype.IbanParser = IbanParser;

/**
 * Result object for LicensePlatesParser.
 */
function LicensePlatesParserResult(nativeResult) {
    ParserResult.call(this, nativeResult.resultState);
    
    /** 
     * Returns the recognized license plate number or empty string if recognition failed. 
     */
    this.licensePlate = nativeResult.licensePlate;
    
}

LicensePlatesParserResult.prototype = new ParserResult(ParserResultState.empty);

BlinkInput.prototype.LicensePlatesParserResult = LicensePlatesParserResult;

/**
 * LicensePlatesParser is used for parsing license plates
 */
function LicensePlatesParser() {
    Parser.call(this, 'LicensePlatesParser');
    
    this.createResultFromNative = function (nativeResult) { return new LicensePlatesParserResult(nativeResult); }

}

LicensePlatesParser.prototype = new Parser('LicensePlatesParser');

BlinkInput.prototype.LicensePlatesParser = LicensePlatesParser;

/**
 * Result object for RawParser.
 */
function RawParserResult(nativeResult) {
    ParserResult.call(this, nativeResult.resultState);
    
    /** 
     * Extracted date string. 
     */
    this.rawText = nativeResult.rawText;
    
}

RawParserResult.prototype = new ParserResult(ParserResultState.empty);

BlinkInput.prototype.RawParserResult = RawParserResult;

/**
 * RawParser that simply returns the string version of raw OCR result, without performing
 * any smart parsing operations.
 */
function RawParser() {
    Parser.call(this, 'RawParser');
    
    /** 
     * Enable the usage of algorithm for combining consecutive OCR results between video frames
     * for improving OCR quality. By default this is turned off.
     * Note: This option works together only with if instance of {@link com.microblink.entities.ocrengine.legacy.BlinkOCREngineOptions} is given
     * to {@link #setOcrEngineOptions(com.microblink.entities.ocrengine.AbstractOCREngineOptions)}. Otherwise, it will not be
     * enabled and {@link IllegalArgumentException} will be thrown.
     * 
     *  
     */
    this.useSieve = false;
    
    this.createResultFromNative = function (nativeResult) { return new RawParserResult(nativeResult); }

}

RawParser.prototype = new Parser('RawParser');

BlinkInput.prototype.RawParser = RawParser;

/**
 * Result object for TopUpParser.
 */
function TopUpParserResult(nativeResult) {
    ParserResult.call(this, nativeResult.resultState);
    
    /** 
     * Returns the recognized Top Up number or empty string if recognition failed. 
     */
    this.topUp = nativeResult.topUp;
    
}

TopUpParserResult.prototype = new ParserResult(ParserResultState.empty);

BlinkInput.prototype.TopUpParserResult = TopUpParserResult;

/**
 * Enumeration of posibble top up presets
 * typedef NS_ENUM(NSUInteger, TopUpPreset) {
 *     
 *     /
 * 
 * For top ups which begin with <b>
 * 123
 * </b> prefix and USSD code length is <b>14</b>
 *     TopUp123,
 *     
 *     /
 * 
 * For top ups which begin with <b>
 * 103
 * </b> and USSD code length is <b>14</b>
 *     TopUp103,
 *     
 *     /
 * 
 * For top ups which begin with <b>
 * 131
 * </b> and USSD code length is <b>13</b>
 *     TopUp131,
 *     
 *     /
 * 
 * For top ups with any prefix and USSD code length from interval {[13, 16]}
 *     TopUpGeneric,
 *     
 * };
 * 
 * NS_ASSUME_falseNNULL_BEGIN
 * 
 * TopUpParser is used for parsing Top Up numbers
 */
function TopUpParser() {
    Parser.call(this, 'TopUpParser');
    
    /** 
     * Indicates whether USSD codes without prefix are allowed.
     * 
     *  
     */
    this.allowNoPrefix = false;
    
    /** 
     * Indicates whether digts prefix and # at the end of scanned USSD code will
     * be returned.
     * 
     *  
     */
    this.returnCodeWithoutPrefix = false;
    
    this.createResultFromNative = function (nativeResult) { return new TopUpParserResult(nativeResult); }

}

TopUpParser.prototype = new Parser('TopUpParser');

BlinkInput.prototype.TopUpParser = TopUpParser;

/**
 * Result object for VinParser.
 */
function VinParserResult(nativeResult) {
    ParserResult.call(this, nativeResult.resultState);
    
    /** 
     * Returns the recognized VIN number or empty string if recognition failed. 
     */
    this.vin = nativeResult.vin;
    
}

VinParserResult.prototype = new ParserResult(ParserResultState.empty);

BlinkInput.prototype.VinParserResult = VinParserResult;

/**
 * VinParser is used for parsing VIN numbers
 */
function VinParser() {
    Parser.call(this, 'VinParser');
    
    this.createResultFromNative = function (nativeResult) { return new VinParserResult(nativeResult); }

}

VinParser.prototype = new Parser('VinParser');

BlinkInput.prototype.VinParser = VinParser;


/**
 * Base class for all processors.
 * Processor is object that performs specific parsing
 * and updates its result with data extracted from the image.
 */
function Processor(processorType) {
    /** Type of recognizer */
    this.processorType = processorType;
    /** Recognizer's result */
    this.result = null;
}

/**
 * Possible states of the Processors's result
 */
var ProcessorResultState = Object.freeze(
    {
        /** Processors result is empty */
        empty : 1,
        /** Processors result contains some values, but is incomplete or it contains all values, but some are not uncertain */
        uncertain : 2,
        /** Processors resul contains all required values */
        valid : 3
    }
);

/**
 * Possible states of the Recognizer's result
 */
BlinkInput.prototype.ProcessorResultState = ProcessorResultState;

/**
 * Base class for all processors's result objects.
 * Processor result processors result from image.
 */
function ProcessorResult(resultState) {
    /** State of the result. It is always one of the values represented by BlinkInputScanner.ProcessorResultState enum */
    this.resultState = resultState;
}


/**
 * Result object for ImageReturnProcessor.
 */
function ImageReturnProcessorResult(nativeResult) {
    ProcessorResult.call(this, nativeResult.resultState);
    
    /** 
     * Returns the raw image saved by the processor. If no image was saved by processor, returns null.
     * falseTE: Internal buffers of the returned image are valid as long as Result object (this) is alive. 
     */
    this.rawImage = nativeResult.rawImage;
    
}

ImageReturnProcessorResult.prototype = new ProcessorResult(ProcessorResultState.empty);

BlinkInput.prototype.ImageReturnProcessorResult = ImageReturnProcessorResult;

/**
 * Processor that will simply save given image.
 */
function ImageReturnProcessor() {
    Processor.call(this, 'ImageReturnProcessor');
    
    this.createResultFromNative = function (nativeResult) { return new ImageReturnProcessorResult(nativeResult); }

}

ImageReturnProcessor.prototype = new Processor('ImageReturnProcessor');

BlinkInput.prototype.ImageReturnProcessor = ImageReturnProcessor;


/**
 * Result object for ParserGroupProcessorResult.
 */
function ParserGroupProcessorResult(nativeResult) {
    ProcessorResult.call(this, nativeResult.resultState);
}

ParserGroupProcessorResult.prototype = new ProcessorResult(ProcessorResultState.empty);

BlinkInput.prototype.ParserGroupProcessorResult = ParserGroupProcessorResult;

/**
 * ParserGroupProcessor can can have any number of parsers
 * frame on which the other recognizer finished recognition.
 */
function ParserGroupProcessor(parsers) {
    Processor.call(this, 'ParserGroupProcessor');
    /** Array of parsers */
    this.parsers = parsers;

    if (!(this.parsers.constructor === Array)) {
        throw new Error("parsers must be array of Parser objects!");
    }
    // ensure every element in array is Recognizer
    for (var i = 0; i < this.parsers.length; ++i) {
        if (!(this.parsers[i] instanceof Parser )) {
            throw new Error( "Each element in parsers must be instance of Parser" );
        }
    }

    this.createResultFromNative = (function (nativeResult) { 
        return new ParserGroupProcessorResult(nativeResult) 
    }).bind(this);
}

ParserGroupProcessor.prototype = new Processor('ParserGroupProcessor');

BlinkInput.prototype.ParserGroupProcessor = ParserGroupProcessor;

/**
 * Result object for RegexParser.
 */
function RegexParserResult(nativeResult) {
    ParserResult.call(this, nativeResult.resultState);
    
    /** 
     * Returns string containing parsed OCR result according to given regular expression. 
     */
    this.parsedString = nativeResult.parsedString;
    
}

RegexParserResult.prototype = new ParserResult(ParserResultState.empty);

BlinkInput.prototype.RegexParserResult = RegexParserResult;

/**
 * Represents a parser which parses OCR result according to given regular expression.
 * Regular expression parsing is not performed with java's regex engine. Instead, it is performed
 * with custom regular expression engine which can work with multiple char recognition alternatives
 * (if enabled in BaseOcrEngineOptions). Due to differences between parsing normal strings
 * and OCR results, this parser does not support some regex features found in java's regex engine,
 * like back references.
 */
function RegexParser(regex) {
    Parser.call(this, 'RegexParser');
    
    /** 
     * If set to true, regex will not be matched if there is no whitespace after matched string.
     * Whitespace is not returned in parsed result.
     * 
     *  
     */
    this.endWithWhitespace = false;
    
    /** 
     * Sets the OCR engine options used in Regex OCR parser.
     * Returns the OCR engine options used in Regex OCR parser.
     * 
     *  
     */
    this.ocrEngineOptions = new BaseOcrEngineOptions();
    
    /** 
     * Defines regex that will be used to parse OCR data. Note that not all java regex features
     * are available, such as back references and '^' and '$' meta-character. '.' meta-character
     * that represents any character and '^' inside brackets representing all characters except those
     * in brackets are available only if alphabet is defined. 
     */
    this.regex = regex;
    
    /** 
     * If set to true, regex will not be matched if there is no whitespace before matched string.
     * Whitespace is not returned in parsed result.
     * 
     *  
     */
    this.startWithWhitespace = false;
    
    /** 
     * Enable the usage of algorithm for combining consecutive OCR results between video frames
     * for improving OCR quality. By default this is turned off.
     * Note: This option works together only with if instance of {@link com.microblink.entities.ocrengine.legacy.BlinkOCREngineOptions} is given
     * to {@link #setOcrEngineOptions(com.microblink.entities.ocrengine.AbstractOCREngineOptions)}. Otherwise, it will not be
     * enabled and {@link IllegalArgumentException} will be thrown.
     * 
     *  
     */
    this.useSieve = false;
    
    this.createResultFromNative = function (nativeResult) { return new RegexParserResult(nativeResult); }

}

RegexParser.prototype = new Parser('RegexParser');

BlinkInput.prototype.RegexParser = RegexParser;

/**
 * Represents a collection of scane elements
 */
function FieldByFieldCollection(fieldByFieldElementArray) {
    /**
     * 
     * @param fieldByFieldElementArray Array of field by field elements objects that will be used for recognition. Must not be empty!
     */
    /** Array of recognizer objects that will be used for recognition */
    this.fieldByFieldElementArray = fieldByFieldElementArray;

    if (!(this.fieldByFieldElementArray instanceof Array)) {
        throw new Error("recognizerArray must be array of Recognizer objects!");
    }
    // ensure every element in array is Recognizer
    for (var i = 0; i < this.fieldByFieldElementArray.length; ++i) {
        if (!(this.fieldByFieldElementArray[i] instanceof FieldByFieldElement )) {
                throw new Error( "Each element in fieldByFieldElementArray must be instance of FieldByFieldElement" );
        }
    }
}

BlinkInput.prototype.FieldByFieldCollection = FieldByFieldCollection;

function FieldByFieldElement(identifier, parser, localizedTitle, localizedTooltip) {
    /**
     * Unique name of the element
     */
    this.identifier = identifier;

    /**
     Parser object which is reponsible scanning the text.
    */
    this.parser = parser;

    /**
     Value of parser object after scanning.
    */
   this.value = null;
    
    /**
     * Localized title (used in the Pivot control)
     */
    this.localizedTitle = localizedTitle;

    /**
     * Localized tooltip (used in the tooltip label above the viewfinder)
     */
    this.localizedTooltip = localizedTooltip;

    if (!(this.parser instanceof Parser)) {
        throw new Error("Parser must be instance of Parser!");
    }
}

BlinkInput.prototype.FieldByFieldElement = FieldByFieldElement;



// COMMON CLASSES

/**
 * Base class for all recognizers.
 * Recognizer is object that performs recognition of image
 * and updates its result with data extracted from the image.
 */
function Recognizer(recognizerType) {
    /** Type of recognizer */
    this.recognizerType = recognizerType;
    /** Recognizer's result */
    this.result = null;
}

/**
 * Possible states of the Recognizer's result
 */
var RecognizerResultState = Object.freeze(
    {
        /** Recognizer result is empty */
        empty : 1,
        /** Recognizer result contains some values, but is incomplete or it contains all values, but some are not uncertain */
        uncertain : 2,
        /** Recognizer resul contains all required values */
        valid : 3
    }
);

/**
 * Possible states of the Recognizer's result
 */
BlinkInput.prototype.RecognizerResultState = RecognizerResultState;

/**
 * Base class for all recognizer's result objects.
 * Recoginzer result contains data extracted from the image.
 */
function RecognizerResult(resultState) {
    /** State of the result. It is always one of the values represented by BlinkInputScanner.RecognizerResultState enum */
    this.resultState = resultState;
}

/**
 * Represents a collection of recognizer objects.
 * @param recognizerArray Array of recognizer objects that will be used for recognition. Must not be empty!
 */
function RecognizerCollection(recognizerArray) {
    /** Array of recognizer objects that will be used for recognition */
    this.recognizerArray = recognizerArray;
    /** 
     * Whether or not it is allowed for multiple recognizers to process the same image.
     * If not, then first recognizer that will be successful in processing the image will
     * end the processing chain and other recognizers will not get the chance to process 
     * that image.
     */
    this.allowMultipleResults = false;
    /** Number of miliseconds after first non-empty result becomes available to end scanning with a timeout */
    this.milisecondsBeforeTimeout = 10000;

    if (!(this.recognizerArray.constructor === Array)) {
        throw new Error("recognizerArray must be array of Recognizer objects!");
    }
    // ensure every element in array is Recognizer
    for (var i = 0; i < this.recognizerArray.length; ++i) {
        if (!(this.recognizerArray[i] instanceof Recognizer )) {
            throw new Error( "Each element in recognizerArray must be instance of Recognizer" );
        }
    }
}

BlinkInput.prototype.RecognizerCollection = RecognizerCollection;

/**
 * Represents a date extracted from image.
 */
function Date(nativeDate) {
    /** day in month */
    this.day = nativeDate.day;
    /** month in year */
    this.month = nativeDate.month;
    /** year */
    this.year = nativeDate.year;
}

BlinkInput.prototype.Date = Date;

/**
 * Represents a point in image
 */
function Point(nativePoint) {
    /** x coordinate of the point */
    this.x = nativePoint.x;
    /** y coordinate of the point */
    this.y = nativePoint.y;
}

BlinkInput.prototype.Point = Point;

/**
 * Represents a quadrilateral location in the image
 */
function Quadrilateral(nativeQuad) {
    /** upper left point of the quadrilateral */
    this.upperLeft = new Point(nativeQuad.upperLeft);
    /** upper right point of the quadrilateral */
    this.upperRight = new Point(nativeQuad.upperRight);
    /** lower left point of the quadrilateral */
    this.lowerLeft = new Point(nativeQuad.lowerLeft);
    /** lower right point of the quadrilateral */
    this.lowerRight = new Point(nativeQuad.lowerRight);
}

BlinkInput.prototype.Quadrilateral = Quadrilateral;
/**
 * Represents the type of scanned barcode
 */
BlinkInput.prototype.BarcodeType = Object.freeze(
    {
        /** No barcode was scanned */
        None: 1,
        /** QR code was scanned */
        QRCode: 2,
        /** Data Matrix 2D barcode was scanned */
        DataMatrix: 3,
        /** UPC E barcode was scanned */
        UPCE: 4,
        /** UPC A barcode was scanned */
        UPCA: 5,
        /** EAN 8 barcode was scanned */
        EAN8: 6,
        /** EAN 13 barcode was scanned */
        EAN13: 7,
        /** Code 128 barcode was scanned */
        Code128: 8,
        /** Code 39 barcode was scanned */
        Code39: 9,
        /** ITF barcode was scanned */
        ITF: 10,
        /** Aztec 2D barcode was scanned */
        Aztec: 11,
        /** PDF417 2D barcode was scanned */
        PDF417: 12
    }
);

/**
 * Extension factors relative to corresponding dimension of the full image. For example,
 * upFactor and downFactor define extensions relative to image height, e.g.
 * when upFactor is 0.5, upper image boundary will be extended for half of image's full
 * height.
 */
function ImageExtensionFactors() {
    /** image extension factor relative to full image height in UP direction. */
    this.upFactor = 0.0;
    /** image extension factor relative to full image height in RIGHT direction. */
    this.rightFactor = 0.0;
    /** image extension factor relative to full image height in DOWN direction. */
    this.downFactor = 0.0;
    /** image extension factor relative to full image height in LEFT direction. */
    this.leftFactor = 0.0;
}

BlinkInput.prototype.ImageExtensionFactors = ImageExtensionFactors;

// COMMON CLASSES

// OVERLAY SETTINGS

/** Base class for all overlay settings objects */
function OverlaySettings(overlaySettingsType) {
    /** type of the overlay settings object */
    this.overlaySettingsType = overlaySettingsType;
}
/** 
 * Class for setting up barcode overlay.
 * Barcode overlay is best suited for recognizers that perform barcode scanning.
 */
function BarcodeOverlaySettings() {
    OverlaySettings.call(this, 'BarcodeOverlaySettings');
}

BarcodeOverlaySettings.prototype = new OverlaySettings();

BlinkInput.prototype.BarcodeOverlaySettings = BarcodeOverlaySettings;
// OVERLAY SETTINGS

// RECOGNIZERS
/**
 * Result object for SuccessFrameGrabberRecognizer.
 */
function SuccessFrameGrabberRecognizerResult(nativeResult) {
    RecognizerResult.call(this, nativeResult.resultState);
    /** Camera frame at the time slave recognizer finished recognition */
    this.successFrame = nativeResult.successFrame;
}

SuccessFrameGrabberRecognizerResult.prototype = new RecognizerResult(RecognizerResultState.empty);

BlinkInput.prototype.SuccessFrameGrabberRecognizerResult = SuccessFrameGrabberRecognizerResult;

/**
 * SuccessFrameGrabberRecognizer can wrap any other recognizer and obtain camera
 * frame on which the other recognizer finished recognition.
 */
function SuccessFrameGrabberRecognizer(slaveRecognizer) {
    Recognizer.call(this, 'SuccessFrameGrabberRecognizer');
    /** Slave recognizer that SuccessFrameGrabberRecognizer will watch */
    this.slaveRecognizer = slaveRecognizer;

    if (!this.slaveRecognizer instanceof Recognizer) {
        throw new Error("Slave recognizer must be Recognizer!");
    }

    this.createResultFromNative = (function (nativeResult) { 
        this.slaveRecognizer.result = this.slaveRecognizer.createResultFromNative(nativeResult.slaveRecognizerResult);
        return new SuccessFrameGrabberRecognizerResult(nativeResult) 
    }).bind(this);
}

SuccessFrameGrabberRecognizer.prototype = new Recognizer('SuccessFrameGrabberRecognizer');

BlinkInput.prototype.SuccessFrameGrabberRecognizer = SuccessFrameGrabberRecognizer;


/**
 * Result object for BarcodeRecognizer.
 */
function BarcodeRecognizerResult(nativeResult) {
    RecognizerResult.call(this, nativeResult.resultState);
    
    /** 
     * Type of the barcode scanned
     * 
     *  @return Type of the barcode 
     */
    this.barcodeType = nativeResult.barcodeType;
    
    /** 
     * Byte array with result of the scan 
     */
    this.rawData = nativeResult.rawData;
    
    /** 
     * Retrieves string content of scanned data 
     */
    this.stringData = nativeResult.stringData;
    
    /** 
     * Flag indicating uncertain scanning data
     * E.g obtained from damaged barcode. 
     */
    this.uncertain = nativeResult.uncertain;
    
}

BarcodeRecognizerResult.prototype = new RecognizerResult(RecognizerResultState.empty);

BlinkInput.prototype.BarcodeRecognizerResult = BarcodeRecognizerResult;

/**
 * BarcodeRecognizer is used for scanning most of 1D barcode formats, and 2D format
 * such as Aztec, DataMatrix and QR code
 */
function BarcodeRecognizer() {
    Recognizer.call(this, 'BarcodeRecognizer');
    
    /** 
     * Allow enabling the autodetection of image scale when scanning barcodes.
     * If set to true, prior reading barcode, image scale will be
     * corrected. This enabled correct reading of barcodes on high
     * resolution images but slows down the recognition process.
     * 
     * falseTE: This setting is applied only for Code39 and Code128 barcode scanning.
     * 
     *  
     */
    this.autoScaleDetection = true;
    
    /** 
     * Set this to true to scan barcodes which don't have quiet zone (white area) around it
     * 
     * Use only if necessary because it slows down the recognition process
     * 
     *  
     */
    this.nullQuietZoneAllowed = false;
    
    /** 
     * Enable reading code39 barcode contents as extended data. For more information about code39
     * extended data (a.k.a. full ASCII mode), see https://en.wikipedia.org/wiki/Code_39#Full_ASCII_Code_39
     * 
     *  
     */
    this.readCode39AsExtendedData = false;
    
    /** 
     * Set this to true to scan Aztec 2D barcodes
     * 
     *  
     */
    this.scanAztecCode = false;
    
    /** 
     * Set this to true to scan Code 128 1D barcodes
     * 
     *  
     */
    this.scanCode128 = false;
    
    /** 
     * Set this to true to scan Code 39 1D barcodes
     * 
     *  
     */
    this.scanCode39 = false;
    
    /** 
     * Set this to true to scan DataMatrix 2D barcodes
     * 
     *  
     */
    this.scanDataMatrix = false;
    
    /** 
     * Set this to true to scan EAN 13 barcodes
     * 
     *  
     */
    this.scanEan13 = false;
    
    /** 
     * Set this to true to scan EAN8 barcodes
     * 
     *  
     */
    this.scanEan8 = false;
    
    /** 
     * Set this to true to allow scanning barcodes with inverted intensities
     * (i.e. white barcodes on black background)
     * 
     * falseTE: this options doubles the frame processing time
     * 
     *  
     */
    this.scanInverse = false;
    
    /** 
     * Set this to true to scan ITF barcodes
     * 
     *  
     */
    this.scanItf = false;
    
    /** 
     * Set this to true to scan Pdf417 barcodes
     * 
     *  
     */
    this.scanPdf417 = false;
    
    /** 
     * Set this to true to scan QR barcodes
     * 
     *  
     */
    this.scanQrCode = false;
    
    /** 
     * Set this to true to scan even barcode not compliant with standards
     * For example, malformed PDF417 barcodes which were incorrectly encoded
     * 
     * Use only if necessary because it slows down the recognition process
     * 
     *  
     */
    this.scanUncertain = true;
    
    /** 
     * Set this to true to scan UPCA barcodes
     * 
     *  
     */
    this.scanUpca = false;
    
    /** 
     * Set this to true to scan UPCE barcodes
     * 
     *  
     */
    this.scanUpce = false;
    
    /** 
     * Set this to true to allow slower, but better image processing.
     * 
     *  
     */
    this.slowerThoroughScan = true;
    
    this.createResultFromNative = function (nativeResult) { return new BarcodeRecognizerResult(nativeResult); }

}

BarcodeRecognizer.prototype = new Recognizer('BarcodeRecognizer');

BlinkInput.prototype.BarcodeRecognizer = BarcodeRecognizer;

/**
 * Result object for DocumentCaptureRecognizer.
 */
function DocumentCaptureRecognizerResult(nativeResult) {
    RecognizerResult.call(this, nativeResult.resultState);
    
    /** 
     * Quadrangle represeting corner points of location of the captured document 
     */
    this.detectionLocation = nativeResult.detectionLocation != null ? new Quadrilateral(nativeResult.detectionLocation) : null;
    
    /** 
     * full document image if enabled with returnFullDocumentImage property. 
     */
    this.fullDocumentImage = nativeResult.fullDocumentImage;
    
}

DocumentCaptureRecognizerResult.prototype = new RecognizerResult(RecognizerResultState.empty);

BlinkInput.prototype.DocumentCaptureRecognizerResult = DocumentCaptureRecognizerResult;

/**
 * A recognizer for DocumentCaptureRecognizer
 */
function DocumentCaptureRecognizer() {
    Recognizer.call(this, 'DocumentCaptureRecognizer');
    
    /** 
     * Image extension factors for full document image.
     * 
     * @see ImageExtensionFactors
     *  
     */
    this.fullDocumentImageExtensionFactors = new ImageExtensionFactors();
    
    /** 
     * Defines minimum document scale calculated as ratio of minimal document dimension and minimal dimension of the input image.
     * 
     *  
     */
    this.minDocumentScale = 0.5;
    
    /** 
     * Defines how many times the same document should be detected before the detector
     * returns this document as a result of the deteciton
     * 
     * Higher number means more reliable detection, but slower processing
     * 
     *  
     */
    this.numStableDetectionsThreshold = 3;
    
    /** 
     * Sets whether full document image of ID card should be extracted.
     * 
     *  
     */
    this.returnFullDocumentImage = false;
    
    this.createResultFromNative = function (nativeResult) { return new DocumentCaptureRecognizerResult(nativeResult); }

}

DocumentCaptureRecognizer.prototype = new Recognizer('DocumentCaptureRecognizer');

BlinkInput.prototype.DocumentCaptureRecognizer = DocumentCaptureRecognizer;

/**
 * Result object for Pdf417Recognizer.
 */
function Pdf417RecognizerResult(nativeResult) {
    RecognizerResult.call(this, nativeResult.resultState);
    
    /** 
     * Type of the barcode scanned
     * 
     *  @return Type of the barcode 
     */
    this.barcodeType = nativeResult.barcodeType;
    
    /** 
     * Byte array with result of the scan 
     */
    this.rawData = nativeResult.rawData;
    
    /** 
     * Retrieves string content of scanned data 
     */
    this.stringData = nativeResult.stringData;
    
    /** 
     * Flag indicating uncertain scanning data
     * E.g obtained from damaged barcode. 
     */
    this.uncertain = nativeResult.uncertain;
    
}

Pdf417RecognizerResult.prototype = new RecognizerResult(RecognizerResultState.empty);

BlinkInput.prototype.Pdf417RecognizerResult = Pdf417RecognizerResult;

/**
 * A recognizer that can scan PDF417 2D barcodes.
 */
function Pdf417Recognizer() {
    Recognizer.call(this, 'Pdf417Recognizer');
    
    /** 
     * Set this to true to scan barcodes which don't have quiet zone (white area) around it
     * 
     * Use only if necessary because it slows down the recognition process
     * 
     *  
     */
    this.nullQuietZoneAllowed = false;
    
    /** 
     * Set this to true to allow scanning barcodes with inverted intensities
     * (i.e. white barcodes on black background)
     * 
     * falseTE: this options doubles the frame processing time
     * 
     *  
     */
    this.scanInverse = false;
    
    /** 
     * Set this to true to scan even barcode not compliant with standards
     * For example, malformed PDF417 barcodes which were incorrectly encoded
     * 
     * Use only if necessary because it slows down the recognition process
     * 
     *  
     */
    this.scanUncertain = true;
    
    this.createResultFromNative = function (nativeResult) { return new Pdf417RecognizerResult(nativeResult); }

}

Pdf417Recognizer.prototype = new Recognizer('Pdf417Recognizer');

BlinkInput.prototype.Pdf417Recognizer = Pdf417Recognizer;

/**
 * Result object for SimNumberRecognizer.
 */
function SimNumberRecognizerResult(nativeResult) {
    RecognizerResult.call(this, nativeResult.resultState);
    
    /** 
     * Returns the recognized SIM number from barcode or empty string if recognition failed. 
     */
    this.simNumber = nativeResult.simNumber;
    
}

SimNumberRecognizerResult.prototype = new RecognizerResult(RecognizerResultState.empty);

BlinkInput.prototype.SimNumberRecognizerResult = SimNumberRecognizerResult;

/**
 * Recognizer that can perform recognition of barcodes on SIM packaging.
 */
function SimNumberRecognizer() {
    Recognizer.call(this, 'SimNumberRecognizer');
    
    this.createResultFromNative = function (nativeResult) { return new SimNumberRecognizerResult(nativeResult); }

}

SimNumberRecognizer.prototype = new Recognizer('SimNumberRecognizer');

BlinkInput.prototype.SimNumberRecognizer = SimNumberRecognizer;

function DocumentCaptureRecognizerWrapper(documentCaptureRecognizer) {
    this.documentCaptureRecognizer = documentCaptureRecognizer;
    this.capturedFullImage = null;
}

BlinkInput.prototype.DocumentCaptureRecognizerWrapper = DocumentCaptureRecognizerWrapper;

/**
 * Result object for BlinkInputRecognierResult.
 */
function BlinkInputRecognizerResult(nativeResult) {
    RecognizerResult.call(this, nativeResult.resultState);
}

BlinkInputRecognizerResult.prototype = new RecognizerResult(RecognizerResultState.empty);

BlinkInput.prototype.BlinkInputRecognizerResult = BlinkInputRecognizerResult;

/**
 * BlinkInputRecognizerResult can can have any number of processors
 * frame on which the other recognizer finished recognition.
 */
function BlinkInputRecognizer(processors) {
    Recognizer.call(this, 'BlinkInputRecognizer');
    /** Array of processors */
    this.processors = processors;

    if (!(this.processors.constructor === Array)) {
        throw new Error("parsers must be array of Parser objects!");
    }
    // ensure every element in array is Recognizer
    for (var i = 0; i < this.processors.length; ++i) {
        if (!(this.processors[i] instanceof Processor )) {
            throw new Error( "Each element in processors must be instance of Processor" );
        }
    }

    this.createResultFromNative = (function (nativeResult) { 
        return new BlinkInputRecognizerResult(nativeResult) 
    }).bind(this);
}

BlinkInputRecognizer.prototype = new Recognizer('BlinkInputRecognizer');

BlinkInput.prototype.BlinkInputRecognizer = BlinkInputRecognizer;
// RECOGNIZERS

// export BlinkInputScanner
module.exports = new BlinkInput();