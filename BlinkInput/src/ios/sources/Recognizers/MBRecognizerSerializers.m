#import "MBRecognizerSerializers.h"

#import "MBRecognizerWrapper.h"
#import "MBSuccessFrameGrabberRecognizerWrapper.h"
#import "MBBarcodeRecognizerWrapper.h"
#import "MBDocumentCaptureRecognizerWrapper.h"
#import "MBPdf417RecognizerWrapper.h"
#import "MBSimNumberRecognizerWrapper.h"

@interface MBRecognizerSerializers ()

@property (nonatomic, strong) NSDictionary<NSString*, id<MBRecognizerCreator>> *recognizerSerializers;

@end

@implementation MBRecognizerSerializers

- (void)registerCreator:(id<MBRecognizerCreator>)recognizerCreator {
    [self.recognizerSerializers setValue:recognizerCreator forKey:recognizerCreator.jsonName];
}

- (instancetype)init {
    self = [super init];
    if (self) {
        _recognizerSerializers = [[NSMutableDictionary alloc] init];
        [self registerCreator:[[MBSuccessFrameGrabberRecognizerCreator alloc] init]];
        [self registerCreator:[[MBBarcodeRecognizerCreator alloc] init]];
        [self registerCreator:[[MBDocumentCaptureRecognizerCreator alloc] init]];
        [self registerCreator:[[MBPdf417RecognizerCreator alloc] init]];
        [self registerCreator:[[MBSimNumberRecognizerCreator alloc] init]];
    }
    return self;
}

+ (instancetype)sharedInstance {
    static MBRecognizerSerializers *sharedInstance = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        sharedInstance = [[self alloc] init];

    });
    return sharedInstance;
}

-(id<MBRecognizerCreator>) recognizerCreatorForJson:(NSDictionary *)recognizerJson {
    NSString* recognizerType = [recognizerJson objectForKey:@"recognizerType"];
    return [self.recognizerSerializers objectForKey:recognizerType];
}

-(MBRecognizerCollection *) deserializeRecognizerCollection:(NSDictionary *)jsonRecognizerCollection {
    NSArray *recognizerArray = [jsonRecognizerCollection valueForKey:@"recognizerArray"];
    NSUInteger numRecognizers = recognizerArray.count;

    NSMutableArray<MBRecognizer*> *recognizers = [[NSMutableArray alloc] initWithCapacity:numRecognizers];
    for (NSUInteger i = 0; i < numRecognizers; ++i) {
        NSDictionary* recognizerJson = [recognizerArray objectAtIndex:i];
        [recognizers addObject:[[self recognizerCreatorForJson:recognizerJson] createRecognizer:recognizerArray[i]]];
    }

    MBRecognizerCollection* recognizerCollection = [[MBRecognizerCollection alloc] initWithRecognizers:recognizers];
    {
        id allowMultipleResults = [jsonRecognizerCollection objectForKey:@"allowMultipleResults"];
        if (allowMultipleResults != nil) {
            recognizerCollection.allowMultipleResults = [(NSNumber*)allowMultipleResults boolValue];
        }
    }
    {
        id milisecondsBeforeTimeout = [jsonRecognizerCollection objectForKey:@"milisecondsBeforeTimeout"];
        if (milisecondsBeforeTimeout != nil) {
            recognizerCollection.partialRecognitionTimeout = (NSTimeInterval)[(NSNumber*)milisecondsBeforeTimeout integerValue] / 1000.0;
        }
    }
    return recognizerCollection;
}

@end