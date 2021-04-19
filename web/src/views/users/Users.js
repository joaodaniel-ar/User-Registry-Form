import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import axios from 'axios'
import {
  CBadge,
  CCard,
  CCardBody,
  CCol,
  CDataTable,
  CRow,
  CNavbar,
  CForm,
  CInput,
  CSelect,
  CButton,
  CPagination
} from '@coreui/react'

import CIcon from '@coreui/icons-react'

const getBadge = status => {
  switch (status) {
    case 'Active': return 'success'
    case 'Inactive': return 'secondary'
    case 'Pending': return 'warning'
    case 'Banned': return 'danger'
    default: return 'primary'
  }
}

const Users = () => {
  const history = useHistory()
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
  const [page, setPage] = useState(currentPage)

  const pageChange = newPage => {
    currentPage !== newPage && history.push(`/users?page=${newPage}`)
  }

  const [users, setUsers] = useState([]);

  useEffect(() => {
    currentPage !== page && setPage(currentPage)
  }, [currentPage, page])

  useEffect(() => {
    axios.get('http://localhost:5000/users')
    .then((response) => {
      setUsers(response.data)
    })
  }, [])

  function deleteData(id) {
    axios.delete('http://localhost:5000/users/'+ id)
    .then((response)=> {
      alert("User successfully deleted!");
      history.go(0);
    });
  }

  return (
    <CRow>
        <CCardBody>
          <CNavbar navbar>
              <CButton onClick={() => history.push("/registry")} color="dark">+Add</CButton>
              <CForm className="user-filters" inline>
                <CSelect custom name="select" id="select">
                  <option value="0">Status</option>
                  <option value="1">Active</option>
                  <option value="2">Inactive</option>
                </CSelect>
                <CInput
                  className="mr-sm-2"
                  placeholder="Search"
                />
              </CForm>
          </CNavbar>
        </CCardBody>

      <CCol xl={12}>
        <CCard>
          <CCardBody>
          <CDataTable
            items={users}
            fields={[
              'id', { key: 'name', _classes: 'font-weight-bold' },
              'username', 'profile', 'status', 'actions'
            ]}
            hover
            striped
            itemsPerPage={5}
            activePage={page}
            scopedSlots = {{
              'status':
                (item)=>(
                  <td>
                    <CBadge color={getBadge(item.status)}>
                      {item.status}
                    </CBadge>
                  </td>
                )
            }}
            scopedSlots = {{
              'actions':
                (item)=>(
                  <td class="form-actions">
                    <a href={"#/users/" + item.id}><CIcon name="cil-pencil" /></a>
                    <a href="#"><CIcon name="cil-ban" /></a>
                    <a onClick={() => deleteData(item.id)}><CIcon name="cil-x" /></a>
                  </td>
                )
            }}
          />
          <CPagination
            activePage={page}
            onActivePageChange={pageChange}
            pages={5}
            doubleArrows={false} 
            align="center"
          />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Users
