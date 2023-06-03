import { AppRegistry } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import HomeScreen from './screens/HomeScreen'
import { createDrawerNavigator } from '@react-navigation/drawer'
import UsersScreen from './screens/UsersScreen'
import CategoriesScreen from './screens/CategoriesScreen'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { GlobalStyles } from './constants/styles'
import { Ionicons } from '@expo/vector-icons'
import ExpenseScreen from './screens/ExpenseScreen'
import IncomeScreen from './screens/IncomeScreen'
import { View, Text } from 'react-native'
import { useEffect, useState } from 'react'
import { initializeDatabase } from './DB/database'
import AppLoading from 'expo-app-loading'
import { fetchAllData } from './utils/db'
import { useDispatch } from 'react-redux'

const Drawer = createDrawerNavigator()
const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name='Summary'
        component={HomeScreen}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Ionicons name='stats-chart-outline' size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name='Expense'
        component={ExpenseScreen}
        options={{
          tabBarActiveTintColor: GlobalStyles.colors.expense.primary,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='arrow-forward-outline' size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name='Income'
        component={IncomeScreen}
        options={{
          tabBarActiveTintColor: GlobalStyles.colors.income.primary,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='arrow-back-outline' size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

export default function App() {
  const [dbInitialized, setDbInitialized] = useState(false)
  const dispatch = useDispatch()
  useEffect(() => {
    const init = async () => {
      try {
        await initializeDatabase()
        const { transactions, entities, categories, modes } =
          await fetchAllData()
        dispatch({ type: 'INITIALIZE_CATEGORIES', payload: categories })
        setDbInitialized(true)
      } catch (error) {
        console.log('INITIALIZATION FAILED', error)
      }
    }
    init()
  }, [])

  if (!dbInitialized) return <AppLoading />

  return (
    <View style={{ flexGrow: 1, backgroundColor: 'cyan' }}>
      <StatusBar style='light' />
      <NavigationContainer>
        <Drawer.Navigator>
          <Drawer.Screen name='Home' component={TabNavigator}></Drawer.Screen>
          <Drawer.Screen
            name='Users'
            component={UsersScreen}
            options={{
              headerStyle: {
                backgroundColor: GlobalStyles.colors.user.primary,
              },
              headerTintColor: 'white',
            }}
          />
          <Drawer.Screen
            name='Categories'
            component={CategoriesScreen}
            options={{
              headerStyle: {
                backgroundColor: GlobalStyles.colors.category.primary,
              },
              headerTintColor: 'white',
            }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </View>
  )
}

AppRegistry.registerComponent('expense-tracker', () => App)
