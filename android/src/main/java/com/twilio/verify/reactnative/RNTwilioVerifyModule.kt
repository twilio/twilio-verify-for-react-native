package com.twilio.verify.reactnative

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableMap
import com.twilio.verify.TwilioVerify
import com.twilio.verify.logger.LogLevel
import com.twilio.verify.models.Challenge
import com.twilio.verify.models.ChallengeDetails
import com.twilio.verify.models.ChallengeList
import com.twilio.verify.models.ChallengeListPayload
import com.twilio.verify.models.ChallengeStatus
import com.twilio.verify.models.Detail
import com.twilio.verify.models.Factor
import com.twilio.verify.models.FactorType
import com.twilio.verify.models.Metadata
import com.twilio.verify.models.PushFactorPayload
import com.twilio.verify.models.UpdatePushChallengePayload
import com.twilio.verify.models.UpdatePushFactorPayload
import com.twilio.verify.models.VerifyPushFactorPayload
import java.text.SimpleDateFormat
import java.util.Date
import java.util.Locale
import java.util.TimeZone

private const val dateFormatUTC = "yyyy-MM-dd'T'HH:mm:ss'Z'"
private val dateFormatterUTC =
  SimpleDateFormat(dateFormatUTC, Locale.US).apply { timeZone = TimeZone.getTimeZone("UTC") }

class RNTwilioVerifyModule(
  reactContext: ReactApplicationContext,
  private val twilioVerify: TwilioVerify = TwilioVerify.Builder(reactContext).build()
) : ReactContextBaseJavaModule(reactContext) {

  override fun getName(): String {
    return "RNTwilioVerify"
  }

  @ReactMethod
  fun createFactor(
    factorPayload: ReadableMap,
    promise: Promise
  ) {
    when (mapType(factorPayload.getString("factorType"))) {
      FactorType.PUSH ->
        twilioVerify.createFactor(
          toPushFactorPayload(factorPayload),
          { promise.resolve(toReadableMap(it)) },
          { promise.reject(it) })
      else -> promise.reject(IllegalArgumentException("Invalid factor payload"))
    }
  }

  @ReactMethod
  fun verifyFactor(verifyFactorPayload: ReadableMap, promise: Promise) {
    when (mapType(verifyFactorPayload.getString("factorType"))) {
      FactorType.PUSH -> twilioVerify.verifyFactor(
        VerifyPushFactorPayload(verifyFactorPayload.getStringValue("sid")),
        { promise.resolve(toReadableMap(it)) },
        { promise.reject(it) })
      else -> promise.reject(IllegalArgumentException("Invalid verify factor payload"))
    }
  }

  @ReactMethod
  fun updateFactor(
    updateFactorPayload: ReadableMap,
    promise: Promise
  ) {
    when (mapType(updateFactorPayload.getString("factorType"))) {
      FactorType.PUSH ->
        twilioVerify.updateFactor(
          UpdatePushFactorPayload(
            updateFactorPayload.getStringValue("sid"),
            updateFactorPayload.getStringValue("pushToken")
          ), { promise.resolve(toReadableMap(it)) }, { promise.reject(it) })
    }
  }

  @ReactMethod
  fun getAllFactors(promise: Promise) {
    twilioVerify.getAllFactors(
      { promise.resolve(toReadableFactorArray(it)) },
      { promise.reject(it) })
  }

  @ReactMethod
  fun deleteFactor(sid: String, promise: Promise) {
    twilioVerify.deleteFactor(
      sid,
      { promise.resolve(null) },
      { promise.reject(it) })
  }

  @ReactMethod
  fun getChallenge(
    challengeSid: String,
    factorSid: String,
    promise: Promise
  ) {
    twilioVerify.getChallenge(
      challengeSid,
      factorSid,
      { promise.resolve(toReadableMap(it)) },
      { promise.reject(it) })
  }

  @ReactMethod
  fun getAllChallenges(
    challengeListPayload: ReadableMap,
    promise: Promise
  ) {
    twilioVerify.getAllChallenges(
      toChallengeListPayload(challengeListPayload),
      { promise.resolve(toReadableMap(it)) },
      { promise.reject(it) })
  }

  @ReactMethod
  fun updateChallenge(updateChallengePayload: ReadableMap, promise: Promise) {
    when (mapType(updateChallengePayload.getString("factorType"))) {
      FactorType.PUSH ->
        toUpdatePushChallengePayload(updateChallengePayload)?.let {
          twilioVerify.updateChallenge(
            it,
            { promise.resolve(null) },
            { exception -> promise.reject(exception) })
        }
    }
  }

  private fun toUpdatePushChallengePayload(updateChallengePayload: ReadableMap) =
    mapStatus(updateChallengePayload.getStringValue("status"))?.let {
      UpdatePushChallengePayload(
        updateChallengePayload.getStringValue("factorSid"),
        updateChallengePayload.getStringValue("challengeSid"),
        it
      )
    }

  @ReactMethod
  fun clearLocalStorage(promise: Promise) {
    twilioVerify.clearLocalStorage { promise.resolve(null) }
  }

  private fun mapStatus(status: String?) =
    status?.let {
      ChallengeStatus.values()
        .find { it.value == status }
    }

  private fun mapType(type: String?) =
    type?.let {
      FactorType.values()
        .find { it.factorTypeName == type }
    }

  private fun toReadableMap(challengeList: ChallengeList) =
    Arguments.createMap().apply {
      putArray(
        "challenges",
        Arguments.createArray()
          .apply { challengeList.challenges.forEach { pushMap(toReadableMap(it)) } })
      putMap("metadata", toReadableMap(challengeList.metadata))
    }

  private fun toReadableMap(metadata: Metadata) = Arguments.createMap().apply {
    putInt("page", metadata.page)
    putInt("pageSize", metadata.pageSize)
    putString("previousPageToken", metadata.previousPageToken)
    putString("nextPageToken", metadata.nextPageToken)
  }

  private fun toReadableFactorArray(factors: List<Factor>) =
    Arguments.createArray().apply {
      factors.forEach { pushMap(toReadableMap(it)) }
    }

  private fun toReadableDetailArray(fields: List<Detail>) =
    Arguments.createArray().apply {
      fields.forEach { pushMap(toReadableMap(it)) }
    }

  private fun toReadableMap(factor: Factor) = Arguments.createMap().apply {
    putString("status", factor.status.value)
    putString("sid", factor.sid)
    putString("friendlyName", factor.friendlyName)
    putString("accountSid", factor.accountSid)
    putString("serviceSid", factor.serviceSid)
    putString("identity", factor.identity)
    putString("type", factor.type.factorTypeName)
    putString("createdAt", toRFC3339(factor.createdAt))
  }

  private fun toReadableMap(challenge: Challenge) = Arguments.createMap().apply {
    putString("sid", challenge.sid)
    putMap("challengeDetails", toReadableMap(challenge.challengeDetails))
    challenge.hiddenDetails?.let { putMap("hiddenDetails", toReadableMap(it)) }
    putString("factorSid", challenge.factorSid)
    putString("status", challenge.status.value)
    putString("createdAt", toRFC3339(challenge.createdAt))
    putString("updatedAt", toRFC3339(challenge.updatedAt))
    putString("expirationDate", toRFC3339(challenge.expirationDate))
  }

  private fun toReadableMap(hiddenDetails: Map<String, String>) =
    Arguments.createMap().apply {
      hiddenDetails.forEach { putString(it.key, it.value) }
    }

  private fun toReadableMap(challengeDetails: ChallengeDetails) =
    Arguments.createMap().apply {
      putString("message", challengeDetails.message)
      putArray("fields", toReadableDetailArray(challengeDetails.fields))
      challengeDetails.date?.let { putString("date", toRFC3339(it)) }
    }

  private fun toReadableMap(detail: Detail) = Arguments.createMap().apply {
    putString("label", detail.label)
    putString("value", detail.value)
  }

  private fun toRFC3339(date: Date) = dateFormatterUTC.format(date)

  private fun ReadableMap.getStringValue(name: String) =
    getString(name) ?: throw IllegalArgumentException("Invalid value for $name")

  private fun toPushFactorPayload(factorPayload: ReadableMap) =
    PushFactorPayload(
      factorPayload.getStringValue("friendlyName"),
      factorPayload.getStringValue("serviceSid"),
      factorPayload.getStringValue("identity"),
      factorPayload.getStringValue("pushToken"),
      factorPayload.getStringValue("accessToken")
    )

  private fun toChallengeListPayload(challengeListPayload: ReadableMap) = ChallengeListPayload(
    challengeListPayload.getStringValue("factorSid"),
    challengeListPayload.getInt("pageSize"),
    mapStatus(challengeListPayload.getString("status")),
    challengeListPayload.getString("pageToken")
  )
}
