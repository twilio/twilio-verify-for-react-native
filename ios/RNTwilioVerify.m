//
//  RNTwilioVerify.m
//  RNTwilioVerify
//
//  Copyright © 2021 Twilio.
//
//  Licensed under the Apache License, Version 2.0 (the "License");
//  you may not use this file except in compliance with the License.
//  You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
//  Unless required by applicable law or agreed to in writing, software
//  distributed under the License is distributed on an "AS IS" BASIS,
//  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//  See the License for the specific language governing permissions and
//  limitations under the License.
//

#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(RNTwilioVerify, NSObject)

- (dispatch_queue_t)methodQueue
{
    return dispatch_get_main_queue();
}

+ (BOOL)requiresMainQueueSetup
{
    return YES;
}

RCT_EXTERN_METHOD(createFactor:(NSDictionary)factorPayload
                                withResolver:(RCTPromiseResolveBlock)resolve
                                withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(verifyFactor:(NSDictionary)verifyFactorPayload
                                withResolver:(RCTPromiseResolveBlock)resolve
                                withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(updateFactor:(NSDictionary)updateFactorPayload
                                withResolver:(RCTPromiseResolveBlock)resolve
                                withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(getAllFactors:(RCTPromiseResolveBlock)resolve
                                withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(deleteFactor:(NSString)sid
                                withResolver:(RCTPromiseResolveBlock)resolve
                                withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(getChallenge:(NSString)challengeSid withFactorSid:(NSString)factorSid
                                withResolver:(RCTPromiseResolveBlock)resolve
                                withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(getAllChallenges:(NSDictionary)challengeListPayload
                                    withResolver:(RCTPromiseResolveBlock)resolve
                                    withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(updateChallenge:(NSDictionary)updateChallengePayload
                                    withResolver:(RCTPromiseResolveBlock)resolve
                                    withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(clearLocalStorage:(RCTPromiseResolveBlock)resolve
                                withRejecter:(RCTPromiseRejectBlock)reject)

@end
