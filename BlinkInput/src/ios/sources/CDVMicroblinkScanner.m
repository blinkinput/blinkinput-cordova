//
//  pdf417Plugin.m
//  CDVpdf417
//
//  Created by Jurica Cerovec, Marko Mihovilic on 10/01/13.
//  Copyright (c) 2013 Racuni.hr. All rights reserved.
//

/**
 * Copyright (c)2013 Racuni.hr d.o.o. All rights reserved.
 *
 * ANY UNAUTHORIZED USE OR SALE, DUPLICATION, OR DISTRIBUTION
 * OF THIS PROGRAM OR ANY OF ITS PARTS, IN SOURCE OR BINARY FORMS,
 * WITH OR WITHOUT MODIFICATION, WITH THE PURPOSE OF ACQUIRING
 * UNLAWFUL MATERIAL OR ANY OTHER BENEFIT IS PROHIBITED!
 * THIS PROGRAM IS PROTECTED BY COPYRIGHT LAWS AND YOU MAY NOT
 * REVERSE ENGINEER, DECOMPILE, OR DISASSEMBLE IT.
 */

#import "CDVMicroblinkScanner.h"

#import "MBOverlayViewControllerDelegate.h"
#import "MBRecognizerSerializers.h"
#import "MBOverlaySettingsSerializers.h"
#import "MBRecognizerWrapper.h"
#import "MBSerializationUtils.h"
#import "MBParserSerializers.h"
#import "MBParserWrapper.h"

#import <MicroBlink/MicroBlink.h>

const NSString *RESULT_LIST = @"resultList";
NSString * const RESULT_CAPTURED_FULL_IMAGE = @"capturedFullImage";

const NSString *CANCELLED = @"cancelled";

const int COMPRESSED_IMAGE_QUALITY = 90;


@interface CDVPlugin () <MBOverlayViewControllerDelegate>

@property (nonatomic, retain) CDVInvokedUrlCommand *lastCommand;

@end

@interface CDVMicroblinkScanner ()

@property (nonatomic, strong) MBRecognizerCollection *recognizerCollection;
@property (nonatomic) id<MBRecognizerRunnerViewController> scanningViewController;
@property (nonatomic) MBImage *highResImage;
@end

@implementation CDVMicroblinkScanner

@synthesize lastCommand;

/**
 Method  sanitizes the dictionary replaces all occurances of NSNull with nil

 @param dictionary JSON objects
 @return new dictionary with NSNull values replaced with nil
*/
- (NSDictionary *)sanitizeDictionary:(NSDictionary *)dictionary {
    NSMutableDictionary *mutableDictionary = [[NSMutableDictionary alloc] initWithDictionary:dictionary];
    for (NSString* key in dictionary.allKeys) {
        if (mutableDictionary[key] == [NSNull null]) {
            mutableDictionary[key] = nil;
        }
    }
    return mutableDictionary;
}

#pragma mark - Main
- (void)scanWithCamera:(CDVInvokedUrlCommand *)command {

    [self setLastCommand:command];

    NSDictionary *jsonOverlaySettings = [self sanitizeDictionary:[self.lastCommand argumentAtIndex:0]];
    NSDictionary *jsonRecognizerCollection = [self sanitizeDictionary:[self.lastCommand argumentAtIndex:1]];
    NSDictionary *jsonLicenses = [self sanitizeDictionary:[self.lastCommand argumentAtIndex:2]];

    [self setLicense:jsonLicenses];

    self.recognizerCollection = [[MBRecognizerSerializers sharedInstance] deserializeRecognizerCollection:jsonRecognizerCollection];

    // create overlay VC
    MBOverlayViewController *overlayVC = [[MBOverlaySettingsSerializers sharedInstance] createOverlayViewController:jsonOverlaySettings recognizerCollection:self.recognizerCollection delegate:self];

    UIViewController<MBRecognizerRunnerViewController>* recognizerRunnerViewController = [MBViewControllerFactory recognizerRunnerViewControllerWithOverlayViewController:overlayVC];

    self.scanningViewController = recognizerRunnerViewController;

    /** You can use other presentation methods as well */
    [[self viewController] presentViewController:recognizerRunnerViewController animated:YES completion:nil];
}
- (void)captureDocument:(CDVInvokedUrlCommand *)command {

    [self setLastCommand:command];

    NSDictionary *jsonRecognizerWrapper = [self sanitizeDictionary:[self.lastCommand argumentAtIndex:0]];
    NSDictionary *jsonLicenses = [self sanitizeDictionary:[self.lastCommand argumentAtIndex:1]];

    NSDictionary *documentCaptureRecognizerWrapper = [jsonRecognizerWrapper valueForKey:@"documentCaptureRecognizer"];

    [self setLicense:jsonLicenses];

    id<MBRecognizerCreator> documentCaptureRecognizerJson = [[MBRecognizerSerializers sharedInstance] recognizerCreatorForJson:documentCaptureRecognizerWrapper];

    self.recognizerCollection = [[MBRecognizerCollection alloc] initWithRecognizers:@[[documentCaptureRecognizerJson createRecognizer: documentCaptureRecognizerWrapper]]];

    // create overlay VC
    MBOverlayViewController *overlayVC = [[MBOverlaySettingsSerializers sharedInstance] createDocumentCaptureOverlayViewControllerWithCollection:self.recognizerCollection delegate:self];

    UIViewController<MBRecognizerRunnerViewController>* recognizerRunnerViewController = [MBViewControllerFactory recognizerRunnerViewControllerWithOverlayViewController:overlayVC];

    self.scanningViewController = recognizerRunnerViewController;

    /** You can use other presentation methods as well */
    [[self viewController] presentViewController:recognizerRunnerViewController animated:YES completion:nil];
}
- (void)scanWithFieldByField:(CDVInvokedUrlCommand *)command {
    [self setLastCommand:command];
    
    NSDictionary *jsonFieldByFieldWrapper = [self sanitizeDictionary:[self.lastCommand argumentAtIndex:0]];
    NSDictionary *jsonLicenses = [self sanitizeDictionary:[self.lastCommand argumentAtIndex:1]];
    
    [self setLicense:jsonLicenses];
    
    NSArray *fieldByFieldElements = [jsonFieldByFieldWrapper valueForKey:@"fieldByFieldElementArray"];
    NSUInteger numOfFieldElements = fieldByFieldElements.count;
    NSMutableArray<MBScanElement *> *scanElementsArray = [[NSMutableArray alloc] initWithCapacity:numOfFieldElements];
    for (int i=0; i < numOfFieldElements; i++) {
        id<MBParserCreator> parserRecognizerJson = [[MBParserSerializers sharedInstance] parserCreatorForJson:[fieldByFieldElements[i] valueForKey:@"parser"]];
        MBParser *parser = (MBParser *)[parserRecognizerJson createParser:[fieldByFieldElements[i] valueForKey:@"parser"]];
        MBScanElement *scanElement = [[MBScanElement alloc] initWithIdentifier:[(NSString *)fieldByFieldElements[i] valueForKey:@"identifier"] parser:parser];
        scanElement.localizedTitle = [(NSString *)fieldByFieldElements[i] valueForKey:@"localizedTitle"];
        scanElement.localizedTooltip = [(NSString *)fieldByFieldElements[i] valueForKey:@"localizedTooltip"];
        [scanElementsArray addObject:scanElement];
    }
    
    MBOverlayViewController *overlayVC = [[MBOverlaySettingsSerializers sharedInstance] createFieldByFieldOverlayViewControllerWithScanelements:scanElementsArray delegate:self];
            
    UIViewController<MBRecognizerRunnerViewController>* recognizerRunnerViewController = [MBViewControllerFactory recognizerRunnerViewControllerWithOverlayViewController:overlayVC];
    self.scanningViewController = recognizerRunnerViewController;

    [[self viewController] presentViewController:recognizerRunnerViewController animated:YES completion:nil];
}

- (void)setLicense:(NSDictionary*) jsonLicense {
    if ([jsonLicense objectForKey:@"showTimeLimitedLicenseKeyWarning"] != nil) {
        BOOL showTimeLimitedLicenseKeyWarning = [[jsonLicense objectForKey:@"showTimeLimitedLicenseKeyWarning"] boolValue];
        [MBMicroblinkSDK sharedInstance].showLicenseKeyTimeLimitedWarning = showTimeLimitedLicenseKeyWarning;
    }
    NSString* iosLicense = [jsonLicense objectForKey:@"ios"];
    if ([jsonLicense objectForKey:@"licensee"] != nil) {
        NSString *licensee = [jsonLicense objectForKey:@"licensee"];
        [[MBMicroblinkSDK sharedInstance] setLicenseKey:iosLicense andLicensee:licensee];
    }
    else {
        [[MBMicroblinkSDK sharedInstance] setLicenseKey:iosLicense];
    }
}

- (void)overlayViewControllerDidFinishScanning:(MBOverlayViewController *)overlayViewController state:(MBRecognizerResultState)state {
    if (state != MBRecognizerResultStateEmpty) {
        [overlayViewController.recognizerRunnerViewController pauseScanning];
        // recognizers within self.recognizerCollection now have their results filled

        NSMutableArray *jsonResults = [[NSMutableArray alloc] initWithCapacity:self.recognizerCollection.recognizerList.count];
        for (NSUInteger i = 0; i < self.recognizerCollection.recognizerList.count; ++i) {
            [jsonResults addObject:[[self.recognizerCollection.recognizerList objectAtIndex:i] serializeResult]];
        }

        NSDictionary *resultDict;
            if (self.highResImage) {
                resultDict = @{
                    CANCELLED: [NSNumber numberWithBool:NO],
                    RESULT_LIST: jsonResults,
                    RESULT_CAPTURED_FULL_IMAGE: [MBSerializationUtils encodeMBImage: self.highResImage]
                };
            }
            else {
                resultDict = @{
                    CANCELLED: [NSNumber numberWithBool:NO],
                    RESULT_LIST: jsonResults
                };
            }

        CDVPluginResult *result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:resultDict];
        [self.commandDelegate sendPluginResult:result callbackId:self.lastCommand.callbackId];

        // dismiss recognizer runner view controller
        dispatch_async(dispatch_get_main_queue(), ^{
            [[self viewController] dismissViewControllerAnimated:YES completion:nil];
            self.recognizerCollection = nil;
            self.scanningViewController = nil;
            self.highResImage = nil;
        });
    }
}

- (void)overlayDidTapClose:(MBOverlayViewController *)overlayViewController {
    [[self viewController] dismissViewControllerAnimated:YES completion:nil];
    self.recognizerCollection = nil;
    self.scanningViewController = nil;
    NSDictionary *resultDict = @{
        CANCELLED : [NSNumber numberWithBool:YES]
    };
    CDVPluginResult *result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:resultDict];
    [self.commandDelegate sendPluginResult:result callbackId:self.lastCommand.callbackId];
}
- (void)overlayViewControllerDidFinishScanning:(MBOverlayViewController *)overlayViewController highResImage:(MBImage *)highResImage state:(MBRecognizerResultState)state {
        
        self.highResImage = highResImage;

        if (state == MBRecognizerResultStateUncertain) {
            [overlayViewController.recognizerRunnerViewController pauseScanning];
            // recognizers within self.recognizerCollection now have their results filled
            NSMutableArray *jsonResults = [[NSMutableArray alloc] initWithCapacity:self.recognizerCollection.recognizerList.count];
            for (NSUInteger i = 0; i < self.recognizerCollection.recognizerList.count; ++i) {
                [jsonResults addObject:[[self.recognizerCollection.recognizerList objectAtIndex:i] serializeResult]];
            }

            NSDictionary *resultDict = @{
                CANCELLED: [NSNumber numberWithBool:NO],
                RESULT_LIST: jsonResults,
                RESULT_CAPTURED_FULL_IMAGE: [MBSerializationUtils encodeMBImage: self.highResImage]
            };

            CDVPluginResult *result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:resultDict];
            [self.commandDelegate sendPluginResult:result callbackId:self.lastCommand.callbackId];

            // dismiss recognizer runner view controller
            dispatch_async(dispatch_get_main_queue(), ^{
                [[self viewController] dismissViewControllerAnimated:YES completion:nil];
                self.recognizerCollection = nil;
                self.scanningViewController = nil;
                self.highResImage = nil;
            });
        }
        
}
- (void)overlayViewControllerDidFinishScanning:(MBOverlayViewController *)overlayViewController didFinishScanningWithElements:(NSArray<MBScanElement *> *)scanElements {
    
    [overlayViewController.recognizerRunnerViewController pauseScanning];
    NSMutableDictionary *dictResult = [[NSMutableDictionary alloc] init];
    NSMutableArray *jsonResults = [[NSMutableArray alloc] init];
    
    for (MBScanElement *element in scanElements) {
        if (element.scanned) {
            [dictResult setObject:element.identifier forKey:@"identifier"];
            [dictResult setObject:element.value forKey:@"value"];
            [jsonResults addObject:dictResult];
        }
    }
    
    NSDictionary *resultDict;
    resultDict = @{
        CANCELLED: [NSNumber numberWithBool:NO],
        RESULT_LIST: jsonResults
    };
    
    CDVPluginResult *result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:resultDict];
    [self.commandDelegate sendPluginResult:result callbackId:self.lastCommand.callbackId];

    // dismiss recognizer runner view controller
    dispatch_async(dispatch_get_main_queue(), ^{
        [[self viewController] dismissViewControllerAnimated:YES completion:nil];
        self.recognizerCollection = nil;
        self.scanningViewController = nil;
        self.highResImage = nil;
    });
}
@end