import { useState } from "react";
import { 
    signInWithGooglePopup,
    createUserDocumentFromAuth,
    createAuthUserWithEmailAndPassword, 
} from '../../utils/firebase/firebase.utils';
import Button from "../button/button.component";
import FormInput from '../form-input/form-input.component';
import './sign-in-form.styles.scss'

const defaultFormFields = {
  email: '',
  password: '',
}

const SignInForm = () => {
    const [formFields, setFormFields ] = useState(defaultFormFields)
    const { email, password } = formFields
    
    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    }

    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
        console.log(userDocRef)
    }
      
    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({ ...formFields, [name]: value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const { user } = await createAuthUserWithEmailAndPassword(
                email, 
                password
            );
            await createUserDocumentFromAuth(user)
            resetFormFields()
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                alert('Can not create user, email already in use.')
            } else {
                console.log('user creation encoutered an error', error)
            }
        }
    }

   
    return(
        <div className="sign-in-container">
            <h2>I already have an account</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput 
                label="Email"
                type="email"
                required
                onChange={handleChange}
                name='email'
                value={email} 
                />
                <FormInput 
                label="Password"
                type="password"
                required
                onChange={handleChange}
                name='password'
                value={password} 
                />
                <div className="sign-in-buttons">
                    <Button>SIGN IN </Button>
                    <Button buttonType='google' onClick={logGoogleUser}>SIGN IN WITH GOOGLE</Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm;