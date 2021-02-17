import PropTypes from 'prop-types'
import Button from './Button'
import { useLocation } from 'react-router-dom'

// const onClick = () => {
//     alert('1')
// }

const Header = ({ content, onAdd, showAdd }) => {
    const location = useLocation()
    return (
        <header className='header'>
            <h1>{content}</h1>
            {location.pathname === '/' &&
                <Button color={showAdd ? 'red' : 'green'} text={showAdd ? 'Close' : 'Add'} onClick={onAdd} />
            }
        </header>
    )
}

Header.defaultProps = {
    content: 'This is content',
}

Header.propTypes = {
    content: PropTypes.string.isRequired
}

export default Header
