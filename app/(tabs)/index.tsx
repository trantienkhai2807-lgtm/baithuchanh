import React, { useState } from 'react';
import {
  Dimensions, Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet, Text,
  TextInput, TouchableOpacity,
  View
} from 'react-native';

const { width } = Dimensions.get('window');

export default function App() {
  // Thứ tự màn hình: onboarding -> social_options -> input_phone -> verification -> location -> login -> signup
  const [currentScreen, setCurrentScreen] = useState('onboarding');
  const [socialType, setSocialType] = useState('Google');
  const [showPassword, setShowPassword] = useState(false);

  // --- 1. ONBOARDING ---
  const Onboarding = () => (
    <ImageBackground 
      source={{ uri: 'https://images.unsplash.com/photo-1502343019212-cc6a097839ca?q=80&w=1000&auto=format&fit=crop' }} 
      style={styles.fullFlex}
    >
      <View style={styles.overlay}>
        <View style={styles.centeredContent}>
          <Text style={{ fontSize: 60, marginBottom: 10 }}>🥕</Text>
          <Text style={styles.onboardingTitle}>Welcome{"\n"}to our store</Text>
          <TouchableOpacity style={styles.mainButton} onPress={() => setCurrentScreen('social_options')}>
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );

  // --- 2. SOCIAL OPTIONS ---
  const SocialOptions = () => (
    <SafeAreaView style={styles.whiteContainer}>
      <Image source={{ uri: 'https://img.freepik.com/free-photo/fresh-vegetables-with-copy-space_23-2148308860.jpg' }} style={styles.topImage} />
      <View style={styles.padding25}>
        <Text style={styles.headerTitle}>Get your groceries{"\n"}with nectar</Text>
        <TouchableOpacity style={styles.inputRow} onPress={() => setCurrentScreen('input_phone')}>
          <Text style={styles.flag}>🇧🇩</Text>
          <Text style={styles.inputTxt}>+880</Text>
          <Text style={{color: '#7C7C7C', marginLeft: 15, fontSize: 18}}>Enter mobile number</Text>
        </TouchableOpacity>
        <View style={{ alignItems: 'center', marginVertical: 35 }}>
          <Text style={{ color: '#7C7C7C' }}>or connect with social media</Text>
        </View>
        <TouchableOpacity style={[styles.socialBtn, { backgroundColor: '#5383EC' }]} onPress={() => { setSocialType('Google'); setCurrentScreen('login_social'); }}>
          <Text style={styles.socialIcon}>G</Text>
          <Text style={styles.socialText}>Continue with Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.socialBtn, { backgroundColor: '#4A66AC', marginTop: 15 }]} onPress={() => { setSocialType('Facebook'); setCurrentScreen('login_social'); }}>
          <Text style={styles.socialIcon}>f</Text>
          <Text style={styles.socialText}>Continue with Facebook</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );

  // --- 3. INPUT PHONE & VERIFICATION & LOCATION (Giữ nguyên luồng cũ) ---
  const InputPhoneScreen = () => (
    <SafeAreaView style={styles.whiteContainer}>
      <TouchableOpacity onPress={() => setCurrentScreen('social_options')} style={styles.backBtn}><Text style={styles.backTxt}>{"<"}</Text></TouchableOpacity>
      <View style={styles.padding25}>
        <Text style={styles.headerTitle}>Enter your mobile number</Text>
        <Text style={styles.label}>Mobile Number</Text>
        <View style={styles.inputContainer}>
          <View style={styles.countrySection}><Text style={styles.flag}>🇧🇩</Text><Text style={styles.inputTxt}>+880</Text></View>
          <View style={styles.vLine} />
          <TextInput style={[styles.inputTxt, {flex: 1, paddingLeft: 10}]} placeholder="000 000 000" keyboardType="phone-pad" autoFocus />
        </View>
        <View style={{ alignItems: 'flex-end', marginTop: 30 }}>
          <TouchableOpacity style={styles.nextCircleBtn} onPress={() => setCurrentScreen('verification')}>
            <Text style={styles.buttonText}>{">"}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );

  const Verification = () => (
    <SafeAreaView style={styles.whiteContainer}>
      <TouchableOpacity onPress={() => setCurrentScreen('input_phone')} style={styles.backBtn}><Text style={styles.backTxt}>{"<"}</Text></TouchableOpacity>
      <View style={styles.padding25}>
        <Text style={styles.headerTitle}>Enter your 4-digit code</Text>
        <TextInput style={styles.underlineInput} placeholder="- - - -" keyboardType="number-pad" maxLength={4} autoFocus />
        <View style={styles.rowBetween}>
          <TouchableOpacity><Text style={styles.greenLink}>Resend Code</Text></TouchableOpacity>
          <TouchableOpacity style={styles.nextCircleBtn} onPress={() => setCurrentScreen('location')}>
            <Text style={styles.buttonText}>{">"}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );

  const LocationScreen = () => (
    <SafeAreaView style={styles.whiteContainer}>
      <ScrollView contentContainerStyle={{alignItems: 'center', paddingHorizontal: 25}}>
        <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/854/854878.png' }} style={{width: 200, height: 170, marginTop: 40}} />
        <Text style={[styles.headerTitle, {textAlign: 'center'}]}>Select Your Location</Text>
        <View style={styles.fullWidth}>
          <Text style={styles.label}>Your Zone</Text>
          <View style={styles.dropdown}><Text style={styles.inputTxt}>Banasree</Text><Text style={styles.inputTxt}>⌄</Text></View>
          <View style={{height: 20}} />
          <Text style={styles.label}>Your Area</Text>
          <View style={styles.dropdown}><Text style={{color: '#B1B1B1', fontSize: 18}}>Types of your area</Text><Text style={styles.inputTxt}>⌄</Text></View>
        </View>
        <TouchableOpacity style={[styles.mainButton, {marginTop: 40}]} onPress={() => setCurrentScreen('login')}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );

  // --- 4. MÀN HÌNH LOG IN (MÀN HÌNH ĐẦU TIÊN SAU LOCATION) ---
  const LogIn = () => (
    <SafeAreaView style={styles.whiteContainer}>
      <ScrollView style={styles.padding25}>
        <Text style={[styles.logoGreen, {marginTop: 40}]}>   🥕</Text>
        <Text style={styles.headerTitle}>Loging</Text>
        <Text style={styles.label}>Enter your emails and password</Text>
        
        <View style={{marginTop: 30}}>
          <Text style={styles.label}>Email</Text>
          <TextInput style={styles.underlineInput} placeholder="example@gmail.com" keyboardType="email-address" />
          
          <Text style={[styles.label, {marginTop: 20}]}>Password</Text>
          <View style={styles.inputRowUnderline}>
            <TextInput style={{flex: 1, fontSize: 18}} secureTextEntry={!showPassword} placeholder="********" />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Text style={{fontSize: 20}}>{showPassword ? "👁️" : "🙈"}</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={{alignSelf: 'flex-end', marginTop: 15}}>
            <Text style={{color: '#181725', fontWeight: '500'}}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.mainButton, {marginTop: 30}]} onPress={() => alert('Logged In!')}>
            <Text style={styles.buttonText}>Log In</Text>
          </TouchableOpacity>

          <View style={styles.rowCenter}>
            <Text>Don't have an account? </Text>
            <TouchableOpacity onPress={() => setCurrentScreen('signup')}>
              <Text style={[styles.greenLink, {marginTop: 0, fontWeight: 'bold'}]}>Signup</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );

  // --- 5. MÀN HÌNH SIGN UP (CHUYỂN ĐẾN KHI NHẤN SIGNUP) ---
  const SignUp = () => (
    <SafeAreaView style={styles.whiteContainer}>
      <ScrollView style={styles.padding25}>
        <Text style={[styles.logoGreen, {marginTop: 40}]}>   🥕</Text>
        <Text style={styles.headerTitle}>Sign Up</Text>
        <Text style={styles.label}>Enter your credentials to continue</Text>
        
        <View style={{marginTop: 30}}>
          <Text style={styles.label}>Username</Text>
          <TextInput style={styles.underlineInput} placeholder="Afsar Hossen" />
          
          <Text style={[styles.label, {marginTop: 20}]}>Email</Text>
          <TextInput style={styles.underlineInput} placeholder="example@gmail.com" keyboardType="email-address" />

          <Text style={[styles.label, {marginTop: 20}]}>Password</Text>
          <View style={styles.inputRowUnderline}>
            <TextInput style={{flex: 1, fontSize: 18}} secureTextEntry={!showPassword} placeholder="********" />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Text style={{fontSize: 20}}>{showPassword ? "👁️" : "🙈"}</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.termsText}>
            By continuing you agree to our <Text style={styles.greenLink}>Terms of Service</Text> and <Text style={styles.greenLink}>Privacy Policy</Text>.
          </Text>

          <TouchableOpacity style={[styles.mainButton, {marginTop: 30}]} onPress={() => alert('Account Created!')}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>

          <View style={styles.rowCenter}>
            <Text>Already have an account? </Text>
            <TouchableOpacity onPress={() => setCurrentScreen('login')}>
              <Text style={[styles.greenLink, {marginTop: 0, fontWeight: 'bold'}]}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );

  // --- 6. SOCIAL LOGIN MOCK ---
  const SocialLoginMock = ({ type }: { type: string }) => (
    <SafeAreaView style={[styles.whiteContainer, {backgroundColor: '#f8f9fa'}]}>
      <TouchableOpacity onPress={() => setCurrentScreen('social_options')} style={styles.backBtn}><Text style={styles.backTxt}>{"✕"}</Text></TouchableOpacity>
      <View style={{flex: 1, justifyContent: 'center', padding: 25}}>
        <View style={styles.loginCard}>
          <Text style={[styles.headerTitle, {textAlign: 'center'}]}>Sign in with {type}</Text>
          <TextInput style={styles.underlineInput} placeholder="Username or Email" />
          <TextInput style={styles.underlineInput} placeholder="Password" secureTextEntry />
          <TouchableOpacity style={[styles.mainButton, {backgroundColor: type === 'Google' ? '#5383EC' : '#4A66AC', marginTop: 20}]} onPress={() => setCurrentScreen('location')}>
            <Text style={styles.buttonText}>Log In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );

  return (
    <View style={styles.fullFlex}>
      <StatusBar barStyle="dark-content" />
      {currentScreen === 'onboarding' && <Onboarding />}
      {currentScreen === 'social_options' && <SocialOptions />}
      {currentScreen === 'input_phone' && <InputPhoneScreen />}
      {currentScreen === 'login_social' && <SocialLoginMock type={socialType} />}
      {currentScreen === 'verification' && <Verification />}
      {currentScreen === 'location' && <LocationScreen />}
      {currentScreen === 'login' && <LogIn />}
      {currentScreen === 'signup' && <SignUp />}
    </View>
  );
}

const styles = StyleSheet.create({
  fullFlex: { flex: 1 },
  whiteContainer: { flex: 1, backgroundColor: 'white' },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  centeredContent: { padding: 30, alignItems: 'center', marginBottom: 70 },
  onboardingTitle: { color: 'white', fontSize: 48, fontWeight: 'bold', textAlign: 'center', marginBottom: 30 },
  mainButton: { backgroundColor: '#53B175', width: '100%', padding: 20, borderRadius: 15, alignItems: 'center' },
  buttonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  topImage: { width: '100%', height: 260 },
  padding25: { paddingHorizontal: 25 },
  headerTitle: { fontSize: 26, fontWeight: 'bold', marginVertical: 15, color: '#181725' },
  label: { color: '#7C7C7C', fontSize: 16, fontWeight: '600' },
  inputContainer: { flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#E2E2E2', paddingVertical: 10, marginTop: 15 },
  inputRow: { flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#E2E2E2', paddingVertical: 15, marginTop: 10 },
  inputRowUnderline: { flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#E2E2E2', paddingVertical: 10 },
  countrySection: { flexDirection: 'row', alignItems: 'center', paddingRight: 15 },
  vLine: { width: 1, height: 25, backgroundColor: '#E2E2E2' },
  flag: { fontSize: 25, marginRight: 10 },
  inputTxt: { fontSize: 18, color: '#181725' },
  nextCircleBtn: { backgroundColor: '#53B175', width: 60, height: 60, borderRadius: 30, justifyContent: 'center', alignItems: 'center' },
  socialBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 18, borderRadius: 15 },
  socialIcon: { color: 'white', fontSize: 22, fontWeight: 'bold', position: 'absolute', left: 25 },
  socialText: { color: 'white', fontSize: 16, fontWeight: '600' },
  backBtn: { padding: 20, marginTop: 10 },
  backTxt: { fontSize: 28, fontWeight: 'bold', color: '#181725' },
  underlineInput: { borderBottomWidth: 1, borderBottomColor: '#E2E2E2', paddingVertical: 10, fontSize: 18, color: '#181725', marginBottom: 10 },
  logoGreen: { fontSize: 55, alignSelf: 'center', marginBottom: 20 },
  fullWidth: { width: '100%', marginTop: 30 },
  dropdown: { flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: '#E2E2E2', paddingVertical: 15 },
  greenLink: { color: '#53B175', fontSize: 14, marginTop: 15 },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 20 },
  rowCenter: { flexDirection: 'row', justifyContent: 'center', marginTop: 25 },
  loginCard: { backgroundColor: 'white', padding: 25, borderRadius: 20, elevation: 5 },
  termsText: { color: '#7C7C7C', fontSize: 13, marginTop: 20, lineHeight: 20 }
});