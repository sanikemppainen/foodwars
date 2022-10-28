
const Notification = ({ text }) => {
    if(text === null){
        return null
    }
    return(
        <div className="showNotification">
            {text}
        </div>

    )
}
export default Notification