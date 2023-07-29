
const DisplayIcon = (props) => {
  return (
    <div className='
      h-[65px] w-[65px] rounded-full bg-[white] flex items-center justify-center
      border border-[1px] border-[whitesmoke] border-opacity-150'
    >
      { props.children }
    </div>
  )
}

export default DisplayIcon;
