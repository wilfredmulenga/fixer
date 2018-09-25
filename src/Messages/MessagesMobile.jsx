import React from 'react';
import Navbar from '../components/Navbar';
import Firebase from '../config/firebase';
import Button from '@material-ui/core/Button';
import ChatIcon from '../images/icons8-chat-100.png';
import { browserHistory } from 'react-router';
//remove this variable and use this.state.userUID
let userUID
class MessagesMobile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loginStatus: true,
            messageKey: this.props.location.state.selectedPersonUserUID,
            name: this.props.location.state.selectedPersonName,
            showChatHistory: true,
            userUID: this.props.route.userUID
        }
        userUID = this.props.route.userUID;
        this.loadMessages = this.loadMessages.bind(this);
        this.displayMessage = this.displayMessage.bind(this);
        this.messageSubmit = this.messageSubmit.bind(this);

        (userUID !== null) ? null : this.setState({ loginStatus: false })
    }

    componentDidMount() {


    }

    UNSAFE_componentWillMount() {
        this.loadMessages()
        // this.props.location.state
        //     ? (selectedPersonUserUID = this.props.location.state.messageKey)
        //     : null;
    }


    loadMessages = () => {

        const setMessage = function (snap) {
            const data = snap.val();

            this.displayMessage(snap.key, data.name, data.text, data.profilePicUrl, data.imageUrl);
        }.bind(this);
        Firebase.database()
            .ref(`Messages/${this.state.messageKey}`)
            .limitToLast(12)
            .on('child_added', setMessage);

    };
    displayMessage = (key, name, text, picUrl, imageUrl) => {

        const MESSAGE_TEMPLATE =
            '<div class="message-container">' +
            '<div><img class="smallpic" className=" rounded-circle"/>' +
            '<div class="spacing"><div class="message"></div>' +
            '<div class="name"></div></div>' +
            '</div></div>';

        let div = document.getElementById(key);
        const messageList = document.getElementById('messages');
        // If an element for that message does not exists yet we create it.
        if (!div) {
            const container = document.createElement('div');
            container.innerHTML = MESSAGE_TEMPLATE;
            div = container.firstChild;
            div.setAttribute('id', key);
            messageList.appendChild(div);
        }
        div.querySelector('.name').textContent = name;
        div.querySelector('.message').textContent = text;
        div.querySelector('.smallpic').src = `${picUrl}`;

        // if (text) { // If the message is text.
        //     messageElement.textContent = text;
        //     // Replace all line breaks by <br>.
        //     messageElement.innerHTML = messageElement.innerHTML.replace(/\n/g, '<br>');
        //   }

        if (!picUrl) {
            div.querySelector('.pic').src =
                'url(https://storage.googleapis.com/lsk-guide-jobs.appspot.com/profile_placeholder.png)';
        }
        messageList.scrollTop = messageList.scrollHeight;
    };
    saveMessage = (messageText) => {
        // Add a new message entry to the Firebase Database.
        Firebase.database()
            .ref(`/Messages/${this.state.messageKey}`)
            // .ref(`/messages/${userUID}${seletcedPersonUserID}`)
            .push({
                name: this.getUserName(),
                text: messageText,
                profilePicUrl: this.getProfilePicUrl(),
                userUID: userUID
            })
            .catch((error) => {
                console.error('Error writing new message to Firebase Database', error);
            });
    };

    messageSubmit = () => {
        this.messageInput = document.getElementById('messageInput');
        if (this.messageInput.value) {
            this.saveMessage(this.messageInput.value);
            this.messageInput.value = '';
        }
    };
    getUserName = () =>
        // remember to give provision for user to set displayName when signing up
        // currently using email address
        Firebase.auth().currentUser.email;

    getProfilePicUrl = () =>
        Firebase.auth().currentUser.photoURL ||
        'https://storage.googleapis.com/lsk-guide-jobs.appspot.com/profile_placeholder.png';

    render() {
        console.log(this.state.showChatHistory, "render")
        return (
            <div style={{ height: 'inherit', margin: 0 }}>
                <Navbar userUID={this.state.userUID} />

                {(this.state.loginStatus) ?
                    <div className="row" style={{ height: 'inherit' }}>

                        <div className="d-flex flex-column col ml-2 mr-2">
                            <div className="text-center mt-3 mb-5">{this.state.name}</div>

                            <div id="messages" className=" flex-grow-1 messagemobile-form " ></div>
                            <div className="messageInputContainer mb-3" >
                                <input className="messageInput col" type="text" id="messageInput" />
                                <Button variant='outlined' style={{ backgroundColor: '#FFF', color: '#000' }}
                                    onClick={this.messageSubmit}>SEND</Button>

                            </div>

                        </div>
                    </div>

                    : <div className="container text-center mt-5" style={{ height: '100%' }} >
                        <img src={ChatIcon} alt="chat icon" />
                        <h4 className="mt-5">Please login to view Messages</h4>
                        <Button variant='outlined'
                            style={{ backgroundColor: '#FFF', color: '#000', marginTop: 50 }}
                            onClick={() => browserHistory.push('/phoneLogin')}>Login</Button>
                    </div>}
            </div>
        )
    }
}

export default MessagesMobile