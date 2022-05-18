import { useFormik, Formik, Field, Form } from 'formik';
const KilometerInput = ({callback}) => {
    return ( 
        <div className="KmInput">
            <Formik
                initialValues={{
                    price:0
                }}

                onSubmit={
                    (values) => {
                        callback(values)
                    }
                }
            >
                <Form>
                    <Field name='price' type='number' placeholder='Price' />
                    <button type='submit'>Submit</button>
                </Form>
            </Formik>
        </div>
     );
}
 
export default KilometerInput;