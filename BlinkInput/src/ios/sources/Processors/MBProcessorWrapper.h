//
//  MBRecognizerWrapper.h
//  BlinkIdDevDemo
//
//  Created by DoDo on 01/06/2018.
//

#pragma once

#import <MicroBlink/MicroBlink.h>

/** Object that knows how to create recognizer from JSON */
@protocol MBProcessorCreator
@required

-(MBProcessor *) createProcessor:(NSDictionary*) jsonProcessor;

@property (nonatomic, nonnull, readonly) NSString* jsonName;

@end

/** Category on MBProcessor that adds support writing its result to JSON */

@interface MBProcessor (JsonSerialization)

-(NSDictionary *) serializeResult;

@end
