import React, { useState } from 'react';
import { View, Text, Button,TouchableOpacity, StyleSheet, Alert, Linking } from 'react-native';
import Collapsible from 'react-native-collapsible';
import * as FileSystem from 'expo-file-system';
import { fetchPDF } from "../(services)/api/api";

// Sample JSON data
const accordionData = [
    {
        title: "Item 1",
        
        nested: [
            {
                title: "Item 11",
                content: "APP 2",
            },
            {
                title: "Item 12",
                content: "APP 2",
            }
        ]
    },
    {
        title: "Item 2",
        content: "APP 2",
    },
    {
        title: "Item 3",
        content: "APP 2",
    }
];

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

const NestedAccordion = ({ nestedData }) => {
    const handleTextClick = async (content) => {
        // Construct the file path
        const filePath = `app/data/${content}.pdf`;
        console.log(FileSystem.documentDirectory // Sandbox directory for your app
)

        // Open the PDF file using the Linking API
        try {
            const supported = await Linking.canOpenURL(filePath);
            if (supported) {
                await Linking.openURL(filePath);
            } else {
                Alert.alert("Error", "Can't open this file.");
            }
        } catch (error) {
            console.error("Error opening file: ", error);
            Alert.alert("Error", "Could not open the file. Make sure the file exists.");
        }
    };


     // Convert the blob to a base64 string
  
    return (
        <View>
            {nestedData.map((item, index) => (
                <AccordionItem key={index} title={item.title}>
                    <TouchableOpacity onPress={() => handleTextClick(item.content)}>
                        <Text style={styles.nestedText}>{item.content}</Text>
                    </TouchableOpacity>
                </AccordionItem>
            ))}
        </View>
    );
};

const Accordion = () => {
    const handleTextClick = async (content) => {
        const filePath = `${FileSystem.documentDirectory}files/${content}.pdf`;

        // Open the PDF file using the Linking API
        try {
            const supported = await Linking.canOpenURL(filePath);
            if (supported) {
                await Linking.openURL(filePath);
            } else {
                Alert.alert("Error", "Can't open this file.");
            }
        } catch (error) {
            console.error("Error opening file: ", error);
            Alert.alert("Error", "Could not open the file. Make sure the file exists.");
        }
    };

      
    const [pdfUri, setPdfUri] = useState(null);

    const onClickPdf = async (filename) => {
     try {
       const data = await fetchPDF(filename);
       const reader = new FileReader();
       reader.readAsDataURL(response.data);
       reader.onloadend = () => {
        setPdfUri(reader.result); // Set the PDF URI to the state
    };

     } catch (error) {
         console.error("Error fetching PDF: ", error);
         Alert.alert("Error", "Could not fetch the PDF.");
     }
 };
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to Authentication</Text>
            <Text style={styles.subtitle}>Technologies used:</Text>

            {accordionData.map((item, index) => (
                <AccordionItem key={index} title={item.title}>
                    {item.nested ? (
                        <NestedAccordion nestedData={item.nested} />
                    ) : (
                        <TouchableOpacity onPress={() => handleTextClick(item.content)}>
                            <Text style={styles.clickableText}>{item.content}</Text>
                        </TouchableOpacity>
                    )}
                </AccordionItem>
            ))}
             <Button title="Load PDF" onPress={() => onClickPdf('1727744855124.pdf')} />
            {pdfUri && (
                <Pdf
                    source={{ uri: pdfUri, cache: true }}
                    style={{ flex: 1 }}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
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
        color: '#1976d2',
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
