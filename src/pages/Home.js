import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Alert,
    ScrollView,
    FlatList,
} from 'react-native';
import DrawerHeader from "../components/DrawerHeader";

export default class Menu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    id: 1,
                    title: "مدیریت کاربران",
                    color: "#8e44ad",
                    members: 8,
                    image: "https://img.icons8.com/color/96/000000/name.png"
                },
                {
                    id: 2,
                    title: "بازاریابی",
                    color: "#9b59b6",
                    members: 12,
                    image: "https://img.icons8.com/color/96/000000/attract-customers.png"
                },
                {
                    id: 3,
                    title: "مشتریان",
                    color: "#16a085",
                    members: 6,
                    image: "https://img.icons8.com/color/96/000000/groups.png"
                },
                {
                    id: 4,
                    title: "آموزش",
                    color: "#1abc9c",
                    members: 7,
                    image: "https://img.icons8.com/color/96/000000/classroom.png"
                },
                {
                    id: 5,
                    title: "نمودار",
                    color: "#2980b9",
                    members: 8,
                    image: "https://img.icons8.com/color/96/000000/combo-chart.png"
                },
                {
                    id: 6,
                    title: "بازار بین المللی",
                    color: "#3498db",
                    members: 23,
                    image: "https://img.icons8.com/dusk/96/000000/globe-earth.png"
                },
                {
                    id: 7,
                    title: "برنامه ریزی",
                    color: "#341f97",
                    members: 45,
                    image: "https://img.icons8.com/color/96/000000/to-do.png"
                },
                {
                    id: 8,
                    title: "شبکه توزیع",
                    color: "#5f27cd",
                    members: 13,
                    image: "https://img.icons8.com/color/96/000000/nvstec.png"
                },
                {
                    id: 9,
                    title: "کالاها",
                    color: "#3E2723",
                    members: 13,
                    image: "https://img.icons8.com/color/96/000000/ingredients-for-cooking.png"
                },
                {
                    id: 10,
                    title: "مسیرهای توزیع",
                    color: "#5D4037",
                    members: 13,
                    image: "https://img.icons8.com/color/96/000000/where-to-quest.png"
                },
                {
                    id: 11,
                    title: "بازاریابی تلفنی",
                    color: "#e74c3c",
                    members: 13,
                    image: "https://img.icons8.com/color/96/000000/man-on-phone.png"
                },
                {
                    id: 12,
                    title: "فرمول های محاسباتی",
                    color: "#c0392b",
                    members: 13,
                    image: "https://img.icons8.com/color/96/000000/calculate.png"
                },
            ]
        };
    }

    clickEventListener(item) {
        Alert(item.title)
    }

    render() {
        return (
            <View style={styles.container}>
                <DrawerHeader navigation={this.props.navigation}/>
                <FlatList style={styles.list}
                          contentContainerStyle={styles.listContainer}
                          data={this.state.data}
                          horizontal={false}
                          numColumns={2}
                          keyExtractor={(item) => {
                              return item.id;
                          }}
                          renderItem={({item}) => {
                              return (
                                  <TouchableOpacity style={[styles.card, {backgroundColor: item.color}]}
                                                    onPress={() => {
                                                        this.clickEventListener(item.view)
                                                    }}>
                                      <View style={styles.cardHeader}>
                                          <Text style={styles.title}>{item.title}</Text>
                                          <Image style={styles.icon}
                                                 source={{uri: "https://img.icons8.com/ios/40/000000/settings.png"}}/>
                                      </View>
                                      <Image style={styles.cardImage} source={{uri: item.image}}/>
                                      <View style={styles.cardFooter}>
                                          <Text style={styles.subTitle}> تعداد رکورد {item.members}</Text>
                                      </View>
                                  </TouchableOpacity>
                              )
                          }}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
    },
    list: {
        //paddingHorizontal: 5,
        backgroundColor: "#E6E6E6",
    },
    listContainer: {
        alignItems: 'center'
    },
    /******** card **************/
    card: {
        marginHorizontal: 2,
        marginVertical: 2,
        flexBasis: '48%',
    },
    cardHeader: {
        paddingVertical: 17,
        paddingHorizontal: 16,
        borderTopLeftRadius: 1,
        borderTopRightRadius: 1,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "center"
    },
    cardContent: {
        paddingVertical: 12.5,
        paddingHorizontal: 16,
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 12.5,
        paddingBottom: 25,
        paddingHorizontal: 16,
        borderBottomLeftRadius: 1,
        borderBottomRightRadius: 1,
    },
    cardImage: {
        height: 70,
        width: 70,
        alignSelf: 'center'
    },
    title: {
        fontSize: 16,
        flex: 1,
        color: "#FFFFFF",
        fontWeight: 'bold'
    },
    subTitle: {
        fontSize: 12,
        flex: 1,
        color: "#FFFFFF",
    },
    icon: {
        height: 20,
        width: 20,
    }
});
