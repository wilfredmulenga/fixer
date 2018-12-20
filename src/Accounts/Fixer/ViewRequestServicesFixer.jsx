import React from 'react';
import Firebase from '../../config/firebase';
import Modal from 'react-modal';
import Button from '@material-ui/core/Button';
import Media from "react-media";

let typeOfUser = localStorage.getItem('typeOfUser')
Modal.setAppElement('#root');
let requests;

//fetch service requests based on the fixer's userUID
Firebase.database()
    .ref(`ServiceRequests/`)
    .orderByChild('fixerUID')
    .equalTo('L5WK2zajNqS7wLVja2KwzsdWfCA3')
    .on('value', (snapshot) => {
        let elements = [];
        for (const index in snapshot.val()) {
            var x = snapshot.val()[index]
            x.requestID = index
            elements.push(x)
        }
        requests = elements
    })


class ViewRequestServicesFixer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            modalIsOpen: false,
            requestID: null
        }
        this.acceptRequest = this.acceptRequest.bind(this)
    }

    acceptRequest = () => {
        Firebase.database()
            .ref(`ServiceRequests/${this.state.requestID}`)
            .update({
                status: "accepted"
            })
        this.setState({
            modalIsOpen: false
        })
    }
    render() {
        return (<div>
            <Media query="(max-width:769px)"
                render={() => <div>
                    <table className="table table-bordered table-hover">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Item</th>
                                <th scope="col">Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(requests !== undefined) ? requests.map((element, i) =>
                                <tr>
                                    <th scope="row">{i}</th>
                                    <th scope="row">Job Description</th>
                                    <th scope="row">{`Profession: ${element.profession}`}<br />
                                        {`Job Description: ${element.jobDescription}`}<br />
                                        {`Estimated Budget: ${element.estimatedBudget}`}<br />
                                        {`Preffered Start Date: ${element.serviceAddress.preferredStartDate}`}<br />
                                    </th>
                                </tr>
                            ) : null}
                        </tbody>
                    </table>
                </div>} />
            <Media query="(min-width:770px)"
                render={() => <div>
                    <table className="table table-bordered table-hover">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">{(typeOfUser === 'user') ? `Fixer` : `User`}</th>
                                <th scope="col">Job Description</th>
                                <th scope="col">Service Address</th>
                                <th scope="col">Job Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(requests !== undefined) ? requests.map((element, i) =>
                                <tr key={i} onClick={() => this.setState({
                                    modalIsOpen: true,
                                    requestID: element.requestID
                                })}>
                                    {console.log(element.requestID)}
                                    <th scope="row">{i + 1}</th>
                                    <td>{(typeOfUser === `user`) ? element.fixerFullName : element.userFullName}</td>
                                    <td>{`Profession: ${element.profession}`}<br />
                                        {`Job Description: ${element.jobDescription}`}<br />
                                        {`Estimated Budget: K${element.estimatedBudget}`}<br />
                                        {`Preferred Start Date: ${element.serviceAddress.preferredStartDate}`}</td>
                                    <td>{element.serviceAddress.streetAddress}<br />
                                        {element.serviceAddress.city}<br />
                                        {element.serviceAddress.phoneNumber}</td>
                                    <td>{element.status}</td>
                                </tr>
                            ) : null}

                        </tbody>
                    </table>
                    <Modal
                        isOpen={this.state.modalIsOpen}>
                        <div className="justify-content-center text-center">
                            <h3 className="mb-5">would you like to accept this job?</h3>
                            <div className="row justify-content-around">
                                <Button variant='contained'
                                    style={{ backgroundColor: '#FFF', color: '#000' }}
                                    onClick={this.acceptRequest}
                                >Yes</Button>
                                <Button variant='contained'
                                    style={{ backgroundColor: '#FFF', color: '#000' }}
                                    onClick={() => this.setState({
                                        modalIsOpen: false
                                    })}>No</Button>
                            </div>
                        </div>
                    </Modal>
                </div>} />
        </div>)
    }
}

export default ViewRequestServicesFixer;