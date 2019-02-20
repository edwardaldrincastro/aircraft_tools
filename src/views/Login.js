import React, { Component } from 'react'
import { StyleSheet, TextInput, TouchableOpacity, Dimensions, View, ScrollView, Text, ActivityIndicator, AsyncStorage } from 'react-native'
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import Icon from "react-native-vector-icons/Ionicons";

const axios = require('axios');

const HEIGHT = Dimensions.get("window").height;
const WIDTH = Dimensions.get("window").width;


export default class Login extends Component {
  static navigationOptions = {
    header: null
  }
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      showPassword: false,
      isSubmitting: false
    };
  }

  handleSubmitting = () => {
    this.setState({
      isSubmitting: !this.state.isSubmitting
    })
  }

  handleShowPassword = () => {
    this.setState({
      showPassword: !this.state.showPassword
    })
  }

  handleInput = fieldName => text => {
    this.setState({
      [fieldName]: text
    })
  }
  handleSaveUser = async (data) => {
    try {
      await AsyncStorage.setItem('uuid', data.uuid);
      await AsyncStorage.setItem('email', data.email);
      await AsyncStorage.setItem('name', data.name);
      await AsyncStorage.setItem('role', data.role);
      await !response.error ? this.props.navigation.navigate('Home', { response: response.data }) : alert(response.error)
    } catch (error) {
      alert("Error in saving user in storage")
    }
  }
  handleRole = async (data) => {
    response = await axios.get('https://aircraftmaintenance-350da.firebaseio.com/users/' + data.localId + '.json')
    await this.handleSaveUser(response.data)
    await this.handleSubmitting()
  }
  handleLogin = async () => {
    const { email, password } = this.state
    this.handleSubmitting()
    try {
      const response = await axios({
        method: 'post',
        url: 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyC-LpB0znXrK4hwTT7eVaey909kpRRuJ1w',
        responseType: 'json',
        data: {
          email: email,
          password: password,
          returnSecureToken: true
        }
      })
      await this.handleRole(response.data)
    } catch ({ response }) {
      this.handleSubmitting()
      alert(response.data.error.errors[0].message)
    }

  }
  handleForgotPassword = () => {
    this.props.navigation.navigate('ForgotPassword')
  }

  render() {
    const eye = this.state.showPassword ? "md-eye" : "md-eye-off"
    const { showPassword, isSubmitting } = this.state
    return (
      <ScrollView contentContainerStyle={{ height: HEIGHT - 70 }}>
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <FontAwesome name='plane' size={70} color='#000' />
            <View style={styles.nameContainer}>
              <Text style={{ fontFamily: 'RobotoBlack', fontSize: 45, color: '#000' }}>TOOL</Text>
              <Text style={{ fontFamily: 'RobotoBlack', fontSize: 45, color: '#28D8A1' }}>S</Text>
            </View>
          </View>
          <View style={styles.formContainer}>
            <View style={styles.usernameContainer}>
              <View style={styles.iconContainer}>
                <Icon name='md-mail' size={30} color='#BFC0C0' />
              </View>
              <TextInput
                onChangeText={this.handleInput('email')}
                placeholder='Enter email'
                style={{ flex: 5, maxHeight: 60 }} />
            </View>
            <View style={styles.passwordContainer}>
              <View style={styles.iconContainer}>
                <Icon name='md-lock' size={30} color='#BFC0C0' />
              </View>
              <TextInput
                onChangeText={this.handleInput('password')}
                placeholder='Enter password'
                secureTextEntry={!showPassword}
                style={{ flex: 4, maxHeight: 60 }} />
              <View style={styles.iconContainer}>
                <Icon onPress={this.handleShowPassword} name={eye} size={20} color='#BFC0C0' />
              </View>
            </View>
            <Text style={styles.forgotText} onPress={this.handleForgotPassword}>Forgot Password?</Text>
            <View style={styles.buttonContainer}>

              <TouchableOpacity onPress={this.handleLogin}>
                <View style={styles.buttonStyle}>
                  {isSubmitting ? <ActivityIndicator color='#fff' /> : <Text style={styles.buttonText}>Log In</Text>}
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
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    maxHeight: HEIGHT * 0.3,
  },
  formContainer: {
    flex: 1,
    width: WIDTH - 60,
    margin: 30,
  },
  iconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  usernameContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 15,
    borderBottomColor: "#28D8A1",
    borderBottomWidth: 1,

  },
  passwordContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 15,
    borderBottomColor: "#28D8A1",
    borderBottomWidth: 1
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonStyle: {
    marginVertical: 15,
    marginHorizontal: 15,
    width: WIDTH * 0.8,
    height: 50,
    borderRadius: 50 / 2,
    backgroundColor: '#28D8A1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'RobotoBlack'
  },
  forgotText: {
    fontSize: 14,
    fontFamily: 'RobotoBold',
    color: '#28D8A1',
    textAlign: 'right',
    margin: 15

  },
  nameContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 15,
    flexDirection: 'row',
  }
})

