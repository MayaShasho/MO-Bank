
const Input = ({ type, name, placeholder, value, onChange }) => {

    return <label>
        <input
            className="FormInput"
            type={type}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
        />
    </label>
}
export default Input;