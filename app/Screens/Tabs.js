import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert, Button, FlatList, ScrollView
} from "react-native";
import { Icon, SearchBar, Tile, Header, Card,Divider, Badge} from 'react-native-elements'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import {ProfileCard} from '../Components/ProfileCard';
import { NewsCard } from "../Components/NewsCard";
import {firebaseAuth} from '../Components/Firebase'
import RNPickerSelect from 'react-native-picker-select';
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import * as firebase from "firebase"

export class News extends Component {
    
    state = {
        upcoming: [],
        airing: [],
        bypopularity: [],
        spinner: false
    };

    /**
     * Calls the functions to pull from the jikan API for the realted categories
     */

    componentDidMount() {
        this.cardList('upcoming');
        this.cardList('airing');
        this.cardList('bypopularity');
    }

    /**
     * Uses the Jikan unnoficial MyAnimeList API to pull JSON's relvant to the top anime of today.
     * Top anime are broken into the 3 subcategories below (upcoming, airing, bypopularity).
     * This function sets the state of local variables upon component mount for faster access.
     * @param {*} category 
     */

    cardList(category){
        var self = this
        fetch('https://api.jikan.moe/v3/top/anime/1/' + category)
        .then(function(response) {
            return response.json();
        })
        .then(function(myJson) {
            // upcoming version of top JSON file 
            if(category == 'upcoming'){
                self.upcoming = myJson.top
                self.setState({upcoming: self.upcoming})  
            }
            // airing version of top JSON file 
            if(category == 'airing'){
                self.airing = myJson.top
                self.setState({airing: self.airing})  
            }
            // bypopularity version of top JSON file 
            if(category == 'bypopularity'){
                self.bypopularity = myJson.top
                self.setState({bypopularity: self.bypopularity})  
            }
                     
        })
      }

      /**
       * Handles the redering of the upcoming news cards by using already loaded array
       */

      upcomingList(){
        return this.state.upcoming.map(function(anime, i){
            return(
                <NewsCard key = {i}         
                title = {anime.title}
                imageUrl = {{uri: anime.image_url}}
                description = {anime.synopsis}
                episodes = {anime.episodes}
                score = {anime.score}
                type = {anime.type}
            />
            );
          });
      }

      /**
       * Handles the redering of the airing news cards by using already loaded array
       */
      airingList(){
        return this.state.airing.map(function(anime, i){
            return(
                <NewsCard key = {i}         
                title = {anime.title}
                imageUrl = {{uri: anime.image_url}}
                startDate = {anime.start_date}
                episodes = {anime.episodes}
                score = {anime.score}
                people = {anime.members}
                type = {anime.type}
            />
            );
          });
      }

      /**
       * Handles the redering of the popularity news cards by using already loaded array
       */
      popularityList(){
        return this.state.bypopularity.map(function(anime, i){
            return(
                <NewsCard key = {i}         
                title = {anime.title}
                imageUrl = {{uri: anime.image_url}}
                startDate = {anime.start_date}
                episodes = {anime.episodes}
                score = {anime.score}
                people = {anime.members}
                type = {anime.type}
            />
            );
          });
      }

      /**
       * Renders the current state of the news page.
       * Consists of a overarching top to bottm scroll view.
       * Within the main scroll view there are 3 horizontal scroll views that are responsible for
       * the navigaton of the mutiple cards per top subcategory (limit to 50 per subcategory).
       */
      render() { 
        const { upcoming } = this.state; 
        return (
            
        <View>
            <ScrollView>
                <Text></Text>
                <Header
                  statusBarProps={{ barStyle: 'light-content' }}
                  centerComponent={{ text: 'Upcoming', style: {fontSize:17, color: '#fff' } }}
                  outerContainerStyles={{ backgroundColor: '#3D6DCC' }}
                  innerContainerStyles={{ justifyContent: 'space-around' }}
                />
                <ScrollView horizontal={true}>
                    
                    {this.upcomingList()}
                
                </ScrollView>
                <Text></Text>
                <Header
                  statusBarProps={{ barStyle: 'light-content' }}
                  centerComponent={{ text: 'Airing', style: {fontSize:17, color: '#fff' } }}
                  outerContainerStyles={{ backgroundColor: '#3D6DCC' }}
                  innerContainerStyles={{ justifyContent: 'space-around' }}
                />
                <ScrollView horizontal={true}>
                    
                    {this.airingList()}
                
                </ScrollView>
                <Text></Text>
                <Header
                  statusBarProps={{ barStyle: 'light-content' }}
                  centerComponent={{ text: 'Most Popular', style: {fontSize:17, color: '#fff' } }}
                  outerContainerStyles={{ backgroundColor: '#3D6DCC' }}
                  innerContainerStyles={{ justifyContent: 'space-around' }}
                />
                <ScrollView horizontal={true}>
                    
                    {this.popularityList()}
                
                </ScrollView>
                
            </ScrollView>
        </View>    
        );
      }
    
}
export class Profile extends Component {

  /**
   * param name is the username of the user kept in firebase.
   * param city is the city of the user kept in firebase.
   * param favAnime is the favourite anime of the user kept in firebase.
   * param country is the country of the user kept in firebase.
   */
  state = {
    name: '',
    favAnime: '',
    city: '',
    country: ''
  }

  /**
   * Gets the currently authenticated from firebase and retrieves their username.
   */
  getUser(){
    return firebaseAuth.currentUser.email.split("@niran.com")[0]
  }

  /**
   * Sends relevant user information to local states from firebase.
   * This personal information is required for the tile display in the profile tab
   */
  componentDidMount(){
    //Accesses the authenticated users contents from firebase
    firebase.database().ref("/users/"+this.getUser()).on('value', (snap)=>{
            
      count = 0
      temp = []
      snap.forEach((childNodes)=>{
          if(childNodes.key === 'username'){
            this.setState({name: childNodes.val()})
          }
          if(childNodes.key === 'city'){
            this.setState({city: childNodes.val()})
          }
          if(childNodes.key === 'country'){
            this.setState({country: childNodes.val()})
          }
          if(childNodes.key === 'favAnime'){
            this.setState({favAnime: childNodes.val()})
          }
     })
     // For future objectual sending use
     this.setState({watchingAnime: temp});   
     count = 0          
   }) 
  }
    /**
     * Logs the currently authenticated user out of the app user firebase authentication service.
     * Upon successful logout the user is then navigated back to the home page.
     */
    logoutPressed = async()=>{
        try {
    
          await firebaseAuth.signOut();
          //Alerts the user the lgout has been succesfull
          Alert.alert("Succesfully logged out")
          // Navigate to Home view
          this.props.navigation.navigate('Home')
    
        } catch (error) {
          //Alerts the user of any errors when trying logout
            Alert.alert(error.toString())
        }
    }
    /**
     * Utility method used for checking whih user is signed in
     */
    userInfoPressed = ()=>{
        firebaseAuth.onAuthStateChanged(function(user) {
            if (user) {
              Alert.alert(user.email.split("@niran.com")[0])
            } else {
              // No user is signed in.
            }
          });
    }
    /**
     * Navigates the user to the watching page upon button press.
     */
    watchingPressed = ()=>{
        this.props.navigation.navigate('Watching')
    }

    /**
     * Navigates the user to the completed page upon button press.
     */
    completedPressed = ()=> {
        this.props.navigation.navigate('Completed')
        // Alert.alert("Completed Login!")
    }

    /**
     * Navigates the user to the yet to watch page upon button press.
     */
    yetToWatchPressed = ()=> {
        this.props.navigation.navigate('YetToWatch')
        // Alert.alert("Completed Login!")
    }
  
  /**
   * Renders the current state of the profile tab.
   * All pages encompassed by a top to bottom scroll view.
   * Top layer of the page starts with the Profile Card which is a custom component which contains
   * the personal information of the current user.
   * The next few tiles are pressable components which naviage the user to their repsective pages.
   */
  render() {
    return (
      <View style={styles.container}>
        
        <ScrollView>          
        <Text style={{textAlign:'right'}} onPress = {this.logoutPressed}>Logout</Text>
        <ProfileCard
          name={this.state.name}
          city={this.state.city}
          country={this.state.country}
          favAnime={this.state.favAnime}
        />
        <Text>   </Text>
        <Tile
            imageSrc={{uri: 'https://wallpaperaccess.com/full/29822.jpg'}}
            title="Watching"
            onPress = {this.watchingPressed}
            featured
            caption="Start where you left off"
        />
        <Text>   </Text>
        <Tile
            imageSrc={{uri: 'https://i.pinimg.com/originals/ad/e0/0f/ade00fd514ed31bfb278bfb80234a9f9.jpg'}}
            title="Completed"
            onPress = {this.completedPressed}
            featured
            caption="Take a look back"
        />
        <Text>   </Text>
        <Tile
            imageSrc={{uri: 'https://wallup.net/wp-content/uploads/2018/09/28/1017464-anime-wallpaper-hd-061546778-272.jpg'}}
            title="Yet To Watch"
            onPress = {this.yetToWatchPressed}
            featured
            caption="Future endeavours"
        />
        </ScrollView>
      </View>
    );
  }
}
export class Search extends Component {
    
    /**
     * search is the currently typed string by the user in the search bar. 
     * data is the JSON array that is updated at key press, drawing data from the Jikan API.
     * visible is a boolean toggle that toggles the hidden dialog box, upon press of add to list.
     * animeJSON is a singular JSON object that contains the information for the dialog box to display
     * and is updated upon press of a new anime label.
     * username is the currently authenticated user.
     */
    state = {
        search: '',
        data: [],
        visible: false,
        animeJSON: JSON,
        username: ''
    };
    
    /**
     * Update search is called upon key press.
     * It uses the search query field in the Jikan API that finds relevant anime based on the current 
     * search string inputed and refreshes the list at press for more dynamic searching.
     * 
     */
    updateSearch = search => {
    this.setState({search});
    var self = this
    fetch('https://api.jikan.moe/v3/search/anime/?q=' + search)
    .then(function(response) {
        return response.json();
    })
    .then(function(myJson) {
        self.data = myJson.results
        if(self.data.length > 5){
            self.setState({data: self.data})
        }
        
    });

    };

    /**
     * Toggles the dialog box display visibility upon button press.
     * Also sets the state anime JSON of the card being pressed for user in the dialog box.
     */
    addToListPressed =(anime)=>{

        this.setState({animeJSON: anime})
        this.setState({ visible: true})
    }

    /**
     * Rssponsible for moving each anime based on selected option to the chosen page
     * Sets the relevant information about the anime to firebase within an object that is labelled
     * with the name of the anime.
     * @param {*} option 
     * @param {*} anime 
     */
    moveAnime(option, anime){
        
      // The path responsible for where the anime is stored for each user.
      // Gets the currently authenticated user and pushes the new anime to the relevant category
      // they have selected through the options.
        let userMobilePath = "/users/"+this.getUser()+"/" + option + "/" + anime.title;

        firebase.database().ref(userMobilePath).set({
            currentEpisode: 0,
            title: anime.title,
            imageURL: anime.image_url,
            synopsis: anime.synopsis,
            episodes: anime.episodes,
            score: anime.score,
            type: anime.type
        })  
    }

    /**
     * Gets the username of the currently authenticated user through firebase authentication service.
     */
    getUser(){
        return firebaseAuth.currentUser.email.split("@niran.com")[0]
    }
      /**
       * Renders the current states of the search tab.
       * Consists of a search which takes keyboard input which refreshes the states the is responsible 
       * for the card display with scroll view.
       * Also has a hidden dialog box which is made visible through the add to list button which is present
       * on each anime card that is rendered.
       * The dialog box itself contains a selector that is rendered with it for the movement of anime between pages.
       * Scrollable view for all the anime cards.
       */
      render() {
        const { search, data } = this.state;
    
        return (
            
        <View>
            <Text></Text>
            <SearchBar           
                placeholder="Type Here..."
                onChangeText={this.updateSearch}
                value={search}
            />
            <Dialog
                visible={this.state.visible}
                onTouchOutside={() => {
                this.setState({ visible: false });
                }}
            >
                <DialogContent>
                   <Text></Text>
                   <Text style={{textAlign:'center', fontSize: 15}}>Select an action from below for:</Text>
                   <Text></Text>
                   <Text style={{textAlign:'center', fontSize: 14}}>{this.state.animeJSON.title}</Text>
                   <RNPickerSelect
                        onValueChange={(value) => this.moveAnime(value, this.state.animeJSON)}
                        items={[
                            { label: 'Watching', value: 'watching' },
                            { label: 'Completed', value: 'completed' },
                            { label: 'Yet To Watch', value: 'yetToWatch' }
                        ]}
                    />
                </DialogContent>
            </Dialog>
            <ScrollView>
                {this.state.data.map(anime => {
                    return(
                    <Card         
                        title={anime.title}
                        image={{uri: anime.image_url}}>
                        <Text style={{marginBottom: 10}}>
                            {anime.synopsis}
                        </Text>
                        <Text>
                            Episodes: {anime.episodes}
                        </Text>
                        <Text>
                            Score: {anime.score}
                        </Text>
                        <Text style={{marginBottom: 10}}>
                            Type: {anime.type}
                        </Text>
                        <Divider></Divider>
                        <Button
                            icon={<Icon name='code' color='#ffffff' />}
                            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                            title='Add To List'
                            onPress = {()=>this.addToListPressed(anime)}
                        />
                            
                    </Card>)
                })}
            </ScrollView>
        </View>
   
        );
      }
  }

  /**
   * Responsible for the functionlity of the three tabs present.
   * Sets the name and various styling options of the tabs which encompass these pages.
   * Disables header functionlity due to tabs not needing them.
   */
export default createBottomTabNavigator({

  News: {
    screen: News,
    navigationOptions: {
      tabBarLabel: 'News',
      tabBarIcon: ({ tintColor }) => (
        <Icon name='heartbeat' color={tintColor} size={24} />
      )
    }
  },
  Profile: {
    screen: Profile,
    navigationOptions: {
      tabBarLabel: 'Profile',
      tabBarIcon: ({ tintColor }) => (
        <Icon name='football' color={tintColor} size={24} />
      )
    }
  },

  Search: {
    screen: Search,
    navigationOptions: {
      tabBarLabel: 'Search',
      tabBarIcon: ({ tintColor }) => (
        <Icon name='heartbeat' color={tintColor} size={24} />
      )
    }
  }

}, {//router config
    initialRouteName: 'Profile',
    order: ['News', 'Profile', 'Search'],
    //navigation for complete tab navigator
    navigationOptions: {
      header: null,
      tabBarVisible: true
    },
    tabBarOptions: {
      activeTintColor: 'red',
      inactiveTintColor: 'grey'
    }
  });

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  searchbar:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  card:{
    marginTop: 40
  },
  

});