import { Modal, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import QRCodeStyled from 'react-native-qrcode-styled';
import Button from './Button';

interface QRModalType {
    onRequestClose: () => void
    visible: boolean
    QRData: string
}

export default function QRModal({ onRequestClose, visible, QRData } : QRModalType) {
    function handleCloseModal() {
        onRequestClose()
    }

    return (
        <Modal
            animationType='fade'
            onRequestClose={onRequestClose}
            visible={visible}
            statusBarTranslucent
            transparent
        >   
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <View style={styles.QRModalStyle}>
                    <QRCodeStyled
                        data={QRData}
                        size={220}
                        color={'#0E9D03'}
                    />
                    <Button text={'Close'}
                        textColor={'#0E9D03'}
                        buttonColor='rgba(14, 157, 3, 0.15)'
                        preset={'solid'}
                        textSize={16}
                        width={'75%'}  
                        style={{marginTop: 20}}
                        onPress={() => handleCloseModal()}
                    />
                </View>
                <TouchableWithoutFeedback onPress={() => handleCloseModal()}>
                    <View style={styles.modalBackdrop}>
                    </View>
                </TouchableWithoutFeedback>
            </View>
            
        </Modal>
    )

}

const styles = StyleSheet.create({
    QRModalStyle: {
        height: 340,
        width: '70%',
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    modalBackdrop: {
        height: '100%',
        width: '100%',
        opacity: 0.5,
        backgroundColor: 'black',
        zIndex: -1,
        position: 'absolute'
    }
})