import { useRouter } from 'expo-router';
import { Button, Image, Text, View } from 'react-native';

export default function Home() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
      <Image
        source={require('../../assets/images/dishup-logo.png')}
        style={{ width: 450, height: 450 }} />
      
      <Text style={{ fontSize: 36, marginBottom: 25 }}>Welcome!</Text>
      <View style={{ display: 'flex', flexDirection: 'row', gap: 20 }}>
        <Button title="Go to Pantry" onPress={() => router.push('/pantry')} />
        <Button title="Go to Recipes" onPress={() => router.push('/recipes')} />
      </View>
      <Text style={{ fontSize: 16, marginTop: 20 }}> V1.0.0</Text>
    </View>
  );
}
