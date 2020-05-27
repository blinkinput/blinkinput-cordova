#import "MBIbanParserWrapper.h"
#import "MBSerializationUtils.h"
#import "MBBlinkInputSerializationUtils.h"

@implementation MBIbanParserCreator

@synthesize jsonName = _jsonName;

-(instancetype) init {
    self = [super init];
    if (self) {
        _jsonName = @"IbanParser";
    }
    return self;
}

-(MBParser *) createParser:(NSDictionary*) jsonParser {
    MBIbanParser *parser = [[MBIbanParser alloc] init];
    {
        id alwaysReturnPrefix = [jsonParser valueForKey:@"alwaysReturnPrefix"];
        if (alwaysReturnPrefix != nil) {
            parser.alwaysReturnPrefix = [(NSNumber *)alwaysReturnPrefix boolValue];
        }
    }

    return parser;
}

@end

@interface MBIbanParser (JsonSerialization)
@end

@implementation MBIbanParser (JsonSerialization)

-(NSDictionary *) serializeResult {
    NSMutableDictionary* jsonResult = (NSMutableDictionary*)[super serializeResult];
    [jsonResult setValue:self.result.iban forKey:@"iban"];

    return jsonResult;
}

@end