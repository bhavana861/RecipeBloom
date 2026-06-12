import {Routes,Route} from "react-router-dom";
import Home from "./pages/Home";
import RecipeItems from "./components/RecipeItems";
import MainNavigation from "./components/MainNavigation";
import './App.css'
import AddFoodRecipe from "./pages/AddFoodRecipe";
import RecipeDetails from "./pages/RecipeDetails";

function App(){

return(

<Routes>
<Route path="/" element={<MainNavigation/>}>
<Route index element={<Home/>}/>
<Route path="recipes" element={<RecipeItems/>}/>
<Route path="myRecipe" element={<Home/>}/>
<Route path="/favRecipe" element={<RecipeItems myRecipe={false} showFav={true} />} />
<Route path="/addRecipe" element={<AddFoodRecipe/>}/>
<Route path="/recipe/:id" element={<RecipeDetails />} />
 <Route path="edit/:id" element={<AddFoodRecipe />} />
</Route>
</Routes>

)

}

export default App;