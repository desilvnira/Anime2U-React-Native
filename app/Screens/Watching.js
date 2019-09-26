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
import { Input } from '../Components/Input';
class Watching extends Component {
    state = {
        watchingAnime: [],
        visible: false,
        dialogAnime: JSON
    };

    /**
     * Sets up the users watching list upon mount
     * Connects to firebase and retrieves the users watching JSON object
     */
    componentDidMount() {
        firebase.database().ref("/users/" + this.getUser() + "/watching").on('value', (snap) => {
            count = 0
            temp = []
            snap.forEach((childNodes) => {
                temp[count] = childNodes.val();
                count = count + 1
            })
            this.setState({ watchingAnime: temp });
            count = 0
        })
    }

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

    watchingItemPressed = (anime) => {
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
            firebase.database().ref("/users/" + this.getUser() + "/watching/" + anime.title).remove()
        }
        //removes anime from database from the completed section
        //also adds to the specicifed option
        if (option == 'completed') {
            firebase.database().ref("/users/" + this.getUser() + "/watching/" + anime.title).remove()
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
            firebase.database().ref("/users/" + this.getUser() + "/watching/" + anime.title).remove()
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
     * Updates the current episode for the episode selected in the dialog box.
     * Stores the curernt epsiode the user is on for each anime they are watching. 
     */

    updateEpisode = (episode) => {
        let userMobilePath = "/users/" + this.getUser() + "/watching/" + this.state.dialogAnime.title;
        firebase.database().ref(userMobilePath).update({
            currentEpisode: episode
        })
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
                                type={this.state.dialogAnime.type}
                            />
                            <Text></Text>
                            <Text style={{ textAlign: 'center' }}>Select an action from below</Text>
                            <Text></Text>
                            <Input
                                placeholder='Enter your episode...'
                                label='Current Episode'
                                onChangeText={episode => this.updateEpisode(episode)}
                            />
                            <Text>You are currently on epsiode: {this.state.dialogAnime.currentEpisode}</Text>
                            <Text></Text>
                            <RNPickerSelect
                                onValueChange={(value) => this.moveAnime(value, this.state.dialogAnime)}
                                items={[
                                    { label: 'Remove', value: 'remove' },
                                    { label: 'Completed', value: 'completed' },
                                    { label: 'Yet To Watch', value: 'yetToWatch' }
                                ]}
                            />
                        </DialogContent>
                    </Dialog>

                    {
                        this.state.watchingAnime.map((value => {
                            return (
                                <ListItem
                                    title={value.title}
                                    onPress={() => this.watchingItemPressed(value)}
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

export default Watching;