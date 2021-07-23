//
//  RNTwilioVerify.swift
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

import TwilioVerify

@objc(RNTwilioVerify)
class RNTwilioVerify: NSObject {
    
    let twilioVerify: TwilioVerify? = try? TwilioVerifyBuilder().build()
    
    @objc(createFactor:withResolver:withRejecter:)
    func createFactor(factorPayload: Dictionary<String, String>, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) -> Void {
        switch factorPayload["factorType"]! {
        case FactorType.push.rawValue:
            twilioVerify?.createFactor(withPayload: toPushFactorPayload(factorPayload: factorPayload),
                                       success: { resolve(self.toReadableMap(factor: $0)) },
                                       failure: { reject("\($0.code)", $0.errorDescription, $0) })
        default:
            reject(nil, "Invalid factor payload", nil)
        }
    }
    
    @objc(verifyFactor:withResolver:withRejecter:)
    func verifyFactor(verifyFactorPayload: Dictionary<String, String>, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) -> Void {
        switch verifyFactorPayload["factorType"]! {
        case FactorType.push.rawValue:
            twilioVerify?.verifyFactor(withPayload: VerifyPushFactorPayload(sid: verifyFactorPayload["sid"]!),
                                       success: { resolve(self.toReadableMap(factor: $0)) },
                                       failure: { reject("\($0.code)", $0.errorDescription, $0) })
        default:
            reject(nil, "Invalid verify factor payload", nil)
        }
    }
    
    @objc(updateFactor:withResolver:withRejecter:)
    func updateFactor(updateFactorPayload: Dictionary<String, String>, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) -> Void {
        switch updateFactorPayload["factorType"]! {
        case FactorType.push.rawValue:
            twilioVerify?.updateFactor(withPayload: UpdatePushFactorPayload(sid: updateFactorPayload["sid"]!,
                                                                            pushToken: updateFactorPayload["pushToken"]!),
                                       success: { resolve(self.toReadableMap(factor: $0)) },
                                       failure: { reject("\($0.code)", $0.errorDescription, $0) })
        default:
            reject(nil, "Invalid verify factor payload", nil)
        }
    }
    
    @objc(getAllFactors:withRejecter:)
    func getAllFactors(resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) -> Void {
        twilioVerify?.getAllFactors(success: { resolve(self.toReadableFactorArray(factors: $0)) },
                                    failure: { reject("\($0.code)", $0.errorDescription, $0) })
    }
    
    @objc(deleteFactor:withResolver:withRejecter:)
    func deleteFactor(sid: String, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) -> Void {
        twilioVerify?.deleteFactor(withSid: sid,
                                   success: { resolve(nil) },
                                   failure: { reject("\($0.code)", $0.errorDescription, $0) })
    }
    
    @objc(getChallenge:withFactorSid:withResolver:withRejecter:)
    func getChallenge(challengeSid: String, factorSid: String, resolve: @escaping RCTPromiseResolveBlock,reject: @escaping RCTPromiseRejectBlock) -> Void {
        twilioVerify?.getChallenge(challengeSid: challengeSid, factorSid: factorSid,
                                   success: { resolve(self.toReadableMap(challenge: $0)) },
                                   failure: { reject("\($0.code)", $0.errorDescription, $0) })
    }
    
    @objc(getAllChallenges:withResolver:withRejecter:)
    func getAllChallenges(challengeListPayload: Dictionary<String, Any>, resolve: @escaping RCTPromiseResolveBlock,reject: @escaping RCTPromiseRejectBlock) -> Void {
        twilioVerify?.getAllChallenges(withPayload: toChallengeListPayload(challengeListPayload: challengeListPayload),
                                       success: { resolve(self.toReadableMap(challengeList: $0)) },
                                       failure: { reject("\($0.code)", $0.errorDescription, $0) })
    }
    
    @objc(updateChallenge:withResolver:withRejecter:)
    func updateChallenge(updateChallengePayload: Dictionary<String, String>, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) -> Void {
        switch updateChallengePayload["factorType"]! {
        case FactorType.push.rawValue:
            twilioVerify?.updateChallenge(withPayload: toUpdatePushChallengePayload(updateChallengePayload: updateChallengePayload),
                                          success: { resolve(nil) },
                                          failure: { reject("\($0.code)", $0.errorDescription, $0) })
        default:
            reject(nil, "Invalid verify factor payload", nil)
        }
    }
    
    @objc(clearLocalStorage:withRejecter:)
    func clearLocalStorage(resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) -> Void {
        do {
            try twilioVerify?.clearLocalStorage()
            resolve(nil)
        } catch {
            reject(nil, error.localizedDescription, error)
        }
    }
}

private extension RNTwilioVerify {
    func toReadableFactorArray(factors: [Factor]) -> Array<Dictionary<String, Any>> {
        factors.map { toReadableMap(factor: $0) } as Array
    }
    
    func toReadableMap(factor: Factor) -> Dictionary<String, Any> {
        ["status": factor.status.rawValue,
         "sid": factor.sid,
         "friendlyName": factor.friendlyName,
         "accountSid": factor.accountSid,
         "serviceSid": factor.serviceSid,
         "identity": factor.identity,
         "type": factor.type.rawValue,
         "createdAt": toRFC3339(date: factor.createdAt)]
    }
    
    func toReadableMap(challenge: Challenge) -> Dictionary<String, Any> {
        var dictionary = ["sid": challenge.sid,
         "challengeDetails": toReadableMap(challengeDetails: challenge.challengeDetails),
         "factorSid": challenge.factorSid,
         "status": challenge.status.rawValue,
         "createdAt": toRFC3339(date: challenge.createdAt),
         "updatedAt": toRFC3339(date: challenge.updatedAt),
         "expirationDate": toRFC3339(date: challenge.expirationDate)] as [String : Any]
        if let hiddenDetails = challenge.hiddenDetails {
            dictionary["hiddenDetails"] = hiddenDetails
        }
        return dictionary
    }
    
    func toReadableMap(challengeDetails: ChallengeDetails) -> Dictionary<String, Any> {
        var dictionary = ["message": challengeDetails.message,
                          "fields": toReadableArray(fields: challengeDetails.fields)] as [String : Any]
        if let date = challengeDetails.date {
            dictionary["date"] = toRFC3339(date: date)
        }
        return dictionary
    }
    
    func toReadableMap(challengeList: ChallengeList) -> Dictionary<String, Any> {
        ["challenges": challengeList.challenges.map { toReadableMap(challenge: $0) },
         "metadata": toReadableMap(metadata: challengeList.metadata)]
    }
    
    func toReadableArray(fields: [Detail]) -> Array<Dictionary<String, Any>> {
        fields.map { toReadableMap(detail: $0) } as Array
    }
    
    func toReadableMap(detail: Detail) -> Dictionary<String, Any> {
        ["label": detail.label,
         "value": detail.value]
    }
    
    func toReadableMap(metadata: Metadata) -> Dictionary<String, Any> {
        var dictionary = ["page": metadata.page,
                          "pageSize": metadata.pageSize] as [String: Any]
        if let previousPageToken = metadata.previousPageToken {
            dictionary["previousPageToken"] = previousPageToken
        }
        if let nextPageToken = metadata.nextPageToken {
            dictionary["nextPageToken"] = nextPageToken
        }
        return dictionary
    }
    
    func toRFC3339(date: Date) -> String {
      let formatter = DateFormatter()
      formatter.locale = Locale(identifier: "en_US_POSIX")
      formatter.dateFormat = "yyyy-MM-dd'T'HH:mm:ssZZZZZ"
      return formatter.string(from: date)
    }
    
    func toPushFactorPayload(factorPayload: Dictionary<String, String>) -> PushFactorPayload {
        PushFactorPayload(friendlyName: factorPayload["friendlyName"]!,
                          serviceSid: factorPayload["serviceSid"]!,
                          identity: factorPayload["identity"]!,
                          pushToken: factorPayload["pushToken"]!,
                          accessToken: factorPayload["accessToken"]!)
    }
    
    func toChallengeListPayload(challengeListPayload: Dictionary<String, Any>) -> ChallengeListPayload {
        ChallengeListPayload(factorSid: challengeListPayload["factorSid"] as! String,
                             pageSize: challengeListPayload["pageSize"] as! Int,
                             status: mapStatus(status: challengeListPayload["status"] as? String),
                             pageToken: challengeListPayload["pageToken"] as? String)
    }
    
    func toUpdatePushChallengePayload(updateChallengePayload: Dictionary<String, String>) -> UpdatePushChallengePayload {
        UpdatePushChallengePayload(factorSid: updateChallengePayload["factorSid"]!,
                                   challengeSid: updateChallengePayload["challengeSid"]!,
                                   status: mapStatus(status: updateChallengePayload["status"])!)
    }
    
    func mapStatus(status: String?) -> ChallengeStatus? {
        if let status = status {
            return ChallengeStatus(rawValue: status)
        }
        return nil
    }
}
