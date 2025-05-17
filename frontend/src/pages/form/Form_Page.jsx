import React from "react";
import { useForm } from "react-hook-form"
import NavBar from "../../components/NavBar/NavBar";
import './Form.css'


function Form() {
    // const form = useForm();

    return (
        <>
            <NavBar />
            <div className="form-body">
                <h1 className="form-title">Form</h1>
                <form className="destination-picker-container">
                    <div className="display-preferences">
                        <label>What is your preferences</label>
                        <select>
                            <option>Option A</option>
                            <option>Option B</option>
                            <option>Option C</option>
                            <option>Option D</option>
                            <option>Option E</option>
                        </select>
                        <p>Att1: value 1</p>
                        <p>Att2: value 2</p>
                        <p>Att3: value 3</p>
                        <p>Att4: value 4</p>
                    </div>
                    <div className="form-content">
                        <label>Budget:</label>
                        <input type="number" placeholder="Enter your budget" />

                        <br /><br />

                        <fieldset>
                            <legend>What sceneries you want to see</legend>

                            <input type="checkbox" id="beach" name="beach" />
                            <label htmlFor="beach">Beach</label>

                            <input type="checkbox" id="city" name="city" />
                            <label htmlFor="city">City</label>

                            <input type="checkbox" id="island" name="island" />
                            <label htmlFor="island">Island</label>

                            <input type="checkbox" id="city" name="city" />
                            <label htmlFor="city">City</label>

                            <input type="checkbox" id="countryside" name="countryside" />
                            <label htmlFor="countryside">Countryside</label>

                            <input type="checkbox" id="no_preference" name="no_preference" />
                            <label htmlFor="no_preference">No Preference</label>
                        </fieldset>

                        <br />

                        <label>Month:</label>
                        <select name="months" id="months">
                            <option>January</option>
                            <option>February</option>
                            <option>March</option>
                            <option>April</option>
                            <option>May</option>
                            <option>June</option>
                            <option>July</option>
                            <option>August</option>
                            <option>September</option>
                            <option>October</option>
                            <option>November</option>
                            <option>December</option>
                        </select>

                        <br />

                        <label>Weather preferences:</label>
                        <select name="weather" id="weather">
                            <option>Any</option>
                            <option>Sunny</option>
                            <option>Cloudy</option>
                            <option>Rainning</option>
                        </select>
                        <label>Temperature:</label>
                        <select name="temperarute" id="temperarute">
                            <option>Don't mimd</option>
                            <option>Cool</option>
                            <option>Mild</option>
                            <option>Warm</option>
                            <option>Hot</option>
                        </select>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Form