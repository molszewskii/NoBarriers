import React from "react";
import './../css/startpage.css'
import winb from './../assets/whatisnobariers.jpg'
import levels from './../assets/levels.jpg'
import quiz from './../assets/quiz.jpg'
import tests from './../assets/tests.jpg'
import { Link, useNavigate } from 'react-router-dom';

const languages = ['english', 'german'];
    
const StartPage=()=>{
    const navigate = useNavigate();

    const handleLoginClick=()=>{
        navigate("/login")
    }
    return(
        <div>
            <div className="background">
                <div className="description">
                    <h2>Welcome in NoBarriers</h2>
                    <p>Start your adventure and learn new languages with ease and totally for free!!</p>
                    <div className="buttonsDisplay">
                        <button className="buttons" onClick={handleLoginClick}>Already have an account</button>
                        <Link to="/register"><button className="buttons">Register</button></Link>
                    </div>
                    <hr></hr>
                </div>
                <div className="languages">
                
                    <h2>Languages that you can take courses of</h2>
                    <div className="buttonsDisplay">
                    {languages.map((language) => (
                    <button className="buttons" key={language}>{language}</button>
                    ))}
                    </div>
                </div>
            </div>
            <div className="background2">
                <section>
                    <h3>What is NoBarriers</h3>
                    <div className="whatisnobarriers">
                    <img src={winb} alt="Women with a marker" />
                        <span>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In commodo vulputate euismod. 
                            Aenean sed vulputate tortor. Nullam consequat nibh a gravida euismod. Vestibulum vitae lectus
                            at leo suscipit varius. Curabitur quis mauris eget erat pretium imperdiet a id nulla. Maecenas 
                            quis nibh tempor, maximus arcu nec, vehicula lacus. Vestibulum sed congue dui, vitae rutrum neque
                            . Nulla et velit maximus, suscipit dolor non, semper ex. Maecenas cursus, ipsum faucibus fringilla 
                            dapibus, tortor ex tristique metus, id condimentum lacus justo ac lectus.
                        </span>
                    </div>
                    <hr></hr>
                </section>
                <section className="methods">
                    <h4>Methods of learning</h4>
                    <div className="boxesStartPage">
                        <div className="boxStartPage">
                            <h5>FlashCards</h5>
                            <img src={quiz} alt="quiz"/>
                            <span>
                            Vivamus sit amet massa elementum, vestibulum odio non, vehicula enim. 
                            Phasellus eget iaculis dui, vitae sodales nisl. Maecenas eleifend quis leo at cursus. 
                            Integer eu mi cursus, hendrerit ex sed, venenatis nisl. Mauris aliquet ac arcu sit amet scelerisque. 
                            Pellentesque orci lectus, semper et libero vitae, facilisis porta lorem. Pellentesque facilisis erat sit amet elit fringilla 
                            consequat. Phasellus nisl justo, tristique eu purus a, volutpat pharetra leo. Curabitur ante nisi
                            </span>
                        </div>
                        <div className="boxStartPage">
                            <h5>Tests</h5>
                            <img src={tests} alt="tests"/>
                            <span>
                            Vivamus sit amet massa elementum, vestibulum odio non, vehicula enim. 
                            Phasellus eget iaculis dui, vitae sodales nisl. Maecenas eleifend quis leo at cursus. 
                            Integer eu mi cursus, hendrerit ex sed, venenatis nisl. Mauris aliquet ac arcu sit amet scelerisque. 
                            Pellentesque orci lectus, semper et libero vitae, facilisis porta lorem. Pellentesque facilisis erat sit amet elit fringilla 
                            consequat. Phasellus nisl justo, tristique eu purus a, volutpat pharetra leo. Curabitur ante nisi
                            </span>
                        </div>
                        <div className="boxStartPage">
                            <h5>Passing levels</h5>
                            <img src={levels} alt="passing levels"/>
                            <span>
                            Vivamus sit amet massa elementum, vestibulum odio non, vehicula enim. 
                            Phasellus eget iaculis dui, vitae sodales nisl. Maecenas eleifend quis leo at cursus. 
                            Integer eu mi cursus, hendrerit ex sed, venenatis nisl. Mauris aliquet ac arcu sit amet scelerisque. 
                            Pellentesque orci lectus, semper et libero vitae, facilisis porta lorem. Pellentesque facilisis erat sit amet elit fringilla 
                            consequat. Phasellus nisl justo, tristique eu purus a, volutpat pharetra leo. Curabitur ante nisi
                            </span>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );

}

export default StartPage;