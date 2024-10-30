import React, { useContext, useEffect, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import RecentScreen from './screens/RecentScreen';
import AllExpensesScreen from './screens/AllExpenseScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Colors } from './constants/colors';
import { Image, Dimensions } from 'react-native';
import BottomModal, { BottomModalRef } from './components/ui/BottomModal';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ExpenseContextProvider, { Expense, ExpenseContext } from './store/ExpenseContext';
import { getAllExpense, init } from './utils/Database';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const Tab = createBottomTabNavigator();

function BottomNavigation({ onHeaderRightPress }: { onHeaderRightPress: () => void }) {
  return (
    <Tab.Navigator
      initialRouteName="RecentExpenses"
      screenOptions={{
        tabBarStyle: {
          backgroundColor: Colors.primary400,
          height: 60,
          paddingBottom: 10,
          paddingTop: 10,
          borderTopColor: Colors.text,
        },
        headerStyle: {
          backgroundColor: Colors.primary400,
        },
        headerTitleStyle: {
          color: Colors.white,
        },
        tabBarActiveTintColor: Colors.white,
        tabBarInactiveTintColor: Colors.text,
        tabBarLabelPosition: 'beside-icon',
        headerLeft: () => {
          return <Image style={{ width: 40, height: 40 }} source={require('./assets/logo.png')} />;
        },
        headerLeftContainerStyle: {
          width: 100,
          paddingLeft: 10,
        },
        headerRight: () => {
          return (
            <MaterialCommunityIcons
              name="plus-box"
              color={Colors.white}
              size={27}
              onPress={onHeaderRightPress}
            />
          );
        },
        headerRightContainerStyle: {
          paddingRight: 17,
          width: 100,
        },
      }}
    >
      <Tab.Screen
        name="RecentExpenses"
        component={RecentScreen}
        options={{
          title: 'Recent Expenses',
          tabBarLabel: 'Recent',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="home" color={color} size={26} />,
        }}
      />
      <Tab.Screen
        name="AllExpenses"
        component={AllExpensesScreen}
        options={{
          title: 'All Expenses',
          tabBarLabel: 'All Expenses',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="bell" color={color} size={26} />,
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const bottomModalRef = useRef<BottomModalRef>(null);

  const headerRightButtonHandler = () => {
    bottomModalRef.current?.scrollTo((-SCREEN_HEIGHT / 2)); // Adjust as needed
  };

  useEffect(() => {
    async function func() {
      await init();
    }
    func();
  }, [])

  return (
    <>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ExpenseContextProvider>
          <BottomModal ref={bottomModalRef} />
          <StatusBar style="light" />
          <NavigationContainer>
            <BottomNavigation onHeaderRightPress={headerRightButtonHandler} />
          </NavigationContainer>
        </ExpenseContextProvider>
      </GestureHandlerRootView>
    </>
  );
}
