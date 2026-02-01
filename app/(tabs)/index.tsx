import { useRouter } from 'expo-router';
import { Button, Text, View } from 'react-native';

export default function Home() {
  const router = useRouter();

  return (
    <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
      <Text style={{ fontSize: 50, textAlign: "center" }}>Welcome to DishUp!</Text>
      <Text style={{ fontSize: 20, marginBottom: 75, marginTop: 10 }}> V1.0.0</Text>
      <Button title="Go to Pantry" onPress={() => router.push('/pantry')} />
      <Button title="Go to Recipes" onPress={() => router.push('/recipes')} />
    </View>
  );
}
