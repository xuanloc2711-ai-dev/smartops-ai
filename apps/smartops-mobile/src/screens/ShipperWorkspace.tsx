import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import BarcodeScanner from '../components/BarcodeScanner';
import { useOfflineQueue } from '../hooks/useOfflineQueue';

export default function ShipperWorkspace() {
    const { isOnline, toggleNetwork, addToQueue, queue } = useOfflineQueue();

    const handleScan = (code: string) => {
        addToQueue('UPDATE_STATUS', { orderId: code, status: 'PICKED_UP' });
    };

    return (
        <View style={styles.container}>
            <View style={[styles.header, !isOnline && styles.headerOffline]}>
                <Text style={styles.headerText}>
                    SmartOps Shipper {isOnline ? '(Online)' : '(Offline Mode)'}
                </Text>
                <Text style={styles.queueText}>Queue: {queue.length} items</Text>
            </View>

            <BarcodeScanner onScan={handleScan} />

            <TouchableOpacity style={styles.networkBtn} onPress={toggleNetwork}>
                <Text style={styles.networkBtnText}>
                    Giả lập Tắt/Mở Mạng (Test Offline)
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingTop: 40,
    },
    header: {
        backgroundColor: '#2563EB',
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    headerOffline: {
        backgroundColor: '#F59E0B',
    },
    headerText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    queueText: {
        color: '#FFF',
        fontSize: 14,
    },
    networkBtn: {
        marginTop: 40,
        alignSelf: 'center',
        padding: 12,
        backgroundColor: '#64748B',
        borderRadius: 8,
    },
    networkBtnText: {
        color: 'white',
        fontWeight: '600'
    }
});
