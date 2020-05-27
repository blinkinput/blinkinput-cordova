#import "MBVinParserWrapper.h"
#import "MBSerializationUtils.h"
#import "MBBlinkInputSerializationUtils.h"

@implementation MBVinParserCreator

@synthesize jsonName = _jsonName;

-(instancetype) init {
    self = [super init];
    if (self) {
        _jsonName = @"VinParser";
    }
    return self;
}

-(MBParser *) createParser:(NSDictionary*) jsonParser {
    MBVinParser *parser = [[MBVinParser alloc] init];

    return parser;
}

@end

@interface MBVinParser (JsonSerialization)
@end

@implementation MBVinParser (JsonSerialization)

-(NSDictionary *) serializeResult {
    NSMutableDictionary* jsonResult = (NSMutableDictionary*)[super serializeResult];
    [jsonResult setValue:self.result.vin forKey:@"vin"];

    return jsonResult;
}

@end