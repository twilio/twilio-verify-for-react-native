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
