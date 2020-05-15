#import "MBProcessorSerializers.h"

#import "MBProcessorWrapper.h"
#import "MBImageReturnProcessorWrapper.h"

#import "MBParserGroupProcessorWrapper.h"

@interface MBProcessorSerializers ()

@property (nonatomic, strong) NSDictionary<NSString*, id<MBProcessorCreator>> *processorSerializers;

@end

@implementation MBProcessorSerializers

- (void)registerCreator:(id<MBProcessorCreator>)processorCreator {
    [self.processorSerializers setValue:processorCreator forKey:processorCreator.jsonName];
}

- (instancetype)init {
    self = [super init];
    if (self) {
        _processorSerializers = [[NSMutableDictionary alloc] init];
        
        [self registerCreator:[[MBParserGroupProcessorCreator alloc] init]];
        [self registerCreator:[[MBImageReturnProcessorCreator alloc] init]];
    }
    return self;
}

+ (instancetype)sharedInstance {
    static MBProcessorSerializers *sharedInstance = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        sharedInstance = [[self alloc] init];

    });
    return sharedInstance;
}

-(id<MBProcessorCreator>) processorCreatorForJson:(NSDictionary *)processorJson {
    NSString* processorType = [processorJson objectForKey:@"processorType"];
    return [self.processorSerializers objectForKey:processorType];
}

@end