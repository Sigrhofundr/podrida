# Build Instructions for Podrida Android

## Prerequisites
- Android Studio installed.
- Java Development Kit (JDK) 11 or higher.

## Building for Testing (Debug)
You can build a debug APK using the command line:
```bash
cd android
./gradlew assembleDebug
```
The APK will be located at: `android/app/build/outputs/apk/debug/app-debug.apk`

## Building for Google Play (Release)

### 1. Generating a Keystore
If you don't have a keystore, generate one using keytool (included in JDK):
```bash
keytool -genkey -v -keystore my-release-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias my-key-alias
```
Keep this file safe!

### 2. Signing the App
1. Open the project in Android Studio:
   - Launch Android Studio
   - "Open" -> Select `d:\dev\podrida\podrida-android\android`
2. Go to **Build > Generate Signed Bundle / APK**.
3. Select **Android App Bundle** (best for Play Store) or **APK**.
4. Select your keystore file and enter passwords.
5. Select "release" build variant.
6. Click **Finish**.

The output file (`.aab` or `.apk`) will be ready to upload to the Google Play Console.

## Customization
- **Icon**: Replace the icons in `android/app/src/main/res/mipmap-*` folders. Android Studio's "Image Asset Studio" (Right click `res` -> New -> Image Asset) is the easiest way to generate these.
- **Name**: Change `app_name` in `android/app/src/main/res/values/strings.xml` if needed (currently "Segnapunti Podrida").
