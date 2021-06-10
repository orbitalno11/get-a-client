import React,{ Fragment } from "react";
import style  from "../../stylesDefault.module.scss"

const InputComponents = ({ title, type, name, register, error, value, placeholder, required, min, disabled}) => {
    const _title = title && title;
    const _type = type && type;
    const _name = name ? name : "name"
    const _register = register && register
    const _error = error && error
    const _errorMessage = error && error.message
    const _placeholder = placeholder && placeholder
    const _required = required && required
    const _disabled = disabled && disabled
    return (
        <Fragment>
            {
                <div>
                    <p className={style.textOne5}>{_title}</p>
                    <input
                        className="input"
                        type={_type}
                        name={_name}
                        ref={_register}
                        value={value}
                        placeholder={_placeholder}
                        required = {_required}
                        min = {min && min}
                        disabled = {_disabled}
                    />
                    {
                        _error && <p className="error-input">{_errorMessage}</p>
                    }
                </div>
            }
        </Fragment>
    )
}

export default InputComponents;