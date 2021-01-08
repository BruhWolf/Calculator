import './styles.css'
const CalcDebug = (props) => {
    const style = 
    props.debug?{}:{display:"none"}
    return(
        <div className="Debug" style={style}>
        {
            Object.keys(props).map((prop => <span>{prop}: {props[prop]}</span> ))
        }   
        </div>
    );
}
export default CalcDebug;