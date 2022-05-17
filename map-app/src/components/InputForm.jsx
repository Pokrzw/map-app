import {Link} from 'react-router-dom'
import MapComponent from './MapDetails/MapComponent';
import { useFormik, Formik, Field, Form } from 'formik';

const InputForm = () => {
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
                    }
                }
            >
                <Form>
                    <Field name='startDest' type='text' placeholder='Put your start destination here'/>
                    <Field name='endDest' type='text' placeholder='Put your end destination here'/>
                    <Link to='/results'>
                        <button type='submit'>Submit</button>
                    </Link>
                </Form>
            </Formik>
        </div>
     );
}
 
export default InputForm;