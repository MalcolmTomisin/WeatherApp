import React from 'react';
import { Modal, Image, View } from 'react-native';
import { Text } from './Text';
import Layout from '../constants/Layout';

export default function ImageModal(props) {
    return (
      <Modal
        visible={props.visible}
        transparent
        onRequestClose={props.onRequestClose}
        onDismiss={props.onDismiss}
        animationType="slide"
        style={{
          flex: 1,
          backgroundColor: "#333333cc",
        }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={{ uri: props.uri }}
            style={{
              width: Layout.DEVICE_WIDTH * 0.8,
              height: Layout.DEVICE_WIDTH * 1.064,
            }}
          />
        </View>
      </Modal>
    );
}