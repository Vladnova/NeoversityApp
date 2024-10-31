import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import MapView, { Marker, Region, PROVIDER_GOOGLE } from "react-native-maps";
import {RootStackParamList} from "../navigation/StackNavigator";
import {RouteProp} from "@react-navigation/native";

type MapScreenProps = {
    route: RouteProp<RootStackParamList, 'Location'>;
};


const MapScreen = ({route}: MapScreenProps) => {
    const { latitude, longitude } = route.params;

    const region: Region = {
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    };
    return (
        <View style={styles.container}>
            <MapView
                style={styles.mapStyle}
                region= {region}
                mapType="standard"
                minZoomLevel={5}
                onMapReady={() => console.log("Map is ready")}
                onRegionChange={() => console.log("Region change")}
            >
                <Marker
                    title="I am here"
                    coordinate={{ latitude, longitude }}
                    description='Hello'
                />
            </MapView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    mapStyle: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
    },
});

export default MapScreen;
