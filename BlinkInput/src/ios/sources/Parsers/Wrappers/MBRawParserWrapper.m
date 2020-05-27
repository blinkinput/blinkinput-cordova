#import "MBRawParserWrapper.h"
#import "MBSerializationUtils.h"
#import "MBBlinkInputSerializationUtils.h"

@implementation MBRawParserCreator

@synthesize jsonName = _jsonName;

-(instancetype) init {
    self = [super init];
    if (self) {
        _jsonName = @"RawParser";
    }
    return self;
}

-(MBParser *) createParser:(NSDictionary*) jsonParser {
    MBRawParser *parser = [[MBRawParser alloc] init];
    {
        id useSieve = [jsonParser valueForKey:@"useSieve"];
        if (useSieve != nil) {
            parser.useSieve = [(NSNumber *)useSieve boolValue];
        }
    }

    return parser;
}

@end

@interface MBRawParser (JsonSerialization)
@end

@implementation MBRawParser (JsonSerialization)

-(NSDictionary *) serializeResult {
    NSMutableDictionary* jsonResult = (NSMutableDictionary*)[super serializeResult];
    [jsonResult setValue:self.result.rawText forKey:@"rawText"];

    return jsonResult;
}

@end