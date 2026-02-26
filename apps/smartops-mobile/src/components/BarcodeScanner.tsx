import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function BarcodeScanner({ onScan }: { onScan: (code: string) => void }) {
    const [scanned, setScanned] = useState(false);

    const MOCK_BARCODE = 'ORDER-12345';

    // Giả lập quét barcode
    const handleSimulateScan = () => {
        setScanned(true);
        onScan(MOCK_BARCODE);
        setTimeout(() => setScanned(false), 2000);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Quét Mã Đơn Hàng</Text>

            <View style={[styles.scannerBox, scanned && styles.scannerBoxSuccess]}>
                <Text style={styles.scannerText}>
                    {scanned ? 'Đã Quét Thành Công!' : 'Hướng camera vào mã vạch...'}
                </Text>
            </View>

            <TouchableOpacity
                style={styles.button}
                onPress={handleSimulateScan}
            >
                <Text style={styles.buttonText}>Giả Lập Quét (Test)</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#0F172A',
    },
    scannerBox: {
        width: 250,
        height: 250,
        borderWidth: 2,
        borderColor: '#CBD5E1',
        borderStyle: 'dashed',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
        backgroundColor: '#F8FAFC',
    },
    scannerBoxSuccess: {
        borderColor: '#10B981',
        backgroundColor: '#D1FAE5',
    },
    scannerText: {
        color: '#64748B',
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#2563EB',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    }
});
