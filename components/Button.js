import { Pressable, StyleSheet, Text, View } from "react-native";

import { ThemeColor } from '../app-config/theme';

function Button({content, onPress}) {
    return(
        <Pressable style={({pressed}) => [styles.btnDesign, pressed && styles.btnPressed]} onPress={onPress}>
            <View>
                <Text style={styles.btnText}>{content}</Text>
            </View>
        </Pressable>
    );
}

export default Button;

const styles = StyleSheet.create({
    btnDesign: {
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
        backgroundColor: ThemeColor.primary,
        elevation: 2,
        shadowColor: 'black',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        height: 40
    },
    btnPressed: {
        opacity: 0.7
    },
    btnText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 14,
        fontWeight: "700"
    }
});