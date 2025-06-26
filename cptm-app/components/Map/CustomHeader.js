import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import { router } from 'expo-router';


export function Header({ route, options }){
    const params = route.params

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                {options.title === "Caminho" ?  <TouchableOpacity onPress={() => router.back()} style={styles.button}>
                    <Image source={require("../../assets/back.png")} style={styles.arrow} />
                </TouchableOpacity>: null}
                <View style={{width:"80%"}}>
                    <Text style={styles.title}>
                        {options.title === "Caminho" ? `Caminho de ${params.de_nome} para ${params.para_nome}` : options.title}
                    </Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        marginLeft:10
    },
    container: {
        width: '100%',
        backgroundColor: '#E2001A',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 13,
        zIndex: 10,
        elevation: 10,
        borderWidth:0,
        borderColor:"fff",
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 'auto',
    },
    button: {
        zIndex: 1,
    },
    arrow: {
        width: 32,
        height: 32,
        tintColor: '#fff',
    }
})