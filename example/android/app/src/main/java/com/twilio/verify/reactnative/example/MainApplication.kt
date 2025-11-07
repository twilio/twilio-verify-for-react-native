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
import android.content.Context
import com.facebook.react.PackageList
import com.facebook.react.ReactApplication
import com.facebook.react.ReactInstanceManager
import com.facebook.react.ReactNativeHost
import com.facebook.react.ReactPackage
import com.facebook.soloader.SoLoader
import com.twilio.verify.reactnative.RNTwilioVerifyPackage
import java.lang.reflect.InvocationTargetException

class MainApplication : Application(), ReactApplication {

  private val mReactNativeHost: ReactNativeHost =
          object : ReactNativeHost(this) {
            override fun getUseDeveloperSupport(): Boolean {
              return BuildConfig.DEBUG
            }

            override fun getPackages(): List<ReactPackage> {
              val packages = PackageList(this).packages
              // Packages that cannot be autolinked yet can be added manually here, for
              // RNTwilioVerifyExample:
              // packages.add(MyReactNativePackage())
              packages.add(RNTwilioVerifyPackage())
              return packages
            }

            override fun getJSMainModuleName(): String {
              return "index"
            }
          }

  override fun getReactNativeHost(): ReactNativeHost {
    return mReactNativeHost
  }

  override fun onCreate() {
    super.onCreate()
    SoLoader.init(this, false)
    initializeFlipper(
            this,
            reactNativeHost.reactInstanceManager
    ) // Remove this line if you don't want Flipper enabled
  }

  companion object {
    /**
     * Loads Flipper in React Native templates.
     *
     * @param context
     */
    private fun initializeFlipper(context: Context, reactInstanceManager: ReactInstanceManager) {
      if (BuildConfig.DEBUG) {
        try {
          /*
           We use reflection here to pick up the class that initializes Flipper,
          since Flipper library is not available in release mode
          */
          val aClass = Class.forName("com.twilio.verify.reactnative.example.ReactNativeFlipper")
          aClass.getMethod(
                          "initializeFlipper",
                          Context::class.java,
                          ReactInstanceManager::class.java
                  )
                  .invoke(null, context, reactInstanceManager)
        } catch (e: ClassNotFoundException) {
          e.printStackTrace()
        } catch (e: NoSuchMethodException) {
          e.printStackTrace()
        } catch (e: IllegalAccessException) {
          e.printStackTrace()
        } catch (e: InvocationTargetException) {
          e.printStackTrace()
        }
      }
    }
  }
}
