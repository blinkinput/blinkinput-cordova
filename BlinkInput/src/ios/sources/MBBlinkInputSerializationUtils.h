//
//  MBBlinkIDSerializationUtils.h
//  BlinkIdDevDemo
//
//  Created by DoDo on 04/06/2018.
//

#import <MicroBlink/MicroBlink.h>

#import <Foundation/Foundation.h>

@interface MBBlinkInputSerializationUtils : NSObject

+(MBBaseOcrEngineOptions * _Nullable) deserializeBaseOcrEngineOptions:(NSDictionary * _Nullable)jsonExtensionFactors;
+(MBImageExtensionFactors) deserializeMBImageExtensionFactors:(NSDictionary * _Nullable)jsonExtensionFactors;

@end
