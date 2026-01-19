import Button from "@/components/Button";
import firestore from '@react-native-firebase/firestore';
import { Picker } from "@react-native-picker/picker";
import { useContext, useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import Input from 'react-phone-number-input/react-native-input';
import { TransactionsContext } from "./_layout";
import { barangayList } from "./register-screen";

export default function ManageAccountScreen() {
  
  const { userData, user } = useContext(TransactionsContext)
  const [newStreetAdress, setNewStreetAddress] = useState<string>(userData.address.street)
  const [newBarangay, setNewBarangay] = useState<string>(userData.address.barangay)
  const [allowEdit, setAllowEdit] = useState<boolean>(false)
  const [isProcessing, setIsProcessing] = useState<boolean>(false)

  async function updateAddress() {
    setIsProcessing(true)
    try {
      const updateAddress = await firestore()
        .collection('ecollector_users')
        .doc(user.uid)
        .update({'address.street': newStreetAdress, 'address.barangay': newBarangay})
        .then(handleCancel)
    } catch {
      Alert.alert('Error!')
    }
    setIsProcessing(false)
  }

  function handleAllowEdit() {
    setNewStreetAddress(userData.address.street)
    setNewBarangay(userData.address.barangay)
    setAllowEdit(true)
  }
  
  function handleCancel() {
    setAllowEdit(false)
    setNewStreetAddress(userData.address.street)
    setNewBarangay(userData.address.barangay)
  }

  return (
      <ScrollView contentContainerStyle={styles.manageAccountContainerStyle}>
          <Text style={styles.titleStyle}>Account Information</Text>
          <View style={{width: '85%'}}>
            <View style={styles.fieldGroupStyle}>
              <Text style={styles.labelStyle}>First Name</Text>
              <TextInput style={styles.inputStyle} value={userData.firstName} editable={false}></TextInput>
            </View>
            <View style={styles.fieldGroupStyle}>
              <Text style={styles.labelStyle}>Last Name</Text>
              <TextInput style={styles.inputStyle} value={userData.lastName} editable={false}></TextInput>
            </View>
            <View style={styles.fieldGroupStyle}>
              <Text style={styles.labelStyle}>Email</Text>
              <TextInput style={styles.inputStyle} value={userData.email} editable={false}></TextInput>
            </View>
            <View style={styles.fieldGroupStyle}>
              <Text style={styles.labelStyle}>Mobile Number</Text>
              <View style={styles.phoneInputStyle}>
                  <View style={styles.countryLogo}>
                      <Text>🇵🇭</Text>
                  </View>
                  <Input
                    country="PH"
                    international
                    withCountryCallingCode
                    onChange={() => {return}}
                    value={userData.mobileNumber}
                    editable={false}
                    style={{flex: 1, color: '#323232'}}
                  />
              </View>
            </View>
            <Text style={styles.noteStyle}>Editing of account information is disabled to prevent fraud or malicious activity. If there are required changes, please send an email to inquiries@ecollector.com</Text>
          </View>
          <Text style={[styles.titleStyle, {marginTop: '3%'}]}>Address Details</Text>
          <View style={{width: '85%', alignItems: 'center'}}>
            <View style={styles.fieldGroupStyle}>
              <Text style={styles.labelStyle}>Street Address</Text>
              <TextInput
                style={styles.inputStyle}
                defaultValue={userData.address.street}
                editable={allowEdit}
                onChange={text => setNewStreetAddress(text.nativeEvent.text)}
              />
            </View>
            <View style={styles.fieldGroupStyle}>
              <Text style={styles.labelStyle}>Barangay</Text>
              {
                !allowEdit ? <TextInput style={styles.inputStyle} value={userData.address.barangay} editable={allowEdit}></TextInput>
                : <View style={{width: '100%', justifyContent: 'center', height: 40, borderWidth: 1, borderRadius: 10, borderColor: '#D9D9D9'}}>
                  <Picker
                      selectedValue={userData.address.barangay}
                      onValueChange={(barangay) => {setNewBarangay(barangay)}}
                      style={{color: '#323232'}}
                      dropdownIconColor='#323232'
                  >
                          <Picker.Item key={0} label={'Select barangay'} value={undefined} style={{color: '#323232', fontSize: 14}}/>
                          { barangayList.map((item, index) => {
                              return <Picker.Item key={index} label={item} value={item} style={{color: '#323232', fontSize: 14}}/>
                          }) }
                  </Picker>
                </View>
              }
            </View>
            <View style={styles.fieldGroupStyle}>
              <Text style={styles.labelStyle}>Region</Text>
              <TextInput style={styles.inputStyle} value={userData.address.region} editable={false}></TextInput>
            </View>
            { !allowEdit ?
                <Button
                  text={'Edit address'}
                  width={'100%'}
                  height={40}
                  textSize={16}
                  style={{marginTop: 5}}
                  onPress={() => handleAllowEdit()}/>
              : <>
                  <Button
                    text={'Save changes'}
                    width={'100%'}
                    height={40}
                    textSize={16}
                    style={{marginTop: 5}}
                    onPress={() => updateAddress()}
                    disabled={(newStreetAdress === userData.address.street && newBarangay === userData.address.barangay) || isProcessing}
                  />
                  <Button
                    text={'Cancel'}
                    width={'100%'}
                    height={40}
                    textSize={16}
                    textColor={'#0E9D03'}
                    buttonColor={'rgba(14, 157, 3, 0.15)'}
                    style={{marginTop: 10}}
                    onPress={() => handleCancel()}
                  />
                </>
            }
          </View>
      </ScrollView>
  )
}

const styles = StyleSheet.create({
  manageAccountContainerStyle: {
    alignItems: 'center',
    paddingTop: '8%',
    paddingBottom: '20%',
  },
  titleStyle: {
    color: '#0E9D03',
    fontSize: 16,
    width: '85%',
    textAlign: 'left',
    marginBottom: 15,
  },
  labelStyle: {
    color: '#323232',
    fontWeight: 500,
    fontSize: 14,
    marginBottom: 5
  },
  fieldGroupStyle: {
    width: '100%',
    marginBottom: 15,
  },
  inputStyle: {
    width: '100%',
    height: 40,
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#D9D9D9',
    paddingLeft: 10,
    color: '#323232',
    textAlignVertical: 'center'
  },
  phoneInputStyle: {
    width: '100%',
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
  noteStyle: {
    color: '#D9D9D9',
    textAlign: 'justify'
  }
})

