import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  paragraph: {
    marginVertical: 8,
    lineHeight: 20,
  },
  container: {
    flex: 1,
    padding: 40,
  },
  input:{
    borderWidth:1,
    borderColor:'#ddd',
    padding:10,
    fontSize:18,
    borderRadius:6,
    marginBottom:15
  },
  CircleShapeView: {
    justifyContent:'center',
    alignItems:'center',
    width: 100,
    height: 100,
    borderRadius: 50,
},

OvalShapeView: {
  marginTop: 20,
  width: 100,
  height: 100,
  backgroundColor: '#00BCD4',
  borderRadius: 50,
  transform: [
    {scaleX: 2}
  ]
},
});

export const globalColors = {
  palette:{
    seaGreen:'#2a9d8f',
    paleGray:'#e5e5e5',
    cream:'#F1FAEE',
    coal:'#111111',
    dirtyNavy: "#1c313a",
  },
    btnAdd:'#00C49A',
    btnDelete:'#e55934',
    btnUpdate:'#3DA5D9',
    btnOk:'#3DA5D9',
    btnCancel:'#979DAC',
    iconCollapse:'#f4afab',
    iconExpand:'#c0c0c0',
    drawerBackground:'#0f4c5c',
    drawerIcon:'#98c1d9',
    homeBackground:'#292f36',
    homeIconBackground1:'#6a4c93',
    homeIconBackground2:'#1982c4',
    homeIconBackground3:'#8ac926',
    homeIconBackground4:'#43aa8b',
    homeIconBackground5:'#577590',
    homeIcon:'#F1FAEE',
    homeIconText:'#F1FAEE',
    homeSectionHeader:'#F1FAEEBA',

};

export const globalSizes = {
  icons : {
    small:16,
    medium:24,
    large:32,
    xLarge:48
  },
}