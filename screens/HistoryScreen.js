import { View, StyleSheet, FlatList } from "react-native";
import React, { useState, useEffect, useContext } from 'react';
import Constants from 'expo-constants';

import HistoryItem from "../components/HistoryItem";
import { AuthContext } from "../service/AuthContext";
import { BASE_URL } from "../app-config/accessData";

function HistoryScreen() {
    const {userData} = useContext(AuthContext);
    const [historyData, setHistoryData] = useState("");

    const image = 'https://reactnative.dev/img/tiny_logo.png'

            //imagesrc={require(`../backend/public/images/${itemData.req_image}`)}
            // imagesrc={require("../assets/happy-sun-rafiki.png")}
    function renderHistoryItem(itemData) {
        return <HistoryItem 
                    id={itemData.item.req_id}
                    imagesrc={{uri: `${itemData.item.req_image}`}}
                    address={itemData.item.req_location}
                    weight={itemData.item.req_weight}
                    date={itemData.item.req_date}
                />;
    }
          
    const url = `${BASE_URL}/api/requests/${userData.id}`;

        fetch(url, {
          method: 'GET',
        })
        .then((response) => response.json())
        .then((json) => {
            setHistoryData(json.data)
            //console.log(historyData);
        })

    return(
        <View style={styles.container}>
            <FlatList 
                data={historyData}
                renderItem={renderHistoryItem}
                keyExtractor={(item) => item.req_id}
            />
            {/* <HistoryItem 
                imagesrc={{uri: `${image}`}}
                address="Elevation is also useful to create animations where widgets temporarily rise above the view"
                weight="1000"
                date="22-08-2022"
            /> */}
        </View>
    )
}

export default HistoryScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        paddingTop: Constants.statusBarHeight + 10,
    },
})