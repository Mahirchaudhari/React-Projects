import { useNavigate, useParams } from "react-router-dom";
import { createTodoForUser, retrieveTodoForUser, updateTodoForUser } from "./api/TodoApiService";
import { useAuth } from "./security/AuthContext";
import { useEffect, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import moment from "moment/moment";

export default function TodoComponent () {

    const {id} = useParams();
    const authContext = useAuth();
    const userName = authContext.username;
    const [description, setDescription] = useState('');
    const [targetDate, setTargetDate] = useState('');
    const navigate = useNavigate();

    useEffect(
        () => {retrieveTodo()}, [id]
    )

    function retrieveTodo () {
        if(id != -1 ){
            retrieveTodoForUser(userName, id)
            .then(
                (response) => {
                    setDescription(response.data.description);
                    setTargetDate(response.data.targetDate);
                }
            )
            .catch(error => console.log('response  : ', error));
        }
        
    }

    function onSubmit(values) {
        const todo = {
            id :  id,
            userName: userName,
            description: values.description,
            targetDate : values.targetDate,
            done : false 
        }

        if(id== -1) {
            createTodoForUser(userName, todo)
            .then(
                (response) => {
                    navigate('/todos')
                }
            )
            .catch(error => console.log('response  : ', error));
        } else {
            updateTodoForUser(userName, id, todo)
            .then(
                (response) => {
                    navigate('/todos')
                }
            )
            .catch(error => console.log('response  : ', error));
        }
    }

    function validate(values) {
        let errors = {};
        if(values.description.length <5) {
            errors.description = "Enter atlease 5 characters"
        }

        if(values.targetDate == null || values.targetDate == '' || !moment(values.targetDate).isValid()) {
            errors.targetDate = "Enter target Date"
        }

        return errors;
    }

    return(
        <div className="container">
            <h1>Enter Todo details</h1>
            <div>
                <Formik initialValues={{description, targetDate}} 
                        enableReinitialize = "true" 
                        onSubmit= {onSubmit} validate={validate}>
                    {
                        (props) => (
                            <Form>
                                <ErrorMessage
                                    name="description"
                                    component="div"
                                    className="alert alert-warning"
                                />
                                <ErrorMessage
                                    name="targetDate"
                                    component="div"
                                    className="alert alert-warning"
                                />
                                <fieldset className="form-group">
                                    <label>Description</label>
                                    <Field type="text" className="form-control" name="description" />
                                </fieldset>
                                <fieldset className="form-group">
                                    <label>Target Date</label>
                                    <Field type="date" className="form-control" name="targetDate" />
                                </fieldset>
                                <div>
                                    <button className="btn btn-success m-5" type="submit"> Save</button>
                                </div>
                            </Form>
                        )
                    }
                </Formik>
            </div>
        </div>
    );
}