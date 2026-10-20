import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { updateMe, changeEmail, changePassword, deactivateMe } from '../../utils/api'
import { toast } from 'react-toastify'
import ProfileActions from './ProfileActions'
import ProfileNameModal from './ProfileNameModal'
import ProfileEmailModal from './ProfileEmailModal'
import ProfilePasswordModal from './ProfilePasswordModal'
import ProfileDeactivateModal from './ProfileDeactivateModal'

// Botones, modales y avisos de la cuenta. Las llamadas salen de acá; App guarda el usuario y el token
function ProfileSettings({ user, token, onUserChange, onTokenChange, onLogout }) {
  const navigate = useNavigate()
  const [modal, setModal] = useState(null) // null | 'name' | 'email' | 'password' | 'deactivate'
  const [error, setError] = useState('')

  const openModal = (name) => {
    setError('')
    setModal(name)
  }

  // la contraseña incorrecta llega como 400, así que un 401/403 sí significa sesión vencida
  const handleError = (err) => {
    if (err.status === 401 || err.status === 403) onLogout()
    setError(err.message)
  }

  const handleSuccess = (message) => {
    toast.success(message)
    setModal(null)
  }

  const handleName = (form) => {
    updateMe(token, form)
      .then((updated) => {
        onUserChange(updated)
        handleSuccess('Datos actualizados')
      })
      .catch(handleError)
  }

  const handleEmail = (form) => {
    changeEmail(token, form)
      .then((data) => {
        onTokenChange(data.access_token)
        handleSuccess('Email actualizado')
      })
      .catch(handleError)
  }

  const handlePassword = (form) => {
    changePassword(token, form)
      .then(() => handleSuccess('Contraseña actualizada'))
      .catch(handleError)
  }

  const handleDeactivate = (form) => {
    deactivateMe(token, form)
      .then(() => {
        onLogout()
        navigate('/')
      })
      .catch(handleError)
  }

  const closeModal = () => setModal(null)

  return (
    <>
      <ProfileActions onOpen={openModal} />
      {modal === 'name' && <ProfileNameModal user={user} error={error} onSave={handleName} onClose={closeModal} />}
      {modal === 'email' && <ProfileEmailModal error={error} onSave={handleEmail} onClose={closeModal} />}
      {modal === 'password' && <ProfilePasswordModal error={error} onSave={handlePassword} onClose={closeModal} />}
      {modal === 'deactivate' && <ProfileDeactivateModal error={error} onConfirm={handleDeactivate} onClose={closeModal} />}
    </>
  )
}

export default ProfileSettings
