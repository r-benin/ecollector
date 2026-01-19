import Button from '@/components/Button';
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { OtpInput } from 'react-native-otp-entry';

import MaterialIcons from '@expo/vector-icons/MaterialIcons';

interface otpScreenProps {
    code: any,
    setCode: (code: any) => void,
    confirm: any,
    otpPhoneNumber: string
    setShouldRegister: (shouldRegister: boolean) => void
    shouldRegister: boolean
    registerStorage: any,
    setConfirm: (confirmation: any) => void,

}

export default function OTPScreen({ code, setCode, confirm, otpPhoneNumber, shouldRegister,  setShouldRegister, registerStorage, setConfirm} : otpScreenProps) {    
    
    type formInput = {
        otp: number
    }

    const {
        control,
        handleSubmit,
        setError,
    } = useForm<formInput>()

    const onSubmit: SubmitHandler<formInput> = async (otp) => {
        console.log('Trying to verify...')
        try {
            await confirm.confirm(otp['otp'])
            if (shouldRegister) {
                setShouldRegister(true)
            } else {
                setShouldRegister(false)
            }
        } catch {
            setError('otp', {message: 'Invalid code'})
        }
    }

    // Handles cancel button function
    function handleCancelButton() {
        console.log('Cancelled verification!')
        setConfirm(null)
    }

    return (
        <SafeAreaView style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity style={styles.backButtonStyle} onPress={() => handleCancelButton()}>
                <MaterialIcons name="arrow-back-ios-new" size={18} color='#0E9D03' />
                <Text style={{color: '#0E9D03', fontSize: 16}}>Cancel</Text>
            </TouchableOpacity>

            <View style={styles.otpWrapperStyle}>
                <Text style={{color: '#0E9D03', fontSize: 36, fontWeight: 'bold'}}>Verify OTP {shouldRegister}</Text>
                <View style={{alignItems: 'center', marginTop: 10, marginBottom: 20}}>
                    <Text>Enter the verification code sent to:</Text>
                    <Text style={{fontWeight: 'bold'}}>{otpPhoneNumber}</Text>
                </View>
                <Controller 
                    control={control}
                    name={'otp'}
                    rules={{required: 'Please enter the OTP verification code', minLength: {value: 6, message: 'Please enter a valid OTP code'}}}
                    render={({field: { onChange, onBlur} }) => {
                        return (
                            <OtpInput
                                numberOfDigits={6}
                                type='numeric'
                                onTextChange={onChange}
                                onBlur={onBlur}
                            />
                        )
                    }
                    }
                />
                <Button text={'Verify'} style={styles.verifyButtonStyle} width={'75%'} onPress={handleSubmit(onSubmit)}/>
            </View>
            
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    otpWrapperStyle: {
        width: '85%',
        height: 250,
        alignItems: 'center',
    },
    verifyButtonStyle: {
        marginTop: 20
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