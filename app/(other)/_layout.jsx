import { View, Text } from 'react-native'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
const UserMenuLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen 
          name="Station_info"
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen 
          name="Charge_page"
          options={{
            headerShown: false
          }}
        />
      </Stack>
      <StatusBar 
        backgroundColor="#161622"
        style="light"
      />
    </>
  )
}

export default UserMenuLayout