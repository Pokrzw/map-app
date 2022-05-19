import { Link, useNavigate } from 'react-router-dom'
import MapComponent from './MapDetails/MapComponent';
import { useFormik, Formik, Field, Form } from 'formik';
import { useDispatch } from 'react-redux'
import { addAddress } from '../ducks/address/addressAction';
import { useEffect } from 'react';
import axios from 'axios';
import '../App.scss'


const InputForm = () => {
    const API_KEY = 'YIwoh8OOrzqznce9J6-TA-NVmccFNhaHlP-5eZe9bFo'
    const checkAdress = async (address) => {

        return await axios.get(`https://geocode.search.hereapi.com/v1/geocode`, {
            params: {
                apiKey: API_KEY,
                q: address
            }
        })
    }

    const dispatch = useDispatch();
    const navigate = useNavigate();
    return (
        <div className="InputForm">
            <div className="wrapper">
            <h3>Give your initial addressess</h3>
            <Formik className='Formik'
                initialValues={{
                    startDest: '',
                    endDest: ''
                }}

                onSubmit={
                    (values) => {
                        (
                            async () => {
                                const address_one = (await checkAdress(values.startDest)).data.items.length === 0;
                                const address_two = (await checkAdress(values.endDest)).data.items.length === 0;

                                if (address_one || address_two) {

                                    alert("We couldn't find at least one of the addressess you provided. Try changing one of them")

                                }
                                else {
                                    dispatch(addAddress(values.startDest, values.endDest));
                                    navigate('/results')
                                }
                            }
                        )()
                    }
                }
            >
                <Form>
                    <div className="mainForm">
                        <div className="field">
                            <Field name='startDest' type='text' placeholder='Put your start destination here' />
                        </div>
                        <div className="field">
                            <Field name='endDest' type='text' placeholder='Put your end destination here' />
                        </div>
                        <div className="field">
                            <button type='submit'>Submit</button>
                        </div>
                    </div>

                </Form>
            </Formik>
            </div>
        </div>
    );
}

export default InputForm;