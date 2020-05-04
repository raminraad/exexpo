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
            title: "کاربران و دسترسی سیستم", data: [{
                pages: [
                    {
                        id: 1,
                        title: "کاربران و مدیران",
                        color: "rgba(9,150,196,0.75)",
                        members: 8,
                        image: require("../../assets/icons/xxx/name.png"),
                        page: 'Users'
                    },
                    {
                        id: 2,
                        title: "بازاریابی",
                        color: "rgba(9,150,196,0.75)",
                        members: 12,
                        image: require("../../assets/icons/xxx/attract-customers.png"),
                        page: 'Order'
                    },
                    {
                        id: 3,
                        title: "مشتریان",
                        color: "rgba(9,150,196,0.75)",
                        members: 6,
                        image: require("../../assets/icons/xxx/groups.png"),
                    },
                ]
            }]
        },
        {
            title: "اپلیکیشن ها و ماژول ها", data: [{
                pages: [
                    {
                        id: 4,
                        title: "آموزش",
                        color: "rgba(9,150,196,0.75)",
                        members: 7,
                        image: require("../../assets/icons/xxx/classroom.png"),
                    },
                    {
                        id: 6,
                        title: "بازار بین المللی",
                        color: "rgba(9,150,196,0.75)",
                        members: 23,
                        image: require("../../assets/icons/xxx/globe-earth.png"),
                    },
                ]
            }]
        },
        {
            title: "وضعیت کنونی سیستم", data: [{
                pages: [
                    {
                        id: 7,
                        title: "برنامه ریزی",
                        color: "rgba(9,150,196,0.75)",
                        members: 45,
                        image: require("../../assets/icons/xxx/to-do.png"),
                    },
                    {
                        id: 8,
                        title: "شبکه توزیع",
                        color: "rgba(9,150,196,0.75)",
                        members: 13,
                        image: require("../../assets/icons/xxx/nvstec.png"),
                    },
                    {
                        id: 9,
                        title: "کالاها",
                        color: "rgba(9,150,196,0.75)",
                        members: 13,
                        image: require("../../assets/icons/xxx/ingredients-for-cooking.png"),
                    },
                    {
                        id: 10,
                        title: "مسیرهای توزیع",
                        color: "rgba(9,150,196,0.75)",
                        members: 13,
                        image: require("../../assets/icons/xxx/where-to-quest.png"),
                    },
                    {
                        id: 11,
                        title: "بازاریابی تلفنی",
                        color: "rgba(9,150,196,0.75)",
                        members: 13,
                        image: require("../../assets/icons/xxx/man-on-phone.png"),
                    },
                    {
                        id: 12,
                        title: "فرمول های محاسباتی",
                        color: "rgba(9,150,196,0.75)",
                        members: 13,
                        image: require("../../assets/icons/xxx/calculate.png"),
                    },
                ]
            }]
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
                <DrawerHeader navigation={this.props.navigation} title={'ماژول s'}/>
                <SectionList
                    sections={this.menuData}
                    renderItem={({item}) => {
                        return (
                            <FlatList style={styles.list}
                                      contentContainerStyle={styles.listContainer}
                                      data={item.pages}
                                      numColumns={2}
                                      keyExtractor={(item) => {
                                          return item.id;
                                      }}
                                      renderItem={({item}) => {
                                          return (
                                              <TouchableOpacity style={[styles.card, {backgroundColor: item.color}]}
                                                                onPress={() => {
                                                                    if (item.page)
                                                                        this.props.navigation.navigate(item.page);
                                                                    else
                                                                        alert('ماژول در حال ساخت میباشد');
                                                                }}>
                                                  <View style={styles.cardHeader}>
                                                      <Text style={styles.title}>{item.title}</Text>
                                                      <Text style={styles.subTitle}> تعداد رکورد {item.members}</Text>
                                                  </View>
                                                  <Image style={styles.cardImage} source={item.image}/>
                                                  <View style={styles.cardFooter}>
                                                  </View>
                                              </TouchableOpacity>
                                          )
                                      }}/>
                        )
                    }}
                    renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
                    keyExtractor={(item) => {
                        return item.id;
                    }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        backgroundColor: '#116496',
    },
    list: {
        paddingHorizontal: 30,
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
    },
    listContainer: {},
    /******** card **************/
    card: {
        flexBasis: '40%',
        flexDirection: 'row-reverse',
        justifyContent: 'space-around',
        borderRadius: 3,
        borderTopLeftRadius: 15,
        borderBottomRightRadius: 15,
        marginVertical: 17,
        marginHorizontal: 10,
    },
    cardHeader: {
        opacity: 0.9,
        padding: 10,
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
        opacity: 0.7,
        height: 48,
        width: 48,
        alignSelf: 'center',
        marginVertical: 5,
    },
    sectionHeader: {
        paddingHorizontal: 10,
        marginBottom: 10,
        marginTop: 20,
        fontSize: 22,
        fontWeight: 'bold',
        color: "rgba(255,255,255,0.7)",
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
