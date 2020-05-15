//
//  MBBlinkIdOverlaySettingsSerialization.m
//  BlinkIdDevDemo
//
//  Created by DoDo on 04/06/2018.
//

#import "MBFieldByFieldOverlaySettingsSerialization.h"

@interface MBFieldByFieldOverlaySettingsSerialization ()

@property (nonatomic, weak) id<MBOverlayViewControllerDelegate> delegate;

@end

@implementation MBFieldByFieldOverlaySettingsSerialization

@synthesize jsonName = _jsonName;

-(instancetype) init {
    self = [super init];
    if (self) {
        _jsonName = @"FieldByFieldOverlaySettings";
    }
    return self;
}

-(MBOverlayViewController *) createOverlayViewController:(NSDictionary *)jsonOverlaySettings recognizerCollection:(MBRecognizerCollection*)recognizerCollection delegate:(id<MBOverlayViewControllerDelegate>) delegate {
        
    MBFieldByFieldOverlaySettings *settings = [[MBFieldByFieldOverlaySettings alloc] initWithScanElements:[jsonOverlaySettings valueForKey:@"scanElements"]];
    self.delegate = delegate;

    return [[MBFieldByFieldOverlayViewController alloc] initWithSettings:settings delegate:self];
}

- (void)fieldByFieldOverlayViewController:(MBFieldByFieldOverlayViewController *)fieldByFieldOverlayViewController didFinishScanningWithElements:(NSArray<MBScanElement *> *)scanElements {
    [self.delegate overlayViewControllerDidFinishScanning:fieldByFieldOverlayViewController didFinishScanningWithElements:scanElements];
}

- (void)fieldByFieldOverlayViewControllerWillClose:(MBFieldByFieldOverlayViewController *)fieldByFieldOverlayViewController; {
     [self.delegate overlayDidTapClose:fieldByFieldOverlayViewController];
}

-(MBOverlayViewController *) createOverlayViewControllerWithScanElements:(NSArray<MBScanElement *> *)scanElements delegate:(id<MBOverlayViewControllerDelegate>) delegate {
    MBFieldByFieldOverlaySettings *settings = [[MBFieldByFieldOverlaySettings alloc] initWithScanElements:scanElements];
    self.delegate = delegate;

    return [[MBFieldByFieldOverlayViewController alloc] initWithSettings:settings delegate:self];
}

@end
