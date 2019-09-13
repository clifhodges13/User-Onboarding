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
        {touched.name && errors.name && <p className="error-message">{errors.name}</p>}
        <Field 
          type='text'
          placeholder='Name'
          name='name'
        />
        {touched.email && errors.email && <p className="error-message">{errors.email}</p>}
        <Field 
          type='text'
          placeholder='Email'
          name='email'
        />
        {touched.password && errors.password && <p className="error-message">{errors.password}</p>}
        <Field 
          type='password'
          placeholder='Password'
          name='password'
        />
        {touched.role && errors.role && <p className="error-message">{errors.role}</p>}
        <Field component="select" name="role">
          <option value="" disabled>Select Your Role</option>
          <option value="UX Designer">UX Designer</option>
          <option value="UI Designer">UI Designer</option>
          <option value="Front End Engineer">Front End Engineer</option>
          <option value="Back End Engineer">Back End Engineer</option>
        </Field>
        {touched.terms && errors.terms && <p className="error-message">{errors.terms}</p>}
        <label style={{fontSize: '12px', color: 'white'}}>Agree
          <Field 
            type='checkbox'
            name="terms"
          />
        </label>
        <button type="submit">Submit</button>

        <p style={{fontSize: '20px', textAlign: 'center', color: 'white'}}>Current Users:</p>
      
        {users.map((user, index) => {
          return(
            <div key={index}>
              <h3>{user.name}</h3>
              <h4>{user.role}</h4>
            </div>
          )
        })}
      </Form>

    </>
  )
}

const FormikLoginForm = withFormik({
  mapPropsToValues({ name, email, password, role, terms }) {
    return {
      name: name || '',
      email: email || '',
      password: password || '',
      role: role || '',
      terms: terms || false
    }
  },

  validationSchema: yup.object().shape({
    name: yup.string().required('You must enter a name.'),
    email: yup.string().required('Your email address is required.'),
    password: yup.string().min(6).required('We definitely are gonna need a valid password ;)'),
    role: yup.string().required(`If you don't know your role, how are we supposed to know?`),
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