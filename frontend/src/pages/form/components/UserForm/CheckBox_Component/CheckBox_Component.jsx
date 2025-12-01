function CheckBox_Component(props) {
    const icon = props.icon;
    const label = props.label;
    const isChecked = props.isChecked;
    const index = props.checkboxType + props.index
    const checkBoxHandler = props.checkBoxHandler
    const style = props.style
    const iconStyle = props.iconStyle


    return (
        <div className="relative">
            <input
                className="peer sr-only"
                type="checkbox"
                id={index}
                value={isChecked}
                onChange={checkBoxHandler} />
            <label
                htmlFor={index}
                className={style}
            >
                <span className={iconStyle}>
                    {icon}
                </span>
                {label}
            </label>
        </div>
    )
}

export default CheckBox_Component;