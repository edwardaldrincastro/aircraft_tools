import React, { Component } from 'react'
import { View, TouchableOpacity, } from 'react-native'
import { createStackNavigator, createAppContainer } from "react-navigation"
import { Home, Result, Login, SignUp, ForgotPassword } from "../views"
import MenuTab from "./MenuTab";
import { Back } from "../utilities/icons"

const MainStack = createStackNavigator({
    Login: Login,
    Home: Home,
    Scanner: MenuTab,
    Result: Result,
    SignUp: SignUp,
    ForgotPassword: ForgotPassword
},
    {
        initialRouteName: 'Login',
        headerLayoutPreset: 'center',
        defaultNavigationOptions: ({ navigation }) => {
            return {
                title: 'Scanner',
                headerStyle: {
                    backgroundColor: '#28D8A1',
                },
                headerTitleStyle: {
                    color: '#fff',
                    fontSize: 22,
                    fontFamily: 'RobotoCondensed-Regular',
                    fontWeight: '200'
                },
                headerLeft: (
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <View style={{ paddingLeft: 20 }}>
                            <Back />
                        </View>
                    </TouchableOpacity>
                )

            }
        }
    })

const MainStackContainer = createAppContainer(MainStack)

export default MainStackContainer