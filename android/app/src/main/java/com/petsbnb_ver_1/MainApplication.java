package com.petsbnb_ver_1;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.iamport.IamportPackage;
import io.invertase.firebase.RNFirebasePackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.imagepicker.ImagePickerPackage;
import com.rnrestartandroid.RNRestartAndroidPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.brentvatne.react.ReactVideoPackage;
import io.invertase.firebase.messaging.RNFirebaseMessagingPackage;
import java.util.Arrays;
import java.util.List;
import io.invertase.firebase.notifications.RNFirebaseNotificationsPackage;
public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new IamportPackage(),
            new RNFirebasePackage(),
          new RNFetchBlobPackage(),
          new ImagePickerPackage(),
          new RNRestartAndroidPackage(),
          new VectorIconsPackage(),
          new ReactVideoPackage(),
              new RNFirebaseMessagingPackage(),
              new RNFirebaseNotificationsPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}