import { View, Text, StyleSheet, Image } from "react-native";

import {ThemeColor} from "../app-config/theme";

function HistoryItem({
    id,
    imagesrc,
    address,
    weight,
    date    
}) {
    //console.log("address", address)
    return(
        <View style={styles.historyItem}>
            <View style={styles.historyItemTop}>
                <Image 
                    style={styles.historyImage}
                    source={imagesrc}
                />
            </View>
            <View style={styles.historyItemMid}>
                <Text style={styles.historyItemMidText}>{address}</Text>
                <Text style={styles.historyItemMidTextLow}>{date}</Text>
            </View>
            <View>
                <Text style={styles.historyItemBottomText}>{weight}kg</Text>
            </View>
        </View>
    )
}

export default HistoryItem;


const styles = StyleSheet.create({
    historyItem: {
        flexDirection: 'row',
        borderRadius: 5,
        shadowColor: '#808080',
        elevation: 1,
        alignItems: 'center',
        padding: 5,
        backgroundColor: ThemeColor.primary,
        marginBottom: 10,
    },
    historyImage: {
        width: 80,
        height: 80,
        borderColor: 'red',
        borderWidth: 1,
    },
    historyItemMid: {
        width: '60%',
        marginLeft: 5,
        marginRight: 5,
        borderColor: 'blue',
        borderWidth: 1,
    },
    historyItemMidText: {
        color: ThemeColor.whiteText,
    },
    historyItemMidTextLow: {
        fontWeight: "500",
        color: ThemeColor.whiteText,
        marginTop: 10,
    },
    historyItemBottomText: {
        fontWeight: "700",
        color: ThemeColor.whiteText,
    }
})