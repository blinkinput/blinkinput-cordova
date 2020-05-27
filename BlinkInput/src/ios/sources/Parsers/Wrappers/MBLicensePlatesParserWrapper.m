#import "MBLicensePlatesParserWrapper.h"
#import "MBSerializationUtils.h"
#import "MBBlinkInputSerializationUtils.h"

@implementation MBLicensePlatesParserCreator

@synthesize jsonName = _jsonName;

-(instancetype) init {
    self = [super init];
    if (self) {
        _jsonName = @"LicensePlatesParser";
    }
    return self;
}

-(MBParser *) createParser:(NSDictionary*) jsonParser {
    MBLicensePlatesParser *parser = [[MBLicensePlatesParser alloc] init];

    return parser;
}

@end

@interface MBLicensePlatesParser (JsonSerialization)
@end

@implementation MBLicensePlatesParser (JsonSerialization)

-(NSDictionary *) serializeResult {
    NSMutableDictionary* jsonResult = (NSMutableDictionary*)[super serializeResult];
    [jsonResult setValue:self.result.licensePlate forKey:@"licensePlate"];

    return jsonResult;
}

@end