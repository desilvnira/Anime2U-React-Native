import React, { Component } from "react";
import { View, Text, Alert } from "react-native";
import { Icon, SearchBar, Tile, Header, ListItem, Overlay } from 'react-native-elements'
import { ScrollView } from "react-native-gesture-handler";
import RNPickerSelect from 'react-native-picker-select';
import { Popup } from "../Components/Popup";
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import * as firebase from "firebase"
import { firebaseAuth } from '../Components/Firebase'
import { Button } from "../Components/Button";
import { AnimeCard } from "../Components/AnimeCard";
import { DialogCard } from "../Components/DialogCard";
class Completed extends Component {
    state = {
        completedAnime: [],
        visible: false,
        dialogAnime: JSON
    };

    /**
     * Sets up the users watching list upon mount
     * Connects to firebase and retrieves the users watching JSON object
     */
    componentDidMount() {
        firebase.database().ref("/users/" + this.getUser() + "/completed").on('value', (snap) => {

            count = 0
            temp = []
            snap.forEach((childNodes) => {
                temp[count] = childNodes.val();
                count = count + 1


            })
            this.setState({ completedAnime: temp });
            count = 0
        })
    }

    /**
     * Navigates to tabs once the back has been pressed
     */

    backButtonPressed = () => {
        this.props.navigation.navigate('Tabs')
    }



    /**
     * Returns the currently authenticated users username
     */

    getUser() {
        return firebaseAuth.currentUser.email.split("@niran.com")[0]
    }


    /**
     * Once anime is pressed set dialog box visibility to true.
     * Also keep track of the anime that is being pressed by using state.
     */

    completedItemPressed = (anime) => {
        this.setState({ dialogAnime: anime })
        this.setState({ visible: true })
    }

    /**
     * Moves an anime depending on the option selected in firebase.
     * Removes from the current page and shows on the page specified.
     */

    moveAnime(option, anime) {
        //removes anime from database from the completed section
        if (option == 'remove') {
            firebase.database().ref("/users/" + this.getUser() + "/completed/" + anime.title).remove()
        }
        //removes anime from database from the completed section
        //also adds to the specicifed option
        if (option == 'watching') {
            firebase.database().ref("/users/" + this.getUser() + "/completed/" + anime.title).remove()
            let userMobilePath = "/users/" + this.getUser() + "/" + option + "/" + anime.title;

            firebase.database().ref(userMobilePath).set({
                title: anime.title,
                imageURL: anime.imageURL,
                synopsis: anime.synopsis,
                episodes: anime.episodes,
                score: anime.score,
                type: anime.type
            })
        }
        //removes anime from database from the completed section
        //also adds to the specicifed option   
        if (option == 'yetToWatch') {
            firebase.database().ref("/users/" + this.getUser() + "/completed/" + anime.title).remove()
            let userMobilePath = "/users/" + this.getUser() + "/" + option + "/" + anime.title;

            firebase.database().ref(userMobilePath).set({
                title: anime.title,
                imageURL: anime.imageURL,
                synopsis: anime.synopsis,
                episodes: anime.episodes,
                score: anime.score,
                type: anime.type
            })

        }
    }

    /**
     * Renders the current page which is a scroll view of a flat list.
     * As well as a hidden dialog box that is revealed once an anime is pressed.
     * Dialog box contains a inout field to store current episode user is on of the specific anime.
     * Also provides a select box for removing or moving the anime to a different section.
     */
    render() {

        return (


            <View>
                <ScrollView>
                    <Dialog
                        visible={this.state.visible}
                        onTouchOutside={() => {
                            this.setState({ visible: false });
                        }}
                    >
                        <DialogContent>
                            <DialogCard
                                title={this.state.dialogAnime.title}
                                imageUrl={this.state.dialogAnime.imageURL}
                                description={this.state.dialogAnime.synopsis}
                                episodes={this.state.dialogAnime.episodes}
                                score={this.state.dialogAnime.score}
                                type={this.state.dialogAnime.score}
                            />
                            <Text></Text>
                            <Text style={{ textAlign: 'center' }}>Select an action from below</Text>
                            <Text></Text>
                            <RNPickerSelect
                                onValueChange={(value) => this.moveAnime(value, this.state.dialogAnime)}
                                items={[
                                    { label: 'Remove', value: 'remove' },
                                    { label: 'Watching', value: 'watching' },
                                    { label: 'Yet To Watch', value: 'yetToWatch' }
                                ]}
                            />
                        </DialogContent>
                    </Dialog>

                    {
                        this.state.completedAnime.map((value => {
                            return (
                                <ListItem
                                    title={value.title}
                                    onPress={() => this.completedItemPressed(value)}
                                    leftAvatar={{ source: { uri: value.imageURL } }}
                                    bottomDivider
                                    chevron
                                />
                            )
                        }))
                    }
                </ScrollView>
            </View>
        )
    }
}

export default Completed;