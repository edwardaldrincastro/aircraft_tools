import { createMaterialTopTabNavigator, createAppContainer } from "react-navigation"
import { Tools, Scanner, Settings } from "../views"

const MenuTab = createMaterialTopTabNavigator({
    Scanner: Scanner,
    Tools: Tools,
    Settings: Settings,
},
    {
        initialRouteName: 'Scanner',
        headerLayoutPreset: 'center',
        tabBarPosition: 'bottom',
        tabBarOptions: {
            activeTintColor: '#fff',
            inactiveTintColor: '#fff',
            indicatorStyle: {
                backgroundColor: '#fff',
            },
            labelStyle: {
                fontSize: 14,
                fontWeight: 'bold'
            },
            style: {
                backgroundColor: '#28D8A1',
            }
        }
    })

const MenuTabContainer = createAppContainer(MenuTab)

export default MenuTabContainer