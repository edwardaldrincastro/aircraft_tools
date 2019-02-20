import React, { Component } from 'react'
import { StyleSheet, TextInput, TouchableOpacity, Dimensions, View, ScrollView, Text, ActivityIndicator } from 'react-native'
import Icon from "react-native-vector-icons/Ionicons";

const axios = require('axios');

const HEIGHT = Dimensions.get("window").height;
const WIDTH = Dimensions.get("window").width;
export default class ForgotPassword extends Component {
  static navigationOptions = {
    headerTitle: "Reset Password"
  }
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      isSubmitting: false
    };
  }
  handleSubmitting = () => {
    this.setState({
      isSubmitting: !this.state.isSubmitting
    })
  }

  handleInput = fieldName => text => {
    this.setState({
      [fieldName]: text
    })
  }

  handleForgotPassword = async () => {
    const { email } = this.state
    this.handleSubmitting()
    try {
      const response = await axios({
        method: 'post',
        url: 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/getOobConfirmationCode?key=AIzaSyC-LpB0znXrK4hwTT7eVaey909kpRRuJ1w',
        responseType: 'json',
        data: {
          requestType: "PASSWORD_RESET",
          email: email,
          returnSecureToken: true
        }
      })
      await this.handleSubmitting()
      await console.log(response.data)
      await this.handleNavigate(response.data)
    } catch ({ response }) {
      this.handleSubmitting()
      alert(response.data.error.errors[0].message)
    }
  }
  handleNavigate = () => {
    this.props.navigation.goBack()
  }
  render() {
    const { isSubmitting } = this.state
    return (
      <ScrollView contentContainerStyle={{ height: HEIGHT }}>
        <View style={styles.container}>
          <View style={styles.formContainer}>
            <Text style={styles.title}>RESET PASSWORD</Text>
            <View style={styles.emailContainer}>
              <View style={styles.iconContainer}>
                <Icon name='md-mail' size={30} color='#BFC0C0' />
              </View>
              <TextInput
                onChangeText={this.handleInput('email')}
                placeholder='Enter email'
                keyboardType='email-address'
                style={{ flex: 5, maxHeight: 60 }} />
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={this.handleForgotPassword}>
                <View style={styles.buttonStyle}>
                  {isSubmitting ? <ActivityIndicator color='#fff' /> : <Text style={styles.buttonText}>Reset Password</Text>}
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
  title: {
    fontFamily: 'RobotoBlack',
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
  emailContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 15,
    borderBottomColor: "#28D8A1",
    borderBottomWidth: 1,
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
})

