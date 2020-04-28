import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Alert,
    ScrollView,
    FlatList, SectionList,
} from 'react-native';
import DrawerHeader from "../components/DrawerHeader";

export default class Menu extends Component {

    menuData = [
        {
            title: "کاربران و دسترسی سیستم", data: [
                {
                    id: 1,
                    title: "مدیریت کاربران",
                    color: "#8e44ad",
                    members: 8,
                    image: require("../../assets/icons/xxx/name.png")
                },
                {
                    id: 2,
                    title: "بازاریابی",
                    color: "#9b59b6",
                    members: 12,
                    image: require("../../assets/icons/xxx/attract-customers.png")
                },
                {
                    id: 3,
                    title: "مشتریان",
                    color: "#16a085",
                    members: 6,
                    image: require("../../assets/icons/xxx/groups.png")
                },
            ]
        },
        {
            title: "اپلیکیشن ها و ماژول ها", data: [
                {
                    id: 4,
                    title: "آموزش",
                    color: "#1abc9c",
                    members: 7,
                    image: require("../../assets/icons/xxx/classroom.png")
                },
                {
                    id: 5,
                    title: "نمودار",
                    color: "#2980b9",
                    members: 8,
                    image: require("../../assets/icons/xxx/combo-chart.png")
                },
                {
                    id: 6,
                    title: "بازار بین المللی",
                    color: "#3498db",
                    members: 23,
                    image: require("../../assets/icons/xxx/globe-earth.png")
                },
            ]
        },
        {
            title: "وضعیت کنونی سیستم", data: [
                {
                    id: 7,
                    title: "برنامه ریزی",
                    color: "#433097",
                    members: 45,
                    image: require("../../assets/icons/xxx/to-do.png")
                },
                {
                    id: 8,
                    title: "شبکه توزیع",
                    color: "#5f27cd",
                    members: 13,
                    image: require("../../assets/icons/xxx/nvstec.png")
                },
                {
                    id: 9,
                    title: "کالاها",
                    color: "#3E2723",
                    members: 13,
                    image: require("../../assets/icons/xxx/ingredients-for-cooking.png")
                },
                {
                    id: 10,
                    title: "مسیرهای توزیع",
                    color: "#5D4037",
                    members: 13,
                    image: require("../../assets/icons/xxx/where-to-quest.png")
                },
                {
                    id: 11,
                    title: "بازاریابی تلفنی",
                    color: "#e74c3c",
                    members: 13,
                    image: require("../../assets/icons/xxx/man-on-phone.png")
                },
                {
                    id: 12,
                    title: "فرمول های محاسباتی",
                    color: "#c0392b",
                    members: 13,
                    image: require("../../assets/icons/xxx/calculate.png")
                },
            ]
        },
    ];

    constructor(props) {
        super(props);
    }

    clickEventListener(item) {
        Alert(item.title)
    }

    render() {
        return (
            <View style={styles.container}>
                <DrawerHeader navigation={this.props.navigation}/>
                <SectionList
                    sections={this.menuData}
                    renderItem={({item}) => {
                        return (
                            <TouchableOpacity style={styles.card}>
                                <View style={styles.cardHeader}>
                                    <Text style={styles.title}>{item.title}</Text>
                                </View>
                                <Image style={styles.cardImage} source={item.image}/>
                                <View style={styles.cardFooter}>
                                    <Text style={styles.subTitle}> تعداد رکورد {item.members}</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    }}
                    renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
                    keyExtractor={(item) => {
                        return item.id;
                    }}
                />
                {/*<FlatList style={styles.list}
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
                                      <Image style={styles.cardImage} source={item.image}/>
                                      <View style={styles.cardFooter}>
                                          <Text style={styles.subTitle}> تعداد رکورد {item.members}</Text>
                                      </View>
                                  </TouchableOpacity>
                              )
                          }}/>*/}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#116496',
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
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        borderRadius: 25,
        borderWidth: 2,
        borderColor: '#0a3d62',
        height: 100,
        marginRight: 50,
        marginLeft: 50,
        marginBottom: 20,
        flexBasis: '48%',
        color: "#2c3e50",
        backgroundColor: '#3498db',
    },
    cardHeader: {
        paddingVertical: 17,
        paddingHorizontal: 16,
        borderTopLeftRadius: 1,
        borderTopRightRadius: 1,
    },
    cardContent: {
        paddingVertical: 12.5,
        paddingHorizontal: 16,
    },
    cardFooter: {
        paddingVertical: 12.5,
        paddingHorizontal: 16,
        borderBottomLeftRadius: 1,
        borderBottomRightRadius: 1,
        flexDirection: 'column-reverse',
    },
    cardImage: {
        height: 70,
        width: 70,
        alignSelf: 'center',
    },
    sectionHeader: {
        paddingTop: 2,
        paddingHorizontal: 10,
        paddingBottom: 10,
        marginTop: 20,
        fontSize: 22,
        fontWeight: 'bold',
        color: "#fff",
        backgroundColor: '#116496',
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
    title: {
        fontSize: 18,
        flex: 1,
        color: "#FFFFFF",
        fontWeight: 'bold'
    },
    subTitle: {
        fontSize: 16,
        color: "#FFFFFF",
    },
    icon: {
        height: 20,
        width: 20,
    }
});
