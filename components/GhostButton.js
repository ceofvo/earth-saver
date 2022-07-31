import { Pressable, StyleSheet, Text, View } from "react-native";

import { ThemeColor } from '../app-config/theme';

function GhostButton({content, onPress, textAlign, type}) {
    if (type === "show") {
        return(
            <Pressable 
                style={({pressed}) => [styles.btnDesignFull, pressed && styles.btnPressed]} 
                onPress={onPress}>
                <View>
                    <Text style={[styles.btnText, {textAlign}]} >{content}</Text>
                </View>
            </Pressable>
        );   
    } else {
        return(
            <Pressable 
                style={({pressed}) => [styles.btnDesign, pressed && styles.btnPressed]} 
                onPress={onPress}>
                <View>
                    <Text style={[styles.btnText, {textAlign}]} >{content}</Text>
                </View>
            </Pressable>
        );    
    }
}

export default GhostButton;

const styles = StyleSheet.create({
    btnDesign: {
        paddingVertical: 10,
        paddingHorizontal: 12,
        height: 40,
    },
    btnDesignFull: {
        paddingVertical: 10,
        paddingHorizontal: 12,
        height: 40,
        borderWidth: 1,
        borderRadius: 10,
        marginTop: 20,
        borderColor: ThemeColor.primary
    },
    btnPressed: {
        opacity: 0.7
    },
    btnText: {
        color: ThemeColor.textColor,
        fontSize: 14,
    }   
});