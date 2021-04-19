import React, {useState} from 'react'
import { useHistory } from 'react-router-dom'
import InputMask from "react-input-mask"
import axios from 'axios';
import {
  CCol,
  CNav,
  CNavItem,
  CNavLink,
  CRow,
  CTabContent,
  CTabPane,
  CCard,
  CCardBody,
  CCardFooter,
  CTabs,
  CCardHeader,
  CButton,
  CForm,
  CFormGroup,
  CFormText,
  CInput,
  CInputRadio,
  CLabel,
  CSelect
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import usersData from './UsersData'
import { DocsLink } from 'src/reusable'

const initialValue = {
  name: '',
  email: '',
  phone: '',
  mobile: '',
  password: '',
  expireDate: '',
  username: '', 
  profile: '',
  company: '',
  status: ''
}

const User = ({match}) => {
  const lorem = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit.'
  const user = usersData.find( user => user.id.toString() === match.params.id)
  const userDetails = user ? Object.entries(user) : 
    [['id', (<span><CIcon className="text-muted" name="cui-icon-ban" /> Not found</span>)]]

  const [values, setValues] = useState(initialValue)
  const history = useHistory()

  const Input = (props) => (
    <InputMask mask="99999-999" value={props.value} onChange={props.onChange} />
  )
  
  function onChange(ev) {
    const { name, value } =  ev.target;
    
    setValues({...values, [name]:value});
  }

  function onSubmit(ev) {
    ev.preventDefault();
  }

  function dateShow() {
    if (document.getElementById('inline-radio1').checked) {
        document.getElementById('date').style.visibility = 'visible';
    }
    else document.getElementById('date').style.visibility = 'hidden';
  }

  return (
    <CRow>
      <CCol lg={12}>
        <CCard>
          <CCardBody>
            <CTabs>
              <CNav variant="tabs">
                <CNavItem>
                  <CNavLink>
                    User Registry
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>
                    Profile
                  </CNavLink>
                </CNavItem>
              </CNav>
              <CTabContent>
                <CTabPane>
                  <CCardBody>
                    <CForm onSubmit={onSubmit} id="form1" className="form-horizontal">
                      <CFormGroup row>
                        <CCol md="12">
                          <CLabel htmlFor="username">Username</CLabel>
                        </CCol>
                        <CCol xs="12" md="6">
                          <CInput id="username" name="username" placeholder="Username" onChange={onChange} />
                        </CCol>
                      </CFormGroup>
                      <CFormGroup row>
                        <CCol md="12">
                          <CLabel htmlFor="name">Full Name</CLabel>
                        </CCol>
                        <CCol xs="6" md="12">
                          <CInput id="name" name="name" placeholder="Full Name" onChange={onChange}  />
                          <CFormText>This is a help text</CFormText>
                        </CCol>
                      </CFormGroup>
                      <CFormGroup row>
                        <CCol md="12">
                          <CLabel htmlFor="email">E-mail Address</CLabel>
                        </CCol>
                        <CCol xs="12" md="12">
                          <CInput type="email" id="email" name="email" placeholder="Enter E-mail" autoComplete="email" onChange={onChange} />
                          <CFormText className="help-block">Please enter your e-mail</CFormText>
                        </CCol>
                      </CFormGroup>
                      <CFormGroup row>
                        <CCol md="6">
                          <CLabel htmlFor="phone">Phone Number</CLabel>
                        </CCol>
                        <CCol md="6">
                          <CLabel htmlFor="mobile">Mobile Phone</CLabel>
                        </CCol>
                        <CCol xs="6" md="6">
                          <InputMask className="form-control" mask="(99) 9999-9999" type="text" id="phone" name="phone" placeholder="Phone Number" autoComplete="email" onChange={onChange} />
                          <CFormText className="help-block">Please enter your phone number</CFormText>
                        </CCol>
                        <CCol xs="6" md="6">
                          <InputMask className="form-control" mask="(99) 9 9999-9999"type="text" id="mobile" name="mobile" placeholder="Mobile Phone" autoComplete="email" onChange={onChange} />
                          <CFormText className="help-block">Please enter your mobile phone number</CFormText>
                        </CCol>
                      </CFormGroup>
                      <CFormGroup row>
                        <CCol md="12">
                          <CLabel htmlFor="password">Password</CLabel>
                        </CCol>
                        <CCol xs="6" md="6">
                          <CInput type="password" id="password" name="password" placeholder="Password" autoComplete="new-password" onChange={onChange}  />
                          <CFormText className="help-block">Please enter a complex password</CFormText>
                        </CCol>
                        <CCol xs="6" md="6">
                          <CInput type="password" id="password-confirm" name="password-confirm" placeholder="Confirm Password" autoComplete="new-password" onChange={onChange} />
                          <CFormText className="help-block">Please confirm your password</CFormText>
                        </CCol>
                      </CFormGroup>
                      <CFormGroup row>
                        <CCol md="12">
                          <CLabel htmlFor="date-input">Expire</CLabel>
                        </CCol>
                        <CCol xs="6" md="6">
                          <CFormGroup variant="custom-radio" inline>
                            <CInputRadio onClick={() => dateShow()} custom id="inline-radio1" name="expire" value="Yes"  />
                            <CLabel variant="custom-checkbox" htmlFor="inline-radio1">Yes</CLabel>
                          </CFormGroup>
                          <CFormGroup variant="custom-radio" inline>
                            <CInputRadio onClick={() => dateShow()} custom id="inline-radio2" name="expire" value="Never"  />
                            <CLabel variant="custom-checkbox" htmlFor="inline-radio2">Never</CLabel>
                          </CFormGroup>
                        </CCol>
                        <CCol xs="6" md="6">
                          <CInput type="date" id="date" name="expire-date" placeholder="Expire Date" onChange={onChange}  />
                        </CCol>
                      </CFormGroup>
                      <CFormGroup row>
                        <CCol md="12">
                          <CLabel htmlFor="status">Status</CLabel>
                        </CCol>
                        <CCol xs="12" md="6">
                          <CSelect custom name="status" id="select" onChange={onChange} >
                            <option value="0">Please select</option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                          </CSelect>
                        </CCol>
                      </CFormGroup>
                    </CForm>
                  </CCardBody>
                  <CCardFooter className="details-footer">
                    <CButton type="submit" form="form1" size="sm" color="primary"><CIcon name="cil-scrubber" /> Save</CButton>
                    <CButton type="cancel" size="sm" color="danger"><CIcon name="cil-ban" /> Cancel</CButton>
                  </CCardFooter>
                </CTabPane>
                <CTabPane>
                <CCardBody>
                    <CForm onSubmit={onSubmit} id="form2" className="form-horizontal">
                      <CFormGroup row>
                        <CCol md="12">
                          <CLabel>Username</CLabel>
                        </CCol>
                        <CCol xs="12" md="6">
                          <CInput id="username2" name="username" placeholder="Username" />
                        </CCol>
                      </CFormGroup>
                      <CFormGroup row>
                        <CCol md="12">
                          <CLabel htmlFor="text-input">Full Name</CLabel>
                        </CCol>
                        <CCol xs="6" md="6">
                          <CInput id="name2" name="name" placeholder="Full Name" />
                          <CFormText>This is a help text</CFormText>
                        </CCol>
                      </CFormGroup>
                      <CFormGroup row>
                        <CCol md="6">
                          <CLabel htmlFor="profile">Profile</CLabel>
                        </CCol>
                        <CCol md="6">
                          <CLabel htmlFor="company">Company</CLabel>
                        </CCol>
                        <CCol xs="12" md="6">
                          <CSelect custom name="profile" id="select" onChange={onChange} >
                            <option value="0">Please select</option>
                            <option value="Owner">Owner</option>
                            <option value="Driver">Driver</option>
                            <option value="Office">Office</option>
                          </CSelect>
                        </CCol>
                        <CCol xs="12" md="6">
                          <CSelect custom name="company" id="select" onChange={onChange} >
                            <option value="0">Please select</option>
                            <option value="Company 1">Company 1</option>
                            <option value="Company 2">Company 2</option>
                            <option value="Company 3">Company 3</option>
                          </CSelect>
                        </CCol>
                      </CFormGroup>
                    </CForm>
                  </CCardBody>
                  <CCardFooter className="details-footer">
                    <CButton type="submit" form="form2" size="sm" color="primary"><CIcon name="cil-scrubber" /> Save</CButton>
                    <CButton type="cancel" size="sm" color="danger"><CIcon name="cil-ban" /> Cancel</CButton>
                  </CCardFooter>
                </CTabPane>
              </CTabContent>
            </CTabs>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default User