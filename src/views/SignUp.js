import React, { Component } from 'react'
import { StyleSheet, TextInput, TouchableOpacity, Dimensions, View, ScrollView, Text, ActivityIndicator, Picker } from 'react-native'
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import Icon from "react-native-vector-icons/Ionicons";

const axios = require('axios');

const HEIGHT = Dimensions.get("window").height;
const WIDTH = Dimensions.get("window").width;

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      name: '',
      password: '',
      role: 'user',
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
  handleNewUser = async (data) => {
    try {
      const response = await axios({
        method: 'put',
        url: 'https://aircraftmaintenance-350da.firebaseio.com/users/' + data.localId + '.json',
        responseType: 'json',
        data: {
          uuid: data.localId,
          email: data.email,
          name: data.displayName,
          role: this.state.role,
        }
      })
      await console.log(response.data)
    } catch ({ response }) {
      console.log("error", response)
    }
  }
  handleSignUp = async () => {
    const { email, name, password } = this.state
    this.handleSubmitting()
    if (name !== '') {
      try {
        const response = await axios({
          method: 'post',
          url: 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyC-LpB0znXrK4hwTT7eVaey909kpRRuJ1w',
          responseType: 'json',
          data: {
            email: email,
            password: password,
            displayName: name,
            returnSecureToken: true
          }
        })
        await this.handleSubmitting()
        await console.log(response.data)
        await this.handleNewUser(response.data)
        await this.handleNavigate(response.data)
      } catch ({ response }) {
        this.handleSubmitting()
        alert(response.data.error.errors[0].message)
        console.log("error", response)
      }
    } else {
      alert('MISSING NAME')
      this.setState({
        isSubmitting: false
      })
    }
  }
  handleNavigate = response => {
    this.props.navigation.navigate('Settings', { response: response })
  }
  handleBack = () => {
    this.props.navigation.navigate('Settings')
  }
  render() {
    const eye = this.state.showPassword ? "md-eye" : "md-eye-off"
    const { showPassword, isSubmitting } = this.state
    return (
      <ScrollView contentContainerStyle={{ height: HEIGHT - 80 }}>
        <View style={styles.container}>
          <View style={styles.formContainer}>
            <Text style={styles.titleContainer}>SIGN UP</Text>
            <View style={styles.usernameContainer}>
              <View style={styles.iconContainer}>
                <Icon name='md-mail' size={30} color='#BFC0C0' />
              </View>
              <TextInput
                onChangeText={this.handleInput('email')}
                placeholder='Enter email'
                keyboardType='email-address'
                style={{ flex: 5, maxHeight: 60 }} />
            </View>
            <View style={styles.usernameContainer}>
              <View style={styles.iconContainer}>
                <FontAwesome name='user-alt' size={24} color='#BFC0C0' />
              </View>
              <TextInput
                onChangeText={this.handleInput('name')}
                placeholder='Enter name'
                style={{ flex: 5, maxHeight: 60, }} />
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
            <View style={styles.pickerContainer}>
              <View style={styles.iconContainer}>
                <FontAwesome name='user-cog' size={24} color='#BFC0C0' />
              </View>
              <Picker
                selectedValue={this.state.role}
                style={{ height: 50, flex: 5 }}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({ role: itemValue })
                }>
                <Picker.Item label="User" value="user" />
                <Picker.Item label="Admin" value="admin" />
              </Picker>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={this.handleSignUp}>
                <View style={styles.buttonStyle}>
                  {isSubmitting ? <ActivityIndicator color='#fff' /> : <Text style={styles.buttonText}>Sign Up</Text>}
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
  titleContainer: {
    fontFamily: 'RobotoCondensed-Bold',
    fontSize: 35,
    color: '#000',
    marginVertical: 15
  },
  formContainer: {
    flex: 1,
    width: WIDTH - 60,
    margin: 30,
    justifyContent: 'center',
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
  pickerContainer: {
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
  }
})

