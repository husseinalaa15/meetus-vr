import * as Yup from "yup";


export const SignupSchema = Yup.object().shape({
 
    email: Yup.string().email('Invalid email').required('Email is Required'),
    password:Yup.string().required('Password is Required').min(7),
    repassword :Yup.string().test('passwords-match', 'Passwords must match', function(value){
        return this.parent.password === value
      })
  });


export const LoginSchema = Yup.object().shape({

    email: Yup.string().email('Invalid email').required('Email is Required'),
    password:Yup.string().required('Password is Required').min(7),

});
  