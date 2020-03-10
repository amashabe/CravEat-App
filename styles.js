import { StyleSheet, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  button: {
    marginTop: 5,
    paddingVertical: 10,
    alignItems: 'center',
    borderColor: '#d3d3d3',
    borderWidth: 1,
    borderRadius: 5,
    width: 200
  },
  border: {
    width: '85%',
    margin: 5,
    padding: 5,
    fontSize: 16,
    borderColor: '#d3d3d3',
    borderBottomWidth: 1,
    textAlign: 'center'
  },
  postPhoto: {
    height: 250,
    width: width,
  },
  roundImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    margin: 5
  },
  input: {
    width: width * .90,
    margin: 15,
    padding: 15,
    alignSelf: 'center',
    borderColor: '#d3d3d3',
    borderWidth: 1,
    borderRadius: 50,
    fontSize: 16,
  },
  space: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  LoginTouchOpacity: {
    marginTop: 2,
    borderRadius: 3,
    backgroundColor: '#ff741a',

  }
});
