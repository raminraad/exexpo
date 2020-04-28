import {Header} from "react-native-elements";
import React from "react";

// class DrawerHeader extends React.Component {
//     render() {
//         return (
//             <Header
//                 placement="left"
//                 leftComponent={{icon: 'menu', color: '#fff'}}
//                 centerComponent={{text: 'MY TITLE', style: {color: '#fff'}}}
//                 rightComponent={{icon: 'home', color: '#fff'}}
//             />
//         );
//     }
// }

function DrawerHeader({navigation}) {
    return (
        <Header
            backgroundColor='#003d5b'
            placement="right"
            rightComponent={{
                icon: 'menu', color: '#fff', onPress: () => {
                    navigation.openDrawer()
                }
            }}
            centerComponent={{
                text: 'صفحه اصلی',
                style: {color: '#fff', alignSelf: 'center', fontWeight: 'bold', fontSize: 20}
            }}
            leftComponent={{icon: 'home', color: '#fff'}}
        />
    );
}

export default DrawerHeader;
