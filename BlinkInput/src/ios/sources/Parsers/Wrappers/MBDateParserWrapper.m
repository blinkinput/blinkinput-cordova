#import "MBDateParserWrapper.h"
#import "MBSerializationUtils.h"
#import "MBBlinkInputSerializationUtils.h"

@implementation MBDateParserCreator

@synthesize jsonName = _jsonName;

-(instancetype) init {
    self = [super init];
    if (self) {
        _jsonName = @"DateParser";
    }
    return self;
}

-(MBParser *) createParser:(NSDictionary*) jsonParser {
    MBDateParser *parser = [[MBDateParser alloc] init];

    return parser;
}

@end

@interface MBDateParser (JsonSerialization)
@end

@implementation MBDateParser (JsonSerialization)

-(NSDictionary *) serializeResult {
    NSMutableDictionary* jsonResult = (NSMutableDictionary*)[super serializeResult];
    [jsonResult setValue:[MBSerializationUtils serializeMBDateResult:self.result.date] forKey:@"date"];

    return jsonResult;
}

@end