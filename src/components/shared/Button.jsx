

const Button = ({type, children, version='primary', isDisbaled}) => {
  return (
      <button type={type} disabled={isDisbaled} className={`btn btn-${version}`}>
          {children}
      </button>
  )
}

export default Button