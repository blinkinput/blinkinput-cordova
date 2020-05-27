#import "MBParserWrapper.h"

#import <MicroBlink/MicroBlink.h>

#import <Foundation/Foundation.h>

@interface MBParserSerializers : NSObject

+(instancetype) sharedInstance;

-(id<MBParserCreator>) parserCreatorForJson:(NSDictionary *)parserJson;

@end
