import React from "react";
// name ,lastName , Speciality, Adress , phone 
import './doctor.scss'
// reactstrap components
import {
    Button,
    Label,
    FormGroup,
    Input,
    Row,
    Form,
} from "reactstrap";
import Axios from "axios";



class AddDoctor extends React.Component {
    constructor(props) {
        super(props);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleSpecialityChange = this.handleSpecialityChange.bind(this);
        this.handleAddressChange = this.handleAddressChange.bind(this);
        this.handlePhoneChange = this.handlePhoneChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleBtnClick = this.handleBtnClick.bind(this);

        this.state = {
            doctor: {
                firstName: '',
                lastName: '',
                speciality: '',
                adress: '',
                phone: '',
                email :'',
                password : ''
            }
        }
    }
    handleLastNameChange = (e) => this.setState({ doctor: { ...this.state.doctor, lastName: e.target.value } })
    handleEmailChange = (e) => this.setState({ doctor: { ...this.state.doctor, email: e.target.value } })
    handlePasswordChange = (e) => this.setState({ doctor: { ...this.state.doctor, password: e.target.value } })
    handleNameChange = (e) => this.setState({ doctor: { ...this.state.doctor, firstName: e.target.value } })
    handleSpecialityChange = (e) => this.setState({ doctor: { ...this.state.doctor, speciality: e.target.value } })
    handleAddressChange = (e) => this.setState({ doctor: { ...this.state.doctor, adress: e.target.value } })
    handlePhoneChange = (e) => (e.target.validity.valid) ? this.setState({ doctor: { ...this.state.doctor, phone: e.target.value } }) : this.setState({ doctor: { ...this.state.doctor, phone: '' } })
    
    handleBtnClick = () => {
        Axios.post(`http://localhost:8081/doctor/add`,  this.state.doctor)
        .then(res => {
          this.props.history.push('/admin/doctor_list')
        })
    }
    async componentDidMount() {

    }
    render() {
        return (
            <>
                <div className="content">
                    <Row>
                        <Form className='form_doctor'>
                            <FormGroup>
                                <Label for="exampleEmail">Name</Label>
                                <Input type="text" name="Name" placeholder="Doctor Name" value={this.state.doctor.name} onChange={this.handleNameChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleEmail">Last Name</Label>
                                <Input type="text" name="Last_Name" placeholder="Doctor Lastname" value={this.state.doctor.lastName} onChange={this.handleLastNameChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleEmail">Speciality</Label>
                                <Input type="text" name="Speciality" placeholder="Doctor Speciality" value={this.state.doctor.speciality} onChange={this.handleSpecialityChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleEmail">Address</Label>
                                <Input type="text" name="Address" placeholder="Doctor Address" value={this.state.doctor.address} onChange={this.handleAddressChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleEmail">Email</Label>
                                <Input type="text" name="Address" placeholder="Doctor Email" value={this.state.doctor.email} onChange={this.handleEmailChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleEmail">Password</Label>
                                <Input type="password" name="Address" placeholder="Doctor Password" value={this.state.doctor.password} onChange={this.handlePasswordChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleEmail">Phone</Label>
                                <Input pattern="[0-9]*" type="text" name="phone" placeholder="Doctor phone" value={this.state.doctor.phone} onChange={this.handlePhoneChange} />
                            </FormGroup>
                            <FormGroup>
                                <Button onClick={this.handleBtnClick}>Add Doctor</Button>
                            </FormGroup>
                        </Form>
                    </Row>
                </div>
            </>
        );
    }
}

export default AddDoctor;
