#import "MBRegexParserWrapper.h"
#import "MBSerializationUtils.h"
#import "MBBlinkInputSerializationUtils.h"

@implementation MBRegexParserCreator

@synthesize jsonName = _jsonName;

-(instancetype) init {
    self = [super init];
    if (self) {
        _jsonName = @"RegexParser";
    }
    return self;
}

-(MBParser *) createParser:(NSDictionary*) jsonParser {
    
    NSString *regex = (NSString *)[jsonParser valueForKey:@"regex"];
    MBRegexParser *parser = [[MBRegexParser alloc] initWithRegex:regex];
    {
        id endWithWhitespace = [jsonParser valueForKey:@"endWithWhitespace"];
        if (endWithWhitespace != nil) {
            parser.endWithWhitespace = [(NSNumber *)endWithWhitespace boolValue];
        }
    }
    {
        id ocrEngineOptions = [jsonParser valueForKey:@"ocrEngineOptions"];
        if (ocrEngineOptions != nil) {
            parser.ocrEngineOptions = [MBBlinkInputSerializationUtils deserializeBaseOcrEngineOptions:(NSDictionary*)ocrEngineOptions];
        }
    }
    {
        id regex = [jsonParser valueForKey:@"regex"];
        if (regex != nil) {
            parser.regex = (NSString *)regex;
        }
    }
    {
        id startWithWhitespace = [jsonParser valueForKey:@"startWithWhitespace"];
        if (startWithWhitespace != nil) {
            parser.startWithWhitespace = [(NSNumber *)startWithWhitespace boolValue];
        }
    }
    {
        id useSieve = [jsonParser valueForKey:@"useSieve"];
        if (useSieve != nil) {
            parser.useSieve = [(NSNumber *)useSieve boolValue];
        }
    }

    return parser;
}

@end

@interface MBRegexParser (JsonSerialization)
@end

@implementation MBRegexParser (JsonSerialization)

-(NSDictionary *) serializeResult {
    NSMutableDictionary* jsonResult = (NSMutableDictionary*)[super serializeResult];
    [jsonResult setValue:self.result.parsedString forKey:@"parsedString"];

    return jsonResult;
}

@end
