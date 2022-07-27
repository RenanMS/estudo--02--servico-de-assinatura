import styles from './styles.module.scss'
import { FaGithub } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'

export const SignInButton = () => {
  const isUserLoggedIn = false

  return isUserLoggedIn ? (
    <button 
      type="button"
      className={styles.signInButton}
    >
      <FaGithub color="#1cca8a"/>
      Renan Moreira
      <FiX color="#737380" className={styles.closeIcon}/>
    </button>
  ) : (
    <button 
      type="button"
      className={styles.signInButton}
    >
      <FaGithub color="#eba417"/>
      Entrar com Github
    </button>
  )
}