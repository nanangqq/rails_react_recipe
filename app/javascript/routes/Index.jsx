import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../components/Home";
import Recipes from "../components/Recipes";
import Recipe from "../components/Recipe";
import NewRecipe from "../components/NewRecipe";
import Pols_test from "../components/Pols_test";
import NewPol from "../components/NewPol";

export default (
    <Router>
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path='/recipes' exact component={Recipes} />
            <Route path='/recipe/:id' exact component={Recipe} />
            <Route path='/recipe' exact component={NewRecipe} />
            <Route path='/polstest' exact component={Pols_test} />
            <Route path='/pol' exact component={NewPol} />
        </Switch>
    </Router>
);
