import React, { useState, useEffect } from 'react';
import { Modal, StyleSheet, View, Button, Platform } from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions'; // Импортируем expo-permissions для запроса разрешений

const CameraModal = ({ modalVisible, onClose }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getPermissions = async () => {
      if (Platform.OS === 'web') {
        setHasPermission(true); // Веб-платформа не требует разрешений
      } else {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        setHasPermission(status === 'granted');
      }
    };

    getPermissions();
  }, []);

  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);
    onClose(data);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => onClose(null)}
    >
      <View style={styles.modalContainer}>
        {hasPermission && (
          <Camera
            style={styles.camera}
            type={Camera.Constants.Type.back}
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          />
        )}
        {scanned && (
          <Button
            title={"Tap to Scan Again"}
            onPress={() => setScanned(false)}
          />
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  camera: {
    width: '100%',
    height: '100%',
  },
});

export default CameraModal;
