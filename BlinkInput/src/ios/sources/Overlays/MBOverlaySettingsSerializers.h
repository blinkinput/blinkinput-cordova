//
//  MBOverlaySettingsSerializers.h
//  BlinkIdDevDemo
//
//  Created by DoDo on 04/06/2018.
//

#import "MBOverlayViewControllerDelegate.h"

#import <MicroBlink/MicroBlink.h>

#import <Foundation/Foundation.h>

@interface MBOverlaySettingsSerializers : NSObject

+(instancetype) sharedInstance;

-(MBOverlayViewController *) createOverlayViewController:(NSDictionary *)jsonOverlaySettings recognizerCollection:(MBRecognizerCollection*)recognizerCollection delegate:(id<MBOverlayViewControllerDelegate>)delegate;

-(MBOverlayViewController *) createDocumentCaptureOverlayViewControllerWithCollection:(MBRecognizerCollection*)recognizerCollection delegate:(id<MBOverlayViewControllerDelegate>)delegate;

-(MBOverlayViewController *) createFieldByFieldOverlayViewControllerWithScanelements:(NSArray<MBScanElement *> *)scanElements delegate:(id<MBOverlayViewControllerDelegate>)delegate;

@end
