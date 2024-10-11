
function Button({
    //children is used to render the content inside the button
    children,
    bgColor = 'bg-blue-500',
    textColor = 'text-white',
    className="",
    ...props
}) {
  return (
    <button className={`font-bold py-2 px-4 rounded-lg hover:bg-slate-400 ${bgColor} ${textColor} ${className}`} {...props}>
        {children}
    </button>
  )
}

export default Button