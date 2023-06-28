import PropsType from 'prop-types'

export const FieldChecker = ({ name, label, value, handleOnChange }) => {
  return (
    <div>
      <label className='d-flex gap-2 items-center text-[#5D5D5D] cursor-pointer'>
        <input
          className='scale-[3] border-gray-400 mr-2 mt-2'
          onChange={handleOnChange}
          type='checkbox'
          checked={value}
          name={name}
          id={name}
          style={{width: 16, height: 16}}
        />
        <span className='ml-2' style={{fontSize: 22, marginRight: 5}} >{label} </span>
      </label>
    </div>
  )
}

FieldChecker.defaultProps = {
    label: ''
}

FieldChecker.propTypes = {
  name: PropsType.string,
  label: PropsType.string,
  value: PropsType.bool,
  handleOnChange: PropsType.func
}
