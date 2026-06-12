import React, { useEffect, useState } from 'react'
import '../pages/Home.css'
import RecipeItems from '../components/RecipeItems'
import { useNavigate, useLocation } from 'react-router-dom';
import InputForm from '../components/InputForm'
import Modal from "../components/Modal";


const Home = () => {
  const navigate = useNavigate()
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false)
  

  const isMyRecipe = location.pathname === "/myRecipe";
const isFavRecipe = location.pathname === "/favRecipe";

    const addRecipe = () => {
        let token = localStorage.getItem("token")
        if (token)
            navigate("/addRecipe")
        else {
            setIsOpen(true)
        }
    }

  return (
   
   <> 
   {
    location.pathname === "/" && (
         <section className="home">
      <div className="overlay-home">
        <div className="home-content">
          <h1>Food Recipe</h1>
          <p>
            Welcome to our RecipeBloom, your ultimate destination for 
            discovering delicious and easy-to-follow recipes. Explore a variety 
            of dishes, learn new cooking ideas, and find recipes that match 
            your taste and time. Whether you are a beginner or an experienced 
            cook, our app helps you prepare tasty meals with simple ingredients 
            and clear instructions. Start cooking and create amazing food 
            experiences today!
          </p>
          <button className="share-btn" onClick={addRecipe}>Share Recipe ✨</button>
        </div>
      </div>
    </section>
    )
   }

     {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <InputForm setIsOpen={() => setIsOpen(false)} />
        </Modal>
      )}

    <div className='recipe'>    
 <RecipeItems myRecipe={isMyRecipe} favRecipe={isFavRecipe}/>      
 </div>

    </>
  

  )
}

export default Home