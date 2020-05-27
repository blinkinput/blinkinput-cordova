#import "MBParserSerializers.h"

#import "MBParserWrapper.h"
#import "MBAmountParserWrapper.h"
#import "MBDateParserWrapper.h"
#import "MBEmailParserWrapper.h"
#import "MBIbanParserWrapper.h"
#import "MBLicensePlatesParserWrapper.h"
#import "MBRawParserWrapper.h"
#import "MBTopUpParserWrapper.h"
#import "MBVinParserWrapper.h"

@interface MBParserSerializers ()

@property (nonatomic, strong) NSDictionary<NSString*, id<MBParserCreator>> *parserSerializers;

@end

@implementation MBParserSerializers

- (void)registerCreator:(id<MBParserCreator>)parserCreator {
    [self.parserSerializers setValue:parserCreator forKey:parserCreator.jsonName];
}

- (instancetype)init {
    self = [super init];
    if (self) {
        _parserSerializers = [[NSMutableDictionary alloc] init];
        [self registerCreator:[[MBAmountParserCreator alloc] init]];
        [self registerCreator:[[MBDateParserCreator alloc] init]];
        [self registerCreator:[[MBEmailParserCreator alloc] init]];
        [self registerCreator:[[MBIbanParserCreator alloc] init]];
        [self registerCreator:[[MBLicensePlatesParserCreator alloc] init]];
        [self registerCreator:[[MBRawParserCreator alloc] init]];
        [self registerCreator:[[MBTopUpParserCreator alloc] init]];
        [self registerCreator:[[MBVinParserCreator alloc] init]];
    }
    return self;
}

+ (instancetype)sharedInstance {
    static MBParserSerializers *sharedInstance = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        sharedInstance = [[self alloc] init];

    });
    return sharedInstance;
}

-(id<MBParserCreator>) parserCreatorForJson:(NSDictionary *)parserJson {
    NSString* parserType = [parserJson objectForKey:@"parserType"];
    return [self.parserSerializers objectForKey:parserType];
}

@end