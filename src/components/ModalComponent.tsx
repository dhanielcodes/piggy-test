import {View, StyleSheet, Modal} from 'react-native';
import React, {ReactNode} from 'react';

interface ItemCard {
  modalVisible?: any;
  setModalVisible?: any;
  children?: ReactNode;
}

export default function ModalComponent({
  modalVisible,
  setModalVisible,
  children,
}: ItemCard): React.JSX.Element {
  return (
    <Modal
      animationType="slide" // Can be 'slide', 'fade', or 'none'
      transparent={true} // Makes the background transparent
      visible={modalVisible} // Visibility of the modal
      onRequestClose={() => setModalVisible(false)} // Android back button close
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContent}>{children}</View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)', // Semi-transparent background
  },
  modalContent: {
    width: '90%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5, // Shadow for Android
  },
});
