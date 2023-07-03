import {useState} from "react";


function Table(props) {
    const data = props.data;
    
    const headers = Object.keys(data[0]).map(key => <th>{key}</th>);
    const values = data.map(item => <tr>{Object.values(item).map(value => <td>{value}</td>)}</tr>);
    
    
    
    return (
        <table className="table">
            
            <thead>
                <tr>
                    {headers}
                </tr>
            </thead>
            
            <tbody>
                {values}
            </tbody>
            
        </table>
    );
    
}


function Routine(props) {
        
    const exerciseItems = props.data['exercise_items'];
    const subunitItems = props.data['subunit_items'];
    
    const subunitItemsDisplay = subunitItems.map((unit, i) => <li onClick={props['setAsUnit']} className={i}>{unit['super_routine']}</li>);
    const exerciseItemsDisplay = <Table data={exerciseItems}></Table>;
    
    return (
        <div className='container'>
            {<div className='exercise_items'>{exerciseItemsDisplay}</div>}
            <ul className='subunit_items'>Subunit Items:{subunitItemsDisplay}</ul>
        </div>
    );
}


function Unit(props) {
    const selfData = [Object.fromEntries(Object.entries(props.data).filter(([key]) => key !== 'sub_routine'))];
    
    const selfDataDisplay = <Table data={selfData}></Table>;
    const subRoutineDisplay = 'Sub Routine';
    
    return (
        <div className='container'>
            <div className='unit'>{selfDataDisplay}</div>
            <div onClick={props['setAsRoutine']} className='sub_routine'>{subRoutineDisplay}</div>
        </div>
        );
}


function WorkoutExplorer(props) {
    const session = props['sessionData'];
    
    const [routine, setRoutine] = useState(session);
    const [unit, setUnit] = useState({});
    
    const [isRoutineVisible, setIsRoutineVisible] = useState(true);
    const [isUnitVisible, setIsUnitVisible] = useState(false);
    
    return (
        <>
            {isRoutineVisible && (
                <Routine data={routine} setAsUnit={(e) => {
                setUnit(routine['subunit_items'][Number(e.target.className)]);
                
                setIsUnitVisible(true);
                setIsRoutineVisible(false);
            }}></Routine>
            )}
        
            {isUnitVisible && (
                <Unit data={unit} setAsRoutine={(e) => {
                setRoutine(unit['sub_routine']);
                
                setIsUnitVisible(false);
                setIsRoutineVisible(true);
            }}></Unit>
            )}
        
            <button onClick={() => {
                setRoutine(session);
                setUnit({});
                
                setIsUnitVisible(false);
                setIsRoutineVisible(true);
            }}>Reset</button>
        </>
    );
    
    
    
}

export {WorkoutExplorer}
