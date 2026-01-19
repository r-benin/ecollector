import Button from "@/components/Button";
import auth, { signInWithPhoneNumber } from "@react-native-firebase/auth";
import { Alert, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Input from 'react-phone-number-input/react-native-input';

import { Controller, SubmitHandler, useForm } from "react-hook-form";

// Firestore imports
import firestore from '@react-native-firebase/firestore';
import { isValidPhoneNumber } from "react-phone-number-input";

interface loginScreenProps {
    setConfirm: (confirmation: any) => void
    setOTPPhoneNumber: (phoneNumber: any) => void
    setShouldRegister: (shouldRegister: boolean) => void
}

export default function LoginScreen({ setConfirm, setOTPPhoneNumber, setShouldRegister } : loginScreenProps) {

  type loginInput = {
    mobileNumber: string
  }

  const {
    control,
    handleSubmit,
    setError,
    setValue,
    formState: {errors}
  } = useForm<loginInput>({mode: 'onChange'})

  const onSubmit: SubmitHandler<loginInput> = async (form) => {
    const mobileNumber = form.mobileNumber
    const isNumberRegistered = await isRegistered(mobileNumber)

    try {
      if (!(isValidPhoneNumber(mobileNumber))) {
        setError('mobileNumber', {message: 'Please enter a valid phone number'})
      } else if (!isNumberRegistered) {
        setError('mobileNumber', {message: 'Account not found, please register.'})
      } else {
        const confirmation = await signInWithPhoneNumber(auth(), mobileNumber)
        setConfirm(confirmation)
        setOTPPhoneNumber(`0${mobileNumber.slice(3, 6)} ${mobileNumber.slice(6, 9)} ${mobileNumber.slice(9, 13)}`)
      }
    } catch (error) {
        Alert.alert(`Login failed! Please try again later. ${error}`,)
    }
  }

  // Check if mobile number is registered
  async function isRegistered(phoneNumber: string) {
    console.log(`${phoneNumber} is valid!`)
    const snapshot = await firestore().collection('registered_numbers')
      .doc(phoneNumber)
      .get()

    if (snapshot.exists()) {
      return true
    } else {
      return false
    }
  }

    return (
        <SafeAreaView style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
            <Image source={require('../assets/images/ecollector-logo.png')} style={styles.ecollectorLogo}/>
            <View style={styles.formWrapperStyle}>
              <View style={{height: 80}}>
                <Text style={{color: '#323232', marginBottom: 5}}>Mobile Number</Text>
                <View style={styles.phoneInputStyle}>
                    <View style={styles.countryLogo}>
                      <Text>🇵🇭</Text>
                    </View>
                    <Controller
                      control={control}
                      name="mobileNumber"
                      rules={{ required: "Mobile number is required.", pattern: { value: /^\+639\d{9}$/, message: "Please enter a valid 10-digit mobile number." } }}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                          country="PH"
                          international
                          withCountryCallingCode
                          countryCallingCodeEditable={false}
                          value={value}
                          onChange={text => {
                            if (text) {
                              setValue('mobileNumber', text, {shouldDirty: true})
                            }
                          }}
                          onBlur={onBlur}
                          limitMaxLength={true}
                          maxLength={16}
                          style={{flex: 1, color: '#323232'}}
                        />
                      )}
                    />
                </View>
                {errors.mobileNumber && <Text style={styles.errorText}>{errors.mobileNumber.message}</Text>}
              </View>
            </View>
            <Button
                text="Sign in"
                onPress={handleSubmit(onSubmit)}
                width={280}
                style={{marginTop: 20}}
            />
            <View style={{flexDirection: 'row', position: 'absolute', bottom: '8%'}}>
              <Text style={{color: '#323232'}}>Don&apos;t have an account yet? </Text>
              <TouchableOpacity onPress={() => setShouldRegister(true)} activeOpacity={0.7}>
                <Text style={{color: '#0E9D03'}}>Sign up</Text>
              </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
  ecollectorLogo: {
    width: 260,
    height: 100,
    resizeMode: "contain",
    marginBottom: 10,
  },
  formWrapperStyle: {
    width: '75%',
    alignItems: 'center'
  },
  countryLogo: {
    height: '100%',
    borderRightWidth: 1,
    borderColor: '#D9D9D9',
    justifyContent: 'center',
    paddingHorizontal: 15,
    marginRight: 5
  },
  phoneInputStyle: {
    width: 280,
    height: 40,
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#D9D9D9',
  },
  errorText: {
    fontSize: 12, 
    color: '#E33629',
    marginTop: 5
  }
})