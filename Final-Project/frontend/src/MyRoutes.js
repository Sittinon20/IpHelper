import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom"
import Home from './Pages/home/index';
import Register from './Pages/register/index';
import Login from './Pages/login/index';
import Profile from './Pages/profile/index';
import Card from './Pages/card/index';
import CardInfo from './Pages/cardInfo@cardId/index'
import Question from './Pages/question';
import Form from './Pages/form';
import FormInfo from './Pages/formInfo';

const MyRoutes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path = "/" exact component = {Home}></Route>
                <Route path = "/register" exact component = {Register}></Route>
                <Route path = "/login" exact component = {Login}></Route>
                <Route path = "/profile/:email" exact component = {Profile}></Route>
                <Route path = "/card/:email" exact component = {Card}></Route>
                <Route path = "/cardInfo/:id" exact component = {CardInfo}></Route>
                <Route path = "/question/:id" exact component = {Question}></Route>
                <Route path = "/form/:id" exact component = {Form}></Route>
                <Route path = "/forminfo/:id" exact component = {FormInfo}></Route>
            </Switch>
        </BrowserRouter>
    )
}

export default MyRoutes;