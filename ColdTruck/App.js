// App.js
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';


// Pantallas
  // shared
import profileScreen from './src/screens/shared/profile';

  // driver
import adminHomeScreen from './src/screens/administrator/home';
import historyDriverScreen from './src/screens/driver/historyRoutes';
import mainDriverScreen from './src/screens/driver/mainDriver';
import notificationDriverScreen from './src/screens/driver/notificationDriver';
import routeDriverScreen from './src/screens/driver/routeDriver';
import LoginScreen from './src/screens/loginYregister/login';
import RegisterScreen from './src/screens/loginYregister/register';

  // admin
import adminNotificationsScreen from './src/screens/administrator/notifications';
import adminRoutesScreen from './src/screens/administrator/routes';
import adminTrucksScreen from './src/screens/administrator/trucks';
import adminDriverScreen from './src/screens/administrator/users';

  // test
import mapScreen from './src/tests/mapScreen';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Componente con las Tabs según el rol
const HomeTabs = ({ route }) => {
  const { role } = route.params;
  const navigation = useNavigation();

  return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerTitle: '',
          headerRight: () => {
            return (
              <TouchableOpacity style={styles.userIcon} onPress={() => navigation.navigate("Profile")}>
                <Ionicons name="person-circle-outline" size={32} color="white" />
              </TouchableOpacity>
            );
          },
          headerStyle: {
              backgroundColor: "#0E415C",
              height: 80,
          },
          tabBarActiveTintColor: '#0E415C',
          tabBarInactiveTintColor: '#0E415C',
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
              //Driver
            if (route.name === 'Main') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Test') {
              iconName = focused ? 'settings' : 'settings-outline';
            } else if (route.name === 'History') {
              iconName = focused ? 'book' : 'book-outline';
            } else if (route.name === 'Notification') {
              iconName = focused ? 'notifications' : 'notifications-outline';
            } else if (route.name === 'Route') {
              iconName = focused ? 'map' : 'map-outline';
              // Admin
            } else if (route.name === 'Users') {
              iconName = focused ? 'people' : 'people-outline';
            } else if (route.name === 'Routes') {
              iconName = focused ? 'map' : 'map-outline';
            } else if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Trucks') {
              iconName = focused ? 'bus' : 'bus-outline';
            } else if (route.name === 'Notifications') {
              iconName = focused ? 'notifications' : 'notifications-outline';
            } else if (route.name === 'Map') {
              iconName = focused ? 'map' : 'map-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarItemStyle: {
            alignItems: 'center',
            justifyContent: 'center',
            width: 50,
            margin: 5,
            padding: 5,
          },
          tabBarPressColor: 'transparent',
          tabBarPressOpacity: 1,
          tabBarStyle: {
            height: 110,
            backgroundColor: 'white',
            borderTopWidth: 1,
            borderTopColor: '#e0e0e0',
          },
        })}
      >
      {role === 'Administrator' && (
        <>
        <Tab.Screen name="Home" component={adminHomeScreen} />
        <Tab.Screen name="Routes" component={adminRoutesScreen} />
        <Tab.Screen name="Map" component={mapScreen} />
        <Tab.Screen name="Users" component={adminDriverScreen} />
        <Tab.Screen name="Trucks" component={adminTrucksScreen} />
        <Tab.Screen name="Notifications" component={adminNotificationsScreen} />
        </>
      )}
      {role === 'Driver' && (
        <>
          <Tab.Screen name='Main' component={mainDriverScreen}/>
          <Tab.Screen name='Route' component={routeDriverScreen}/>
          <Tab.Screen name='History' component={historyDriverScreen}/>
          <Tab.Screen name='Notification' component={notificationDriverScreen}/>
        </>
      )}
    </Tab.Navigator>
  );
};

export default function App() {
  return (// headerTitle: ''
    <NavigationContainer styles={styles.container}>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="HomeTabs" component={HomeTabs}/>
        <Stack.Screen name="Profile" component={profileScreen}
          options={{
          headerShown: true,
          headerTitle: '',
          headerStyle: {
              backgroundColor: "#0E415C",
              height: 80,
          },
          headerTintColor: "#fff",
        }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    userSelect: "none",
  },
  userIcon: {
    paddingRight: 15,
  },
})