import PropTypes from 'prop-types'

export const Button = ({ type, name, onClick, disabled }) => {
  return (
    <div  style={{backgroundColor:'#293c6e'}}>
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className='transition-all duration-300 text-xl text-white rounded h-1 px-5 hover:bg-opacity-80'
        style={{backgroundColor:'#293c6e'}}
      >
        {name}
      </button>
    </div>
  )
}

Button.defaultProps = {
  type: 'button',
  name: ''
}

Button.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool
}
