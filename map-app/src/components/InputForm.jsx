import {Link, useNavigate} from 'react-router-dom'
import MapComponent from './MapDetails/MapComponent';
import { useFormik, Formik, Field, Form } from 'formik';


const InputForm = () => {
    const navigate = useNavigate();
    return ( 
        <div className="InputForm">
            <h3>Give your initial coordinates</h3>
            <Formik
                initialValues={{
                    startDest: '',
                    endDest: ''
                }}    

                onSubmit = {
                    (values) => {
                        console.log(values);
                        navigate('/results')
                    }
                }
            >
                <Form>
                    <Field name='startDest' type='text' placeholder='Put your start destination here'/>
                    <Field name='endDest' type='text' placeholder='Put your end destination here'/>
                        <button type='submit'>Submit</button>
                </Form>
            </Formik>
        </div>
     );
}
 
export default InputForm;