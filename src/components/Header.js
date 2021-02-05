import PropTypes from 'prop-types'
import Button from './Button'


const onClick = () => {
    alert('1')
}

const Header = ({content}) => {
    return (
        <header className='header'>
            <h1>{content}</h1>
            <Button color='green' text='Hello' onClick={onClick} />
        </header>
    )
}

Header.defaultProps = {
    content : 'This is content',
}

Header.propTypes = {
    content: PropTypes.string.isRequired
}

export default Header
