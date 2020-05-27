//
//  MBRecognizerWrapper.h
//  BlinkIdDevDemo
//
//  Created by DoDo on 01/06/2018.
//

#pragma once

#import <MicroBlink/MicroBlink.h>

/** Object that knows how to create parsers from JSON */
@protocol MBParserCreator
@required

-(MBParser *) createParser:(NSDictionary*) jsonParser;

@property (nonatomic, nonnull, readonly) NSString* jsonName;

@end

/** Category on MBParser that adds support writing its result to JSON */

@interface MBParser (JsonSerialization)

-(NSDictionary *) serializeResult;

@end
