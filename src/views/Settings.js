import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity, Dimensions, View, ScrollView, Text, AsyncStorage } from 'react-native'
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import Icon from "react-native-vector-icons/Ionicons";

const axios = require('axios');

const HEIGHT = Dimensions.get("window").height;
const WIDTH = Dimensions.get("window").width;

export default class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      name: '',
      uuid: '',
      role: ''
    };
  }
  handleNavigate = response => {
    this.props.navigation.navigate('Welcome', { response: response })
  }
  handleBack = () => {
    this.props.navigation.navigate('Login')
  }
  handleGetUser = async () => {
    try {
      const uuid = await AsyncStorage.getItem('uuid');
      const email = await AsyncStorage.getItem('email');
      const name = await AsyncStorage.getItem('name');
      const role = await AsyncStorage.getItem('role');
      await this.setState({
        email: email,
        name: name,
        uuid: uuid,
        role: role,
      })
      await console.log(this.state)
    } catch (error) {
      alert("Error in retrieving user in storage")
    }
  }
  handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('user');
      await this.props.navigation.replace("Login")
      await console.log('done removing user')
    } catch (error) {
      console.log('Error removing user')
    }
  }
  handleAddUser = () => {
    this.props.navigation.navigate("SignUp")
  }
  handleReset = () => {
    this.props.navigation.navigate("ForgotPassword")
  }
  componentDidMount() {
    this.handleGetUser()
  }
  render({ uuid, email, role, name } = this.state) {
    const adminView = (
      <TouchableOpacity onPress={this.handleAddUser}>
        <View style={styles.logoutContainer}>
          <View style={{ flex: 5 }}>
            <Text style={{ color: '#000' }}>Add User</Text>
          </View>
          <View style={styles.iconContainer}>
            <FontAwesome name='user-plus' size={25} color='#3D4EB8' style={{ margin: 5 }} />
          </View>
        </View>
      </TouchableOpacity>)
    return (
      <ScrollView contentContainerStyle={{ height: HEIGHT - 135 }}>
        <View style={styles.container}>
          <View style={styles.formContainer}>
            <Text style={styles.titleContainer}>Settings</Text>
            <View style={styles.itemContainer}>
              <View style={styles.profileContainer}>
                <View style={styles.iconContainer}>
                  <FontAwesome name='user-alt' size={25} color='#BFC0C0' style={{ marginBottom: 5 }} />
                </View>
                <Text style={styles.profileDetails}>{name}</Text>
              </View>
              <View style={styles.profileContainer}>
                <View style={styles.iconContainer}>
                  <Icon name='md-mail' size={30} color='#BFC0C0' />
                </View>
                <Text style={styles.profileDetails}>{email}</Text>
              </View>
              <View style={styles.profileContainer}>
                <View style={styles.iconContainer}>
                  <FontAwesome name='user-cog' size={25} color='#BFC0C0' style={{ margin: 4 }} />
                </View>
                <Text style={styles.profileDetails}>{role.toUpperCase()}</Text>
              </View>
            </View>
            <View style={styles.bottomContainer}>
              <View style={styles.line} />
              {role == 'admin' ? adminView : <View />}
              <TouchableOpacity onPress={this.handleReset}>
                <View style={styles.logoutContainer}>
                  <View style={{ flex: 5 }}>
                    <Text style={{ color: "#000" }}>Reset Password</Text>
                  </View>
                  <View style={styles.iconContainer}>
                    <FontAwesome name='unlock-alt' size={25} color='#FFC301' style={{ marginRight: 5, marginVertical: 5 }} />
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.handleLogout}>
                <View style={styles.logoutContainer}>
                  <View style={{ flex: 5 }}>
                    <Text style={{ color: "#000" }}>Log Out</Text>
                  </View>
                  <View style={styles.iconContainer}>
                    <FontAwesome name='sign-out-alt' size={25} color='#F6412C' style={{ marginRight: 5, marginVertical: 5 }} />
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

    )
  }
}
const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    flex: 1,
    width: WIDTH,
    marginBottom: 5,
    justifyContent: 'space-between',
  },
  titleContainer: {
    fontFamily: 'RobotoCondensed-Bold',
    fontSize: 35,
    color: '#000',
    marginVertical: 15,
    marginHorizontal: 20
  },
  iconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  line: {
    borderTopColor: "#bdbdbd",
    borderTopWidth: 1,
    width: WIDTH
  },
  itemContainer: {
    flex: 1,
  },
  bottomContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  profileContainer: {
    marginHorizontal: 5,
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    maxHeight: 50

  },
  logoutContainer: {
    marginHorizontal: 20,
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 10,
  },
  profileDetails: {
    flex: 5,
    maxHeight: 60,
    color: "#000"
  }
})

