import React, { Component } from 'react'
import { StyleSheet, Text, View, ScrollView, Image, ActivityIndicator, NetInfo, Modal, TouchableOpacity, Alert, Button } from 'react-native'

const axios = require('axios')

class Tools extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tools: [],
            modalVisible: false,
            name: '',
            img: null,
            description: ''

        };
    }
    setModalVisible = (name, img, description) => {
        this.setState({
            modalVisible: true,
            name: name,
            img: img,
            description: description
        })
    }
    async componentDidMount() {
        const response = await axios.get('https://aircraftmaintenance-350da.firebaseio.com/tools.json')
        data = response.data
        result = Object.keys(data).map(key => {
            return data[key]
        })
        await this.setTools(result)
    }
    setTools = (result) => {
        this.setState({
            tools: result
        })
    }
    static navigationOptions = {
        title: 'Tools'
    }
    render() {
        status = this.state.tools[0]
        myState = this.state.tools
        return (
            <View style={styles.container}>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        this.setState({ modalVisible: false });
                    }}>

                    <View style={{ flex: 1, alignItems: "center", justifyContent: "space-around" }}>
                        <Text style={{ fontSize: 26, fontWeight: "bold", color: "#000" }}>Tool Details:</Text>
                        <Text style={[styles.detailText, {textDecorationLine:"underline", fontWeight:"bold"}]}>{this.state.name}</Text>
                        <View style={{ width: "90%", backgroundColor:"#fff", borderRadius:25, elevation: 20 }}>
                            <Text style={styles.detailText}>{this.state.description}</Text>
                        </View>
                        <Image source={{ uri: this.state.img }} style={{ height: "50%", width: "80%" }} />
                        <Button title="Close" onPress={() => this.setState({ modalVisible: false })}></Button>

                    </View>
                </Modal>
                <ScrollView>
                    <Text style={styles.welcome}>List of Tools</Text>
                    {status ? myState.map((item, index) => {
                        return (
                            <TouchableOpacity key={index} onPress={this.setModalVisible.bind(this, item.name, item.image, item.description)}>
                                <View style={styles.renderItem}>
                                    <Text>{item.name}</Text>
                                    <Image source={{ uri: item.image }} style={{ height: 50, width: 50 }} />
                                </View>
                            </TouchableOpacity>

                        )
                    })
                        : <ActivityIndicator />}
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    renderItem: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        width: '100%',
        height: 60,
        borderBottomWidth: 1,
        borderBottomColor: '#e1e1e1',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    welcome: {
        textAlign: 'center',
        fontSize: 18,
        color: '#000',
        margin: 15,
    },
    detailText: {
        textAlign:"center",
        fontSize: 18,
        color: "#000"
    }
})

export default Tools