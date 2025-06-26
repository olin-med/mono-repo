import { StyleSheet, ScrollView, Linking, Platform } from 'react-native';
import { Text, View } from '@/components/Themed';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

const CONTACTS = [
  {
    icon: <FontAwesome name="globe" size={28} color="#E2001A" />, label: 'Site', value: 'www.cptm.sp.gov.br', link: 'https://www.cptm.sp.gov.br',
  },
  {
    icon: <FontAwesome name="phone" size={28} color="#E2001A" />, label: 'Telefone', value: '0800 0550121', link: 'tel:08000550121',
  },
  {
    icon: <MaterialCommunityIcons name="phone-in-talk" size={28} color="#E2001A" />, label: 'Telefone Secundário', value: '(11) 3117-7094', link: 'tel:1131177094',
  },
  {
    icon: <FontAwesome name="whatsapp" size={28} color="#E2001A" />, label: 'Whatsapp', value: '(11) 99767-7030', link: 'https://wa.me/5511997677030',
  },
  {
    icon: <FontAwesome name="twitter" size={28} color="#E2001A" />, label: 'Twitter', value: '@cptm_oficial', link: 'https://twitter.com/cptm_oficial',
  },
  {
    icon: <FontAwesome name="facebook" size={28} color="#E2001A" />, label: 'Facebook', value: 'Fan Page da CPTM', link: 'https://facebook.com/cptm_oficial',
  },
  {
    icon: <FontAwesome name="instagram" size={28} color="#E2001A" />, label: 'Instagram', value: '@cptm_oficial', link: 'https://instagram.com/cptm_oficial',
  },
  {
    icon: <FontAwesome name="youtube" size={28} color="#E2001A" />, label: 'Youtube', value: 'CPTMoficial', link: 'https://youtube.com/c/CPTMoficial',
  },
  {
    icon: <FontAwesome5 name="tiktok" size={28} color="#E2001A" />, label: 'Tiktok', value: '@CPTM', link: 'https://www.tiktok.com/@cptm',
  },
  {
    icon: <FontAwesome name="linkedin" size={28} color="#E2001A" />, label: 'Linkedin', value: 'CPTM', link: 'https://www.linkedin.com/company/cptm',
  },
];

export default function FaleConoscoScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.pageTitle}>Fale Conosco</Text>
        {CONTACTS.map((item, idx) => (
          <View key={idx} style={styles.row}>
            <View style={styles.icon}>{item.icon}</View>
            <View style={styles.info}>
              <Text style={styles.label}>{item.label}</Text>
              <Text style={styles.value} onPress={() => item.link && Linking.openURL(item.link)} selectable>
                {item.value}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  pageTitle: {
    fontSize: 22,
    fontFamily: 'FrutigerLTStd-Bold',
    color: '#E2001A',
    marginBottom: 32,
    textAlign: 'left',
  },
  content: {
    padding: 24,
    paddingTop: 36,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 28,
  },
  icon: {
    width: 40,
    alignItems: 'center',
    marginTop: 2,
  },
  info: {
    flex: 1,
    marginLeft: 16,
  },
  label: {
    fontSize: 13,
    fontFamily: 'FrutigerLTStd-Roman',
    marginBottom: 2,
  },
  value: {
    fontSize: 17,
    fontFamily: 'FrutigerLTStd-Bold',
    fontWeight: '500',
  },
}); 