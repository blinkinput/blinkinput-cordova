#import "MBTopUpParserWrapper.h"
#import "MBSerializationUtils.h"
#import "MBBlinkInputSerializationUtils.h"

@implementation MBTopUpParserCreator

@synthesize jsonName = _jsonName;

-(instancetype) init {
    self = [super init];
    if (self) {
        _jsonName = @"TopUpParser";
    }
    return self;
}

-(MBParser *) createParser:(NSDictionary*) jsonParser {
    MBTopUpParser *parser = [[MBTopUpParser alloc] init];
    {
        id allowNoPrefix = [jsonParser valueForKey:@"allowNoPrefix"];
        if (allowNoPrefix != nil) {
            parser.allowNoPrefix = [(NSNumber *)allowNoPrefix boolValue];
        }
    }
    {
        id returnCodeWithoutPrefix = [jsonParser valueForKey:@"returnCodeWithoutPrefix"];
        if (returnCodeWithoutPrefix != nil) {
            parser.returnCodeWithoutPrefix = [(NSNumber *)returnCodeWithoutPrefix boolValue];
        }
    }

    return parser;
}

@end

@interface MBTopUpParser (JsonSerialization)
@end

@implementation MBTopUpParser (JsonSerialization)

-(NSDictionary *) serializeResult {
    NSMutableDictionary* jsonResult = (NSMutableDictionary*)[super serializeResult];
    [jsonResult setValue:self.result.topUp forKey:@"topUp"];

    return jsonResult;
}

@end