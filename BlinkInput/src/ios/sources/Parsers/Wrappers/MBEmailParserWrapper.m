#import "MBEmailParserWrapper.h"
#import "MBSerializationUtils.h"
#import "MBBlinkInputSerializationUtils.h"

@implementation MBEmailParserCreator

@synthesize jsonName = _jsonName;

-(instancetype) init {
    self = [super init];
    if (self) {
        _jsonName = @"EmailParser";
    }
    return self;
}

-(MBParser *) createParser:(NSDictionary*) jsonParser {
    MBEmailParser *parser = [[MBEmailParser alloc] init];

    return parser;
}

@end

@interface MBEmailParser (JsonSerialization)
@end

@implementation MBEmailParser (JsonSerialization)

-(NSDictionary *) serializeResult {
    NSMutableDictionary* jsonResult = (NSMutableDictionary*)[super serializeResult];
    [jsonResult setValue:self.result.email forKey:@"email"];

    return jsonResult;
}

@end