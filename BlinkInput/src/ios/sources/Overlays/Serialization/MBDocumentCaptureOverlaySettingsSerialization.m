//
//  MBBlinkIdOverlaySettingsSerialization.m
//  BlinkIdDevDemo
//
//  Created by DoDo on 04/06/2018.
//

#import "MBDocumentCaptureOverlaySettingsSerialization.h"

@interface MBDocumentCaptureOverlaySettingsSerialization ()

@property (nonatomic, weak) id<MBOverlayViewControllerDelegate> delegate;

@end

@implementation MBDocumentCaptureOverlaySettingsSerialization

@synthesize jsonName = _jsonName;

-(instancetype) init {
    self = [super init];
    if (self) {
        _jsonName = @"DocumentCaptureOverlaySettings";
    }
    return self;
}

-(MBOverlayViewController *) createOverlayViewController:(NSDictionary *)jsonOverlaySettings recognizerCollection:(MBRecognizerCollection*)recognizerCollection delegate:(id<MBOverlayViewControllerDelegate>) delegate {
    // no settings deserialized at the moment
    MBDocumentCaptureOverlaySettings *sett = [[MBDocumentCaptureOverlaySettings alloc] init];
    self.delegate = delegate;

    return [[MBDocumentCaptureOverlayViewController alloc] initWithSettings:sett recognizer:(MBDocumentCaptureRecognizer *)[recognizerCollection.recognizerList firstObject] delegate:self];
}

- (void)documentCaptureOverlayViewControllerDidFinishScanning:(MBDocumentCaptureOverlayViewController *)documentCaptureOverlayViewController state:(MBRecognizerResultState)state {
    [self.delegate overlayViewControllerDidFinishScanning:documentCaptureOverlayViewController state:state];
}

- (void)documentCaptureOverlayViewControllerDidTapClose:(MBDocumentCaptureOverlayViewController *)documentCaptureOverlayViewController {
     [self.delegate overlayDidTapClose:documentCaptureOverlayViewController];
}

- (void)documentCaptureOverlayViewControllerDidCaptureHighResolutionImage:(MBDocumentCaptureOverlayViewController *)documentCaptureOverlayViewController highResImage:(MBImage *)highResImage state:(MBRecognizerResultState)state {

    if ([self.delegate respondsToSelector:@selector(overlayViewControllerDidFinishScanning:highResImage:state:)]) {
        [self.delegate overlayViewControllerDidFinishScanning:documentCaptureOverlayViewController highResImage:highResImage state:state];
    }

}


@end
