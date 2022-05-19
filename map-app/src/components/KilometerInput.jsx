import { useFormik, Formik, Field, Form } from 'formik';
import '../App.scss'
const KilometerInput = ({callback}) => {
    const setFuelPrice = callback
    return ( 
        <div className="KmInput">
            <Formik
                initialValues={{
                    price: 0
                }}

                onSubmit={
                    (values) => {
                        setFuelPrice(parseInt(values.price))
                    }
                }
            >
                <Form>
                    <h6>Put price of fuel here in order to calculate your trip price</h6>
                    <>
                    <Field name='price' type='number' placeholder='Price' />
                    </>
                    <><button type='submit'>Submit</button></>
                    
                </Form>
            </Formik>
        </div>
     );
}
 
export default KilometerInput;