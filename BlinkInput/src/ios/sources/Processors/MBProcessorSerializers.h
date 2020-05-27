#import "MBProcessorWrapper.h"

#import <MicroBlink/MicroBlink.h>

#import <Foundation/Foundation.h>

@interface MBProcessorSerializers : NSObject

+(instancetype) sharedInstance;

-(id<MBProcessorCreator>) processorCreatorForJson:(NSDictionary *)processorJson;

@end
