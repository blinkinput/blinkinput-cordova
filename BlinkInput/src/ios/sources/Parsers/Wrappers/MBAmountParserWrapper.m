#import "MBAmountParserWrapper.h"
#import "MBSerializationUtils.h"
#import "MBBlinkInputSerializationUtils.h"

@implementation MBAmountParserCreator

@synthesize jsonName = _jsonName;

-(instancetype) init {
    self = [super init];
    if (self) {
        _jsonName = @"AmountParser";
    }
    return self;
}

-(MBParser *) createParser:(NSDictionary*) jsonParser {
    MBAmountParser *parser = [[MBAmountParser alloc] init];
    {
        id allowMissingDecimals = [jsonParser valueForKey:@"allowMissingDecimals"];
        if (allowMissingDecimals != nil) {
            parser.allowMissingDecimals = [(NSNumber *)allowMissingDecimals boolValue];
        }
    }
    {
        id allowNegativeAmounts = [jsonParser valueForKey:@"allowNegativeAmounts"];
        if (allowNegativeAmounts != nil) {
            parser.allowNegativeAmounts = [(NSNumber *)allowNegativeAmounts boolValue];
        }
    }
    {
        id allowSpaceSeparators = [jsonParser valueForKey:@"allowSpaceSeparators"];
        if (allowSpaceSeparators != nil) {
            parser.allowSpaceSeparators = [(NSNumber *)allowSpaceSeparators boolValue];
        }
    }
    {
        id arabicIndicMode = [jsonParser valueForKey:@"arabicIndicMode"];
        if (arabicIndicMode != nil) {
            parser.arabicIndicMode = [(NSNumber *)arabicIndicMode boolValue];
        }
    }

    return parser;
}

@end

@interface MBAmountParser (JsonSerialization)
@end

@implementation MBAmountParser (JsonSerialization)

-(NSDictionary *) serializeResult {
    NSMutableDictionary* jsonResult = (NSMutableDictionary*)[super serializeResult];
    [jsonResult setValue:self.result.amount forKey:@"amount"];

    return jsonResult;
}

@end