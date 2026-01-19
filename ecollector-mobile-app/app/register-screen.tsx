import Button from '@/components/Button';
import { Picker } from '@react-native-picker/picker';
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Alert, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Input from 'react-phone-number-input/react-native-input';

import auth, { signInWithPhoneNumber } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import MaterialIcons from '@expo/vector-icons/MaterialIcons';

interface registerScreenProps {
    setConfirm: (confirmation: any) => void
    setOTPPhoneNumber: (phoneNumber: any) => void
    registerStorage: any
    updateRegisterStorage: (data: any) => void
    setShouldRegister: (shouldRegister: boolean) => void
}

// types/Barangay.ts

type barangayType =
  | "Arkong Bato"
  | "Bagbaguin"
  | "Balangkas"
  | "Parada"
  | "Bignay"
  | "Bisig"
  | "Canumay East"
  | "Canumay West"
  | "Karuhatan"
  | "Coloong"
  | "Dalandanan"
  | "Gen. T. De Leon"
  | "Isla"
  | "Lawang Bato"
  | "Lingunan"
  | "Mabolo"
  | "Malanday"
  | "Malinta"
  | "Mapulang Lupa"
  | "Marulas"
  | "Maysan"
  | "Palasan"
  | "Pariancillo Villa"
  | "Paso De Blas"
  | "Pasolo"
  | "Poblacion"
  | "Pulo"
  | "Punturin"
  | "Rincon"
  | "Tagalag"
  | "Ugong"
  | "Viente Reales"
  | "Wawang Pulo";

export const barangayList: barangayType[] = [
  "Arkong Bato",
  "Bagbaguin",
  "Balangkas",
  "Parada",
  "Bignay",
  "Bisig",
  "Canumay East",
  "Canumay West",
  "Karuhatan",
  "Coloong",
  "Dalandanan",
  "Gen. T. De Leon",
  "Isla",
  "Lawang Bato",
  "Lingunan",
  "Mabolo",
  "Malanday",
  "Malinta",
  "Mapulang Lupa",
  "Marulas",
  "Maysan",
  "Palasan",
  "Pariancillo Villa",
  "Paso De Blas",
  "Pasolo",
  "Poblacion",
  "Pulo",
  "Punturin",
  "Rincon",
  "Tagalag",
  "Ugong",
  "Viente Reales",
  "Wawang Pulo",
];

export default function RegisterScreen({setConfirm, setOTPPhoneNumber, updateRegisterStorage, registerStorage, setShouldRegister} : registerScreenProps) {    
    // Form hooks
    type formInputs = {
        firstName: string
        lastName: string
        email: string
        mobileNumber: string
        streetAddress: string
        barangay: barangayType
    }
    
    const {
        control,
        handleSubmit,
        watch,
        setValue,
        setError,
        formState: { errors },
    } = useForm<formInputs>({mode: 'onChange', defaultValues: registerStorage ? registerStorage : null})

    const onSubmit: SubmitHandler<formInputs> = async (data) => {
        const isNumberRegistered = await isRegistered(data.mobileNumber)
        try {
            if (isNumberRegistered) {
                setError('mobileNumber', {message: 'Mobile number already registered, please log in instead'})
                updateRegisterStorage({...data,
                    firstName: data.firstName.replace(/[^a-zA-Z ]/g, ''),
                    lastName: data.lastName.replace(/[^a-zA-Z ]/g, ''),
                    streetAddress: data.streetAddress.replace(/[^a-zA-Z0-9 ]/g, '')
                })
            } else {
                console.log('REGISTER: ', data)
                updateRegisterStorage(data)
                setOTPPhoneNumber(`0${data.mobileNumber.slice(3, 6)} ${data.mobileNumber.slice(6, 9)} ${data.mobileNumber.slice(9, 13)}`)
                const confirmation = await signInWithPhoneNumber(auth(), data.mobileNumber)
                setConfirm(confirmation)
            }
        } catch (error) {
            Alert.alert('Error!', `${error}`)
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
        <SafeAreaView style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>

            <TouchableOpacity style={styles.backButtonStyle} onPress={() => setShouldRegister(false)}>
                <MaterialIcons name="arrow-back-ios-new" size={18} color='#0E9D03' />
                <Text style={{color: '#0E9D03', fontSize: 16}}>Cancel</Text>
            </TouchableOpacity>

            <Text style={{color: '#0E9D03', fontSize: 36, fontWeight: 'bold', marginBottom: -5}}>Create an account</Text>
            <Text style={{color: 'rgba(14, 157, 3, 0.8)', fontSize: 14, fontWeight: 'regular', marginBottom: 20}}>Start recycling your used cooking oil</Text>
            <View style={{gap: 10}}>
                
                {/* First Name */}
                <View style={styles.formGroup}>
                    <Text style={{ color: '#323232', marginBottom: 5 }}>First Name</Text>
                    <Controller
                        control={control}
                        name="firstName"
                        rules={{ required: "First name is required.", maxLength: { value: 80, message: "Max length is 80." } }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                style={styles.inputStyle}
                                placeholder="Enter your first name"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                    />
                    {errors.firstName && <Text style={styles.errorText}>{errors.firstName.message || "Invalid first name"}</Text>}
                </View>
                
                {/* Last Name */}
                <View style={styles.formGroup}>
                    <Text style={{ color: '#323232', marginBottom: 5 }}>Last Name</Text>
                    <Controller
                        control={control}
                        name="lastName"
                        rules={{ required: "Last name is required.", maxLength: { value: 100, message: "Max length is 100." } }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                style={styles.inputStyle}
                                placeholder="Enter your last name"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                    />
                    {errors.lastName && <Text style={styles.errorText}>{errors.lastName.message || "Invalid last name"}</Text>}
                </View>

                {/* Email */}
                <View style={styles.formGroup}>
                    <Text style={{ color: '#323232', marginBottom: 5 }}>Email</Text>
                    <Controller
                        control={control}
                        name="email"
                        rules={{ required: "Email is required.", pattern: { value: /^\S+@\S+$/i, message: "Invalid email address." } }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                style={styles.inputStyle}
                                placeholder="Enter a valid email address"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                    />
                    {errors.email && <Text style={styles.errorText}>{errors.email.message || "Invalid email"}</Text>}
                </View>

                {/* Street Address */}
                <View style={styles.formGroup}>
                    <Text style={{ color: '#323232', marginBottom: 5 }}>House No. / Street Address</Text>
                    <Controller
                        control={control}
                        name="streetAddress"
                        rules={{ required: "Street address is required.",  maxLength: { value: 100, message: "Max length is 100." }}}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                style={styles.inputStyle}
                                placeholder="Enter your house no. / street address"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                    />
                    {errors.streetAddress && <Text style={styles.errorText}>{errors.streetAddress.message}</Text>}
                </View> 
                
                {/* Barangay */}
                <View style={styles.formGroup}>
                    <Text style={{ color: '#323232', marginBottom: 5 }}>Barangay</Text>
                    <Controller
                        control={control}
                        name="barangay"
                        rules={{ required: "Barangay is required.",  maxLength: { value: 100, message: "Max length is 100." }}}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <View style={{width: 280, justifyContent: 'center', height: 40, borderWidth: 1, borderRadius: 10, borderColor: '#D9D9D9'}}>
                                <Picker
                                    selectedValue={value}
                                    onValueChange={onChange}
                                    onBlur={onBlur}
                                    style={{color: '#323232'}}
                                    dropdownIconColor='#323232'
                                >
                                        <Picker.Item key={0} label={'Select barangay'} value={undefined} style={{color: '#323232', fontSize: 14}}/>
                                        { barangayList.map((item, index) => {
                                            return <Picker.Item key={index} label={item} value={item} style={{color: '#323232', fontSize: 14}}/>
                                        }) }
                                </Picker>
                            </View>
                        )}
                    />
                    {errors.barangay && <Text style={styles.errorText}>{errors.barangay.message}</Text>}
                </View> 

                {/* Phone Number */}
                <View style={[styles.formGroup]}>
                    <Text style={{ color: '#323232', marginBottom: 5 }}>Phone Number</Text>
                    <View style={styles.phoneInputStyle}>
                        <View style={styles.countryLogo}>
                            <Text>🇵🇭</Text>
                        </View>
                        {/* <Text style={{textAlignVertical: 'center', marginHorizontal: 5}}>+63</Text> */}
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
                    {errors.mobileNumber && <Text style={styles.errorText}>{errors.mobileNumber.message || "Invalid mobile number"}</Text>}
                </View>
            </View>
            <Button text={'Sign Up'} style={styles.signUpButtonStyle} width={'70%'} onPress={handleSubmit(onSubmit)}/>
            <Text style={{width: '70%', color: 'rgba(50, 50, 50, 0.8)', fontSize: 10, marginTop: 5}}>By signing up, you confirm that you agree to our Terms of Use and Privacy Policy.</Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    inputStyle: {
        width: 280,
        height: 40,
        flexDirection: 'row',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#D9D9D9',
        paddingLeft: 10,
        color: '#323232'
    },
    phoneInputStyle: {
        width: 280,
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#D9D9D9',
    },
    countryLogo: {
        height: '100%',
        borderRightWidth: 1,
        borderColor: '#D9D9D9',
        justifyContent: 'center',
        paddingHorizontal: 15,
        marginRight: 5,
    },
    errorText: {
        fontSize: 10,
        color: '#E33629',
        width: 280,
    },
    signUpButtonStyle: {
        marginTop: 15
    },
    formGroup: {
        height: 75,
    },
    backButtonStyle: {
        position: 'absolute',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5,
        top: '6%',
        left: 15
    }
})