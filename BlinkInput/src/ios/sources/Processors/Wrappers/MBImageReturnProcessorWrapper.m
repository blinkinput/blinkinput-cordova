#import "MBImageReturnProcessorWrapper.h"
#import "MBSerializationUtils.h"
#import "MBBlinkInputSerializationUtils.h"

@implementation MBImageReturnProcessorCreator

@synthesize jsonName = _jsonName;

-(instancetype) init {
    self = [super init];
    if (self) {
        _jsonName = @"ImageReturnProcessor";
    }
    return self;
}

-(MBProcessor *) createProcessor:(NSDictionary*) jsonProcessor {
    MBImageReturnProcessor *processor = [[MBImageReturnProcessor alloc] init];

    return processor;
}

@end

@interface MBImageReturnProcessor (JsonSerialization)
@end

@implementation MBImageReturnProcessor (JsonSerialization)

-(NSDictionary *) serializeResult {
    NSMutableDictionary* jsonResult = (NSMutableDictionary*)[super serializeResult];
    [jsonResult setValue:[MBSerializationUtils encodeMBImage:self.result.rawImage] forKey:@"rawImage"];

    return jsonResult;
}

@end