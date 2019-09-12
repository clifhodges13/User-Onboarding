import React, { useState, useEffect } from 'react'
import { withFormik, Form, Field } from 'formik'
import * as yup from 'yup'
import axios from 'axios'


function LoginForm({errors, touched, status}) {

  const [users, setUsers] = useState([])

  useEffect(() => {
    if(status) {
      setUsers([...users, status])
    }
  }, [status])
  
  return (
    <>
      <Form className="form">
        {touched.name && errors.name && <p>{errors.name}</p>}
        <Field 
          type='text'
          placeholder='Name'
          name='name'
        />
        {touched.email && errors.email && <p>{errors.email}</p>}
        <Field 
          type='text'
          placeholder='Email'
          name='email'
        />
        {touched.password && errors.password && <p>{errors.password}</p>}
        <Field 
          type='password'
          placeholder='Password'
          name='password'
        />
        {touched.terms && errors.terms && <p>{errors.terms}</p>}
        <label style={{fontSize: '12px', color: 'white'}}>Agree
          <Field 
            type='checkbox'
            name="terms"
          />
        </label>
        <button type="submit">Submit</button>
      
        <div>
          <h2>These Users have already signed up:</h2>
          {users.map((user, index) => {
            return(
              <div key={index}>
                <h3>Username: {user.name}</h3>
              </div>
            )
          })}
        </div>

      </Form>

    </>
  )
}

const FormikLoginForm = withFormik({
  mapPropsToValues({ name, email, password, terms }) {
    return {
      name: name || '',
      email: email || '',
      password: password || '',
      terms: terms || false
    }
  },

  validationSchema: yup.object().shape({
    name: yup.string().required('You must enter a name.'),
    email: yup.string().required('Your email address is required.'),
    password: yup.string().min(6).required('We definitely are gonna need a valid password ;)'),
    terms: yup.boolean().oneOf([true], `Well, it seems you haven't accepted our terms of service... That's not gonna work for us fam.`)
  }),

  handleSubmit(values, { setStatus }) {
    console.log(values)
    axios.post('https://reqres.in/api/users', values)
      .then(res => {
        setStatus(res.data)
      })
      .catch(err => {
        console.log(`Error: ${err}`)
      })
  }
})(LoginForm)

export default FormikLoginForm