import React from 'react';

function Form() {
    return (
        <form>
            <div>
                <label htmlFor="enumber">Employee number: </label>
                <input type="text" name="enumber" id="enumber" placeholder="Enter employee number"/>
            </div>
            <div>
                <label htmlFor="password">Password: </label>
                <input type="password" name="password" id="password" placeholder="Enter password" />
            </div>
        </form>
    )
};

export default Form;