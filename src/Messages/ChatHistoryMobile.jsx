import React from 'react';
import Navbar from '../components/Navbar';
import Firebase from '../config/firebase';
import Button from '@material-ui/core/Button';
import ChatIcon from '../images/icons8-chat-100.png';
import { browserHistory } from 'react-router';
let userUID
let selectedPersonUserUID = '';
class ChatHistoryMobile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loginStatus: true,
            //messageKey: this.props.location.state.selectedPersonUserUID,
            //name: this.props.location.state.selectedPersonName,
            showChatHistory: true
        }
        userUID = this.props.route.userUID
            (userUID != null) ? null : this.setState({ loginStatus: false })

    }

    componentDidMount() {

        this.LoadChatHistory();
    }

    UNSAFE_componentWillMount() {
        this.LoadChatHistory()
        // this.props.location.state
        //     ? (selectedPersonUserUID = this.props.location.state.messageKey)
        //     : null;
    }
    LoadChatHistory = () => {

        const setChatHistory = function (snap) {
            const data = snap.val();
            let elements = Object.values(data);

            //  console.log("loadchathistory", elements)
            let properties = [];
            for (const index in data) {
                properties.push(data[index])
            }
            // console.log(elements['0'])
            this.displayChatHistory(elements['1'], elements['3'], elements['0'], elements['2'])
        }.bind(this);
        //precaution incase userUID is null, dont push to database. preventing errors
        (userUID != null) ?
            Firebase.database()
                .ref(`Users/${userUID}/Messages`)
                .limitToLast(1)
                .on('child_added', setChatHistory) : this.setState({
                    loginStatus: false
                })

    }

    displayChatHistory = (name, text, messageKey, picUrl) => {
        const MESSAGE_TEMPLATE =
            '<div class="message-container">' +
            '<div><img class="pic" className=" rounded-circle"/>' +
            '<div class="spacing"><div class="message"></div>' +
            '<div class="name"></div></div>' +
            '</div></div>';

        let div = document.getElementById(name);
        const messageList = document.getElementById('chatHistory') || document.getElementById('chatHistoryMobile');
        //console.log(messageList)
        // If an element for that message does not exists yet we create it.
        if (!div) {
            const container = document.createElement('div');
            container.innerHTML = MESSAGE_TEMPLATE;
            div = container.firstChild;
            div.setAttribute('id', name);
            (messageList != null) ? messageList.appendChild(div) : null;
        }
        div.querySelector('.name').textContent = name;
        div.querySelector('.message').textContent = text;
        div.onclick = (event) => {
            if (event.button === 0) {
                selectedPersonUserUID = messageKey;
                this.setState({
                    showChatHistory: false
                })
                browserHistory.push({
                    pathname: '/messagesmobile',
                    state: {
                        selectedPersonUserUID: selectedPersonUserUID,
                        selectedPersonName: name
                    }
                })
                console.log(this.state.showChatHistory, "Show")
                //this.loadMessages()
                // if (messageList == document.getElementById('chatHistoryMobile')) {
                //     browserHistory.push({
                //         pathname: '/messagesmobile',
                //         state: {
                //             //   selectedPersonUserUID: selectedPersonUserUID,
                //             selectedPersonName: name
                //         }
                //     })
                // } else if (messageList == document.getElementById('chatHistory')) {
                //     console.log("do this")
                //     this.loadMessages()
                // }
            }
        }
        div.querySelector('.pic').src = `${picUrl}`;

        // if (text) { // If the message is text.
        //     messageElement.textContent = text;
        //     // Replace all line breaks by <br>.
        //     messageElement.innerHTML = messageElement.innerHTML.replace(/\n/g, '<br>');
        //   }

        if (!picUrl) {
            div.querySelector('.pic').src =
                'url(https://storage.googleapis.com/lsk-guide-jobs.appspot.com/profile_placeholder.png)';
        }

        // var div = document.getElementById("messages");

        // console.log(text)
        // messageList.scrollTop = messageList.scrollHeight;
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

                {(this.state.loginStatus) ? <div className='card mt-3' style={{ height: '100%' }}>
                    <div id='chatHistory' className='chatHistory' style={{ padding: 8, height: '100%' }}>
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

export default ChatHistoryMobile