import React, { useState,useEffect } from 'react';
import { View, Text, Button,TouchableOpacity, StyleSheet,ScrollView } from 'react-native';
import Collapsible from 'react-native-collapsible';
import { fetchItemsByHeading,fetchItems } from '../(services)/api/api';
import { useRouter } from "expo-router";
import {accordionData} from "../data/AccordionItems"
// Sample JSON data



const AccordionItem = ({ title, children }) => {

    const [isCollapsed, setIsCollapsed] = useState(true);

    return (
        <View style={styles.accordion}>
            <TouchableOpacity
                onPress={() => setIsCollapsed(!isCollapsed)}
                style={styles.header}
            >
                <Text style={styles.headerText}>{title}</Text>
            </TouchableOpacity>
            <Collapsible collapsed={isCollapsed}>
                <View style={styles.content}>
                    {children}
                </View>
            </Collapsible>
        </View>
    );
};

const NestedAccordion = ({ nestedData,itemsData }) => {
const router = useRouter();
const handleTextClick = async (pdf) => {
        console.log('Navigating to PDF:', pdf); // Log the content you're passing
        router.push({ pathname: "/pdfFileView", params: { pdf} });
};

    return (
        <View>
            {nestedData.map((item, index) => (
                <AccordionItem key={index} title={item.title}>
                    {item.nested.length !=0 ? (
                        <NestedAccordion nestedData={item.nested} />
                    ) : (
                    <>
                    {itemsData
                    .filter((pdfItem) => pdfItem.heading == item.title) // Filter items based on the heading
                    .map((pdfItem, index) => (
                        <TouchableOpacity key={index} onPress={() => handleTextClick(pdfItem.pdf)}>
                        <Text style={styles.clickableText}>{pdfItem.title}</Text>
                        </TouchableOpacity>
                    ))}
                    </>
                )}
                </AccordionItem>
            ))}
        </View>
        
    );
};

const Accordion = () => {
    const router = useRouter();

    const handleTextClick = async (pdf) => {
        // Use template literals for cleaner URL creation
        router.push(`/pdfFileView?pdf=${pdf}`);
    };
    
    const [itemsData, setItemsData] = useState([]);

        useEffect(() => {
            const fetchData = async () => {
                try {
                    const data = await fetchItems();
                    setItemsData(data.data);
                   
                } catch (err) {
                    Alert.alert("Error", "Could not fetch the PDF details.");
                } finally {
                }
            };
        
            fetchData();
        }, []); // Empty dependency array means this will run once when the component mounts
        
        

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Yurt Çimento</Text>
            <Text style={styles.subtitle}>Bilgilendirme Dökümanları</Text>

            {accordionData.map((item, index) => (
                <AccordionItem key={index} title={item.title}>
                    {item.nested.length !=0 ? (
                        <NestedAccordion nestedData={item.nested} itemsData={itemsData} />
                    ) : (
                        <>
                        {itemsData
                          .filter((pdfItem) => pdfItem.heading == item.title) // Filter items based on the heading
                          .map((pdfItem, index) => (
                            <TouchableOpacity key={index} onPress={() => handleTextClick(pdfItem.pdf)}>
                              <Text style={styles.clickableText}>{pdfItem.title}</Text>
                            </TouchableOpacity>
                          ))}
                      </>
                    )}
                </AccordionItem>
            ))}
             
             </ScrollView>
    );
};

const styles = StyleSheet.create({

  webview: {
    flex: 1,
    width: '100%',
  },
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f0f4f8',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 20,
        color: '#555',
        textAlign: 'center',
    },
    accordion: {
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
        
    },
    header: {
        padding: 15,
        backgroundColor: '#e3f2fd',
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    content: {
        padding: 15,
        backgroundColor: '#ffffff',

    },
    nestedText: {
        color: '#1976d2',
        fontSize: 16,
        textDecorationLine: 'underline',
    },
    clickableText: {
        color: '#1976d2',
        fontSize: 16,
        textDecorationLine: 'underline',
    },
});

export default Accordion;
