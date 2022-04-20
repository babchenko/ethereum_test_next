// @ts-nocheck
import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form, Button, Message } from 'semantic-ui-react';
import { useRouter } from 'next/router';
import Layout from 'components/Layout';
import contract from 'ethereum/contract';
import web3 from 'ethereum/web3';
import { NewCitizen } from 'types';


const MIN_AGE = 18;
const MAX_AGE = 150

const NewCitizen: React.FC = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<string>('');

    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();


    const onSubmit = useCallback(async (data: NewCitizen) => {
        const { age, city, name, note } = data;

        const accounts = await web3.eth.getAccounts();

        try {
            setLoading(true)
            await contract.methods
                .addCitizen( age, city, name, note )
                .send({
                    from: accounts[0]
                });

            setLoading(false);
            setSuccess('Citizen was created!');
            reset();

            setTimeout(() => {
                setSuccess('');
                router.push('/');
            }, 3000);
        } catch (e: any) {
            setError(e.message);
            setLoading(false);
        }
    }, [router, reset, setError, setLoading, setSuccess]);

    return (
        <Layout>
            <>
                <h3>Create a Citizen</h3>
                <Form onSubmit={handleSubmit(onSubmit)} error={!!(Object.keys(errors).length || error)} success={!!success}>
                    { error && <Message
                        error
                        content={error}
                    /> }
                    { success && <Message
                        success
                        content={success}
                    /> }
                    <Form.Field>
                        <label>Name</label>
                        <input data-testid='name' placeholder='Name' {...register("name", { required: true })} />
                        { errors.name && errors.name.type === 'required' && <Message
                            error
                            content='Field Required'
                        /> }
                    </Form.Field>
                    <Form.Field>
                        <label>City</label>
                        <input data-testid='city' placeholder='City' {...register("city", { required: true })} />
                        { errors.city && errors.city.type === 'required' && <Message
                            error
                            content='Field Required'
                        /> }
                    </Form.Field>
                    <Form.Field>
                        <label>Age</label>
                        <input type="number" data-testid='age' placeholder='Age' min='18' max='150' step='1' {...register("age", { required: true, min: MIN_AGE, max: MAX_AGE })} />
                        { errors.age && errors.age.type === 'required' && <Message
                            error
                            content='Field Required'
                        /> }
                        { errors.age && errors.age.type === 'min' && <Message
                            error
                            content={`Minimum age is ${MIN_AGE} year old`}
                        /> }
                        { errors.age && errors.age.type === 'max' && <Message
                            error
                            content={`Maximum age is ${MAX_AGE} year old`}
                        /> }
                    </Form.Field>
                    <Form.Field>
                        <label>Note</label>
                        <input type="text" data-testid='note' placeholder='Note' {...register("note", { required: true })} />
                        { errors.note && errors.note.type === 'required' && <Message
                            error
                            content='Field Required'
                        /> }
                    </Form.Field>
                    <Button loading={loading} type='submit' data-testid='submit' primary>Submit</Button>
                </Form>
            </>
        </Layout>
    )
}

export default NewCitizen