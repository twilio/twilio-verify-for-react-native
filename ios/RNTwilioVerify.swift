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

import TwilioVerifySDK

@objc(RNTwilioVerify)
class RNTwilioVerify: NSObject {

    private var twilioVerify: TwilioVerify?
    private var queryMode: String? = nil

    private func getOrBuildTwilioVerify() throws -> TwilioVerify {
        if let instance = twilioVerify {
            return instance
        }
        var builder = TwilioVerifyBuilder()
        if let mode = queryMode {
            switch mode {
            case "strict":
                builder = builder.setQueryMode(.strict)
            case "legacy":
                builder = builder.setQueryMode(.legacy)
            default:
                break
            }
        }
        let instance = try builder.build()
        twilioVerify = instance
        return instance
    }

    @objc(configure:withResolver:withRejecter:)
    func configure(options: Dictionary<String, Any>, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) -> Void {
        if twilioVerify != nil {
            reject("ALREADY_INITIALIZED", "TwilioVerify SDK has already been initialized. configure() must be called before any other SDK method.", nil)
            return
        }
        queryMode = options["keychainQueryMode"] as? String
        resolve(nil)
    }
    
    @objc(createFactor:withResolver:withRejecter:)
    func createFactor(factorPayload: Dictionary<String, Any>, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) -> Void {
        do {
            let verify = try getOrBuildTwilioVerify()
            switch factorPayload["factorType"] as! String {
            case FactorType.push.rawValue:
                verify.createFactor(withPayload: toPushFactorPayload(factorPayload: factorPayload),
                                    success: { resolve(self.toReadableMap(factor: $0)) },
                                    failure: { reject("\($0.code)", $0.errorDescription, $0) })
            default:
                reject(nil, "Invalid factor payload", nil)
            }
        } catch {
            reject("INIT_ERROR", "Failed to initialize TwilioVerify: \(error.localizedDescription)", error)
        }
    }
    
    @objc(verifyFactor:withResolver:withRejecter:)
    func verifyFactor(verifyFactorPayload: Dictionary<String, String>, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) -> Void {
        do {
            let verify = try getOrBuildTwilioVerify()
            switch verifyFactorPayload["factorType"]! {
            case FactorType.push.rawValue:
                verify.verifyFactor(withPayload: VerifyPushFactorPayload(sid: verifyFactorPayload["sid"]!),
                                    success: { resolve(self.toReadableMap(factor: $0)) },
                                    failure: { reject("\($0.code)", $0.errorDescription, $0) })
            default:
                reject(nil, "Invalid verify factor payload", nil)
            }
        } catch {
            reject("INIT_ERROR", "Failed to initialize TwilioVerify: \(error.localizedDescription)", error)
        }
    }
    
    @objc(updateFactor:withResolver:withRejecter:)
    func updateFactor(updateFactorPayload: Dictionary<String, String>, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) -> Void {
        do {
            let verify = try getOrBuildTwilioVerify()
            switch updateFactorPayload["factorType"]! {
            case FactorType.push.rawValue:
                verify.updateFactor(withPayload: UpdatePushFactorPayload(sid: updateFactorPayload["sid"]!,
                                                                         pushToken: updateFactorPayload["pushToken"]),
                                    success: { resolve(self.toReadableMap(factor: $0)) },
                                    failure: { reject("\($0.code)", $0.errorDescription, $0) })
            default:
                reject(nil, "Invalid verify factor payload", nil)
            }
        } catch {
            reject("INIT_ERROR", "Failed to initialize TwilioVerify: \(error.localizedDescription)", error)
        }
    }
    
    @objc(getAllFactors:withRejecter:)
    func getAllFactors(resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) -> Void {
        do {
            let verify = try getOrBuildTwilioVerify()
            verify.getAllFactors(success: { resolve(self.toReadableFactorArray(factors: $0)) },
                                failure: { reject("\($0.code)", $0.errorDescription, $0) })
        } catch {
            reject("INIT_ERROR", "Failed to initialize TwilioVerify: \(error.localizedDescription)", error)
        }
    }
    
    @objc(deleteFactor:withResolver:withRejecter:)
    func deleteFactor(sid: String, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) -> Void {
        do {
            let verify = try getOrBuildTwilioVerify()
            verify.deleteFactor(withSid: sid,
                                success: { resolve(nil) },
                                failure: { reject("\($0.code)", $0.errorDescription, $0) })
        } catch {
            reject("INIT_ERROR", "Failed to initialize TwilioVerify: \(error.localizedDescription)", error)
        }
    }
    
    @objc(getChallenge:withFactorSid:withResolver:withRejecter:)
    func getChallenge(challengeSid: String, factorSid: String, resolve: @escaping RCTPromiseResolveBlock,reject: @escaping RCTPromiseRejectBlock) -> Void {
        do {
            let verify = try getOrBuildTwilioVerify()
            verify.getChallenge(challengeSid: challengeSid, factorSid: factorSid,
                                success: { resolve(self.toReadableMap(challenge: $0)) },
                                failure: { reject("\($0.code)", $0.errorDescription, $0) })
        } catch {
            reject("INIT_ERROR", "Failed to initialize TwilioVerify: \(error.localizedDescription)", error)
        }
    }
    
    @objc(getAllChallenges:withResolver:withRejecter:)
    func getAllChallenges(challengeListPayload: Dictionary<String, Any>, resolve: @escaping RCTPromiseResolveBlock,reject: @escaping RCTPromiseRejectBlock) -> Void {
        do {
            let verify = try getOrBuildTwilioVerify()
            verify.getAllChallenges(withPayload: toChallengeListPayload(challengeListPayload: challengeListPayload),
                                   success: { resolve(self.toReadableMap(challengeList: $0)) },
                                   failure: { reject("\($0.code)", $0.errorDescription, $0) })
        } catch {
            reject("INIT_ERROR", "Failed to initialize TwilioVerify: \(error.localizedDescription)", error)
        }
    }
    
    @objc(updateChallenge:withResolver:withRejecter:)
    func updateChallenge(updateChallengePayload: Dictionary<String, String>, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) -> Void {
        do {
            let verify = try getOrBuildTwilioVerify()
            switch updateChallengePayload["factorType"]! {
            case FactorType.push.rawValue:
                verify.updateChallenge(withPayload: toUpdatePushChallengePayload(updateChallengePayload: updateChallengePayload),
                                       success: { resolve(nil) },
                                       failure: { reject("\($0.code)", $0.errorDescription, $0) })
            default:
                reject(nil, "Invalid verify factor payload", nil)
            }
        } catch {
            reject("INIT_ERROR", "Failed to initialize TwilioVerify: \(error.localizedDescription)", error)
        }
    }
    
    @objc(clearLocalStorage:withRejecter:)
    func clearLocalStorage(resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) -> Void {
        do {
            let verify = try getOrBuildTwilioVerify()
            try verify.clearLocalStorage()
            resolve(nil)
        } catch {
            reject("INIT_ERROR", "Failed to initialize TwilioVerify: \(error.localizedDescription)", error)
        }
    }

    @objc(isAvailable:withRejecter:)
    func isAvailable(resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) -> Void {
        do {
            _ = try getOrBuildTwilioVerify()
            resolve(true)
        } catch {
            resolve(false)
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
    
    func toPushFactorPayload(factorPayload: Dictionary<String, Any>) -> PushFactorPayload {
        PushFactorPayload(friendlyName: factorPayload["friendlyName"] as! String,
                          serviceSid: factorPayload["serviceSid"] as! String,
                          identity: factorPayload["identity"] as! String,
                          pushToken: factorPayload["pushToken"] as? String,
                          accessToken: factorPayload["accessToken"] as! String)
    }
    
    func toChallengeListPayload(challengeListPayload: Dictionary<String, Any>) -> ChallengeListPayload {
        ChallengeListPayload(factorSid: challengeListPayload["factorSid"] as! String,
                             pageSize: challengeListPayload["pageSize"] as! Int,
                             status: mapStatus(status: challengeListPayload["status"] as? String),
                             order: mapOrder(order: challengeListPayload["order"] as? String) ?? .asc,
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

    func mapOrder(order: String?) -> ChallengeListOrder? {
        if let order = order {
            return ChallengeListOrder(rawValue: order)
        }
        return nil
    }
}
