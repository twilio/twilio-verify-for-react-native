/*
 * Copyright (c) 2021 Twilio Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.twilio.verify.reactnative.example

import android.app.Application
import com.facebook.react.PackageList
import com.facebook.react.ReactApplication
import com.facebook.react.ReactNativeHost
import com.facebook.react.ReactPackage
import com.facebook.soloader.SoLoader
import com.facebook.react.soloader.OpenSourceMergedSoMapping
import com.twilio.verify.reactnative.RNTwilioVerifyPackage

class MainApplication : Application(), ReactApplication {

  private val mReactNativeHost: ReactNativeHost =
    object : ReactNativeHost(this) {
      override fun getUseDeveloperSupport(): Boolean {
        // For the example app, always enable developer support
        return true
      }

      override fun getPackages(): List<ReactPackage> {
        // Autolinking se encarga de incluir RNTwilioVerify automáticamente
        return PackageList(this).packages
      }

      override fun getJSMainModuleName(): String {
        return "index"
      }
    }

  override val reactNativeHost: ReactNativeHost
    get() = mReactNativeHost

  override fun onCreate() {
    super.onCreate()
    // 🔴 ANTES:
    // SoLoader.init(this, false)

    // 🟢 AHORA: inicializar con el merged mapping
    SoLoader.init(this, OpenSourceMergedSoMapping)
  }
}