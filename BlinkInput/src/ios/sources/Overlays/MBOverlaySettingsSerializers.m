//
//  MBOverlaySettingsSerializers.m
//  BlinkIdDevDemo
//
//  Created by DoDo on 04/06/2018.
//

#import "MBOverlaySettingsSerializers.h"

#import "MBOverlayVCCreator.h"
#import "MBBarcodeOverlaySettingsSerialization.h"
#import "MBDocumentCaptureOverlaySettingsSerialization.h"
#import "MBFieldByFieldOverlaySettingsSerialization.h"

@interface MBOverlaySettingsSerializers ()

@property (nonatomic, strong) NSDictionary<NSString*, id<MBOverlayVCCreator>> *overlayCreators;

@end

@implementation MBOverlaySettingsSerializers

- (void)registerMapping:(id<MBOverlayVCCreator>)overlayCreator {
    [self.overlayCreators setValue:overlayCreator forKey:overlayCreator.jsonName];
}

- (instancetype)init {
    self = [super init];
    if (self) {
        _overlayCreators = [[NSMutableDictionary alloc] init];
        [self registerMapping:[[MBBarcodeOverlaySettingsSerialization alloc] init]];
        [self registerMapping:[[MBDocumentCaptureOverlaySettingsSerialization alloc] init]];
        [self registerMapping:[[MBDocumentCaptureOverlaySettingsSerialization alloc] init]];
        [self registerMapping:[[MBFieldByFieldOverlaySettingsSerialization alloc] init]];
    }
    return self;
}

+ (instancetype)sharedInstance {
    static MBOverlaySettingsSerializers *sharedInstance = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        sharedInstance = [[self alloc] init];

    });
    return sharedInstance;
}

-(MBOverlayViewController *) createOverlayViewController:(NSDictionary *)jsonOverlaySettings recognizerCollection:(MBRecognizerCollection*)recognizerCollection delegate:(id<MBOverlayViewControllerDelegate>)delegate {
    return [[self.overlayCreators valueForKey:[jsonOverlaySettings valueForKey:@"overlaySettingsType"]] createOverlayViewController:jsonOverlaySettings recognizerCollection:recognizerCollection delegate:delegate];
}

-(MBOverlayViewController *) createDocumentCaptureOverlayViewControllerWithCollection:(MBRecognizerCollection*)recognizerCollection delegate:(id<MBOverlayViewControllerDelegate>)delegate {
    return [[self.overlayCreators valueForKey:@"DocumentCaptureOverlaySettings"] createOverlayViewController:nil recognizerCollection:recognizerCollection delegate:delegate];
}

-(MBOverlayViewController *) createFieldByFieldOverlayViewControllerWithScanelements:(NSArray<MBScanElement *> *)scanElements delegate:(id<MBOverlayViewControllerDelegate>)delegate {
    return [[self.overlayCreators valueForKey:@"FieldByFieldOverlaySettings"] createOverlayViewControllerWithScanElements:scanElements delegate:delegate];
}

@end