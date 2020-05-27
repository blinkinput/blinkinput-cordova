#import "MBDocumentCaptureRecognizerWrapper.h"
#import "MBSerializationUtils.h"
#import "MBCommonSerializationUtils.h"

@implementation MBDocumentCaptureRecognizerCreator

@synthesize jsonName = _jsonName;

-(instancetype) init {
    self = [super init];
    if (self) {
        _jsonName = @"DocumentCaptureRecognizer";
    }
    return self;
}

-(MBRecognizer *) createRecognizer:(NSDictionary*) jsonRecognizer {
    MBDocumentCaptureRecognizer *recognizer = [[MBDocumentCaptureRecognizer alloc] init];
    {
        id fullDocumentImageExtensionFactors = [jsonRecognizer valueForKey:@"fullDocumentImageExtensionFactors"];
        if (fullDocumentImageExtensionFactors != nil) {
            recognizer.fullDocumentImageExtensionFactors = [MBCommonSerializationUtils deserializeMBImageExtensionFactors:(NSDictionary*)fullDocumentImageExtensionFactors];
        }
    }
    {
        id minDocumentScale = [jsonRecognizer valueForKey:@"minDocumentScale"];
        if (minDocumentScale != nil) {
            recognizer.minDocumentScale = [(NSNumber *)minDocumentScale floatValue];
        }
    }
    {
        id numStableDetectionsThreshold = [jsonRecognizer valueForKey:@"numStableDetectionsThreshold"];
        if (numStableDetectionsThreshold != nil) {
            recognizer.numStableDetectionsThreshold = [(NSNumber *)numStableDetectionsThreshold unsignedIntegerValue];
        }
    }
    {
        id returnFullDocumentImage = [jsonRecognizer valueForKey:@"returnFullDocumentImage"];
        if (returnFullDocumentImage != nil) {
            recognizer.returnFullDocumentImage = [(NSNumber *)returnFullDocumentImage boolValue];
        }
    }

    return recognizer;
}

@end

@interface MBDocumentCaptureRecognizer (JsonSerialization)
@end

@implementation MBDocumentCaptureRecognizer (JsonSerialization)

-(NSDictionary *) serializeResult {
    NSMutableDictionary* jsonResult = (NSMutableDictionary*)[super serializeResult];
    [jsonResult setValue:[MBSerializationUtils serializeMBQuadrangle:self.result.detectionLocation] forKey:@"detectionLocation"];
    [jsonResult setValue:[MBSerializationUtils encodeMBImage:self.result.fullDocumentImage] forKey:@"fullDocumentImage"];

    return jsonResult;
}

@end