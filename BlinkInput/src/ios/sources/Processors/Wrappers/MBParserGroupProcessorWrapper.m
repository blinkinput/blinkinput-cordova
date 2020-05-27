//
//  MBSuccessFrameGrabberRecognizerWrapper.m
//  MicroblinkModule
//
//  Created by DoDo on 15/06/2018.
//  Copyright © 2018 Jura Skrlec. All rights reserved.
//

#import "MBParserGroupProcessorWrapper.h"

#import "MBProcessorSerializers.h"
#import "MBParserSerializers.h"
#import "MBSerializationUtils.h"

@implementation MBParserGroupProcessorCreator

@synthesize jsonName = _jsonName;

-(instancetype) init {
    self = [super init];
    if (self) {
        _jsonName = @"ParserGroupProcessor";
    }
    return self;
}

-(MBProcessor *) createProcessor:(NSDictionary*) jsonProcessor {
    NSArray *parserArray = [jsonProcessor valueForKey:@"parsers"];
    NSUInteger numParsers = parserArray.count;

    NSMutableArray<MBParser*> *parsers = [[NSMutableArray alloc] initWithCapacity:numParsers];
    for (NSUInteger i = 0; i < numParsers; ++i) {
        NSDictionary* parserJson = [parserArray objectAtIndex:i];
        [parsers addObject:[[[MBParserSerializers sharedInstance] parserCreatorForJson:parserJson] createParser:parserArray[i]]];
    }
    
    MBParserGroupProcessor *processor = [[MBParserGroupProcessor alloc] initWithParsers:parsers];
    
    {
        id oneOptionalElementInGroupShouldBeValid = [jsonProcessor valueForKey:@"oneOptionalElementInGroupShouldBeValid"];
        if (oneOptionalElementInGroupShouldBeValid != nil) {
            processor.oneOptionalElementInGroupShouldBeValid = [(NSNumber*)oneOptionalElementInGroupShouldBeValid boolValue];
        }
    }
    
    return processor;
}

@end

@interface MBParserGroupProcessor (JsonSerialization)
@end

@implementation MBParserGroupProcessor (JsonSerialization)

-(NSDictionary *) serializeResult {
    NSMutableDictionary* jsonResult = (NSMutableDictionary*)[super serializeResult];

    return jsonResult;
}

@end
