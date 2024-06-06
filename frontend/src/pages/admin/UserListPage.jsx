import { useGetUsersQuery, useDeleteUsersMutation } from "../../slices/usersApiSlice"
import {Table, Button, Row, Col} from "react-bootstrap"
import {LinkContainer} from "react-router-bootstrap"
import Loader from "../../components/Loader"
import Message from "../../components/Message"
import {FaTimes, FaTrash, FaCheck, FaEdit} from "react-icons/fa"
import {toast} from 'react-toastify'

const UserListPage = () => {

    const {data: users, isLoading, error, refetch} = useGetUsersQuery()
    const [deleteUsers, {isLoading: loadingDelete}] = useDeleteUsersMutation()

    console.log(users)

    const deleteUser = async(id) => {
        if(window.confirm('Would you like to delet the user')) {
            try {
                await deleteUsers(id)
                refetch()
                toast.success('User has been deleted')
            } catch (error) {
                toast.error(error?.data?.message || error.error)
            }
        }
    }

    return (
        <>
            <Row>
                <Col>
                    <h2> Users </h2>
                </Col>
            </Row>    

            {loadingDelete && <Loader/>}

            {isLoading ? <Loader/>: error ? <Message variant='danger'> Error </Message>: (
                <Table className="table-sm mt-5">
                    <thead>
                        <tr>
                            <th> ID </th>
                            <th> NAME </th>
                            <th> EMAIL </th>
                            <th> ADMIN </th>
                        </tr>
                    </thead>
                    <tbody> 
                            {users.map((user) => (
                                <tr key={user._id}>
                                    <td> {user._id }</td>
                                    <td> {user.name }</td>
                                    <td> <a href={`mailto:${user.email }`}> {user.email}</a> </td>
                                    <td> {user.isAdmin ? <FaCheck/>: <FaTimes/> }</td>
                                    <td>
                                        <LinkContainer to={`/admin/user/${user._id}/details`}>
                                            <Button className='btn-sm' variant="light">
                                                <FaEdit/>
                                            </Button>
                                        </LinkContainer>
                                    </td>
                                    <td>
                                        <Button  variant='light' className='btn-sm' onClick={() => deleteUser(user._id)}> 
                                            {<FaTrash/>} 
                                        </Button> 
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </Table>
            )}
        </>
    )
}

export default UserListPage