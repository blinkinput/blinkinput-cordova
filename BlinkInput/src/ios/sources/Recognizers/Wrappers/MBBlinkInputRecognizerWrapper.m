#import "MBBlinkInputRecognizerWrapper.h"

#import "MBSerializationUtils.h"
#import "MBProcessorSerializers.h"

@implementation MBBlinkInputRecognizerCreator

@synthesize jsonName = _jsonName;

-(instancetype) init {
    self = [super init];
    if (self) {
        _jsonName = @"BlinkInputRecognizer";
    }
    return self;
}

-(MBRecognizer *) createRecognizer:(NSDictionary*) jsonRecognizer {

    NSArray *processorArray = [jsonRecognizer valueForKey:@"processors"];
    NSUInteger numProcessors = processorArray.count;

    NSMutableArray<MBProcessor*> *processors = [[NSMutableArray alloc] initWithCapacity:numProcessors];
    for (NSUInteger i = 0; i < numProcessors; ++i) {
        NSDictionary* processorJson = [processorArray objectAtIndex:i];
        [processors addObject:[[[MBProcessorSerializers sharedInstance] processorCreatorForJson:processorJson] createProcessor:processorArray[i]]];
    }
    
    MBBlinkInputRecognizer *recognizer = [[MBBlinkInputRecognizer alloc] initWithProcessors:processors];
    
    return recognizer;
}

@end

@interface MBBlinkInputRecognizer (JsonSerialization)
@end

@implementation MBBlinkInputRecognizer (JsonSerialization)

-(NSDictionary *) serializeResult {
    NSMutableDictionary* jsonResult = (NSMutableDictionary*)[super serializeResult];

    return jsonResult;
}

@end
