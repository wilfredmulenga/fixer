import React from 'react';
import Navbar from '../components/Navbar'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import * as emailjs from 'emailjs-com';

class ContactUs extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            email: '',
            message: '',
            error: ''
        }
        this.sendEmail = this.sendEmail.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    sendEmail = () => {
        console.log('send email')
        var templateParams = {
            from_name: this.state.name,
            subject: this.state.email,
            to_email: 'willzmu@yahoo.com',
            message_html: this.state.message
        }
        emailjs.send('yahoo', 'received_your_query', templateParams, 'user_7OmW7NfCsjGRnE4PecdfY')
            .then(function (response) {
                console.log("success", response.status, response.text)
            }, function (error) {
                console.log(error)
            })
    }
    handleChange = ({ target: { value, placeholder } }) => {
        switch (placeholder) {
            case 'name':
                this.setState({
                    name: value
                })
                break;
            case 'email':
                this.setState({
                    email: value
                })
                break;
            case 'message':
                this.setState({
                    message: value
                })
                break;
            default:
                this.setState({
                    error: 'Please fill in all required fields ',
                });
                break;
        }
    }
    render() {


        return (<div>
            <Navbar />
            <div className="container">
                <div className='text-center mt-3'>
                    <Typography variant="headline" component="h2">CONTACT US</Typography>
                </div>
                <div className="row justify-content-center mt-3">
                    <Card className='col-xs-12 col-md-6 ' >
                        <CardContent>
                            {/* <Typography className={styles.title} color="textSecondary">
                                Word of the Day
        </Typography> */}
                            <div >

                                {/* <Typography component="p">Name</Typography> */}
                                <div className=' align-items-center row justify-content-center mb-2 '>
                                    <div className='col-sm-8' >
                                        <div className='row pl-3 '><Typography component="p">Name</Typography>
                                            <span className="mandatory">*</span>
                                        </div>
                                        <div ><input type='text' className='form-control' value={this.state.name}
                                            onChange={this.handleChange} placeholder='name' required /></div>


                                        <div className='row pl-3 mt-2'><Typography component="p">Email</Typography>
                                            <span className="mandatory">*</span>
                                        </div>
                                        <div ><input type='text' className='form-control' value={this.state.email}
                                            onChange={this.handleChange} placeholder='email' required /></div>


                                        <div className='row pl-3 mt-2'><Typography component="p">Message</Typography>
                                            <span className="mandatory">*</span>
                                        </div>
                                        <div ><textarea type='text' className='form-control' rows='5' value={this.state.message}
                                            onChange={this.handleChange} placeholder='message' required ></textarea></div>
                                        <div className='mt-4 text-center row justify-content-around'>

                                            <Button
                                                className="btn mb-1"
                                                type="button"
                                                variant='text'
                                                style={{ backgroundColor: '#FFF', color: '#000' }}
                                            //onClick={() => window.open('mailto:test@example.com')}
                                            >RESET</Button>
                                            <Button
                                                className="btn  mb-1"
                                                type="button"
                                                variant='text'
                                                style={{ backgroundColor: '#FFF', color: '#000' }}
                                                onClick={this.sendEmail}
                                            >SUBMIT</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>)
    }
}





export default ContactUs;

