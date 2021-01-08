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
    Col,
    Card,
    CardHeader,
    CardTitle,
    CardBody,
    Table,
} from "reactstrap";
import Axios from "axios";



class DoctorList extends React.Component {
    constructor(props) {
        super(props);
        this.onDeleteAction = this.onDeleteAction.bind(this);
        this.onUpdateAction = this.onUpdateAction.bind(this);
        this.state = {
            doctor: []
        }
    }
    async componentDidMount() {
        await this.initDoctors()
    }
    async initDoctors() {
        const res = await Axios.get('http://localhost:8081/doctor');
        if (res.data) {
            const doctors = Object.keys(res.data).map((e) => {
                return {
                    id: e,
                    ...res.data[e]
                }

            })
            this.setState({
                doctor: doctors
            })
        }else{
            this.setState({
                doctor : []
            })
        }
    }
    async onDeleteAction(id) {
        await Axios.delete(`http://localhost:8081/doctor/${id}`);
        await this.initDoctors();
    }
    async onUpdateAction(id) {
        this.props.history.push({
            pathname: '/admin/update_doctor',
            state: { 'id': id }
        })
    }
    render() {
        return (
            <div className="content">
                <Row>
                    <Col md="12">
                        <Card>
                            <CardHeader>
                                <CardTitle tag="h4">Doctor List</CardTitle>
                            </CardHeader>
                            <CardBody>
                                <Table className="tablesorter" responsive>
                                    <thead className="text-primary">
                                        <tr>
                                            <th>Name</th>
                                            <th>Last Name</th>
                                            <th>Adress</th>
                                            <th>Speciality</th>
                                            <th>phone</th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.doctor.map(e => {
                                            return (
                                                <tr key={e.id}>
                                                    <td>{e.firstName}</td>
                                                    <td>{e.lastName}</td>
                                                    <td>{e.adress}</td>
                                                    <td>{e.speciality}</td>
                                                    <td>{e.phone}</td>
                                                    <td className="delete-action text-center"><i onClick={() => this.onDeleteAction(e.id)} className="tim-icons icon-simple-delete" ><span className="tooltiptext">Delete</span></i></td>
                                                    <td className="delete-action text-center"><i onClick={() => this.onUpdateAction(e.id)} className="tim-icons icon-pencil" ><span className="tooltiptext">Update</span></i></td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default DoctorList;
