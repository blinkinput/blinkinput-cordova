//
//  MBBlinkIDSerializationUtils.m
//  BlinkIdDevDemo
//
//  Created by DoDo on 04/06/2018.
//

#import "MBBlinkInputSerializationUtils.h"
#import "MBSerializationUtils.h"

@implementation MBBlinkInputSerializationUtils

+(MBImageExtensionFactors) deserializeMBImageExtensionFactors:(NSDictionary *)jsonExtensionFactors {
    if (jsonExtensionFactors == nil) {
        return MBMakeImageExtensionFactors(0.f, 0.f, 0.f, 0.f);
    } else {
        return MBMakeImageExtensionFactors(
            [(NSNumber*)[jsonExtensionFactors valueForKey:@"upFactor"] floatValue],
            [(NSNumber*)[jsonExtensionFactors valueForKey:@"rightFactor"] floatValue],
            [(NSNumber*)[jsonExtensionFactors valueForKey:@"downFactor"] floatValue],
            [(NSNumber*)[jsonExtensionFactors valueForKey:@"leftFactor"] floatValue]
        );
    }
}

+(MBBaseOcrEngineOptions *) deserializeBaseOcrEngineOptions:(NSDictionary * _Nullable)jsonExtensionFactors {
    if (jsonExtensionFactors == nil) {
        return nil;
    } else {
        
        MBBaseOcrEngineOptions *ocrEngineOptions = [[MBBaseOcrEngineOptions alloc] init];
        ocrEngineOptions.maxCharsExpected = [(NSNumber*)[jsonExtensionFactors valueForKey:@"maxCharsExpected"] unsignedIntegerValue];
        ocrEngineOptions.colorDropoutEnabled = [(NSNumber*)[jsonExtensionFactors valueForKey:@"colorDropoutEnabled"] boolValue];
        
        return ocrEngineOptions;
    }
}

@end
