import { useRef } from "react";

const AddMovie = () => {
    const nameRef = useRef();
    const rateRef = useRef();
    const validationRef = useRef();

    const handleRating = () => {
        const num = isNaN(Number(rateRef.current.value));
        if(num || Number(rateRef.current.value) < 0 || Number(rateRef.current.value) > 11 ){
            validationRef.current.innerText = "*Please enter only number in range of 0 to 10";
            validationRef.current.style.fontSize = "12px"
            validationRef.current.style.color = "red"
        }
        else{
            console.log('good');
        }    
    }

    return (
        <div className="add-movie">
            <h2>Add Movie</h2>
            <span ref={validationRef}></span><br/>
            <input id="name" ref={nameRef} type="text" placeholder="Enter movie name..."/><br/>
            <input id="rate" ref={rateRef} placeholder="Rate out of 10" maxLength={2}></input>
            <button onClick={handleRating}>Add</button>
        </div>
    )
};

export default AddMovie;