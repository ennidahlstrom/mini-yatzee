import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  header: {
    marginTop: 30,
    backgroundColor: 'skyblue',
    flexDirection: 'row'
  },
  footer: {
    marginTop: 20,
    backgroundColor: 'skyblue',
    flexDirection: 'row'
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 23,
    textAlign: 'center',
    margin: 10,
  },
  author: {
    color: '#fff',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 15,
    textAlign: 'center',
    margin: 10,
  },
  gameboard: {
    paddingTop: 20,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    alignContent: 'center',
    flex: 1,
  },
  column: {
    alignItems: 'center',
    margin: 1
  },
  gameinfo: {
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 18,
    marginBottom: 5
  },
  points: {
    fontSize: 20
  },
  total: {
    alignSelf: 'center',
    fontSize: 26,
    fontWeight: 'bold'
  },
  totalInfo: {
    alignSelf: 'center',
    marginTop: 10,
    fontSize: 17,
    fontStyle: 'italic'
  },
  flex: {
    flexDirection: "row",
    alignSelf: 'center',
    height: 50,
    marginBottom: 10
  },
  button: {
    margin: 30,
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#73CED6",
    width: 150,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  },
  buttonText: {
    color:"#2B2B52",
    fontSize: 20
  },
  grid: {
    marginTop: 20
  }
});